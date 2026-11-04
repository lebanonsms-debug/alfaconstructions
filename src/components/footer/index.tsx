import { Link } from 'react-router-dom'
import { footerNavItems } from '@/config/brand'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export function Footer() {
  const { settings } = useSiteSettings()

  const socialLinks = [
    {
      name: 'Facebook',
      url: settings.facebook_url || '#',
      icon: 'facebook',
      ariaLabel: 'Facebook',
    },
    {
      name: 'Instagram',
      url: settings.instagram_url || '#',
      icon: 'instagram',
      ariaLabel: 'Instagram',
    },
    {
      name: 'TikTok',
      url: settings.tiktok_url || '#',
      icon: 'tiktok',
      ariaLabel: 'TikTok',
    },
    {
      name: 'LinkedIn',
      url: settings.linkedin_url || '#',
      icon: 'linkedin',
      ariaLabel: 'LinkedIn',
    },
  ].filter((link) => link.url && link.url !== '#')

  const whatsappNumber = settings.whatsapp_number || ''
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`
    : null

  const currentYear = new Date().getFullYear()

  const socialIcon = (name: string) => {
    const base = 'w-5 h-5'
    if (name === 'facebook') return <svg className={base} fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
    if (name === 'instagram') return <svg className={base} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.214 4.919 4.608.026.652.31 1.21.777 1.601l.22.18c.454.375.75.956.75 1.546v.564a.5.5 0 00.5.5h3.5a.5.5 0 00.5-.5v-.564c0-.59.296-1.17.75-1.546l.22-.18c.467-.391.751-.949.777-1.601.148-3.394.963-4.46 4.919-4.608C19.416 2.175 18.75 2.163 12 2.163zM12 4.338c-2.301 0-4.76 1.482-6.148 3.982l-1.5.41v.25h-3v-.25l-1.5-.41C2.76 5.82 6.119 4.338 12 4.338zM12.8 14.5a1.2 1.2 0 112.4 0 1.2 1.2 0 01-2.4 0z" /></svg>
    if (name === 'tiktok') return <svg className={base} fill="currentColor" viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 1 4 4V2h3.5a5.5 5.5 0 0 1 5.5 5.5v3.5a9 9 0 0 1-5.5-2v4a4 4 0 1 1-7.5 1.5v-6z" /></svg>
    if (name === 'linkedin') return <svg className={base} fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
    return null
  }

  return (
    <footer className="bg-[#0A192F] border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand + Social */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-white font-bold text-lg tracking-tight">
                ALFA<span className="text-[#D4AF37]"> CONSTRUCTION</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Génie civil et travaux publics en République du Congo.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#D4AF37] transition-colors"
                  aria-label={link.ariaLabel}
                >
                  {socialIcon(link.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D4AF37]" />
                <span>Avenue Docteur Cardorelle, Songolo, Centre-Ville</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a href="tel:+242068222220" className="hover:text-white transition-colors">+242 06 822 22 20</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a href="mailto:ali-safa@alfa-constructions.com" className="hover:text-white transition-colors">ali-safa@alfa-constructions.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            &copy; {currentYear} ALFA CONSTRUCTION. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link to="/cgv" className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      {whatsappLink && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      )}
    </footer>
  )
}
