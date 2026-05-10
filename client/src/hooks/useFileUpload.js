import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { convertPdfToDocx } from '../services/api'

const MAX_SIZE_MB = 25
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

export function useFileUpload() {
  const [file, setFile]                 = useState(null)
  const [status, setStatus]             = useState('idle')
  const [progress, setProgress]         = useState(0)
  const [errorMsg, setErrorMsg]         = useState('')
  const [downloadUrl, setDownloadUrl]   = useState(null)
  const [downloadName, setDownloadName] = useState('')

  const acceptFile = useCallback((incoming) => {
    setErrorMsg('')
    setDownloadUrl(null)
    setStatus('idle')
    setProgress(0)

    if (!incoming) return

    if (incoming.type !== 'application/pdf' && !incoming.name.toLowerCase().endsWith('.pdf')) {
      const msg = 'Only PDF files are accepted.'
      setErrorMsg(msg); toast.error(msg); return
    }

    if (incoming.size > MAX_SIZE_BYTES) {
      const msg = `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
      setErrorMsg(msg); toast.error(msg); return
    }

    setFile(incoming)
  }, [])

  const convert = useCallback(async () => {
    if (!file) return

    setStatus('converting')
    setProgress(0)
    setErrorMsg('')

    try {
      const { blob, filename } = await convertPdfToDocx(file, setProgress)
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setDownloadName(filename)
      setStatus('success')
      setProgress(100)
      toast.success('Conversion successful! Your file is ready.')
    } catch (err) {
      let message = 'Conversion failed. Please try again.'

      if (err.response) {
        try {
          const text = await err.response.data.text()
          const json = JSON.parse(text)
          message = json.error || message
        } catch {
          if (err.response.status === 413) message = `File exceeds ${MAX_SIZE_MB}MB limit.`
        }
      } else if (err.code === 'ECONNABORTED') {
        message = 'Request timed out. Try a smaller file.'
      } else if (!navigator.onLine) {
        message = 'No internet connection.'
      }

      setErrorMsg(message)
      setStatus('error')
      toast.error(message)
    }
  }, [file])

  const reset = useCallback(() => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFile(null)
    setStatus('idle')
    setProgress(0)
    setErrorMsg('')
    setDownloadUrl(null)
    setDownloadName('')
  }, [downloadUrl])

  return {
    file, status, progress, errorMsg,
    downloadUrl, downloadName,
    acceptFile, convert, reset,
    isConverting: status === 'converting',
    isSuccess:    status === 'success',
    isError:      status === 'error',
  }
}
