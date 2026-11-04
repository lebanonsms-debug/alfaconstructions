import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import type { CmsCategory } from '@/types';

export default function AdminCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CmsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CmsCategory | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    name_fr: '',
    name_en: '',
    description_fr: '',
    description_en: '',
    image_path: '',
    display_order: 0,
    visible: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('cms_categories').select('*').order('display_order');
      if (!error && data) setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        await supabase.from('cms_categories').update(formData).eq('id', editingCategory.id);
      } else {
        await supabase.from('cms_categories').insert(formData);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ slug: '', name_fr: '', name_en: '', description_fr: '', description_en: '', image_path: '', display_order: 0, visible: true });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette catégorie ?')) {
      await supabase.from('cms_categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  const openAdd = () => {
    setEditingCategory(null);
    setFormData({ slug: '', name_fr: '', name_en: '', description_fr: '', description_en: '', image_path: '', display_order: 0, visible: true });
    setShowModal(true);
  };

  const openEdit = (category: CmsCategory) => {
    setEditingCategory(category);
    setFormData({
      slug: category.slug,
      name_fr: category.name_fr,
      name_en: category.name_en,
      description_fr: category.description_fr || '',
      description_en: category.description_en || '',
      image_path: category.image_path || '',
      display_order: category.display_order,
      visible: category.visible,
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Catégories</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les catégories de services</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouvelle catégorie</Button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Nom FR</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Nom EN</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Visible</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-sm text-white">{category.name_fr}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{category.name_en}</td>
                    <td className="px-4 py-3 text-sm text-white/50 font-mono">{category.slug}</td>
                    <td className="px-4 py-3">
                      {category.image_path ? (
                        <img src={category.image_path} alt={category.name_fr} className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white/30" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {category.visible ? (
                        <Eye className="w-4 h-4 text-green-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(category)}><Edit className="w-4 h-4 text-white/60" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
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
                <h3 className="text-lg font-semibold text-white">{editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</h3>
                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Slug</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className={inputClass} placeholder="ex: batiment" />
                </div>
                <div>
                  <label className={labelClass}>Nom (FR)</label>
                  <input type="text" value={formData.name_fr} onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nom (EN)</label>
                  <input type="text" value={formData.name_en} onChange={(e) => setFormData({ ...formData, name_en: e.target.value })} className={inputClass} />
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
                  <label className={labelClass}>Image path</label>
                  <input type="text" value={formData.image_path} onChange={(e) => setFormData({ ...formData, image_path: e.target.value })} className={inputClass} placeholder="/images/category.jpg" />
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
