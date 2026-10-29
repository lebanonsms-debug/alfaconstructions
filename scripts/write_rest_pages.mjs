import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const contactContent = `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { mail, phone, mapPin, building, mailAlt, clock, send, user, building2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, \'Le nom est requis\').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email(\'Adresse email invalide\'),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, \'Le sujet est requis\').max(200),
  message: z.string().min(10, \'Le message doit contenir au moins 10 caractères\').max(5000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: \'Vous devez accepter les conditions de confidentialité\',
  }),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: \'\',
      company: \'\',
      email: \'\',
      phone: \'\',
      subject: \'\',
      message: \'\',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      const response = await fetch(\'/api/contact\', {
        method: \'POST\',
        headers: { \'Content-Type\': \'application/json\' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
      } else {
        const error = await response.json();
        alert(error.message || \'Erreur lors de l\'envoi\');
      }
    } catch {
      alert(\'Erreur de connexion. Veuillez réessayer.\');
    }
  };

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Une question, un projet en tête ? Parlez-nous de vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Adresse</p>
                    <p className="text-white font-medium">
                      Avenue Docteur Cardorelle, Songolo, Centre-Ville
                      <br />
                      Boulevard Charles de Gaulle, Immeuble H&ocirc;tel Ela&iuml;s
                      <br />
                      République du Congo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Téléphone</p>
                    <p className="text-white font-medium">+242 06 822 22 20</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <p className="text-white font-medium">
                      <a href="mailto:ali-safa@alfa-constructions.com" className="hover:text-[#D4AF37] transition-colors">
                        ali-safa@alfa-constructions.com
                      </a>
                      <br />
                      <a href="mailto:alfa.btp.cg@gmail.com" className="hover:text-[#D4AF37] transition-colors text-white/70 mt-1 block">
                        alfa.btp.cg@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Direction</p>
                    <p className="text-white font-medium">Ali Safa - Président Directeur Général</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nom complet *"
                    {...register(\'name\')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Entreprise (optionnel)"
                    {...register(\'company\')}
                    error={errors.company?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    type="email"
                    {...register(\'email\')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Téléphone (optionnel)"
                    {...register(\'phone\')}
                    error={errors.phone?.message}
                  />
                </div>

                <Input
                  label="Sujet *"
                  {...register(\'subject\')}
                  error={errors.subject?.message}
                />

                <Textarea
                  label="Message *"
                  {...register(\'message\')}
                  error={errors.message?.message}
                />

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    {...register(\'privacyConsent\')}
                    className="mt-1 rounded border-[#CBD5E1] bg-white focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-white/70">
                    J&apos;accepte les conditions de confidentialité et les politiques de
                    traitement des données.
                  </label>
                </div>

                {errors.privacyConsent && (
                  <p className="text-xs text-red-500">{errors.privacyConsent.message}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
`;

const privacyContent = `import { Link } from 'react-router-dom';
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
                ALFA CONSTRUCTION collecte uniquement les informations nécessaires à la
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
                Elles peuvent être transmises aux services concernés de ALFA CONSTRUCTION
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
                <a href="mailto:ali-safa@alfa-constructions.com" className="text-[#D4AF37] hover:underline">
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
`;

const legalContent = `import { Link } from 'react-router-dom';
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
                Ali Safa – Président Directeur Général
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Hébergement</h2>
              <p className="mt-1">
                Le site est hébergé sur la plateforme Vercel (https://vercel.com).
                L&horizon d&apos;adresse IP du serveur est susceptible d&apos;évoluer.
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
              <a href="mailto:ali-safa@alfa-constructions.com" className="text-[#D4AF37] hover:underline">
                ali-safa@alfa-constructions.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
`;

const faqContent = `import { Layout } from '@/components/layout';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Quels sont les secteurs d\'activité d\'ALFA CONSTRUCTION ?',
    a: 'ALFA CONSTRUCTION intervient dans le bâtiment et travaux publics, le transport et logistique, l\'exploitation de carrières et le bureau d\'étude.',
  },
  {
    q: 'Quelle est la zone géographique de intervention ?',
    a: 'ALFA CONSTRUCTION est basée à la République du Congo et intervient principalement dans tout le territoire national.',
  },
  {
    q: 'Comment fonctionne une consultation ?',
    a: 'Notre équipe vous accueille pour échanger sur vos besoins, étudier votre projet et vous proposer une solution adaptée.',
  },
  {
    q: 'ALFA CONSTRUCTION réalise-t-elle des travaux d\'urgence ?',
    a: 'Oui, ALFA CONSTRUCTION est en mesure de intervenir dans des délais courts pour les travaux d\'urgence et de sécurité.',
  },
  {
    q: 'Quel devis puis-je attendre ?',
    a: 'Un devis est élaboré sur mesure selon le périmètre du projet. Contactez notre équipe pour recevoir une proposition chiffrée.',
  },
  {
    q: 'Sur quel accompagnement ALFA CONSTRUCTION peut-il m\'aider ?',
    a: 'Nous intervenons de la conception à la livraison, en passant par l\'ingénierie, la supervision et la maintenance.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Foire aux questions
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Des questions ? Nos réponses vous accompagnent.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full px-5 py-4 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className="text-white font-medium">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform duration-200 ${
                      openIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === idx && (
                  <p className="px-5 pb-4 text-white/70 text-sm leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
`;

const notFoundContent = `import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <Layout>
      <section className="py-20 sm:py-24 bg-[#0A192F] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-white/60 text-xl mb-8">
            La page que vous recherchez n&apos;existe pas.
          </p>
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A192F] font-semibold rounded-md hover:bg-[#E8C94A] transition-colors">
              <Home className="w-4 h-4" /> Retour à l\'accueil
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
`;

fs.writeFileSync(path.join(projectRoot, 'src/pages/Contact/index.tsx'), contactContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'src/pages/Privacy/index.tsx'), privacyContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'src/pages/Legal/index.tsx'), legalContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'src/pages/Faq/index.tsx'), faqContent, 'utf-8');
fs.writeFileSync(path.join(projectRoot, 'src/pages/NotFound/index.tsx'), notFoundContent, 'utf-8');
console.log('All pages written successfully');
