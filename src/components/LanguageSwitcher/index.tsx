import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-sm transition-colors"
      aria-label="Switch language"
    >
      <span className="text-base leading-none">{i18n.language === 'fr' ? '🇫🇷' : '🇺🇸'}</span>
      <span className="hidden sm:inline">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
}
