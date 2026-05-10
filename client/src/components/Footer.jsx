import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Linkedin, Lock, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-surface-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-lg text-gray-900">
                PDF<span className="text-brand-500">Nova</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Fast, free PDF to Word converter. No sign-up needed, files auto-deleted within 10 minutes.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Github,   href: 'https://github.com/'   },
                { Icon: Twitter,  href: 'https://twitter.com/'  },
                { Icon: Linkedin, href: 'https://linkedin.com/' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-surface-200 flex items-center justify-center text-gray-400 hover:text-brand-500 hover:border-brand-200 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Pages</h4>
            <ul className="space-y-2">
              {[
                ['/', 'Home'],
                ['/convert', 'PDF to Word'],
                ['/about', 'About'],
                ['/donate', 'Donate'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-brand-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              {[
                ['/privacy', 'Privacy Policy'],
                ['/terms', 'Terms & Conditions'],
                ['/contact', 'Contact Us'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-gray-500 hover:text-brand-500 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {year} PDFNova. All rights reserved.
          </p>

          <p className="text-xs text-gray-400 inline-flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Files auto-deleted within 10 minutes.
          </p>

          <p className="text-xs text-gray-400 inline-flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-accent-500 fill-accent-500" /> by{' '}
            <a
              href="https://ducadavid-portfolio.vercel.app/"
              target="_blank" rel="noopener noreferrer"
              className="text-brand-500 hover:text-brand-600 font-medium inline-flex items-center gap-0.5"
            >
              David Duca <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
