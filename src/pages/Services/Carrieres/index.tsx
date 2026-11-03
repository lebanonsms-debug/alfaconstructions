import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight, Mountain, Truck, Wrench, Shield, MapPin, Clock } from "lucide-react";
import { AnimatedCrane3D } from "@/components/construction-animations";

export default function Carrieres() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1920&q=80"
            alt="Carrière"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/70 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <Mountain className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Exploitation de Carrières</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Leader dans l'extraction et la production de <span className="text-[#D4AF37]">granulats</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6 max-w-2xl">
              Exploitation et gestion de carrières, approvisionnement en matériaux de construction,
              défrichage et production de granulats de haute qualité pour tous vos projets.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button variant="primary" size="md" className="gap-2">
                  Demander un devis <ArrowRight className="w-4 h-4" />
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Notre équipement</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Des engins de chantier performants pour l'exploitation de nos carrières</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AnimatedCrane3D className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Mountain, title: "Extraction de matériaux", desc: "Exploitation de carrières de granulats, sable, gravier et pierre concassée." },
              { icon: Wrench, title: "Production de granulats", desc: "Concassage, criblage et production de granulats de différentes classes." },
              { icon: Truck, title: "Livraison sur site", desc: "Transport et livraison de matériaux sur vos chantiers partout au Congo." },
              { icon: Shield, title: "Contrôle qualité", desc: "Respect des normes et contrôle qualité rigoureux sur tous nos matériaux." },
              { icon: Clock, title: "Délais respectés", desc: "Planification et logistique optimisées pour des livraisons ponctuelles." },
              { icon: MapPin, title: "Couverture nationale", desc: "Sites d'exploitation et capacité de livraison sur l'ensemble du territoire." },
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

      {/* CTA */}
      <section className="py-8 sm:py-12 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Un projet en tête ?</h2>
            <p className="text-white/70 mb-6 text-sm sm:text-base">Contactez-nous pour discuter de vos besoins en matériaux de construction.</p>
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
