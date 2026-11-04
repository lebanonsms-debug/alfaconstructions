import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Select } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { MapPin, Mail, Phone, FileText, Send } from 'lucide-react';

const quotationSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().max(30).optional(),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  projectLocation: z.string().min(3, 'La localisation du projet est requise').max(200),
  projectDescription: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(5000),
  desiredStartDate: z.string().max(50).optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions de confidentialité',
  }),
});

export default function Quotation() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof quotationSchema>>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      projectLocation: '',
      projectDescription: '',
      desiredStartDate: '',
      privacyConsent: false,
    },
  });

  const serviceOptions = [
    { value: '', label: 'Sélectionnez un service' },
    { value: 'carrieres', label: 'Exploitation de Carrières' },
    { value: 'batiment', label: 'Bâtiment & Travaux Publics' },
    { value: 'transport', label: 'Transport & Logistique' },
    { value: 'bureau-etude', label: "Bureau d'Étude" },
  ];

  const onSubmit = async (data: z.infer<typeof quotationSchema>) => {
    try {
      const { error } = await supabase.from('quotation_requests').insert({
        name: data.name,
        company: data.company || '',
        email: data.email,
        phone: data.phone || '',
        service_id: data.service,
        project_location: data.projectLocation,
        project_description: data.projectDescription,
        desired_start_date: data.desiredStartDate || '',
      });
      if (error) throw error;
      reset();
      alert('Demande de devis envoyée avec succès ! Nous vous contacterons sous 48h.');
    } catch {
      alert('Erreur de connexion. Veuillez réessayer.');
    }
  };

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-6">
              <FileText className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">Devis gratuit</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Demande de renseignements
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Décrivez votre projet et recevez une proposition personnalisée sous 48h.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-[#14263F] p-6 sm:p-8 rounded-2xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nom complet *"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Entreprise (optionnel)"
                    {...register('company')}
                    error={errors.company?.message}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                  <Input
                    label="Téléphone (optionnel)"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                </div>

                <Select
                  label="Service souhaité *"
                  options={serviceOptions}
                  {...register('service')}
                  error={errors.service?.message}
                />

                <Input
                  label="Localisation du projet *"
                  {...register('projectLocation')}
                  error={errors.projectLocation?.message}
                />

                <Textarea
                  label="Description du projet *"
                  {...register('projectDescription')}
                  error={errors.projectDescription?.message}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Date de début souhaitée (optionnel)"
                    type="date"
                    {...register('desiredStartDate')}
                    error={errors.desiredStartDate?.message}
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    {...register('privacyConsent')}
                    className="mt-1 rounded border-[#CBD5E1] bg-white focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-white/70">
                    J'accepte les conditions de confidentialité et les politiques de traitement des données.
                  </label>
                </div>

                {errors.privacyConsent && (
                  <p className="text-xs text-red-500">{errors.privacyConsent.message}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" /> Envoyer la demande
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-[#14263F] rounded-2xl p-6 border border-white/5 space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-4">Contact direct</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Téléphone</p>
                        <p className="text-white font-medium">+242 06 822 22 20</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Email</p>
                        <p className="text-white font-medium">ali-safa@alfa-constructions.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/50">Adresse</p>
                        <p className="text-white font-medium text-sm">Avenue Docteur Cardorelle, Songolo, Congo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
