import { Layout } from '../../components/layout'
import { Button } from '../../components/ui'
import { ArrowRight, Building, Truck, Landmark, FlaskConical, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Bâtiment & Travaux Publics',
    description: 'Construction, terrassement, travaux publics et ouvrages en béton.',
    icon: Building,
    slug: 'batiment-travaux-publics',
  },
  {
    title: 'Transport & Logistique',
    description: 'Transport de matériaux, logistique de chantier et gestion d\'équipements.',
    icon: Truck,
    slug: 'transport-logistique',
  },
  {
    title: 'Exploitation de Carrières',
    description: 'Extraction et commercialisation de granulats et matériaux de construction.',
    icon: Landmark,
    slug: 'exploitation-carrieres',
  },
  {
    title: 'Bureau d\'Étude',
    description: 'Études techniques, préparation de projets et planification d\'ingénierie.',
    icon: FlaskConical,
    slug: 'bureau-d-étude',
  },
];

export default function Services() {
  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nos Services
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Une gamme complète de compétences pour répondre à tous vos besoins de construction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.slug} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h2 className="text-white font-semibold text-lg mb-2">{s.title}</h2>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{s.description}</p>
                <Link to={`/services/${s.slug}`}>
                  <Button variant="primary" size="sm">
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="secondary">
              Discuter de vos besoins
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
