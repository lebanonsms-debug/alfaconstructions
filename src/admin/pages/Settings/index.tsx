import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Save, Trash2, Globe, Mail, Phone, MapPin, Building, Clock, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    company_name: 'ALFA CONSTRUCTION',
    contact_person: 'Ali Safa',
    job_title: 'Président Directeur Général',
    email_primary: 'ali-safa@alfa-constructions.com',
    email_additional: 'alfa.btp.cg@gmail.com',
    phone: '+242 06 822 22 20',
    address: 'Avenue Docteur Cardorelle, Songolo, Centre-Ville, Boulevard Charles de Gaulle, Immeuble Hôtel Elaïs, République du Congo',
    website: 'www.alfa-constructions.com',
    social_links: '',
    business_hours: 'Lun - Ven: 8h00 - 17h00, Sam: 8h00 - 12h00',
    homepage_content: '',
    footer_content: '',
    seo_defaults: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
    const channel = supabase
      .channel('site_settings')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' }, () => fetchSettings())
      .subscribe();
    const unsubscribe = () => supabase.removeChannel(channel);
    return unsubscribe;
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) {
        setSettings({ ...settings, ...data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { error } = await supabase.from('site_settings').upsert(settings);
      if (!error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        console.error('Error saving settings:', error);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]";
  const labelClass = "block text-sm font-medium text-white/70 mb-1";

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Paramètres</h1>
            <p className="text-sm text-white/50 mt-1">Configurez les détails de votre entreprise</p>
          </div>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
            <Save className={`w-4 h-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Sauvegarde...' : 'Enregistrer les modifications'}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(10)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/2"></div></div>)}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Informations générales</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Nom de l'entreprise</label></div>
                    <div className="w-2/3"><input type="text" value={settings.company_name} onChange={(e) => setSettings({ ...settings, company_name: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Contact</label></div>
                    <div className="w-2/3"><input type="text" value={settings.contact_person} onChange={(e) => setSettings({ ...settings, contact_person: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Titre</label></div>
                    <div className="w-2/3"><input type="text" value={settings.job_title} onChange={(e) => setSettings({ ...settings, job_title: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Email principal</label></div>
                    <div className="w-2/3"><input type="email" value={settings.email_primary} onChange={(e) => setSettings({ ...settings, email_primary: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Email secondaire</label></div>
                    <div className="w-2/3"><input type="email" value={settings.email_additional} onChange={(e) => setSettings({ ...settings, email_additional: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Téléphone</label></div>
                    <div className="w-2/3"><input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Adresse</label></div>
                    <div className="w-2/3"><textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className={inputClass} rows={2} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Site web</label></div>
                    <div className="w-2/3"><input type="text" value={settings.website} onChange={(e) => setSettings({ ...settings, website: e.target.value })} className={inputClass} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Horaires d'ouverture</label></div>
                    <div className="w-2/3"><input type="text" value={settings.business_hours} onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })} className={inputClass} /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contenu du site</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Contenu page accueil</label></div>
                    <div className="w-2/3"><textarea value={settings.homepage_content} onChange={(e) => setSettings({ ...settings, homepage_content: e.target.value })} className={inputClass} rows={6} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Contenu pied de page</label></div>
                    <div className="w-2/3"><textarea value={settings.footer_content} onChange={(e) => setSettings({ ...settings, footer_content: e.target.value })} className={inputClass} rows={3} /></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/3"><label className={labelClass}>Réglages SEO</label></div>
                    <div className="w-2/3"><textarea value={settings.seo_defaults} onChange={(e) => setSettings({ ...settings, seo_defaults: e.target.value })} className={inputClass} rows={4} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {saved && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Modifié avec succès !
          </div>
        )}
      </section>
    </Layout>
  );
}
