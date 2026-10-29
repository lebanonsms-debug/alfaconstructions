import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';

export default function Privacy() {
  return (
    <Layout noFooter>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-white/60 mb-8">
            Dernière mise à jour : [Date]
          </p>

          <div className="space-y-8 text-white/80 leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">1. Collecte des données</h2>
              <p className="mt-1">
                alfa CONSTRUCTION collecte uniquement les informations nécessaires à la
                prise en charge de vos demandes. Lors de l&apos;envoi d&apos;un message
                via le formulaire de contact, nous collectons :
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Téléphone (optionnel)</li>
                <li>Entreprise (optionnel)</li>
                <li>Sujet et message de votre demande</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">2. Utilisation des données</h2>
              <p className="mt-1">
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Traiter votre demande de contact ou de devis</li>
                <li>Répondre à votre message dans les délais</li>
                <li>Améliorer nos services et notre accompagnement</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">3. Partage des données</h2>
              <p className="mt-1">
                Vos données personnelles ne sont pas vendues à des tiers.
                Elles peuvent être transmises aux services concernés de alfa CONSTRUCTION
                ou à nos partenaires techniques nécessaires au traitement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">4. Sécurité</h2>
              <p className="mt-1">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
                appropriées pour protéger vos données contre toute perte, usurpation ou
                utilisation non autorisée.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">5. Vos droits</h2>
              <p className="mt-1">
                Conformément à la réglementation applicable, vous disposez du droit d&apos;accès,
                de rectification, de limitation et d&apos;opposition aux traitements de vos
                données personnelles. Pour l&apos;exercer, contactez-nous à l&apos;adresse :
                <a
                  href="mailto:ali-safa@alfa-constructions.com"
                  className="text-[#D4AF37] hover:underline"
                >
                  ali-safa@alfa-constructions.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
