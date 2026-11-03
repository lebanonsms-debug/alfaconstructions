import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight, Building2, HardHat, Ruler, CheckCircle } from "lucide-react";
import { AnimatedBuildingProgress, AnimatedExcavator, AnimatedBuildingConstruction } from "@/components/construction-animations";

export default function Batiment() {
  return (
    <Layout>
      {/* Split Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Bâtiment */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
                <Building2 className="w-3.5 h-3.5 mr-2 text-[#D4AF37]" />
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Bâtiment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Construction de bâtiments
              </h1>
              <p className="text-sm text-white/70 mb-4 max-w-md">
                Construction de bâtiments résidentiels, commerciaux et industriels.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="sm" className="gap-2">
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Travaux Publics */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-4">
                <HardHat className="w-3.5 h-3.5 mr-2 text-[#D4AF37]" />
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Travaux Publics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Routes, voies ferrées et ouvrages d'assainissement
              </h2>
              <p className="text-sm text-white/70 mb-4 max-w-md">
                Infrastructures publiques, routes, ponts, assainissement et drainage.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="gap-2">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>

          {/* Animated Building Image */}
          <div className="mt-8">
            <AnimatedBuildingConstruction className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Avancement Bâtiment</h3>
              <AnimatedBuildingProgress className="w-full h-auto" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Chantier Travaux Publics</h3>
              <AnimatedExcavator className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Expertises */}
      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Building2, title: "Bâtiments résidentiels", desc: "Construction de maisons individuelles, appartements et résidences." },
              { icon: HardHat, title: "Bâtiments commerciaux", desc: "Bureaux, commerces, centres commerciaux et bâtiments industriels." },
              { icon: Ruler, title: "Travaux publics", desc: "Routes, ponts, assainissement et infrastructures publiques." },
              { icon: CheckCircle, title: "Terrassement", desc: "Préparation de terrains, nivellement et remblaiement." },
              { icon: CheckCircle, title: "Fondations", desc: "Fondations profondes et superficielles adaptées à chaque projet." },
              { icon: CheckCircle, title: "Structures", desc: "Construction de structures en béton armé, métalliques et mixtes." },
            ].map((item, i) => (
              <div key={i} className="bg-[#14263F] rounded-xl p-5 sm:p-6 border border-white/5 hover:border-[#D4AF37]/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold text-base mb-1.5">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Un projet de construction ?</h2>
            <p className="text-white/70 mb-6 text-sm sm:text-base">Notre équipe est prête à réaliser votre projet avec professionnalisme.</p>
            <Link to="/contact">
              <Button variant="primary" size="md" className="gap-2">
                Contactez-nous <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
