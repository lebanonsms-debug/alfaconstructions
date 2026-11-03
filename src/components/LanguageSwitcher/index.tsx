import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = location.pathname.startsWith('/en') ? 'en' : 'fr';
  const nextLang = currentLang === 'fr' ? 'en' : 'fr';

  const toggle = () => {
    const pathname = location.pathname;
    const newPathname = currentLang === 'fr'
      ? pathname.replace(/^\/fr/, '/en')
      : pathname.replace(/^\/en/, '/fr');
    i18n.changeLanguage(nextLang);
    navigate(newPathname || `/${nextLang}/`);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-sm transition-colors"
      aria-label="Switch language"
    >
      <span className="text-base leading-none">{currentLang === 'fr' ? '🇫🇷' : '🇺🇸'}</span>
      <span className="hidden sm:inline">{currentLang === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
}
