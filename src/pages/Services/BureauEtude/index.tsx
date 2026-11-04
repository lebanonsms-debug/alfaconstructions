import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight, Ruler, PenTool, FileText, Users, CheckCircle } from "lucide-react";
import { AnimatedConstructionSite } from "@/components/construction-animations";

export default function BureauEtude() {
  return (
    <Layout>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Bureau d'Étude"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <Ruler className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Bureau d'Étude</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Études techniques et <span className="text-[#D4AF37]">ingénierie</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl">
              Études techniques, préparation des projets, études de faisabilité,
              planification et suivi d'exécution par une équipe d'experts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button variant="primary" size="md" className="gap-2">
                  Nous contacter <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animation */}
      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Notre méthode</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Une approche structurée pour chaque projet d'ingénierie</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AnimatedConstructionSite className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: FileText, title: "Études de faisabilité", desc: "Analyse de projet, évaluation technique et financière, recommandations." },
              { icon: PenTool, title: "Conception technique", desc: "Plans, dessins d'exécution et spécifications techniques détaillées." },
              { icon: Ruler, title: "Planification", desc: "Planification de projets, estimation des coûts et des délais." },
              { icon: Users, title: "Suivi d'exécution", desc: "Supervision de chantier, contrôle qualité et coordination des travaux." },
              { icon: CheckCircle, title: "Contrôle technique", desc: "Vérification de la conformité aux normes et aux spécifications." },
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Un projet d'étude ?</h2>
            <p className="text-white/70 mb-6 text-sm sm:text-base">Notre bureau d'étude vous accompagne dans toutes vos phases de projet.</p>
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
