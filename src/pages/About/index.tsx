import { Layout } from '@/components/layout';

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
              Une entreprise de construction et de travaux publics engagée.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-semibold text-xl mb-3">Notre Histoire</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                alfa CONSTRUCTION est née avec une conviction simple : la construction
                doit allier solidité technique, respect de l'environnement et accompagnement
                de la ville.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Fondée par Ali Safa, notre société intervient sur la République du Congo
                et ses îles environnantes, des zones urbaines aux sites isolés.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h2 className="text-white font-semibold text-xl mb-3">Nos Engagements</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Qualité, sécurité, respect des délais : voici les trois piliers de nos
                réalisations publiques et privées.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-3">
                Nous travaillons en étroite collaboration avec chaque client pour livrer
                des ouvrages durables, conformes et adaptés aux exigences locales.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
