import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, X } from 'lucide-react'

export default function FileUpload({ file, onFileAccepted, onClear, disabled = false }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled,
    onDrop: (accepted, rejected) => {
      if (rejected.length > 0) {
        onFileAccepted(rejected[0].file)
      } else if (accepted.length > 0) {
        onFileAccepted(accepted[0])
      }
    },
  })

  if (file) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2)
    return (
      <div className="relative flex items-center gap-4 p-5 bg-brand-50 border-2 border-brand-300 rounded-2xl animate-fade-in">
        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-brand-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{file.name}</p>
          <p className="text-sm text-gray-500">{sizeMB} MB</p>
        </div>
        {!disabled && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-card text-gray-400 hover:text-accent-500 hover:shadow-float transition-all"
            aria-label="Remove file"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`
        relative flex flex-col items-center justify-center gap-4
        p-10 rounded-2xl border-2 border-dashed cursor-pointer
        transition-all duration-300 group
        ${isDragReject
          ? 'border-accent-400 bg-red-50'
          : isDragActive
          ? 'border-brand-400 bg-brand-50 scale-[1.01]'
          : 'border-surface-200 hover:border-brand-300 hover:bg-brand-50/50 bg-white'
        }
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />

      <div className={`
        w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300
        ${isDragActive ? 'bg-brand-100 scale-110' : 'bg-surface-100 group-hover:bg-brand-50 group-hover:scale-105'}
      `}>
        <UploadCloud className={`w-8 h-8 transition-colors ${isDragActive ? 'text-brand-500' : 'text-gray-400 group-hover:text-brand-400'}`} />
      </div>

      <div className="text-center">
        {isDragReject ? (
          <p className="font-semibold text-accent-500">Only PDF files are accepted</p>
        ) : isDragActive ? (
          <p className="font-semibold text-brand-500">Drop your PDF here</p>
        ) : (
          <>
            <p className="font-semibold text-gray-700">
              Drag &amp; drop your PDF here
            </p>
            <p className="text-sm text-gray-400 mt-1">
              or{' '}
              <span className="text-brand-500 underline underline-offset-2">
                browse files
              </span>
            </p>
          </>
        )}
        <p className="text-xs text-gray-400 mt-3">
          PDF only · Max 25 MB · Auto-deleted within 10 minutes
        </p>
      </div>
    </div>
  )
}
