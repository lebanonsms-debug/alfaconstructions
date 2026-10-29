const fs = import('fs');
const content = `import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { ArrowRight, Landmark, MapPin, Mail, Building, Wrench, Route, Truck, Building2, Award, Users, Video, Hammer } from "lucide-react";
import { ScrollProgress, HeroScrollReveal, AnimatedCrane, AnimatedStats, AnimatedCTA } from "@/components/animation";
import { AnimatedConstructionSite, AnimatedExcavator, AnimatedDumpTruck, AnimatedBuildingProgress } from "@/components/construction-animations";
import { HorizontalScrollBanner, Scroll3DScene, TestimonialsCarousel, ProjectPortfolio, ConstructionTimeline } from "@/components/advanced-animations";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#14263F] to-[#14263F]">
            <AnimatedCrane className="absolute inset-0 w-full h-full opacity-2" />
          </div>
          <div className="absolute inset-0 bg-[#0A192F]/80" />
          <div className="absolute top-[8%] left-[5%] w-[45%] h-[45%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
          <div className="absolute bottom-[15%] right-[8%] w-[40%] h-[35%] rounded-full bg-[#D4AF37]/3 blur-[100px]" />
          <div className="absolute top-[50%] left-[50%] w-[30%] h-[30%] rounded-full bg-[#D4AF37]/2 blur-[80px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <HeroScrollReveal className="mb-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6 text-xs font-medium tracking-wide text-white/80">
                  <Building className="w-3.5 h-3.5 mr-2" />
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
                <p className="mt-5 text-base sm:text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                  ALFA CONSTRUCTION est une entreprise de bâtiment, de travaux publics,
                  de transport et de logistique basée en République du Congo.
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
              <div className="relative flex items-center justify-center h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-[#14263F] rounded-2xl shadow-2xl border border-white/10">
                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <AnimatedCrane className="w-full max-w-lg h-auto opacity-60" />
                  </div>
                </div>
                <div className="absolute top-8 left-8 bg-[#0A192F]/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-2xl font-bold text-[#D4AF37]">15+</div>
                  <div className="text-xs text-white/60 font-medium">ANNÉES D'EXPÉRIENCE</div>
                </div>
                <div className="absolute bottom-8 right-8 bg-[#0A192F]/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-2xl font-bold text-[#D4AF37]">50+</div>
                  <div className="text-xs text-white/60 font-medium">PROJETS REALISES</div>
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
      <HorizontalScrollBanner />
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Services &amp; Compétences</h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">Des solutions complètes du concept à la livraison, adaptées à vos besoins</p>
            </HeroScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Building2, title: "Bâtiment", desc: "Construction de bâtiments résidentiels, commerciaux et industriels" },
              { icon: Route, title: "Travaux publics", desc: "Routes, voies ferrées, digues et ouvrages d'assainissement" },
              { icon: Truck, title: "Transport", desc: "Logistique, chantiers et livraisons régulières partout en Congo" },
              { icon: Wrench, title: "Carrières", desc: "Extraction et commercialisation de granulats et matériaux" },
            ].map((service, i) => (
              <HeroScrollReveal key={i} delay={i * 100}>
                <div className="group relative h-full bg-[#14263F] rounded-xl p-6 sm:p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "PROJETS REALISES", icon: Landmark },
              { value: "30+", label: "SERVICES DISPONIBLES", icon: Route },
              { value: "15+", label: "ANNÉES D'EXPÉRIENCE", icon: Award },
              { value: "100%", label: "PRESTATION CLIENT", icon: Users },
            ].map((stat, i) => (
              <HeroScrollReveal key={i} delay={i * 100}>
                <div className="text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                  <div className="text-sm text-white/60 font-medium uppercase tracking-wide">
                    <stat.icon className="w-4 h-4 inline mr-1.5 align-middle" />
                    {stat.label}
                  </div>
                </div>
              </HeroScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <Scroll3DScene />
      <ProjectPortfolio />
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <HeroScrollReveal>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Notre Approche</h2>
                <p className="text-white/70 text-base leading-relaxed mb-4">Construire, c'est d'abord comprendre. Nous écoutons vos besoins, analysons votre site, puis concevons des solutions sur mesure.</p>
                <p className="text-white/70 text-base leading-relaxed mb-6">De la bureau d'étude à la main-d'œuvre, chaque étape est planifiée pour garantir la qualité, la sécurité et la conformité aux normes internationales.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/apropos">
                    <Button variant="primary" size="lg" className="gap-2">En savoir plus<ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="lg"><Wrench className="w-4 h-4" />Nos Services</Button>
                  </Link>
                </div>
              </div>
            </HeroScrollReveal>
            <HeroScrollReveal delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 rounded-2xl" />
                <AnimatedCrane className="w-full h-[400px] opacity-30 relative" />
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Chantier en Direct</h2>
              <p className="text-white/60 text-base">Suivez l'avancement de nos projets en temps réel</p>
            </HeroScrollReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <AnimatedConstructionSite className="w-full max-h-[400px] object-contain" />
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#14263F] rounded-lg p-3 text-center border border-white/5">
                <AnimatedExcavator className="w-full h-20 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Excavateur</p>
              </div>
              <div className="bg-[#14263F] rounded-lg p-3 text-center border border-white/5">
                <AnimatedDumpTruck className="w-full h-20 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Camion benne</p>
              </div>
              <div className="bg-[#14263F] rounded-lg p-3 text-center border border-white/5">
                <AnimatedExcavator className="w-full h-20 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Mélangeur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <AnimatedBuildingProgress />
        </div>
      </section>
      <TestimonialsCarousel />
      <ConstructionTimeline />
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HeroScrollReveal>
            <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-[#14263F]/50 border border-white/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Prêt à commencer votre projet ?</h2>
              <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">Notre équipe sera ravie de vous accompagner. Contactez-nous pour une consultation gratuite.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/contact">
                  <Button variant="primary" size="lg" className="gap-2 min-w-[220px]"><Mail className="w-4 h-4" />Contactez-nous</Button>
                </Link>
                <Link to="/apropos">
                  <Button variant="outline" size="lg" className="min-w-[220px]">En savoir plus</Button>
                </Link>
              </div>
            </div>
          </HeroScrollReveal>
        </div>
      </section>
    </>
  );
}
`;
fs.writeFileSync('/c/Users/elielb/alfaconstructions/src/pages/Home/index.tsx', content);
console.log('File written successfully');
