import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, Save, X } from 'lucide-react';
import type { CmsPage, CmsSection } from '@/types';

export default function AdminPages() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [editingSections, setEditingSections] = useState<CmsSection[]>([]);
  const [formData, setFormData] = useState({
    slug: '',
    title_fr: '',
    title_en: '',
    description_fr: '',
    description_en: '',
    status: 'published' as 'draft' | 'published' | 'archived',
    display_order: 0,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase.from('cms_pages').select('*').order('display_order');
      if (!error && data) setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingPage) {
        await supabase.from('cms_pages').update(formData).eq('id', editingPage.id);
      } else {
        await supabase.from('cms_pages').insert(formData);
      }
      setShowModal(false);
      setEditingPage(null);
      setFormData({ slug: '', title_fr: '', title_en: '', description_fr: '', description_en: '', status: 'published', display_order: 0 });
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette page ?')) {
      await supabase.from('cms_pages').delete().eq('id', id);
      fetchPages();
    }
  };

  const openAdd = () => {
    setEditingPage(null);
    setFormData({ slug: '', title_fr: '', title_en: '', description_fr: '', description_en: '', status: 'published', display_order: 0 });
    setShowModal(true);
  };

  const openEdit = (page: CmsPage) => {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title_fr: page.title_fr,
      title_en: page.title_en,
      description_fr: page.description_fr || '',
      description_en: page.description_en || '',
      status: page.status,
      display_order: page.display_order,
    });
    setShowModal(true);
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
  const labelClass = "block text-sm font-medium text-white/70 mb-1";

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Pages</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les pages de votre site</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouvelle page</Button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Titre FR</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Titre EN</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Statut</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-sm text-white">{page.title_fr}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{page.title_en}</td>
                    <td className="px-4 py-3 text-sm text-white/50 font-mono">{page.slug}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${page.status === 'published' ? 'bg-green-500/20 text-green-400' : page.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(page)}><Edit className="w-4 h-4 text-white/60" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(page.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{editingPage ? 'Modifier la page' : 'Nouvelle page'}</h3>
                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Slug</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className={inputClass} placeholder="ex: a-propos" />
                </div>
                <div>
                  <label className={labelClass}>Titre (FR)</label>
                  <input type="text" value={formData.title_fr} onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Titre (EN)</label>
                  <input type="text" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Description (FR)</label>
                  <textarea value={formData.description_fr} onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div>
                  <label className={labelClass}>Description (EN)</label>
                  <textarea value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} className={inputClass} rows={3} />
                </div>
                <div>
                  <label className={labelClass}>Statut</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className={inputClass}>
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                    <option value="archived">Archivé</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>Annuler</Button>
                  <Button variant="primary" onClick={handleSave}><Save className="w-4 h-4 mr-2" />Enregistrer</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
