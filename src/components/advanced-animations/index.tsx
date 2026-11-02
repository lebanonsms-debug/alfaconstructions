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
      image: "https://placehold.co/1600x800/0A192F/ffffff?text=Batiment",
      title: "Bâtiment",
      subtitle: "Construction de bâtiments résidentiels et commerciaux",
      color: "#18F37A",
    },
    {
      image: "https://placehold.co/1600x800/0A192F/ffffff?text=Travaux+Publiques",
      title: "Travaux Publics",
      subtitle: "Routes, voies ferrées et ouvrages d'assainissement",
      color: "#D4AF37",
    },
    {
      image: "https://placehold.co/1600x800/0A192F/ffffff?text=Carrieres",
      title: "Carrières",
      subtitle: "Extraction et commercialisation de granulats",
      color: "#8B5A2B",
    },
    {
      image: "https://placehold.co/1600x800/0A192F/ffffff?text=Transport+Logistique",
      title: "Transport & Logistique",
      subtitle: "Chantiers et livraisons partout en Congo",
      color: "#3B82F6",
    },
    {
      image: "https://placehold.co/1600x800/0A192F/ffffff?text=Genie+Civil",
      title: "Génie Civil",
      subtitle: "Ouvrages d'art, digues et infrastructures",
      color: "#D4AF37",
    },
  ];

  const goToSlide = (index: number) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-[500px] sm:min-w-[800px] md:min-w-[1200px] flex-shrink-0 px-4 sm:px-8 md:px-12"
          >
            <div className="relative rounded-2xl overflow-hidden h-[500px] sm:h-[600px] md:h-[800px] bg-[#14263F]">
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
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#0A192F]/40" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/40 hover:bg-white/60'}`}
            style={{ transform: `scale(${index === activeIndex ? 1.4 : 1})` }}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A192F]/50 hover:bg-[#0A192F]/80 text-white rounded-full p-2 transition-all duration-300 disabled:opacity-50"
        aria-label="Slide précédente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A192F]/50 hover:bg-[#0A192F]/80 text-white rounded-full p-2 transition-all duration-300 disabled:opacity-50"
        aria-label="Slide suivante"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 right-6 text-white/40 text-sm font-medium">
        <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
        </svg>
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
    <div className={className} style={{ height: '600px', position: 'relative' }}>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #0A192F 0%, #14263F 20%, #14263F 80%, #0A192F 100%)' }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-5">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          <rect x="0" y="480" width="800" height="120" fill="#14263F" rx="4" />
          <rect x="0" y="480" width="800" height="4" fill="#D4AF37" opacity="0.4" />
          <rect x="100" y="50" width="250" height="430" rx="4" fill="#14263F" />
          <rect x="100" y="70" width="210" height="16" rx="2" fill="#D4AF37" opacity="0.2" />
          {[...Array(10)].map((_, i) => (
            <rect key={i} x="110" y={90 + i * 42} width="190" height="16" rx="2" fill="#18F37A" opacity="0.08" />
          ))}
          <rect x="400" y="40" width="250" height="440" rx="4" fill="#14263F" />
          <rect x="420" y="60" width="210" height="16" rx="2" fill="#D4AF37" opacity="0.2" />
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="430" y={80 + i * 36} width="190" height="16" rx="2" fill="#18F37A" opacity="0.08" />
          ))}
          <rect x="700" y="80" width="200" height="400" rx="4" fill="#14263F" />
          <rect x="720" y="100" width="160" height="16" rx="2" fill="#D4AF37" opacity="0.2" />
          {[...Array(9)].map((_, i) => (
            <rect key={i} x="730" y={120 + i * 44} width="140" height="16" rx="2" fill="#18F37A" opacity="0.08" />
          ))}
          <rect x="300" y="480" width="200" height="80" fill="#0A192F" rx="4" />
          <rect x="290" y="470" width="220" height="12" fill="#D4AF37" opacity="0.3" />
          <rect x="310" y="440" width="180" height="40" fill="#14263F" rx="4" />
          <line x1="400" y1="430" x2="400" y2="350" stroke="#14263F" strokeWidth="6" strokeLinecap="round" />
          <line x1="400" y1="350" x2="650" y2="350" stroke="#142637" strokeWidth="6" strokeLinecap="round" />
          <line x1="400" y1="350" x2="650" y2="440" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <g>
            <ellipse cx="400" cy="348" rx="16" ry="12" fill="#0A192F" />
            <rect x="398" y="358" width="24" height="8" rx="2" fill="#14263F" />
            <circle cx="408" cy="364" r="4" fill="#D4AF37" opacity="0.6" />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 360"
              to="360 400 360"
              dur="4s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
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
                    <div className="text-[#D4AF37] text-3xl mb-4">"&quot;</div>
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
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/40 hover:bg-white/60'}`}
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
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const filters = ['Tous', 'Bâtiment', 'Travaux publics', 'Carrières', 'Transport'];

  const projects = [
    {
      id: 1,
      title: "Plateforme 600",
      category: "Bâtiment",
      location: "République du Congo",
      desc: "Aménagement complet avec terrassement, coulage de béton, finitions revigorantes.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Plateforme+600",
      budget: "12M FCFA+",
      tags: ["bâtiment", "terrassement", "béton"],
    },
    {
      id: 2,
      title: "Route d'accès",
      category: "Travaux publics",
      location: "Centre-Ville",
      desc: "Réhabilitation d'artère urbaine avec poses de chaussée et ouvrages d'assainissement.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Route+d'accès",
      budget: "8M FCFA+",
      tags: ["route", "chaussée", "assainissement"],
    },
    {
      id: 3,
      title: "Carrière de granulats",
      category: "Carrières",
      location: "Kimbangu",
      desc: "Exploitation de granulats avec extraction, tri et commercialisation des matériaux.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Carriere",
      budget: "5M FCFA+",
      tags: ["carrière", "granulats", "extraction"],
    },
    {
      id: 4,
      title: "Marché de Brazzaville",
      category: "Bâtiment",
      location: "Brazzaville",
      desc: "Construction et couverture d'un marché intérieur avec sanitation moderne.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Marché+Brazzaville",
      budget: "20M FCFA+",
      tags: ["marché", "commercial", "bâtiment"],
    },
    {
      id: 5,
      title: "Viaduc de Kintélé",
      category: "Travaux publics",
      location: "Kintélé",
      desc: "Construction d'un viaduc ferroviaire pour améliorer la connectivité régionale.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Viaduc+Kintélé",
      budget: "50M FCFA+",
      tags: ["viaduc", "ferroviaire", "infrastructure"],
    },
    {
      id: 6,
      title: "Complexe Industriel",
      category: "Transport",
      location: " Pointe-Noire",
      desc: "Complexe industriel avec hangars, ateliers et zones de stockage.",
      image: "https://placehold.co/600x400/0A192F/ffffff?text=Complexe+Industriel",
      budget: "80M FCFA+",
      tags: ["industrie", "complexe", "logistique"],
    },
  ];

  const filteredProjects = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="py-16 sm:py-24 bg-[#14263F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Galerie de Projets</h2>
          <p className="text-white/60 text-base">Nos réalisations récentes, de la conception à la livraison</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === f ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#14263F] text-white/60 hover:text-white hover:bg-[#1a2a3a]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p, i: number) => (
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
                  {p.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-[#D4AF37]/10 text-white/60">
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
    <section className="py-16 bg-[#0A192F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Notre Méthode</h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            Un processus structuré pour accompagner vos projets de la conception à la livraison
          </p>
        </div>

        <div className="relative overflow-x-auto">
          <div className="flex min-w-max">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 md:flex-none md:w-1/4 px-4 mb-8 md:mb-0 cursor-pointer transition-all duration-300 ${activeStep === index ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveStep(index)}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  {step.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-full h-0.5 bg-[#D4AF37]" />
      </div>
    </section>
  );
}
