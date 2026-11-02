import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920&q=80',
    title: "L'excellence au cœur de nos carrières.",
    subtitle: 'EXPLOITATION DE CARRIÈRES',
    description: 'Leader dans l\'extraction et la production de granulats de haute qualité en République du Congo.',
    ctaText: 'Découvrir nos services',
    ctaLink: '/services',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
    title: 'La puissance de l\'industrie et des grands projets.',
    subtitle: 'INGÉNIERIE & CONSTRUCTION',
    description: 'Des équipements performants et une expertise technique pour vos projets les plus ambitieux.',
    ctaText: 'Nos réalisations',
    ctaLink: '/realisations',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=1920&q=80',
    title: 'Des équipements performants pour vos ambitions.',
    subtitle: 'TRANSPORT & LOGISTIQUE',
    description: 'Flotte moderne et logistique intégrée pour le transport de matériaux sur tout le territoire.',
    ctaText: 'En savoir plus',
    ctaLink: '/services',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
    title: 'Construire aujourd\'hui, bâtir l\'avenir.',
    subtitle: 'BÂTIMENT & TRAVAUX PUBLICS',
    description: 'Projets de construction civile et travaux publics conformes aux normes internationales.',
    ctaText: 'Nos projets',
    ctaLink: '/realisations',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=1920&q=80',
    title: 'Des solutions intégrées pour vos grands projets.',
    subtitle: 'BUREAU D\'ÉTUDE',
    description: 'Études techniques, faisabilité, planification et suivi d\'exécution par des experts.',
    ctaText: 'Contactez-nous',
    ctaLink: '/contact',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goTo = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          next();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, next]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) next();
    if (touchStart - touchEnd < -50) prev();
  };

  return (
    <div
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrousel d'images"
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === current
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-105 z-0'
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} sur ${slides.length}: ${slide.title}`}
          aria-hidden={index !== current}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`max-w-3xl transition-all duration-700 delay-300 ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
                  <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                    {slide.subtitle}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl">
                  {slide.description}
                </p>
                <a
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A192F] font-bold rounded-lg hover:bg-[#E8C94A] transition-colors text-lg"
                >
                  {slide.ctaText}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        aria-label="Slide précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        aria-label="Slide suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying((p) => !p)}
        className="absolute bottom-24 right-4 sm:right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        aria-label={isPlaying ? 'Pause' : 'Lecture'}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2" role="tablist" aria-label="Navigation du carrousel">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`relative h-1 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              index === current
                ? 'w-8 bg-[#D4AF37]'
                : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            role="tab"
            aria-selected={index === current}
            aria-label={`Aller au slide ${index + 1}`}
          >
            {index === current && (
              <div
                className="absolute inset-0 bg-[#D4AF37] rounded-full"
                style={{ animation: `progress ${6000}ms linear infinite` }}
              />
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
