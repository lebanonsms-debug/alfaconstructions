import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight, Building2, HardHat, Ruler, CheckCircle } from "lucide-react";

export default function Batiment() {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Bâtiment"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <Building2 className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Bâtiment & Travaux Publics</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Construction de bâtiments et <span className="text-[#D4AF37]">travaux publics</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl">
              Réalisation complète de projets de construction civile et travaux publics :
              terrassement, fondations, structures, drainage et infrastructure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg" className="gap-2">
                  Demander un devis <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/realisations">
                <Button variant="outline" size="lg">Nos réalisations</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nos expertises</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Bâtiments résidentiels", desc: "Construction de maisons individuelles, appartements et résidences." },
              { icon: HardHat, title: "Bâtiments commerciaux", desc: "Bureaux, commerces, centres commerciaux et bâtiments industriels." },
              { icon: Ruler, title: "Travaux publics", desc: "Routes, ponts, assainissement et infrastructures publiques." },
              { icon: CheckCircle, title: "Terrassement", desc: "Préparation de terrains, nivellement et remblaiement." },
              { icon: CheckCircle, title: "Fondations", desc: "Fondations profondes et superficielles adaptées à chaque projet." },
              { icon: CheckCircle, title: "Structures", desc: "Construction de structures en béton armé, métalliques et mixtes." },
            ].map((item, i) => (
              <div key={i} className="bg-[#14263F] rounded-xl p-6 border border-white/5 hover:border-[#D4AF37]/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Un projet de construction ?</h2>
            <p className="text-white/70 mb-8">Notre équipe est prête à réaliser votre projet avec professionnalisme.</p>
            <Link to="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                Contactez-nous <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
