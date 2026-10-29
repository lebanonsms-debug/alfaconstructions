import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navItems, languages } from '@/config/brand'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">
            alfa<span className="text-[#D4AF37]"> CONSTRUCTION</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5"
                >
                  {item.icon && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={getIconPath(item.icon)}
                      />
                    </svg>
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2c0 4.418-2.239 8-5 8M15 3v2c0 4.418-2.239 8-5 8M12 12v4m0 0h-4m4 0l-4-4m4 4v-4" />
              </svg>
              <ChevronDown
                className={`w-4 h-4 text-white/50 transition-transform duration-200 ${
                  isLanguageOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLanguageOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsLanguageOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-xl z-20 min-w-[140px]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setIsLanguageOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        lang.code === 'fr'
                          ? 'bg-[#0A192F] text-white'
                          : 'text-[#6B7280] hover:text-[#374151]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[#D4AF37] text-[#0A192F] font-semibold text-sm rounded-md hover:bg-[#E8C94A] transition-colors"
            >
              Demander un devis
            </Link>
            <button className="sm:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A192F] border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon && (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={getIconPath(item.icon)}
                    />
                  </svg>
                )}
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#D4AF37] text-[#0A192F] font-semibold rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demander un devis
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

function getIconPath(icon: string): string {
  const paths: Record<string, string> = {
    home: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10',
    info: 'M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
    services: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    grid: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6',
    mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
    building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    truck: 'M3 7h18M4 7l2-3h12l2 3M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M8 11h8',
    mine: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    gavel: 'M12 3v12m0 0l-4-4m4 4l4-4M4 21h16',
  };
  // @ts-ignore - paths[icon] returns string | undefined but we'll always have a fallback
  const path = paths[icon] || paths.home;
  return path as string;
}

// Mobile menu button hook
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    toggle: () => setIsOpen(!isOpen),
    close: () => setIsOpen(false),
  }
}
