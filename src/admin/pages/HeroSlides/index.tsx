import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, ArrowUp, ArrowDown, Image as ImageIcon, Upload, Link2, Film } from 'lucide-react';
import type { CmsHeroSlide } from '@/types';

export default function AdminHeroSlides() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<CmsHeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<CmsHeroSlide | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [videoPreview, setVideoPreview] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title_fr: '',
    title_en: '',
    description_fr: '',
    description_en: '',
    image_url: '',
    video_url: '',
    display_order: 0,
    visible: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase.from('cms_hero_slides').select('*').order('display_order');
      if (!error && data) setSlides(data);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload: any = { ...formData };
      if (!payload.video_url) delete payload.video_url;

      if (editingSlide) {
        await supabase.from('cms_hero_slides').update(payload).eq('id', editingSlide.id);
      } else {
        await supabase.from('cms_hero_slides').insert(payload);
      }
      setShowModal(false);
      setEditingSlide(null);
      setFormData({ title_fr: '', title_en: '', description_fr: '', description_en: '', image_url: '', video_url: '', display_order: 0, visible: true });
      setImagePreview('');
      setVideoPreview('');
      fetchSlides();
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer ce slide ?')) {
      await supabase.from('cms_hero_slides').delete().eq('id', id);
      fetchSlides();
    }
  };

  const toggleVisibility = async (slide: CmsHeroSlide) => {
    await supabase.from('cms_hero_slides').update({ visible: !slide.visible }).eq('id', slide.id);
    fetchSlides();
  };

  const moveOrder = async (index: number, direction: number) => {
    const newSlides = [...slides];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSlides.length) return;
    const a = newSlides[index]
    const b = newSlides[targetIndex]
    if (!a || !b) return
    newSlides[index] = b
    newSlides[targetIndex] = a
    for (let i = 0; i < newSlides.length; i++) {
      const slide = newSlides[i]
      if (!slide) continue
      slide.display_order = i
    }
    await supabase.from('cms_hero_slides').upsert(newSlides);
    fetchSlides();
  };

  const openAdd = () => {
    setEditingSlide(null);
    setFormData({ title_fr: '', title_en: '', description_fr: '', description_en: '', image_url: '', video_url: '', display_order: slides.length, visible: true });
    setImagePreview('');
    setVideoPreview('');
    setShowModal(true);
  };

  const openEdit = (slide: CmsHeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title_fr: slide.title_fr,
      title_en: slide.title_en,
      description_fr: slide.description_fr,
      description_en: slide.description_en,
      image_url: slide.image_url,
      video_url: slide.video_url || '',
      display_order: slide.display_order,
      visible: slide.visible,
    });
    setImagePreview(slide.image_url || '');
    setVideoPreview(slide.video_url || '');
    setShowModal(true);
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
  const labelClass = "block text-sm font-medium text-white/70 mb-1";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const folder = `hero-slides/${Date.now()}`;
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from('alfaconstructions-uploads')
        .upload(fileName, file);

      if (error) throw error;

      const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/alfaconstructions-uploads/${fileName}`;
      setFormData({ ...formData, image_url: publicUrl });
      setImagePreview(publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const folder = `hero-videos/${Date.now()}`;
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from('alfaconstructions-uploads')
        .upload(fileName, file);

      if (error) throw error;

      const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/alfaconstructions-uploads/${fileName}`;
      setFormData({ ...formData, video_url: publicUrl });
      setVideoPreview(publicUrl);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Hero Carousel</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les 5 slides de la page d'accueil</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau slide</Button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : (
          <div className="space-y-3">
            {slides.map((slide, index) => (
              <div key={slide.id} className="bg-white/5 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-colors">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    {slide.image_url ? (
                      <img src={slide.image_url} alt={slide.title_fr} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-white font-medium">{slide.title_fr}</h3>
                        <p className="text-xs text-white/40">{slide.title_en}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${slide.visible ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {slide.visible ? 'Visible' : 'Masqué'}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2 mb-3">{slide.description_fr}</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(slide)}><Edit className="w-4 h-4 text-white/60" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleVisibility(slide)}>
                        {slide.visible ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => moveOrder(index, -1)} disabled={index === 0}>
                        <ArrowUp className="w-4 h-4 text-white/60" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => moveOrder(index, 1)} disabled={index === slides.length - 1}>
                        <ArrowDown className="w-4 h-4 text-white/60" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(slide.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {slides.length === 0 && (
              <div className="bg-white/5 rounded-xl p-8 text-center">
                <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/50">Aucun slide pour le moment</p>
              </div>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{editingSlide ? 'Modifier le slide' : 'Nouveau slide'}</h3>
                <button onClick={() => setShowModal(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3">
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
                  <label className={labelClass}>Image</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Téléchargement...' : 'Parcourir'}
                      </Button>
                      {(imagePreview || formData.image_url) && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                          <img
                            src={imagePreview || formData.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <input
                        type="text"
                        value={formData.image_url}
                        onChange={(e) => { setFormData({ ...formData, image_url: e.target.value }); setImagePreview(e.target.value); }}
                        className={inputClass}
                        placeholder="/images/hero-batiment.jpg ou URL"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Vidéo (optionnel)</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => videoInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Film className="w-4 h-4 mr-2" />
                        {uploading ? 'Téléchargement...' : 'Parcourir'}
                      </Button>
                      {(videoPreview || formData.video_url) && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-white/5 flex items-center justify-center">
                          <Film className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-white/40 flex-shrink-0" />
                      <input
                        type="text"
                        value={formData.video_url}
                        onChange={(e) => { setFormData({ ...formData, video_url: e.target.value }); setVideoPreview(e.target.value); }}
                        className={inputClass}
                        placeholder="URL vidéo (optionnel)"
                      />
                    </div>
                  </div>
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
