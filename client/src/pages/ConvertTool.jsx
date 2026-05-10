import { useEffect } from 'react'
import {
  CheckCircle2, Download, RefreshCw, AlertCircle,
  Lock, Zap, FileCheck2, Gift,
} from 'lucide-react'
import { useFileUpload } from '../hooks/useFileUpload'
import FileUpload from '../components/FileUpload'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'

const INFO_CHIPS = [
  { Icon: Lock,       label: 'Files auto-deleted in 10 min' },
  { Icon: Zap,        label: 'Reliable, layout-preserving' },
  { Icon: FileCheck2, label: 'Editable .docx output' },
  { Icon: Gift,       label: 'Always free' },
]

export default function ConvertTool() {
  const {
    file, progress, errorMsg,
    downloadUrl, downloadName,
    acceptFile, convert, reset,
    isConverting, isSuccess, isError,
  } = useFileUpload()

  // Auto-trigger download once conversion succeeds
  useEffect(() => {
    if (isSuccess && downloadUrl) {
      const a = document.createElement('a')
      a.href = downloadUrl
      a.download = downloadName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }, [isSuccess, downloadUrl, downloadName])

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-50 py-12 px-4">
      <div className="max-w-xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
            PDF to Word Converter
          </h1>
          <p className="text-gray-500 text-sm">
            Upload a PDF and download an editable DOCX. Layout is preserved and files are auto-deleted within 10 minutes.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-card border border-surface-200 p-6 sm:p-8">

          {!isConverting && !isSuccess && (
            <>
              <FileUpload
                file={file}
                onFileAccepted={acceptFile}
                onClear={reset}
                disabled={isConverting}
              />

              {isError && errorMsg && (
                <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}

              {!file && !isError && (
                <p className="text-center text-xs text-gray-400 mt-5">
                  Supported format: <strong className="text-gray-500">PDF</strong> · Max size: <strong className="text-gray-500">25 MB</strong>
                </p>
              )}

              {file && (
                <Button
                  className="w-full mt-5"
                  size="lg"
                  onClick={convert}
                  disabled={!file}
                >
                  Convert to Word
                </Button>
              )}
            </>
          )}

          {isConverting && (
            <div className="py-4 space-y-6 animate-fade-in">
              <div className="space-y-3">
                {[100, 80, 60].map((w) => (
                  <div key={w} className="shimmer h-4 rounded-lg" style={{ width: `${w}%` }} />
                ))}
              </div>
              <ProgressBar progress={progress} />
            </div>
          )}

          {isSuccess && (
            <div className="flex flex-col items-center text-center py-6 gap-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce-once">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-gray-900 mb-1">
                  Conversion Complete
                </h2>
                <p className="text-sm text-gray-500">
                  Your Word document has been downloaded automatically.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Filename: <span className="font-medium text-gray-600">{downloadName}</span>
                </p>
              </div>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-card"
                >
                  <Download className="w-4 h-4" />
                  Download Again
                </a>
              )}

              <Button variant="ghost" size="sm" onClick={reset} className="text-gray-500">
                <RefreshCw className="w-4 h-4" />
                Convert another file
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {INFO_CHIPS.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-surface-200 px-3 py-1.5 rounded-full shadow-sm"
            >
              <Icon className="w-3.5 h-3.5 text-brand-500" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
