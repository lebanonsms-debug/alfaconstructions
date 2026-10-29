import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, Badge, Input, Textarea, Modal } from '@/components/ui';
import { Mail, MessageSquare, Plus, Edit, Trash2, Save, X, Clock, CheckCircle, FileText, Phone } from 'lucide-react';

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: '1', name: 'Jean Dupont', email: 'jean@exemple.com', subject: 'Demande de devis', status: 'Nouveau', createdAt: '2026-10-28' },
    { id: '2', name: 'Marie Curie', email: 'marie@exemple.com', subject: 'Projets publics', status: 'En cours', createdAt: '2026-10-27' },
    { id: '3', name: 'Pierre Martin', email: 'pierre@exemple.com', subject: 'Collaboration', status: 'Traité', createdAt: '2026-10-25' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const getStatusBadge = (s: string) => {
    const map: Record<string, 'default' | 'success' | 'info' | 'warning'> = {
      'Nouveau': 'default', 'En cours': 'info', 'Traité': 'success', 'Archivé': 'default'
    };
    return map[s] || 'default';
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Messages & Liaisons
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Gérez les messages reçus par votre entreprise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {messages.map((m) => (
            <Card key={m.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{m.name}</h3>
                      <Badge variant={getStatusBadge(m.status)}>{m.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                      <span>{m.email}</span>
                      <span>{m.subject}</span>
                      <span className="text-white/40">{m.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { setEditing(m.id); setShowModal(true); }}>
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
