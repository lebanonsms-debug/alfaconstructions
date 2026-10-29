import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';

export default function Legal() {
  return (
    <Layout noFooter>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Mentions légales
          </h1>
          <p className="text-white/60 mb-8">
            Dernière mise à jour : [Date]
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Éditeur</h2>
              <p className="mt-1">
                ALFA CONSTRUCTION
                <br />
                Avenue Docteur Cardorelle, Songolo, Centre-Ville
                <br />
                Boulevard Charles de Gaulle, Immeuble Hôtel Elaïs
                <br />
                République du Congo
                <br />
                Tél : +242 06 822 22 20
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Directeur de la publication</h2>
              <p className="mt-1">
                Ali Safa &mdash; Président Directeur Général
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Hébergement</h2>
              <p className="mt-1">
                Le site est hébergé sur la plateforme Vercel (https://vercel.com).
                L&apos;adresse IP du serveur est susceptible d&apos;évoluer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Propriété intellectuelle</h2>
              <p className="mt-1">
                Tout contenu du site, texte, images, vidéos, logos, marques,
                est la propriété exclusive d&apos;ALFA CONSTRUCTION.
                Toute reproduction, même partielle, est soumise à l&apos;accord écrit de l&apos;éditeur.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Liens hypertextes</h2>
              <p className="mt-1">
                Le site contient des liens hypertextes vers des sites tiers.
                ALFA CONSTRUCTION n&apos;accepte pas la responsabilité de leur contenu.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Résiliation</h2>
              <p className="mt-1">
                L&apos;accès au site peut être suspendu ou interdit en cas de non-respect
                des conditions d&apos;utilisation.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm text-white/40">
              Ces mentions légales sont configurables et révisables.
              Pour toute question, contactez-nous à l&apos;adresse :
              <a
                href="mailto:ali-safa@alfa-constructions.com"
                className="text-[#D4AF37] hover:underline"
              >
                ali-safa@alfa-constructions.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
