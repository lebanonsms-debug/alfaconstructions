import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, Input, Textarea, Select, Badge, Modal } from '@/components/ui';
import { Settings as SettingsIcon, Save, X, User, Mail, Phone, MapPin, Globe, Clock } from 'lucide-react';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    companyName: 'ALFA CONSTRUCTION',
    contactPerson: 'Ali Safa',
    jobTitle: 'Président Directeur Général',
    email: 'ali-safa@alfa-constructions.com',
    phone: '+242 06 822 22 20',
    address: 'Avenue Docteur Cardorelle, Songolo, Centre-Ville, République du Congo',
    website: 'www.alfa-constructions.com',
    socialLinks: '',
    businessHours: '',
    homepageContent: '',
    footerContent: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Paramètres de l&apos;entreprise
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Gérez les informations de votre entreprise affichées sur le site.
            </p>
          </div>
          <Button variant="secondary" onClick={() => setShowModal(true)}>
            <Save className="w-4 h-4" /> Enregistrer
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations de contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Nom de l'entreprise" value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} />
              <Input label="Nom du contact" value={settings.contactPerson} onChange={(e) => setSettings({ ...settings, contactPerson: e.target.value })} />
              <Input label="Titre" value={settings.jobTitle} onChange={(e) => setSettings({ ...settings, jobTitle: e.target.value })} />
              <Input label="Email" type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
              <Input label="Téléphone" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
              <Input label="Adresse" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
              <Input label="Site web" value={settings.website} onChange={(e) => setSettings({ ...settings, website: e.target.value })} />
              <Input label="Réseaux sociaux" value={settings.socialLinks} onChange={(e) => setSettings({ ...settings, socialLinks: e.target.value })} placeholder="URL séparées par des virgules" />
              <Input label="Horaires d'ouverture" value={settings.businessHours} onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contenu de la home</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                label="Contenu de la home page"
                rows={10}
                placeholder="Contenu éditable de la page d'accueil..."
                value={settings.homepageContent}
                onChange={(e) => setSettings({ ...settings, homepageContent: e.target.value })}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Save Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirmer les modifications"
      >
        <div className="space-y-4">
          <p className="text-sm text-white/70">
            Vos modifications seront enregistrées dans la base de données.
            Souhaitez-vous continuer ?
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4" /> Enregistrer les modifications
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
