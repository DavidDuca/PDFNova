import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Zap, FileText, RefreshCw, Lock, Star } from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Layout-Preserving',
    desc: 'Tables, fonts, columns, and spacing are kept intact thanks to a slow-but-stable conversion engine.',
    color: 'bg-green-50 text-green-500',
  },
  {
    icon: Zap,
    title: 'Reliable, Not Rushed',
    desc: 'Single-process conversion with automatic retries — designed for accuracy over raw speed.',
    color: 'bg-amber-50 text-amber-500',
  },
  {
    icon: FileText,
    title: 'Editable Output',
    desc: 'A real .docx you can open in Word, Google Docs, or LibreOffice and edit straight away.',
    color: 'bg-brand-50 text-brand-500',
  },
  {
    icon: RefreshCw,
    title: 'No Sign-Up',
    desc: 'Just upload, convert, and download. No account or credit card required.',
    color: 'bg-purple-50 text-purple-500',
  },
  {
    icon: Lock,
    title: 'Auto-Delete in 10 min',
    desc: 'Your file is removed from our servers within 10 minutes of conversion. Always.',
    color: 'bg-rose-50 text-rose-500',
  },
  {
    icon: Star,
    title: 'Free Forever',
    desc: 'PDFNova is completely free. If it helps you, you can support it on the donate page.',
    color: 'bg-teal-50 text-teal-500',
  },
]

const STEPS = [
  { step: '01', title: 'Upload PDF', desc: 'Drag and drop or browse for your PDF (up to 25 MB).' },
  { step: '02', title: 'Convert',    desc: 'Reliable layout-preserving conversion runs server-side.' },
  { step: '03', title: 'Download',   desc: 'Download an editable .docx — auto-deleted in 10 minutes.' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-mesh relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-600 text-xs font-semibold mb-6 animate-fade-in">
            <Zap className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
            Free · Reliable · No Sign-Up
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-5 animate-fade-up">
            Convert PDF to Word
            <br />
            <span className="text-brand-500">without breaking your layout</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Tuned for accuracy: tables, fonts, and columns stay where they belong.
            Files are automatically deleted within 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/convert"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl shadow-card hover:shadow-float transition-all duration-200 active:scale-95"
            >
              Start Converting Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-surface-200 hover:border-brand-200 hover:text-brand-600 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-gray-400 animate-fade-up" style={{ animationDelay: '300ms' }}>
            {['No watermarks', 'Layout preserved', '100% Free', 'Auto-deleted in 10 min'].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 inline-block" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">
              Why choose PDFNova?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Built for accuracy, privacy, and simplicity. No tracking, no upsells.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 rounded-2xl bg-surface-50 border border-surface-200 card-hover">
                <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">How it works</h2>
            <p className="text-gray-500">Three simple steps to your editable document.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200" />
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 rounded-2xl bg-brand-500 flex items-center justify-center shadow-float mb-5">
                  <span className="font-display font-extrabold text-white text-2xl">{step}</span>
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-10 shadow-float">
            <h2 className="font-display text-3xl font-bold text-white mb-3">
              Ready to convert your PDF?
            </h2>
            <p className="text-brand-200 mb-7">
              No account needed. Just upload and go.
            </p>
            <Link
              to="/convert"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-600 font-bold rounded-xl shadow-card hover:shadow-float hover:-translate-y-0.5 transition-all duration-200"
            >
              Convert Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
