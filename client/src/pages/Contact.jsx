import { useState } from 'react'
import { Mail, Twitter, Github, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/Button'

const FAQS = [
  {
    q: 'Is PDFNova really free?',
    a: 'Yes. PDFNova is completely free with no hidden fees, watermarks, or usage limits. If you want to support it, see the Donate page.',
  },
  {
    q: 'Are my files stored on your servers?',
    a: 'No. Uploads are processed and deleted right after conversion. The output file is kept for a maximum of 10 minutes so you can re-download it, then it is removed automatically.',
  },
  {
    q: 'What is the maximum file size?',
    a: 'We accept PDF files up to 25 MB. For larger files, consider splitting them first.',
  },
  {
    q: 'Will the formatting be preserved?',
    a: 'Yes — that is the main goal. PDFNova uses a slow but layout-preserving engine that keeps tables, columns, and fonts intact for the vast majority of PDFs.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. There is no sign-up required. Just upload and convert.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-surface-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-4 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium text-gray-800 text-sm">{q}</span>
        {open
          ? <ChevronUp   className="w-4 h-4 text-gray-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        }
      </button>
      {open && <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.')
      return
    }
    toast.success('Message sent. We will get back to you soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="py-16 px-4 bg-surface-50">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500">Have a question or feedback? We would love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact form */}
          <div className="bg-white rounded-3xl p-7 shadow-card border border-surface-200">
            <h2 className="font-display font-semibold text-gray-900 mb-5">Send a Message</h2>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  name="name" value={form.name} onChange={handle}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email" type="email" value={form.email} onChange={handle}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message" value={form.message} onChange={handle}
                  rows={4} placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-100 outline-none text-sm transition-all resize-none"
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>

            <div className="mt-6 pt-5 border-t border-surface-200">
              <p className="text-xs text-gray-400 mb-3">Or find us on</p>
              <div className="flex gap-3">
                {[
                  { icon: Mail,    label: 'Email',   href: 'mailto:hello@pdfnova.app' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/' },
                  { icon: Github,  label: 'GitHub',  href: 'https://github.com/' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-surface-200 text-xs font-medium text-gray-600 hover:border-brand-200 hover:text-brand-500 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-3xl p-7 shadow-card border border-surface-200">
            <h2 className="font-display font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <div className="divide-y divide-surface-200">
              {FAQS.map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
