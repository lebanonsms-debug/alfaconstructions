import { useState } from 'react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';

const stages = [
  { id: 1, title: "Avant et début des travaux d'aménagement de la plateforme 600", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 2, title: "Mobilisation des bureaux de la plateforme 600", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: 3, title: "Travaux de terrassement et topographie", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" },
  { id: 4, title: "Désherbage et décapage de la terre végétale", image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&q=80" },
  { id: 5, title: "Exécution et fabrication du ferraillage", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80" },
  { id: 6, title: "Exécution de la cave", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 7, title: "Mise en place de la fosse septique et du puisard", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { id: 8, title: "Fouille et mise en place du ferraillage du radier pour bourbiers", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" },
  { id: 9, title: "Ferraillage, coffrage et coulage du caniveau", image: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&q=80" },
  { id: 10, title: "Coulage des parois des bourbiers et du caniveau", image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80" },
  { id: 11, title: "Finition des ouvrages", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 12, title: "Montage et mise en place du rig", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
];

export default function Plateforme600() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Projet référence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Plateforme 600
            </h1>
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Réalisation des travaux d'aménagement de la Plateforme 600 — Un projet d'envergure 
              demonstrating notre expertise en génie civil et travaux publics.
            </p>
          </div>

          {/* Timeline / Stages navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedStage === stage.id
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50'
                    : 'bg-[#14263F] border-white/5 hover:border-[#D4AF37]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    selectedStage === stage.id ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  }`}>
                    {stage.id}
                  </div>
                  <div>
                    <p className={`text-sm font-medium leading-snug ${selectedStage === stage.id ? 'text-white' : 'text-white/80'}`}>
                      {stage.title}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected stage detail */}
          {selectedStage && (
            <div className="bg-[#14263F] rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto">
                  <img
                    src={stages.find(s => s.id === selectedStage)?.image}
                    alt={stages.find(s => s.id === selectedStage)?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/50 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A192F] flex items-center justify-center font-bold">
                      {selectedStage}
                    </div>
                    <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Étape {selectedStage}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    {stages.find(s => s.id === selectedStage)?.title}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Cette étape fait partie des 12 étapes du projet d'aménagement de la Plateforme 600.
                    Chaque phase a été réalisée avec le plus grand soin et en conformité avec les normes techniques.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStage(selectedStage > 1 ? selectedStage - 1 : stages.length)}
                      disabled={selectedStage === 1}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStage(selectedStage < stages.length ? selectedStage + 1 : 1)}
                      disabled={selectedStage === stages.length}
                    >
                      Suivant <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedStage && (
            <div className="text-center py-20 bg-[#14263F] rounded-2xl border border-dashed border-white/10">
              <ZoomIn className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-4" />
              <p className="text-white/60">Sélectionnez une étape ci-dessus pour voir les détails</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
