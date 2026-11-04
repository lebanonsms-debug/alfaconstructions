import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X, Type } from 'lucide-react';
import type { CmsContentBlock } from '@/types';

export default function AdminContentBlocks() {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<CmsContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlock, setEditingBlock] = useState<CmsContentBlock | null>(null);
  const [formData, setFormData] = useState({
    block_key: '',
    content_fr: '',
    content_en: '',
    block_type: 'text',
  });

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const { data, error } = await supabase.from('cms_content_blocks').select('*').order('block_key');
      if (!error && data) setBlocks(data);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingBlock) {
        await supabase.from('cms_content_blocks').update(formData).eq('id', editingBlock.id);
      } else {
        await supabase.from('cms_content_blocks').insert(formData);
      }
      setShowModal(false);
      setEditingBlock(null);
      setFormData({ block_key: '', content_fr: '', content_en: '', block_type: 'text' });
      fetchBlocks();
    } catch (error) {
      console.error('Error saving block:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce bloc ?')) {
      await supabase.from('cms_content_blocks').delete().eq('id', id);
      fetchBlocks();
    }
  };

  const openAdd = () => {
    setEditingBlock(null);
    setFormData({ block_key: '', content_fr: '', content_en: '', block_type: 'text' });
    setShowModal(true);
  };

  const openEdit = (block: CmsContentBlock) => {
    setEditingBlock(block);
    setFormData({
      block_key: block.block_key,
      content_fr: block.content_fr || '',
      content_en: block.content_en || '',
      block_type: block.block_type,
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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Blocs de contenu</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les blocs de contenu réutilisables</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau bloc</Button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Clé</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Contenu FR</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Contenu EN</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {blocks.map((block) => (
                  <tr key={block.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-sm text-white font-mono">{block.block_key}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{block.block_type}</td>
                    <td className="px-4 py-3 text-sm text-white/60 max-w-xs truncate">{block.content_fr || '-'}</td>
                    <td className="px-4 py-3 text-sm text-white/60 max-w-xs truncate">{block.content_en || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(block)}><Edit className="w-4 h-4 text-white/60" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(block.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
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
                <h3 className="text-lg font-semibold text-white">{editingBlock ? 'Modifier le bloc' : 'Nouveau bloc'}</h3>
                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Clé du bloc</label>
                  <input type="text" value={formData.block_key} onChange={(e) => setFormData({ ...formData, block_key: e.target.value })} className={inputClass} placeholder="ex: hero.title" />
                </div>
                <div>
                  <label className={labelClass}>Type</label>
                  <select value={formData.block_type} onChange={(e) => setFormData({ ...formData, block_type: e.target.value })} className={inputClass}>
                    <option value="text">Texte</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Contenu (FR)</label>
                  <textarea value={formData.content_fr} onChange={(e) => setFormData({ ...formData, content_fr: e.target.value })} className={inputClass} rows={5} />
                </div>
                <div>
                  <label className={labelClass}>Contenu (EN)</label>
                  <textarea value={formData.content_en} onChange={(e) => setFormData({ ...formData, content_en: e.target.value })} className={inputClass} rows={5} />
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
