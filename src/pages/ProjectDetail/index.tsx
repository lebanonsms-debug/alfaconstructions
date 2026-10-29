import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowLeft, MapPin, Clock, Package, Building } from 'lucide-react';

const stages = [
  { num: '1', title: 'Avant et d\xe9but des travaux d\amenagment de la plateforme 600' },
  { num: '2', title: 'Mobilisation des bureaux de la plateforme 600' },
  { num: '3', title: 'Travaux de terrassement et topographie' },
  { num: '4', title: 'D\xe9sherbage et d\xe9capage de la terre v\xe9g\xe9tative' },
  { num: '5', title: 'Ex\xe9cution et fabrication du ferraillage' },
  { num: '6', title: 'Ex\xe9cution de la cave' },
  { num: '7', title: 'Mise en place de la fosses septique et du puisard' },
  { num: '8', title: 'Fouille et mise en place du ferraillage du radier pour bourbiers' },
  { num: '9', title: 'Ferraillage, coffrage et coulage du caniveau' },
  { num: '10', title: 'Coulage des parois des bourbiers et du caniveau' },
  { num: '11', title: 'Finition des ouvrages' },
  { num: '12', title: 'Montage et mise en place du rig' },
];

export default function ProjectDetail() {
  const { slug } = useParams();

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/realisations">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour aux realisations
            </Button>
          </a>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#14263F] rounded-2xl overflow-hidden mb-8">
              <div className="h-48 sm:h-64 bg-[#2A3F5F] flex items-center justify-center">
                <Building className="w-16 h-16 text-white/30" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Realisation des travaux d\amenagment de la Plateforme 600
            </h1>

            <p className="text-white/60 text-base mb-8">
              Document de presentation technique des travaux d\amenagment de la plateforme 600.
              Cette realisation presente la sequence des operations realisees par alfa CONSTRUCTION.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Projet</p>
                  <p className="text-white font-medium">Plateforme 600</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Localisation</p>
                  <p className="text-white font-medium">R\xe9publique du Congo</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                Sequence des travaux
              </h3>
              <ol className="space-y-3">
                {stages.map((s) => (
                  <li key={s.num} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0A192F] flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {s.num}
                    </span>
                    <span className="text-sm text-white/70 leading-relaxed">{s.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/50">Contact pour plus d'informations</p>
                <p className="text-white font-medium">Ali Safa - ali-safa@alfa-constructions.com</p>
              </div>
              <a href="/contact">
                <Button variant="primary" size="sm">
                  Demander un devis
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
