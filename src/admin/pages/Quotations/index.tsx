import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, Badge, Input, Textarea, Modal } from '@/components/ui';
import { Send, Edit, Trash2, Phone, Save, X, Mail } from 'lucide-react';

export default function AdminQuotations() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([
    { id: '1', name: 'Jean Dupont', email: 'jean@exemple.com', service: 'Transport', status: 'Nouveau', createdAt: '2026-10-28' },
    { id: '2', name: 'Marie Curie', email: 'marie@exemple.com', service: 'Bâtiment', status: 'En cours', createdAt: '2026-10-27' },
    { id: '3', name: 'Pierre Martin', email: 'pierre@exemple.com', service: 'Exploration', status: 'Traité', createdAt: '2026-10-25' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const getStatusBadge = (s: string) => {
    const map: Record<string, 'default' | 'success' | 'info' | 'warning'> = {
      'Nouveau': 'default', 'En cours': 'info', 'En attente': 'warning', 'Traité': 'success', 'Archivé': 'default'
    };
    return map[s] || 'default';
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Demandes de devis
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Gérez et suivez les demandes de devis reçues.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {quotations.map((q) => (
            <Card key={q.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{q.name}</h3>
                      <Badge variant={getStatusBadge(q.status)}>{q.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {q.email}
                      </span>
                      <span>Service : {q.service}</span>
                      <span className="text-white/40">{q.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditing(q.id); setShowModal(true); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => {}}>
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setEditing(null); }}
          title="Notes internes"
        >
          <div className="space-y-4">
            <Textarea placeholder="Ajouter une note interne..." rows={4} className="min-h-[100px]" />
            <div className="flex justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => { setShowModal(false); setEditing(null); }}>
                Fermer
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4" /> Enregistrer
              </Button>
            </div>
          </div>
        </Modal>
      </section>
    </Layout>
  );
}
