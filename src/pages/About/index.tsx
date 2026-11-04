import { Layout } from "@/components/layout";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              À Propos de Nous
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Une entreprise de construction et de travaux publics engagée, basée en République du Congo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-semibold text-xl mb-3">Notre Histoire</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                ALFA CONSTRUCTION est une entreprise basée à Pointe-Noire, Songolo, République du Congo.
                Nous sommes spécialisés dans l'exploitation de carrière de pierres, le bâtiment, les travaux publics,
                le transport et la logistique, ainsi que le bureau d'étude.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Forts d'une équipe expérimentée et d'un équipement moderne, nous réalisons des projets
                d'envergure tels que la plateforme 600 et ses voies d'accès, avec un engagement constant
                envers la qualité et la sécurité.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-semibold text-xl mb-3">Nos Engagements</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Qualité, sécurité, respect des délais : voici les trois piliers de nos réalisations
                publiques et privées. Nous travaillons en étroite collaboration avec chaque client
                pour livrer des ouvrages durables, conformes et adaptés aux exigences locales.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Notre flotte comprend des excavateurs, des dump trucks, des bulldozers, des graders
                et des grues, nous permettant de mener à bien des projets complexes de A à Z.
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 sm:p-8">
            <h2 className="text-white font-semibold text-xl mb-4">Nos Valeurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-[#D4AF37] font-medium mb-2">Qualité</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Nous nous engageons à fournir des travaux de la plus haute qualité, conformes aux normes internationales.
                </p>
              </div>
              <div>
                <h3 className="text-[#D4AF37] font-medium mb-2">Intégrité</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Transparence et honnêteté dans toutes nos relations commerciales et engagements.
                </p>
              </div>
              <div>
                <h3 className="text-[#D4AF37] font-medium mb-2">Innovation</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Utilisation d'équipements modernes et de méthodes de construction avancées.
                </p>
              </div>
              <div>
                <h3 className="text-[#D4AF37] font-medium mb-2">Sécurité</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Protection de nos équipes et respect des normes de sécurité sur chaque chantier.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                Nous contacter <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
