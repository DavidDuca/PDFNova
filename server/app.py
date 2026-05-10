"""
PDFNova - Flask Backend API
PDF -> DOCX with layout preservation, reliable conversion, and 10-min auto-cleanup.
"""

import os
import time
import uuid
import logging
import threading
from pathlib import Path

from flask import Flask, request, jsonify, send_file, after_this_request
from flask_cors import CORS
from werkzeug.utils import secure_filename
from apscheduler.schedulers.background import BackgroundScheduler

# ─── App Setup ────────────────────────────────────────────────────────────────
app = Flask(__name__)

ALLOWED_ORIGINS = os.environ.get(
    "FRONTEND_URL", "http://localhost:5173"
).split(",")
CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)

# ─── Configuration ────────────────────────────────────────────────────────────
MAX_UPLOAD_MB = 25
RETENTION_SECONDS = 10 * 60          # auto-delete output after 10 minutes
JANITOR_INTERVAL_SECONDS = 120       # safety sweep every 2 minutes

app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_MB * 1024 * 1024

UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf"}
ALLOWED_MIME = {"application/pdf", "application/x-pdf", "application/octet-stream"}

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("pdfnova")

# pdf2docx isn't fully thread-safe with shared font caches.
_convert_lock = threading.Lock()


# ─── Helpers ──────────────────────────────────────────────────────────────────
def _ext_ok(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def _is_real_pdf(path: Path) -> bool:
    """Sniff magic bytes to confirm the file is actually a PDF."""
    try:
        with open(path, "rb") as fh:
            return fh.read(5) == b"%PDF-"
    except Exception:
        return False


def cleanup(*paths):
    for p in paths:
        try:
            if p and Path(p).exists():
                Path(p).unlink()
                logger.info(f"Cleaned up: {p}")
        except Exception as e:
            logger.warning(f"Cleanup failed for {p}: {e}")


def schedule_delete(path: Path, delay: int = RETENTION_SECONDS):
    """Schedule a one-shot deletion of `path` after `delay` seconds."""
    def _delete():
        cleanup(path)
    t = threading.Timer(delay, _delete)
    t.daemon = True
    t.start()
    logger.info(f"Scheduled delete of {path.name} in {delay}s")


def janitor_sweep():
    """Delete any file older than RETENTION_SECONDS in upload/output dirs."""
    now = time.time()
    for d in (UPLOAD_DIR, OUTPUT_DIR):
        if not d.exists():
            continue
        for f in d.iterdir():
            try:
                if f.is_file() and now - f.stat().st_mtime > RETENTION_SECONDS:
                    f.unlink()
                    logger.info(f"Janitor removed stale file: {f}")
            except Exception as e:
                logger.warning(f"Janitor failed on {f}: {e}")


def convert_with_retry(pdf_path: Path, docx_path: Path, attempts: int = 2):
    """
    Convert PDF -> DOCX while preserving the original layout.

    Reliability tweaks:
    - multi_processing=False: slower but FAR more stable; preserves page
      order, fonts, and tables consistently.
    - cpu_count=1: avoids worker races that can corrupt complex docs.
    - Retry once on transient failure (e.g. fontconfig hiccups).
    """
    from pdf2docx import Converter

    last_err = None
    for attempt in range(1, attempts + 1):
        try:
            with _convert_lock:
                cv = Converter(str(pdf_path))
                try:
                    cv.convert(
                        str(docx_path),
                        start=0,
                        end=None,
                        multi_processing=False,
                        cpu_count=1,
                    )
                finally:
                    cv.close()
            if docx_path.exists() and docx_path.stat().st_size > 0:
                return
            raise RuntimeError("Empty output produced")
        except Exception as e:
            last_err = e
            logger.warning(f"Conversion attempt {attempt} failed: {e}")
            cleanup(docx_path)
            time.sleep(0.5)
    raise last_err if last_err else RuntimeError("Unknown conversion failure")


# ─── Routes ───────────────────────────────────────────────────────────────────
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "PDFNova API"}), 200


@app.route("/convert", methods=["POST"])
def convert_pdf_to_docx():
    if "file" not in request.files:
        return jsonify({"error": "No file provided."}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    filename = secure_filename(file.filename) or "document.pdf"
    mimetype = (file.content_type or "").lower()

    if not _ext_ok(filename):
        return jsonify({"error": "Only .pdf files are allowed."}), 422
    if mimetype and mimetype not in ALLOWED_MIME:
        return jsonify({"error": f"Unsupported content type: {mimetype}"}), 422

    uid = uuid.uuid4().hex
    pdf_path = UPLOAD_DIR / f"{uid}_{filename}"
    docx_name = Path(filename).stem + ".docx"
    docx_path = OUTPUT_DIR / f"{uid}_{docx_name}"

    try:
        file.save(str(pdf_path))
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {e}"}), 500

    if not _is_real_pdf(pdf_path):
        cleanup(pdf_path)
        return jsonify({"error": "File is not a valid PDF."}), 422

    start = time.time()
    try:
        convert_with_retry(pdf_path, docx_path, attempts=2)
        logger.info(f"Converted {filename} in {time.time() - start:.1f}s")
    except Exception as e:
        cleanup(pdf_path, docx_path)
        logger.error(f"Conversion failed: {e}")
        return jsonify({
            "error": "Conversion failed. The PDF may be encrypted, scanned, or corrupted."
        }), 500

    # Source PDF can go now; output is kept 10 minutes for the user.
    cleanup(pdf_path)
    schedule_delete(docx_path, RETENTION_SECONDS)

    @after_this_request
    def add_headers(response):
        response.headers["X-Retention-Seconds"] = str(RETENTION_SECONDS)
        return response

    try:
        return send_file(
            str(docx_path),
            as_attachment=True,
            download_name=docx_name,
            mimetype="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )
    except Exception as e:
        cleanup(docx_path)
        return jsonify({"error": f"Failed to send file: {e}"}), 500


# ─── Error Handlers ───────────────────────────────────────────────────────────
@app.errorhandler(413)
def too_large(_):
    return jsonify({"error": f"File exceeds the {MAX_UPLOAD_MB}MB size limit."}), 413


@app.errorhandler(404)
def not_found(_):
    return jsonify({"error": "Endpoint not found."}), 404


@app.errorhandler(500)
def server_error(_):
    return jsonify({"error": "Internal server error."}), 500


# ─── Background Scheduler ─────────────────────────────────────────────────────
scheduler = BackgroundScheduler(daemon=True)
scheduler.add_job(
    janitor_sweep,
    "interval",
    seconds=JANITOR_INTERVAL_SECONDS,
    id="janitor",
    replace_existing=True,
)
scheduler.start()
janitor_sweep()  # initial sweep on boot


# ─── Entry Point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV", "production") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
