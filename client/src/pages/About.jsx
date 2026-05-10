import { Zap, ShieldCheck, Globe, ExternalLink, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="py-16 px-4 bg-surface-50">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">About PDFNova</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We built PDFNova to make document conversion effortless, private, and completely free.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-surface-200 mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            PDFNova exists to give everyone a fast, private, and free way to convert PDF files into
            editable Word documents — without subscriptions, account creation, or data harvesting.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your files belong to you. We process them on a secure server and delete them within
            10 minutes. We never store, share, or analyze your documents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: Zap,         label: 'Reliability', desc: 'Layout-preserving engine with automatic retries.' },
            { icon: ShieldCheck, label: 'Privacy',     desc: 'Files auto-deleted within 10 minutes.' },
            { icon: Globe,       label: 'Accessible',  desc: 'Free for everyone, on any device.' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-card border border-surface-200 card-hover">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1">{label}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-card border border-surface-200 mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Python', 'Flask', 'pdf2docx', 'APScheduler', 'Vercel', 'Render'].map((t) => (
              <span key={t} className="px-3 py-1 bg-brand-50 text-brand-600 text-sm font-medium rounded-full border border-brand-100">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Developer card */}
        <div className="bg-white rounded-3xl p-8 shadow-card border border-surface-200 mb-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-7 h-7 text-brand-500" />
          </div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Built by</p>
          <h3 className="font-display text-2xl font-bold text-gray-900">David Duca</h3>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Full-stack developer focused on clean, fast, privacy-friendly web tools.
          </p>
          <a
            href="https://ducadavid-portfolio.vercel.app/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
          >
            Visit Portfolio
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="text-center">
          <Link
            to="/convert"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-card hover:shadow-float transition-all"
          >
            Try PDFNova Free
          </Link>
        </div>
      </div>
    </div>
  )
}
