import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Zap, Menu, X, Heart } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/convert', label: 'Convert' },
  { to: '/about',   label: 'About' },
  { to: '/donate',  label: 'Donate' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b transition-shadow duration-300 ${
        scrolled ? 'shadow-card border-brand-100' : 'border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-display font-bold text-xl text-gray-900">
            PDF<span className="text-brand-500">Nova</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'
                }`
              }
            >
              {label === 'Donate' && <Heart className="w-3.5 h-3.5" />}
              {label}
            </NavLink>
          ))}
          <Link
            to="/convert"
            className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg shadow-card hover:shadow-float transition-all duration-200"
          >
            Convert Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-brand-50 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-surface-200 px-4 pb-4 pt-2 space-y-1 animate-fade-in">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-600'
                }`
              }
            >
              {label === 'Donate' && <Heart className="w-4 h-4" />}
              {label}
            </NavLink>
          ))}
          <Link
            to="/convert"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 px-4 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-lg text-center"
          >
            Convert Free
          </Link>
        </div>
      )}
    </header>
  )
}
