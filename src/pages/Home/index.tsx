import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { ArrowRight, Landmark, MapPin, Mail, Building, Wrench, Route, Truck, Building2, Award, Users, Globe } from "lucide-react";
import { ScrollProgress, HeroScrollReveal } from "@/components/animation";
import { AnimatedConstructionSite, AnimatedExcavator, AnimatedDumpTruck, AnimatedBuildingProgress, AnimatedBuildingConstruction } from "@/components/construction-animations";
import { HorizontalScrollBanner, Scroll3DScene, TestimonialsCarousel, ProjectPortfolio, ConstructionTimeline } from "@/components/advanced-animations";

export default function Home() {
  const services = [
    { icon: Building2, title: "Bâtiment", desc: "Construction de bâtiments résidentiels, commerciaux et industriels" },
    { icon: Route, title: "Travaux publics", desc: "Routes, voies ferrées, digues et ouvrages d'assainissement" },
    { icon: Truck, title: "Transport", desc: "Logistique, chantiers et livraisons régulières partout en Congo" },
    { icon: Wrench, title: "Carrières", desc: "Extraction et commercialisation de granulats et matériaux" },
  ];

  const stats = [
    { value: "50+", label: "PROJETS REALISES" },
    { value: "30+", label: "SERVICES DISPONIBLES" },
    { value: "15+", label: "ANNÉES D'EXPÉRIENCE" },
    { value: "100%", label: "PRESTATION CLIENT" },
  ];

  return (
    <>
      <ScrollProgress />

      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#14263F] to-[#1A2A3F]">
            <AnimatedCrane className="absolute inset-0 w-full h-full opacity-[0.03]" />
          </div>
          <div className="absolute top-[10%] left-[8%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/5 blur-[140px]" />
          <div className="absolute bottom-[15%] right-[10%] w-[45%] h-[45%] rounded-full bg-[#D4AF37]/4 blur-[120px]" />
          <div className="absolute top-[50%] left-[50%] w-[35%] h-[35%] rounded-full bg-[#D4AF37]/3 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <HeroScrollReveal className="mb-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 text-xs font-medium tracking-wide text-white/80">
                  <Globe className="w-3.5 h-3.5 mr-2" />
                  Entreprise de bâtiment &amp; travaux publics
                </div>
              </HeroScrollReveal>
              
              <HeroScrollReveal>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white" style={{ fontFamily: fontFamily.heading }}>
                  Construisons l'avenir,
                  <br />
                  <span className="text-[#D4AF37]">un projet à la fois.</span>
                </h1>
              </HeroScrollReveal>
              
              <HeroScrollReveal>
                <p className="mt-5 text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  ALFA CONSTRUCTION est une entreprise de bâtiment, de travaux publics,
                  de transport et de logistique basée en République du Congo.
                  Nous construisons l'avenir, un projet à la fois.
                </p>
              </HeroScrollReveal>
              
              <HeroScrollReveal delay={200}>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Link to="/realisations">
                    <Button variant="primary" size="lg" className="gap-2 min-w-[200px]">
                      <Landmark className="w-4 h-4" /> Découvrir nos projets
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="min-w-[200px]">
                      <Mail className="w-4 h-4" /> Demander un devis
                    </Button>
                  </Link>
                </div>
              </HeroScrollReveal>
            </div>

            <HeroScrollReveal delay={200}>
              <div className="relative flex items-center justify-center h-full pt-8">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#14263F] rounded-3xl shadow-2xl border border-white/10 p-2">
                    <div className="relative bg-[#0A192F] rounded-2xl p-6 sm:p-8">
                      <AnimatedCrane className="w-full h-auto opacity-70" />
                      
                      <div className="relative mt-6 grid grid-cols-2 gap-3">
                        <div className="bg-[#0A192F]/80 backdrop-blur-md rounded-xl p-3 border border-white/10">
                          <div className="text-2xl font-bold text-[#D4AF37]">15+</div>
                          <div className="text-xs text-white/60 font-medium">ANNÉES D'EXPÉRIENCE</div>
                        </div>
                        <div className="bg-[#0A192F]/80 backdrop-blur-md rounded-xl p-3 border border-white/10">
                          <div className="text-2xl font-bold text-[#D4AF37]">50+</div>
                          <div className="text-xs text-white/60 font-medium">PROJETS REALISES</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-[#0A192F] rounded-full px-4 py-2 shadow-lg">
                    <div className="text-2xl font-bold">15+</div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-[#0A192F] text-[#D4AF37] rounded-full px-4 py-2 shadow-lg border border-[#D4AF37]/20">
                    <div className="text-2xl font-bold">50+</div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-6 justify-center">
                  <AnimatedExcavator className="w-24 h-24 opacity-60" />
                  <AnimatedDumpTruck className="w-24 h-24 opacity-60" />
                  <AnimatedBuildingProgress className="w-24 h-24 opacity-60" />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </section>

      <HorizontalScrollBanner className="mt-8" />

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                NOS SERVICES
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                SERVICES &amp; COMPÉTENCES
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                Des solutions complètes du concept à la livraison, adaptées à vos besoins
              </p>
            </HeroScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <HeroScrollReveal key={i}>
                <div className="group relative h-full bg-[#14263F] rounded-xl p-6 sm:p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{service.desc}</p>
                </div>
              </HeroScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <HeroScrollReveal key={i}>
                <div className="text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2 group hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </HeroScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                NOS REALISATIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                GALERIE DE PROJETS
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                Nos réalisations récentes, de la conception à la livraison
              </p>
            </HeroScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <HeroScrollReveal>
              <Scroll3DScene />
            </HeroScrollReveal>
            <HeroScrollReveal delay={150}>
              <ProjectPortfolio />
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <HeroScrollReveal>
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                  NOTRE MÉTHODE
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  NOTRE APPROCHE
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-4">
                  Construire, c'est d'abord comprendre. Nous écoutons vos besoins,
                  analysons votre site, puis concevons des solutions sur mesure.
                </p>
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  De la bureau d'étude à la main-d'œuvre, chaque étape est planifiée
                  pour garantir la qualité, la sécurité et la conformité aux normes
                  internationales.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/apropos">
                    <Button variant="primary" size="lg" className="gap-2">
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="lg">
                      <Wrench className="w-4 h-4" /> Nos Services
                    </Button>
                  </Link>
                </div>
              </div>
            </HeroScrollReveal>
            <HeroScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#0A192F] rounded-3xl" />
                <div className="relative bg-[#0A192F] rounded-3xl p-4 sm:p-6">
                  <AnimatedCrane className="w-full h-auto opacity-50" />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                EN TEMPS RÉEL
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                CHANTIER EN DIRECT
              </h2>
              <p className="text-white/60 text-base">
                Suivez l'avancement de nos projets en temps réel
              </p>
            </HeroScrollReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <HeroScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <AnimatedConstructionSite className="w-full h-auto" />
                </div>
                <div className="flex flex-col justify-center p-4 sm:p-6">
                  <AnimatedBuildingProgress className="w-full h-auto mb-4" />
                  <AnimatedBuildingConstruction className="w-full h-auto max-h-[300px] object-contain" />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />
      <ConstructionTimeline />

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal>
            <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-[#0A192F]/50 border border-white/10 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                  <Mail className="w-3.5 h-3.5 mr-2" />
                  CONTACTEZ-NOUS
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  PRÊT À COMMENCER VOTRE PROJET ?
                </h2>
                <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
                  Notre équipe sera ravie de vous accompagner.
                  Contactez-nous pour une consultation gratuite.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/contact">
                    <Button variant="primary" size="lg" className="gap-2 min-w-[220px]">
                      <Mail className="w-4 h-4" /> Contactez-nous
                    </Button>
                  </Link>
                  <Link to="/apropos">
                    <Button variant="outline" size="lg" className="min-w-[220px]">
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </HeroScrollReveal>
        </div>
      </section>
    </>
  );
}
