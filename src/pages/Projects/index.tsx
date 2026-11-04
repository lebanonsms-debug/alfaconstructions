import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Landmark, MapPin, ArrowRight } from 'lucide-react';

const featuredProjects = [
  {
    title: "Plateforme 600",
    location: "République du Congo",
    description: "Aménagement de la plateforme 600 et ses voies d'accès — travaux de terrassement, topographie, fondations et infrastructures.",
    image: "/images/project-plateforme-600.png",
    slug: "plateforme-600",
  },
  {
    title: "Travaux de terrassement",
    location: "Plateforme 600",
    description: "Désherbage, décapage de terre végétale et préparation du terrain pour construction industrielle.",
    image: "/images/project-earthworks.png",
    slug: "terrassement",
  },
  {
    title: "Ouvrages hydrauliques",
    location: "Plateforme 600",
    description: "Construction de caniveaux, bourbiers et systèmes de drainage pour la gestion des eaux.",
    image: "/images/project-drainage.png",
    slug: "hydraulique",
  },
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((p) => (
              <div
                key={p.slug}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <Link to={`/realisations/${p.slug}`}>
                      <span className="px-4 py-2 bg-[#D4AF37] text-[#0A192F] rounded-lg text-sm font-medium">
                        Voir le projet
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-white/50 text-sm flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3 h-3" />
                    {p.location}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{p.description}</p>
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
