import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Github } from 'lucide-react'

const navLinks = [
  { to: '/docs', label: 'Docs' },
  { to: '/docs/api', label: 'API' },
  { to: '/docs/examples', label: 'Examples' },
  { to: '/docs/playground', label: 'Playground' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/docs/api') {
      return location.pathname.startsWith('/docs/api')
    }
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-border p-[2px] shadow-lg shadow-primary-500/20">
                <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black gradient-text">S</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">StrKit</span>
            </Link>
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-300 rounded-full border border-primary-500/20">
              v1.0
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-700 mx-3" />
            <a
              href="https://github.com/ersinkoc/strkit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.npmjs.com/package/@oxog/strkit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl transition ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
