import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Landmark, MapPin, ArrowRight } from 'lucide-react';

const featuredProjects = [
  { title: 'Plateforme 600', location: 'République du Congo', slug: 'plateforme-600' },
  { title: 'Route d\'accès', location: 'Centre-Ville', slug: 'route-accès' },
  { title: 'Carrière de granulats', location: 'Kimbangu', slug: 'carriere-granulats' },
];

export default function Projects() {
  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nos Réalisations
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Découvrez notre portfolio de projets à travers la République du Congo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <div key={p.slug} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl h-48 sm:h-56 bg-[#2A3F5F] flex items-center justify-center">
                  <Landmark className="w-12 h-12 text-white/30" />
                  <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/realisations/${p.slug}`}>
                      <span className="px-4 py-2 bg-[#D4AF37] text-[#0A192F] rounded-lg text-sm font-medium">
                        Voir le projet
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-white/50 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3 h-3" />
                    {p.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/realisations">
              <Button variant="secondary" className="gap-2">
                Voir toutes les realisations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
