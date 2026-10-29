import fs from 'fs';
import path from 'path';
import { writeFile } from './file_utils.mjs';

const projectRoot = process.cwd();
const pages = [
  {
    relativePath: 'src/pages/About/index.tsx',
    content: `import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { fontFamily, sectors } from '@/config/brand';
import { MapPin, Phone, Mail, Building, Users, Shield, Award } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              &Agrave; Propos
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              La mission d&apos;ALFA CONSTRUCTION : transformer des id&eacute;es en réalisations concr&egrave;tes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-2xl transform -rotate-6" />
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Notre histoire
                </h2>
                <p className="text-white/70 leading-relaxed text-base">
                  ALFA CONSTRUCTION est une entreprise de bâtiment et de travaux publics
                  fondee sur la confiance, la qualite et l'excellence technique.
                  Nous sommes fier de notre contribution aux infrastructures cles
                  de la Republique du Congo.
                </p>
                <p className="text-white/70 leading-relaxed text-base mt-4">
                  Notre structure dotee d&apos;un axe de conduite d&apos;une direction
                  generale experenciée, reunissante des comp&eacute;tences techniques
                  et op&eacute;ratoires n&eacute;cessaires pour livrer des projets
                  de la conception a la livraison.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Notre mission
              </h2>
              <p className="text-white/70 leading-relaxed text-base mb-6">
                Fournir des solutions de construction et de travaux publics
                d&apos;excellence, en alliant expertise technique, respect de
                l&apos;environnement et satisfaction du client.
              </p>

              <h2 className="text-xl font-semibold text-white mb-4">
                Notre vision
              </h2>
              <p className="text-white/70 leading-relaxed text-base mb-6">
                Devenir la reference de confiance en mati&egrave;re de projets de
                construction et de travaux publics dans la region.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Building, label: 'Experties technique' },
                  { icon: Users, label: 'Equipes qualifiees' },
                  { icon: Shield, label: 'Satisfaction client' },
                  { icon: Award, label: 'Excellence permanente' },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <item.icon className="w-5 h-5 text-[#D4AF37] mb-2" />
                    <p className="text-sm text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Nos activites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sectors.map((s) => (
                <div key={s.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    {s.id === 'batiments' && <Building className="w-4 h-4 text-[#D4AF37]" />}
                    {s.id === 'transport' && <Building className="w-4 h-4 text-[#D4AF37]" />}
                    {s.id === 'carrieres' && <Building className="w-4 h-4 text-[#D4AF37]" />}
                    {s.id === 'bureaudeetude' && <Building className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{s.label}</p>
                    <p className="text-sm text-white/50">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
` },
  {
    relativePath: 'src/pages/Services/index.tsx',
    content: `import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { sectors } from '@/config/brand';
import { Building, Truck, Mining, Gavel } from 'lucide-react';

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
              Des services complets pour accompagner votre projet de la
              conception a la livraison.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sectors.map((s) => (
              <div
                key={s.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                  {s.id === 'batiments' && <Building className="w-6 h-6 text-[#D4AF37]" />}
                  {s.id === 'transport' && <Truck className="w-6 h-6 text-[#D4AF37]" />}
                  {s.id === 'carrieres' && <Mining className="w-6 h-6 text-[#D4AF37]" />}
                  {s.id === 'bureaudeetude' && <Gavel className="w-6 h-6 text-[#D4AF37]" />}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {s.label}
                </h3>
                <p className="text-sm text-white/50 mb-4">
                  {s.description}
                </p>
                <Link to="/contact">
                  <Button size="sm" variant="secondary">
                    Demander un devis
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
` },
  {
    relativePath: 'src/pages/Projects/index.tsx',
    content: `import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Landmark, MapPin, ArrowRight } from 'lucide-react';

export default function Projects() {
  const featuredProjects = [
    { title: 'Plateforme 600', location: 'République du Congo', slug: 'plateforme-600' },
    { title: 'Route d\'acc&egrave;s', location: 'Centre-Ville', slug: 'route-accès' },
    { title: 'Carri&egrave;re de granulats', location: 'Kimbangu', slug: 'carriere-granulats' },
  ];

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nos Réalisations
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Découvrez notre portfolio de projets &agrave; travers la Republique du Congo.
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
` },
  {
    relativePath: 'src/pages/ProjectDetail/index.tsx',
    content: `import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowLeft, MapPin, Calendar, Package, Building, Clock, Flag } from 'lucide-react';

const stages = [
  { num: '1', title: 'Avant et d&eacute;but des travaux d&apos;am&eacute;nagement de la plateforme 600' },
  { num: '2', title: 'Mobilisation des bureaux de la plateforme 600' },
  { num: '3', title: 'Travaux de terrassement et topographie' },
  { num: '4', title: 'D&eacute;sherbage et d&eacute;capage de la terre vég&eacute;tative' },
  { num: '5', title: 'Ex&eacute;cution et fabrication du ferraillage' },
  { num: '6', title: 'Ex&eacute;cution de la cave' },
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
          <Link to="/realisations">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour aux realisations
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#14263F] rounded-2xl overflow-hidden mb-8">
              <div className="h-48 sm:h-64 bg-[#2A3F5F] flex items-center justify-center">
                <Building className="w-16 h-16 text-white/30" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Realisation des travaux d&apos;amenagement de la Plateforme 600
            </h1>

            <p className="text-white/60 text-base mb-8">
              Document de presentation technique des travaux d&apos;amenagement de la plateforme 600.
              Cette realization presente la sequence des operations realisees par ALFA CONSTRUCTION.
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
                  <p className="text-white font-medium">République du Congo</p>
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
                <p className="text-sm text-white/50">Contact pour plus d&apos;informations</p>
                <p className="text-white font-medium">Ali Safa - <a href="mailto:ali-safa@alfa-constructions.com" className="text-[#D4AF37] hover:underline">ali-safa@alfa-constructions.com</a></p>
              </div>
              <Link to="/contact">
                <Button variant="primary" size="sm">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
` },
];

pages.forEach((p) => writeFile(projectRoot, p.relativePath, p.content));
console.log('All files written successfully');
