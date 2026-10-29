import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
  Input, Textarea, Select, Badge
} from '@/components/ui';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([
    { id: '1', title: 'Bâtiment & Travaux Publics', slug: 'batiments', status: 'published', description: 'Construction civile, travaux publics, terrassement, fondations.' },
    { id: '2', title: 'Transport & Logistique', slug: 'transport', status: 'published', description: 'Transport de matériaux, coordination de logistique.' },
    { id: '3', title: 'Exploitation de Carrières', slug: 'carrieres', status: 'draft', description: 'Extraction et gestion de carrières.' },
    { id: '4', title: 'Bureau d\'Étude', slug: 'bureaudeetude', status: 'published', description: 'Études techniques et planification.' },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAdd(false);
    setEditing(null);
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Gestion des services
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Créez, éditez et gérez les catégories de services de votre entreprise.
            </p>
          </div>
          <Button variant="secondary" onClick={() => { setShowAdd(true); setEditing(null); }}>
            <Plus className="w-4 h-4" /> Nouveau service
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{s.title}</h3>
                      <Badge variant={s.status === 'published' ? 'success' : 'warning'}>
                        {s.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60">{s.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => { setEditing(s.id); setShowAdd(true); }}>
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

        {/* Add/Edit Modal */}
        <div className={showAdd ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50' : 'hidden'}>
          <div className="bg-white dark:bg-[#0A192F] rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0A192F]">
                {editing ? 'Modifier le service' : 'Nouveau service'}
              </h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }}>
                <X className="w-5 h-5 text-white/50 hover:text-white/80" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Titre" placeholder="Nom du service" />
              <Input label="Slug" placeholder="slug" />
              <Textarea label="Description" rows={4} placeholder="Description du service" />
              <div className="flex gap-3 justify-end pt-2">
                <Button type="button" variant="secondary" onClick={() => { setShowAdd(false); setEditing(null); }}>
                  Annuler
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4" /> {editing ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
