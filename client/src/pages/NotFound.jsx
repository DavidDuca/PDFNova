import { Link } from 'react-router-dom'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-3xl bg-brand-50 border-2 border-brand-100 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-12 h-12 text-brand-400" />
        </div>

        <h1 className="font-display text-6xl font-extrabold text-gray-900 mb-3">404</h1>
        <p className="font-display text-xl font-semibold text-gray-700 mb-2">Page not found</p>
        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all shadow-card hover:shadow-float"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/convert"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-surface-200 hover:border-brand-200 hover:text-brand-600 transition-all"
          >
            Try Converter
          </Link>
        </div>
      </div>
    </div>
  )
}
