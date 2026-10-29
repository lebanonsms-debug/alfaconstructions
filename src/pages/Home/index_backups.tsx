import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { ArrowRight, Landmark, MapPin, Phone, Mail, Building, Video } from "lucide-react";
import { ScrollProgress, HeroScrollReveal, AnimatedCrane, CameraFocusAnimation, StaggerFade, AnimatedStats, AnimatedCTA } from "@/components/animation";
import { AnimatedConstructionSite, AnimatedExcavator, AnimatedDumpTruck, AnimatedBuildingProgress } from "@/components/construction-animations";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A192F] pt-16">
        {/* Parallax background layers */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background image layer (simulated construction site) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#14263F] to-[#14263F]">
            {/* Animated crane SVG overlay */}
            <AnimatedCrane className="absolute inset-0 w-full h-full opacity-5" />
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-[#0A192F]/80" />

          {/* Subtle geometric curves like the business card */}
          <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[30%] rounded-full bg-[#D4AF37]/3 blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <HeroScrollReveal className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6 text-xs font-medium tracking-wide text-white/80">
              Entreprise de bâtiment & travaux publics
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white" style={{ fontFamily: fontFamily.heading }}>
              Construisons l'avenir,
              <br />
              <span className="text-[#D4AF37]">un projet à la fois.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              ALFA CONSTRUCTION est une entreprise de bâtiment, de travaux publics,
              de transport et de logistique basée en République du Congo.
              Nos équipes expertes réalisent des projets de précision, du concept à la
              livraison, pour des résultats à la hauteur de vos attentes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/realisations">
                <Button variant="primary" size="lg" className="gap-2">
                  <Landmark className="w-4 h-4" /> Découvrir nos projets
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2">
                  <Mail className="w-4 h-4" /> Demander un devis
                </Button>
              </Link>
            </div>
          </HeroScrollReveal>
        </div>

        {/* Mobile scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section with animation */}
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Notre expérience & capacité
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              La confiance de nos clients est notre plus grande richesse
            </p>

            <div className="mt-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatedStats stats={[
                  { value: 50, label: "PROJETS REALISES" },
                  { value: 30, label: "SERVICES DISPONIBLES" },
                  { value: 15, label: "ANNÉES D'EXPÉRIENCE" },
                  { value: 100, label: "CLIENT INVESTIS" },
                ]} />
              </div>
            </div>
          </HeroScrollReveal>
        </div>
      </section>

      {/* Featured Projects - Staggered entrance */}
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Nos Réalisations</h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Découvrez nos projets récents, de la conception à la livraison
            </p>
          </HeroScrollReveal>

          <StaggerFade className="grid grid-cols-1 md:grid-cols-3 gap-6" startOffset={200}>
            {[
              {
                title: "Plateforme 600",
                location: "République du Congo",
                desc: "Aménagement complet de la plateforme 600 avec terrassement, coulage de béton et finition.",
                image: "https://images.unsplash.com/photo-1519671448028-5b2314c3e8de?w=600&h=400&fit=crop",
                slug: "plateforme-600",
              },
              {
                title: "Route d'accès",
                location: "Centre-Ville",
                desc: "Réhabilitation d'une artère urbaine majeure avec poses de chaussée etouvrages d'assainissement.",
                image: "https://images.unsplash.com/photo-1502006559048-570f3bed9c61?w=600&h=400&fit=crop",
                slug: "route-accès",
              },
              {
                title: "Carrière de granulats",
                location: "Kimbangu",
                desc: "Exploitation de granulats avec extraction, tri et commercialisation des matériaux.",
                image: "https://images.unsplash.com/photo-1572635196290-6271e87776e1?w=600&h=400&fit=crop",
                slug: "carriere-granulats",
              },
            ].map((p, i) => (
              <div key={p.slug} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-48 sm:h-56 bg-[#2A3F5F] flex items-center justify-center">
                  <Landmark className="w-10 h-10 text-white/20 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/realisations/${p.slug}`}>
                      <Button variant="primary" size="sm" className="bg-[#D4AF37] text-[#0A192F]">
                        Voir le projet
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-white/50 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3" />
                    {p.location}
                  </p>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </StaggerFade>
        </div>
      </section>

      {/* About / Our Approach - Animated */}
      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <HeroScrollReveal>
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Notre Approche
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-4">
                  Construire, c'est d'abord comprendre. Nous écoutons vos besoins,
                  analysons votre site, puis concevons des solutions sur mesure.
                </p>
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  De la bureau d'étude à la main-d'œuvre, chaque étape est
                  planifiée pour garantir la qualité, la sécurité et la conformité
                  aux normes internationales.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/apropos">
                    <AnimatedCTA variant="primary" size="lg">
                      En savoir plus
                    </AnimatedCTA>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="lg">
                      <Landmark className="w-4 h-4" /> Nos Services
                    </Button>
                  </Link>
                </div>
              </div>
            </HeroScrollReveal>
            <HeroScrollReveal startOffset={300}>
              <div className="order-1 lg:order-2">
                <AnimatedCrane className="w-full h-[400px] opacity-10" />
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      {/* Animated Construction Site - Real-time animation */}
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Chantier en direct
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Suivez l'avancement de nos projets en temps réel
            </p>
          </HeroScrollReveal>

          {/* Main construction site animation */}
          <div className="max-w-6xl mx-auto">
            <AnimatedConstructionSite className="w-full max-h-[400px] object-contain" />

            {/* Animated equipment below site */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#14263F] rounded-lg p-3 text-center">
                <AnimatedExcavator className="w-full h-24 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Excavateur</p>
              </div>
              <div className="bg-[#14263F] rounded-lg p-3 text-center">
                <AnimatedDumpTruck className="w-full h-24 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Camion benne</p>
              </div>
              <div className="bg-[#14263F] rounded-lg p-3 text-center">
                <AnimatedExcavator className="w-full h-24 opacity-60" />
                <p className="text-xs text-white/60 mt-2">Mélangeur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Building Progress */}
      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Progression des chantiers
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              Suivez le développement des projets, de la fondation à la livraison
            </p>
          </HeroScrollReveal>

          <AnimatedBuildingProgress />
        </div>
      </section>
    </>
  );
}
