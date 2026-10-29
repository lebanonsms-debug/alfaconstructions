import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { PenTool, Plus, Edit, Trash2, Eye, X, Save, Gateway, Globe, Shop } from 'lucide-react';

export default function AdminServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', short_description: '', description: '', image_path: '', status: 'draft' });

  useEffect(() => {
    fetchServices();
    const channel = supabase
      .channel('services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => fetchServices())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (!error) setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await supabase.from('services').update(formData).eq('id', editingId);
      } else {
        await supabase.from('services').insert(formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ title: '', slug: '', short_description: '', description: '', image_path: '', status: 'draft' });
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce service ?')) {
      try {
        await supabase.from('services').delete().eq('id', id);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const openAdd = () => { setEditingId(null); setFormData({ title: '', slug: '', short_description: '', description: '', image_path: '', status: 'draft' }); setShowModal(true); };
  const openEdit = (s) => { setEditingId(s.id); setFormData({ title: s.title, slug: s.slug, short_description: s.short_description, description: s.description, image_path: s.image_path, status: s.status }); setShowModal(true); };

  const statusColors = { draft: 'bg-gray-500/20 text-gray-400', published: 'bg-green-500/20 text-green-400', archived: 'bg-yellow-500/20 text-yellow-400' };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Services</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les services de votre entreprise</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau service</Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 text-center"><Shop className="w-12 h-12 text-white/20 mx-auto mb-4" /><p className="text-white/50">Aucun service pour le moment</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[#0A192F]"><PenTool className="w-5 h-5 text-[#D4AF37]" /></div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(s)}><Edit className="w-4 h-4 text-white/60" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                  </div>
                </div>
                <h3 className="font-semibold text-white truncate">{s.title}</h3>
                <p className="text-xs text-white/40 mt-1 line-clamp-2">{s.short_description}</p>
                <span className={`mt-2 px-2 py-1 rounded-full text-xs ${statusColors[s.status] || ''}`}>{s.status}</span>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-4">{editingId ? 'Modifier le service' : 'Nouveau service'}</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Titre" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Slug (ex: plomberie)" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Description courte" value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <textarea placeholder="Description complète" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-h-[100px]" />
                <input type="text" placeholder="Image path (optional)" value={formData.image_path} onChange={(e) => setFormData({ ...formData, image_path: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
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
