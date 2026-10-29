import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, Input, Textarea } from '@/components/ui';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: '1', title: 'Plateforme 600', status: 'published', location: 'République du Congo', cover: null },
    { id: '2', title: 'Route d\'accès', status: 'draft', location: 'Centre-Ville', cover: null },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '', slug: '', status: 'published' as 'draft' | 'published', location: '', description: ''
  });

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
              Gestion des projets
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Créez, éditez, publiez et gérez vos réalisations.
            </p>
          </div>
          <Button variant="secondary" onClick={() => { setShowAdd(true); setEditing(null); }}>
            <Plus className="w-4 h-4" /> Nouveau projet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        p.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{p.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => { setEditing(p.id); setShowAdd(true); }}>
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
                {editing ? 'Modifier le projet' : 'Nouveau projet'}
              </h2>
              <button onClick={() => { setShowAdd(false); setEditing(null); }}>
                <X className="w-5 h-5 text-white/50 hover:text-white/80" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Titre" placeholder="Titre du projet" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Input label="Slug" placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <Input label="Localisation" placeholder="Ville, pays" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Textarea label="Description" rows={4} placeholder="Description du projet" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
