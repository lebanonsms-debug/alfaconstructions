import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Plus, Upload, Image as ImageIcon, Trash2, Edit, X, Save } from 'lucide-react';
import type { CmsMedia } from '@/types';

interface ProjectImage {
  id: string;
  caption: string;
  alt_text: string;
  storage_path: string;
  display_order: number;
}

export default function AdminMedia() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<CmsMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ file_name: '', storage_path: '', file_type: '', file_size: 0, caption_fr: '', caption_en: '', alt_text_fr: '', alt_text_en: '', category: 'general', display_order: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
    const channel = supabase
      .channel('project_images')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_images' }, () => fetchFiles())
      .subscribe();
    const unsubscribe = () => {
      supabase.removeChannel(channel);
    };
    return unsubscribe;
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('cms_media').select('*').order('display_order', { ascending: true });
      if (!error) setMedia(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const folder = `cms/${Date.now()}`;
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('alfaconstructions-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setFormData({ file_name: file.name, storage_path: fileName, file_type: file.type, file_size: file.size, caption_fr: '', caption_en: '', alt_text_fr: '', alt_text_en: '', category: 'general', display_order: media.length });
      setShowModal(true);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await supabase.from('cms_media').update(formData).eq('id', editingId);
      } else {
        await supabase.from('cms_media').insert(formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ file_name: '', storage_path: '', file_type: '', file_size: 0, caption_fr: '', caption_en: '', alt_text_fr: '', alt_text_en: '', category: 'general', display_order: 0 });
      fetchFiles();
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce fichier ?')) {
      try {
        await supabase.from('cms_media').delete().eq('id', id);
        fetchFiles();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const openAdd = () => { setEditingId(null); setFormData({ file_name: '', storage_path: '', file_type: '', file_size: 0, caption_fr: '', caption_en: '', alt_text_fr: '', alt_text_en: '', category: 'general', display_order: 0 }); setShowModal(true); };
  const openEdit = (m: CmsMedia) => { setEditingId(m.id); setFormData({ file_name: m.file_name, storage_path: m.storage_path, file_type: m.file_type || '', file_size: m.file_size || 0, caption_fr: m.caption_fr || '', caption_en: m.caption_en || '', alt_text_fr: m.alt_text_fr || '', alt_text_en: m.alt_text_en || '', category: m.category, display_order: m.display_order }); setShowModal(true); };

  const statusColors = { draft: 'bg-gray-500/20 text-gray-400', published: 'bg-green-500/20 text-green-400', archived: 'bg-yellow-500/20 text-yellow-400' };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Médias</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les images et médias de vos projets</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau média</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-8 h-8 text-[#D4AF37]" />
                <span className="text-xs text-white/40">{i + 1}.jpg</span>
              </div>
              <p className="text-sm text-white/60 line-clamp-2">Illustration du projet</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-white/30">1280 x 720</span>
                <span className="text-xs text-white/40">97.2 kB</span>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : media.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 text-center"><ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" /><p className="text-white/50">Aucun média pour le moment</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.map((m) => (
              <div key={m.id} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                {m.storage_path.startsWith('http') ? (
                  <img src={m.storage_path} alt={m.caption_fr || ''} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-white/5 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/20" />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm text-white/80 truncate">{m.file_name}</p>
                  <p className="text-xs text-white/40">{m.category} · {m.file_type?.split('/')[1]?.toUpperCase()}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-white/30">{m.caption_fr || 'Sans titre'}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(m)}><Edit className="w-4 h-4 text-white/60" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(m.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-4">{editingId ? 'Modifier le média' : 'Nouveau média'}</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Nom du fichier" value={formData.file_name} onChange={(e) => setFormData({ ...formData, file_name: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Catégorie" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Légende (FR)" value={formData.caption_fr} onChange={(e) => setFormData({ ...formData, caption_fr: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Alt text (FR)" value={formData.alt_text_fr} onChange={(e) => setFormData({ ...formData, alt_text_fr: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>Annuler</Button>
                  <Button variant="primary" onClick={handleSave}>{editingId ? 'Mettre à jour' : 'Enregistrer'}</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
