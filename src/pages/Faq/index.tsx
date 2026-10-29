import { Layout } from '@/components/layout';
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
