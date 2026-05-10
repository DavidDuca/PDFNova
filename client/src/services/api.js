import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  // Reliable conversion is slow on complex PDFs — give it room.
  timeout: 5 * 60 * 1000,
})

/**
 * Convert a PDF File object to a DOCX Blob.
 * @param {File}     file        The PDF file to convert
 * @param {Function} onProgress  Progress callback (0–100)
 * @returns {Promise<{ blob: Blob, filename: string }>}
 */
export async function convertPdfToDocx(file, onProgress) {
  const form = new FormData()
  form.append('file', file)

  const response = await api.post('/convert', form, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 50))
    },
    onDownloadProgress: (e) => {
      if (e.total) onProgress?.(50 + Math.round((e.loaded / e.total) * 50))
    },
  })

  const disposition = response.headers['content-disposition'] || ''
  const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
  const filename = match
    ? match[1].replace(/['"]/g, '')
    : file.name.replace(/\.pdf$/i, '.docx')

  return { blob: response.data, filename }
}

export default api
