import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, Input, Textarea, Select, Badge, Modal } from '@/components/ui';
import { Upload, Image as ImageIcon, Trash2, Save, X } from 'lucide-react';

export default function AdminMedia() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([
    { id: '1', name: 'plateforme-600-01.jpg', type: 'image', size: '2.4 MB', url: '/api/media/1', caption: 'Avant les travaux', alt: 'Avant les travaux' },
    { id: '2', name: 'plateforme-600-02.jpg', type: 'image', size: '1.8 MB', url: '/api/media/2', caption: 'Mobilisation', alt: 'Mobilisation' },
  ]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    // In production, upload to Supabase Storage
    setUploading(false);
    setShowUpload(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    // In production, upload to Supabase Storage
    setUploading(false);
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Gestion des médias
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Gérez les images et documents de votre entreprise.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setShowUpload(true)}>
            <Upload className="w-4 h-4" /> Télécharger
          </Button>
        </div>

        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/20 hover:border-white/40'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-white/40" />
              <p className="text-sm text-white/60">
                {uploading ? 'Upload en cours...' : 'Glissez-déposez des fichiers ici ou cliquez pour sélectionner'}
              </p>
              <p className="text-xs text-white/40">PNG, JPG, WEBP jusqu'à 10MB</p>
            </div>
          </label>
        </div>

        {/* File Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {files.map((f) => (
            <div key={f.id} className="relative group bg-white/5 rounded-xl overflow-hidden">
              <img
                src={f.url}
                alt={f.alt}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="w-3 h-3 text-red-400" />
                </Button>
              </div>
              <div className="p-3">
                <p className="text-sm text-white font-medium truncate">{f.name}</p>
                <p className="text-xs text-white/50">{f.size}</p>
                {f.caption && (
                  <p className="text-xs text-white/70 mt-1">{f.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
