import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { FolderOpen, Plus, Edit, Trash2, Eye, MapPin, Calendar } from 'lucide-react';

export default function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', short_description: '', description: '', location: '', category_id: '', status: 'draft', start_date: '', completion_date: '' });

  useEffect(() => {
    fetchProjects();
    const channel = supabase
      .channel('projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => fetchProjects())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error) setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await supabase.from('projects').update(formData).eq('id', editingId);
      } else {
        await supabase.from('projects').insert(formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ title: '', slug: '', short_description: '', description: '', location: '', category_id: '', status: 'draft', start_date: '', completion_date: '' });
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce projet ?')) {
      try {
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const openAdd = () => { setEditingId(null); setFormData({ title: '', slug: '', short_description: '', description: '', location: '', category_id: '', status: 'draft', start_date: '', completion_date: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditingId(p.id); setFormData({ title: p.title, slug: p.slug, short_description: p.short_description, description: p.description, location: p.location, category_id: p.category_id, status: p.status, start_date: p.start_date, completion_date: p.completion_date }); setShowModal(true); };

  const statusColors = { draft: 'bg-gray-500/20 text-gray-400', published: 'bg-green-500/20 text-green-400', archived: 'bg-yellow-500/20 text-yellow-400' };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Projets</h1>
            <p className="text-sm text-white/50 mt-1">Gérez vos réalisations</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau projet</Button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : projects.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 text-center"><FolderOpen className="w-12 h-12 text-white/20 mx-auto mb-4" /><p className="text-white/50">Aucun projet pour le moment</p></div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white truncate">{p.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[p.status]}`}>{p.status}</span>
                    </div>
                    <p className="text-sm text-white/60">{p.short_description}</p>
                    <div className="flex items-center gap-3 text-xs text-white/40 mt-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location}</span>
                      {p.start_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.start_date}</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(p)}><Edit className="w-4 h-4 text-white/60" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/realisations/${p.slug}`)}><Eye className="w-4 h-4 text-white/40" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-4">{editingId ? 'Modifier le projet' : 'Nouveau projet'}</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Titre" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Slug (ex: plateforme-600)" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Lieu" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <textarea placeholder="Description courte" value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-h-[80px]" />
                <textarea placeholder="Description complète" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-h-[120px]" />
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>Annuler</Button>
                  <Button variant="primary" onClick={handleSave}>{editingId ? 'Mettre à jour' : 'Envoyer'}</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
