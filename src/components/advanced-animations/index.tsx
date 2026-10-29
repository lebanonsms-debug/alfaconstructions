import React, { useState, useEffect, useRef } from 'react';
import { Landmark, MapPin } from 'lucide-react';

// ============================================
// Horizontal Scroll Banner (Like DPR Construction, Weitz)
// ============================================
export function HorizontalScrollBanner({ className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486325212913-6a6cac7ad1ab?w=1600&h=800&fit=crop",
      title: "Bâtiment",
      subtitle: "Construction de bâtiments résidentiels et commerciaux",
      color: "#18F37A",
    },
    {
      image: "https://images.unsplash.com/photo-1502006559048-570f3bed9c61?w=1600&h=800&fit=crop",
      title: "Travaux Publics",
      subtitle: "Routes, voies ferrées et ouvrages d'assainissement",
      color: "#D4AF37",
    },
    {
      image: "https://images.unsplash.com/photo-1572635196290-6271e87776e1?w=1600&h=800&fit=crop",
      title: "Carrières",
      subtitle: "Extraction et commercialisation de granulats",
      color: "#8B5A2B",
    },
    {
      image: "https://images.unsplash.com/photo-1447753800752-518f2b417bad?w=1600&h=800&fit=crop",
      title: "Transport & Logistique",
      subtitle: "Chantiers et livraisons partout en Congo",
      color: "#3B82F6",
    },
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0A192F] ${className}`}
    >
      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-[500px] sm:min-w-[800px] md:min-w-[1200px] flex-shrink-0 px-4 sm:px-8 md:px-12"
          >
            <div className="relative rounded-2xl overflow-hidden h-[500px] sm:h-[600px] md:h-[800px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{ transform: `scale(${1 + (index - activeIndex) * 0.15})` }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/40 to-transparent"
                style={{ transition: 'background 0.5s ease' }}
              />
              {/* Title */}
              <div className="absolute bottom-8 left-8 right-8 max-w-xl">
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"
                  style={{ transition: 'color 0.5s ease' }}
                >
                  {slide.title}
                </h3>
                <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-md leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#0A192F]/40" />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'bg-[#D4AF37] w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            style={{ transform: `scale(${index === activeIndex ? 1.4 : 1})` }}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A192F]/50 hover:bg-[#0A192F]/80 text-white rounded-full p-2 transition-all duration-300 disabled:opacity-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A192F]/50 hover:bg-[#0A192F]/80 text-white rounded-full p-2 transition-all duration-300 disabled:opacity-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scrolling indicator */}
      <div className="absolute bottom-6 right-6 text-white/40 text-sm font-medium">
        <ArrowRight className="w-4 h-4 inline-block" />
        <span className="ml-1">défilement</span>
      </div>
    </div>
  );
}

// ============================================
// 3D Scroll Animation (Like Hyperframe)
// ============================================
export function Scroll3DScene({ className = '' }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-[#14263F] ${className}`}
      style={{ height: '600px', position: 'relative' }}
    >
      {/* 3D animated building construction */}
      <div className="absolute inset-0">
        {/* Background layers for parallax */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                #0A192F 0%,
                #14263F 20%,
                #14263F 80%,
                #0A192F 100%
              )
            `,
          }}
        />

        {/* Animated crane scene */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            {/* Ground */}
            <rect x="0" y="720" width="1200" height="80" fill="#14263F" rx="4" />
            <rect x="0" y="720" width="1200" height="4" fill="#D4AF37" opacity="0.4" />

            {/* Building 1 */}
            <rect x="100" y="100" width="200" height="620" rx="4" fill="#14263F" />
            <rect x="120" y="130" width="160" height="20" rx="2" fill="#D4AF37" opacity="0.2" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="110" y={160 + i * 70} width="140" height="20" rx="2" fill="#18F37A" opacity="0.1" />
            ))}

            {/* Building 2 */}
            <rect x="400" y="80" width="250" height="660" rx="4" fill="#14263F" />
            <rect x="420" y="110" width="210" height="20" rx="2" fill="#D4AF37" opacity="0.2" />
            {[...Array(10)].map((_, i) => (
              <rect key={i} x="430" y={140 + i * 64} width="170" height="20" rx="2" fill="#18F37A" opacity="0.1" />
            ))}

            {/* Building 3 */}
            <rect x="750" y="120" width="200" height="580" rx="4" fill="#14263F" />
            <rect x="770" y="150" width="160" height="20" rx="2" fill="#D4AF37" opacity="0.2" />
            {[...Array(8)].map((_, i) => (
              <rect key={i} x="780" y={180 + i * 70} width="140" height="20" rx="2" fill="#18F37A" opacity="0.1" />
            ))}

            {/* Crane */}
            <g>
              <rect x="480" y="720" width="60" height="60" fill="#0A192F" rx="2" />
              <rect x="470" y="710" width="80" height="12" fill="#D4AF37" opacity="0.3" />
              <rect x="488" y="680" width="40" height="40" fill="#14263F" rx="2" />
              <line x1="500" y1="700" x2="800" y2="700" stroke="#14263F" strokeWidth="12" strokeLinecap="round" />
              <line x1="500" y1="700" x2="795" y2="700" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

              <g>
                <ellipse cx="500" cy="678" rx="18" ry="14" fill="#0A192F" />
                <rect x="498" y="688" width="28" height="10" rx="2" fill="#14263F" />
                <circle cx="508" cy="694" r="4" fill="#D4AF37" opacity="0.6" />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 505 690"
                  to="360 505 690"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </g>

              <g>
                <line x1="500" y1="620" x2="510" y2="550" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <line x1="510" y1="550" x2="525" y2="480" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                <path d="M500 480 L525 480 L530 470 L505 470 Z" fill="#D4AF37" opacity="0.9" />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 0; 3 2; 0 0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </g>
            </g>

            {/* Excavator (animated) */}
            <g>
              <rect x="950" y="690" width="50" height="30" rx="5" fill="#0A192F" />
              <rect x="930" y="680" width="35" height="12" rx="2" fill="#D4AF37" opacity="0.15" />
              <rect x="920" y="675" width="30" height="15" rx="3" fill="#0A192F" />
              <rect x="915" y="675" width="20" height="15" fill="#888" opacity="0.3" />
              <line x1="965" y1="660" x2="970" y2="580" stroke="#14263F" strokeWidth="10" strokeLinecap="round" />
              <line x1="970" y1="580" x2="970" y2="540" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
              <line x1="970" y1="540" x2="970" y2="480" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              <path d="M930 470 L955 500 L965 510 L955 485 Z" fill="#D4AF37" opacity="0.9" />
              <path d="M935 480 L955 505 L962 508 L962 490 Z" fill="#888" opacity="0.6" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 965 660"
                to="15 965 660"
                dur="3s"
                repeatCount="indefinite"
              />
              <rect x="960" y="520" width="4" height="10" rx="1" fill="#D4AF37" />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 5 0; 0 0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </g>

            {/* Building growing animation */}
            <rect
              x="600" y="640"
              width="80"
              height="20"
              rx="4"
              fill="#0A192F"
              opacity="0.7"
            />
            <rect
              x="600" y="620"
              width="80"
              height="20"
              rx="4"
              fill="#D4AF37"
              opacity="0.4"
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1; 1 1.6; 1 1"
              dur="4s"
              repeatCount="indefinite"
            />

            {/* Particles/equipment moving */}
            <circle cx="100" cy="500" r="4" fill="#D4AF37" opacity="0.6">
              <animate attributeName="cx" values="100; 300; 500; 700; 100" dur="10s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6; 1; 0.6" dur="10s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="550" r="3" fill="#D4AF37" opacity="0.4">
              <animate attributeName="cx" values="200; 400; 600; 800; 200" dur="8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="600" r="5" fill="#D4AF37" opacity="0.6">
              <animate attributeName="cx" values="300; 500; 700; 900; 300" dur="12s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6; 1; 0.6" dur="12s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        {/* Scroll indicator in the animation */}
        <div className="absolute bottom-8 left-8 text-white/40 text-sm">
          <Scroll className="w-6 h-6 inline-block" />
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#0A192F]/60 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-white/60 rotate-90" />
        </div>
        <span className="text-xs text-white/40">défilez</span>
      </div>
    </div>
  );
}

// ============================================
// Animated Testimonials Carousel
// ============================================
export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "ALFA CONSTRUCTION a réalisé notre projet de salle de marché avec professionnalisme. Le travail est de haute qualité et notre délais respecté.",
      name: "Marie K.",
      role: "Directrice, Marché de Brazzaville",
      initials: "MK",
    },
    {
      quote: "Excellent entreprise, très réactive et professionnelle. Nos travaux de voirie ont été effectués avec soin et rigueur.",
      name: "Jean P.",
      role: "Préfet, Commune IV",
      initials: "JP",
    },
    {
      quote: "Une équipe compétente et engagée. Le projet de restaurations de notre hôpital a été complété à temps et sous budget.",
      name: "Dr. K. M.",
      role: "Directeur Médical, Hôpital de Kindia",
      initials: "KM",
    },
  ];

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Témoignages</h2>
          <p className="text-white/60 text-base">Ce que nos clients disent de nous</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4 text-center">
                  <div className="bg-[#14263F] rounded-2xl p-8 sm:p-12 border border-white/5">
                    <div className="text-[#D4AF37] text-3xl mb-4">"</div>
                    <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-6">{t.quote}</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{t.name}</div>
                        <div className="text-sm text-white/50">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Project Filterable Portfolio (Like Fluor, MRJ Constructors)
// ============================================
export function ProjectPortfolio() {
  const [filter, setFilter] = useState('Tous');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const filters = ['Tous', 'Bâtiment', 'Travaux publics', 'Carrières', 'Transport'];

  const projects = [
    {
      id: 1,
      title: "Plateforme 600",
      category: "Bâtiment",
      location: "République du Congo",
      desc: "Aménagement complet avec terrassement, coulage de béton, finitions revigorantes.",
      image: "https://images.unsplash.com/photo-1519671448028-5b2314c3e8de?w=800&h=500&fit=crop",
      budget: "12M FCFA+",
      tags: ["bâtiment", "terrassement", "béton"],
    },
    {
      id: 2,
      title: "Route d'accès",
      category: "Travaux publics",
      location: "Centre-Ville",
      desc: "Réhabilitation d'artère urbaine avec poses de chaussée et ouvrages d'assainissement.",
      image: "https://images.unsplash.com/photo-1502006559048-570f3bed9c61?w=800&h=500&fit=crop",
      budget: "8M FCFA+",
      tags: ["route", "chaussée", "assainissement"],
    },
    {
      id: 3,
      title: "Carrière de granulats",
      category: "Carrières",
      location: "Kimbangu",
      desc: "Exploitation de granulats avec extraction, tri et commercialisation des matériaux.",
      image: "https://images.unsplash.com/photo-1572635196290-6271e87776e1?w=800&h=500&fit=crop",
      budget: "5M FCFA+",
      tags: ["carrière", "granulats", "extraction"],
    },
    {
      id: 4,
      title: "Marché de Brazzaville",
      category: "Bâtiment",
      location: "Brazzaville",
      desc: "Construction et couverture d'un marché intérieur avec sanitation moderne.",
      image: "https://images.unsplash.com/photo-1571896349842-3b2d280cd0e8?w=800&h=500&fit=crop",
      budget: "20M FCFA+",
      tags: ["marché", "commercial", "bâtiment"],
    },
    {
      id: 5,
      title: "Viaduc de Kintélé",
      category: "Travaux publics",
      location: "Kintélé",
      desc: "Construction d'un viaduc ferroviaire pour améliorer la connectivité régionale.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
      budget: "50M FCFA+",
      tags: ["viaduc", "ferroviaire", "infrastructure"],
    },
    {
      id: 6,
      title: "Complexe Industriel",
      category: "Transport",
      location: " Pointe-Noire",
      desc: "Complexe industriel avec hangars, ateliers et zones de stockage.",
      image: "https://images.unsplash.com/photo-1501785888041-7a2f73625176?w=800&h=500&fit=crop",
      budget: "80M FCFA+",
      tags: ["industrie", "complexe", "logistique"],
    },
  ];

  const filteredProjects = filter === 'Tous'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-16 sm:py-24 bg-[#14263F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Galerie de Projets</h2>
          <p className="text-white/60 text-base">Nos réalisations récentes, de la conception à la livraison</p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-[#D4AF37] text-[#0A192F]'
                  : 'bg-[#14263F] text-white/60 hover:text-white hover:bg-[#1a2a3a]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p, i) => (
            <div
              key={p.id}
              className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
              onMouseEnter={() => setIsHovering(i)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative overflow-hidden h-48 sm:h-56 bg-[#2A3F5F]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-[#D4AF37] text-[#0A192F] rounded-full px-4 py-2 flex items-center gap-2">
                    <Landmark className="w-4 h-4" />
                    Voir le projet
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D4AF37]/90 text-[#0A192F] text-xs font-medium">
                  {p.budget}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex gap-2 mb-2">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-[#D4AF37]/10 text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{p.title}</h3>
                <p className="text-xs text-white/50 flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3" />
                  {p.location}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Animated Construction Timeline
// ============================================
export function ConstructionTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Consultation",
      desc: "Échange avec notre équipe pour comprendre vos besoins et objectifs",
      icon: "📋",
      color: "#D4AF37",
    },
    {
      title: "2. Étude & Conception",
      desc: "Réalisation de plans, études techniques et devis sur mesure",
      icon: "📐",
      color: "#18F37A",
    },
    {
      title: "3. Travaux",
      desc: "Exécution des travaux avec équipes qualifiées et matériaux de qualité",
      icon: "🏗️",
      color: "#3B82F6",
    },
    {
      title: "4. Livraison",
      desc: "Contrôle final, réception et suivi après travaux",
      icon: "✅",
      color: "#8B5A2B",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Notre Méthode</h2>
          <p className="text-white/60 text-base">Un processus structuré pour la réussite de chaque projet</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#D4AF37]/30" />

          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                    i === activeStep ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#14263F] text-white/60'
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  {i === activeStep ? <Check className="w-5 h-5" /> : <span className="text-lg">{step.icon}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-white mb-1 ${i === activeStep ? 'text-[#D4AF37]' : 'text-white/80'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${i === activeStep ? 'text-white/70' : 'text-white/50'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Small helper icons
// ============================================
function ArrowRight({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
    </svg>
  );
}

function Scroll({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function Check({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
