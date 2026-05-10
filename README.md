# PDFNova

Free, layout-preserving **PDF → Word (DOCX)** converter.

- **Frontend:** React 18 + Vite + Tailwind (deploy to **Vercel**)
- **Backend:** Python 3.11 + Flask + `pdf2docx` (deploy to **Render**)
- **Reliability over speed:** single-process conversion with retries
- **Privacy:** uploads deleted immediately, output auto-deleted within **10 minutes**

```
pdfnova/
├── client/   # React + Vite frontend (Vercel)
└── server/   # Flask backend (Render)
```

---

## 1. Run locally

### Prerequisites
- Node.js 18+
- Python 3.10 – 3.12
- Git

### 1a. Backend (Flask)

```bash
cd server
python -m venv venv
# macOS / Linux:
source venv/bin/activate
# Windows (PowerShell):
# venv\Scripts\Activate.ps1

pip install -r requirements.txt
cp .env.example .env

# Run the API on http://localhost:5000
python app.py
```

Test it:
```bash
curl http://localhost:5000/health
# {"status":"ok","service":"PDFNova API"}
```

### 1b. Frontend (Vite)

In a **second terminal**:

```bash
cd client
npm install
cp .env.example .env.local   # leaves VITE_API_URL=http://localhost:5000
npm run dev
```

Open http://localhost:5173 — the app should reach your local Flask API.

---

## 2. Push to GitHub

From the project root (`pdfnova/`):

```bash
git init
git add .
git commit -m "Initial commit: PDFNova"
git branch -M main
git remote add origin https://github.com/<your-username>/pdfnova.git
git push -u origin main
```

> The `.gitignore` already excludes `node_modules/`, `venv/`, `.env`, and the
> `server/uploads/` and `server/outputs/` temp dirs.

---

## 3. Deploy backend on Render

PDFNova ships with a `server/render.yaml` blueprint, so you have two options.

### Option A — One-click via blueprint (recommended)
1. Go to https://dashboard.render.com → **New +** → **Blueprint**.
2. Connect your GitHub repo.
3. Render reads `server/render.yaml` and creates a web service named **pdfnova-api**.
4. After it boots, copy the public URL (e.g. `https://pdfnova-api.onrender.com`).

### Option B — Manual web service
1. **New +** → **Web Service** → connect your repo.
2. **Root directory:** `server`
3. **Runtime:** Python 3
4. **Build command:** `pip install -r requirements.txt`
5. **Start command:**
   ```
   gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 600
   ```
   > **Important:** keep `--workers 1`. The 10-minute auto-delete uses
   > in-process timers; multiple workers would each run their own scheduler.
6. Add **Environment Variables**:
   - `PYTHON_VERSION` = `3.11.9`
   - `FRONTEND_URL`   = `https://your-frontend.vercel.app` (update after Vercel deploy)

Verify: open `https://<your-service>.onrender.com/health`.

> Free tier note: Render free instances sleep after ~15 min of inactivity,
> so the first conversion after idle may take ~30 s to wake up.

---

## 4. Deploy frontend on Vercel

1. Go to https://vercel.com/new and import the same GitHub repo.
2. Configure the project:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` (default)
3. Add **Environment Variables** (Project Settings → Environment Variables):
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com`
     (apply to **Production**, **Preview**, and **Development**)
4. Click **Deploy**.

The included `client/vercel.json` already handles SPA routing and security headers.

### Wire the two together
After both are live, update Render's `FRONTEND_URL` env var to your Vercel URL
(e.g. `https://pdfnova.vercel.app`) and redeploy the backend so CORS allows it.

---

## 5. Customizing the Donate page

Edit `client/src/pages/Donate.jsx` and update the three constants at the top:

```js
const GCASH_NAME   = 'YOUR NAME'
const GCASH_NUMBER = '09XX XXX XXXX'
const GCASH_NOTE   = 'Support PDFNova'
```

Commit and push — Vercel auto-deploys.

---

## 6. How the auto-delete works

| File              | When it is removed                                            |
|-------------------|---------------------------------------------------------------|
| Uploaded PDF      | Immediately after conversion finishes                         |
| Generated DOCX    | Exactly **10 minutes** after creation (per-file `Timer`)      |
| Anything leftover | A background janitor sweeps every **2 minutes** as a safety net |

If the process restarts mid-flight, the janitor still cleans any file older
than 10 minutes on the next sweep — nothing accumulates on disk.

---

## 7. Tech stack

**Frontend:** React 18, Vite, Tailwind CSS, react-router-dom, react-dropzone, axios, lucide-react, react-hot-toast
**Backend:** Flask, flask-cors, pdf2docx, gunicorn, APScheduler

---

## License

MIT — built by [David Duca](https://ducadavid-portfolio.vercel.app/).
