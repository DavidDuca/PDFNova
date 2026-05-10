import { useState } from 'react'
import { Heart, Copy, Check, Smartphone, ShieldCheck, Coffee } from 'lucide-react'
import toast from 'react-hot-toast'

// 👇 Replace these with your real GCash details
const GCASH_NAME   = 'DA**D D.'         // Masked name as shown in GCash
const GCASH_NUMBER = '0917 123 4567'    // Your GCash mobile number
const GCASH_NOTE   = 'Support PDFNova'

export default function Donate() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_NUMBER.replace(/\s/g, ''))
      setCopied(true)
      toast.success('GCash number copied')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy. Please copy manually.')
    }
  }

  return (
    <div className="py-16 px-4 bg-surface-50 min-h-[70vh]">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 mb-4">
            <Heart className="w-7 h-7 text-accent-500 fill-accent-500" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
            Support PDFNova
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            PDFNova is free and ad-free. If it saved you time, a small tip helps
            keep the servers running. Salamat.
          </p>
        </div>

        {/* GCash Card */}
        <div className="bg-white rounded-3xl p-8 shadow-card border border-surface-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0070E0] flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Send via</p>
              <h2 className="font-display font-semibold text-gray-900">GCash</h2>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Account Name</p>
              <p className="font-medium text-gray-900">{GCASH_NAME}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Mobile Number</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-3 rounded-xl bg-surface-50 border border-surface-200 font-mono text-lg tracking-wider text-gray-900">
                  {GCASH_NUMBER}
                </code>
                <button
                  onClick={copy}
                  className="px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors inline-flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Suggested Note</p>
              <p className="text-sm text-gray-700">{GCASH_NOTE}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-surface-200 text-xs text-gray-500 leading-relaxed">
            <p className="mb-2 font-medium text-gray-700">How to send:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open the GCash app</li>
              <li>Tap <strong>Send Money</strong> &rarr; <strong>Express Send</strong></li>
              <li>Paste the mobile number above</li>
              <li>Enter any amount and add the suggested note</li>
            </ol>
          </div>
        </div>

        {/* Sub cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-5 border border-surface-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">100% voluntary</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Donations are non-refundable and never required to use PDFNova.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-surface-200 flex items-start gap-3">
            <Coffee className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Goes to hosting</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Tips help cover server costs so the tool stays free for everyone.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Prefer not to donate? Sharing PDFNova with a friend helps just as much.
        </p>
      </div>
    </div>
  )
}
