import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MapPin, Phone, Mail, Building, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis').max(100),
  company: z.string().max(100).optional(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().max(30).optional(),
  subject: z.string().min(3, 'Le sujet est requis').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions de confidentialité',
  }),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
      } else {
        const error = await response.json();
        alert(error.message || 'Erreur lors de l\'envoi');
      }
    } catch {
      alert('Erreur de connexion. Veuillez réessayer.');
    }
  };

  return (
    <Layout>
      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Contactez-nous
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Une question, un projet en tête ? Parlez-nous de vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Adresse</p>
                    <p className="text-white font-medium">
                      Avenue Docteur Cardorelle, Songolo, Centre-Ville
                      <br />
                      Boulevard Charles de Gaulle, Immeuble Hôtel Elaïs
                      <br />
                      République du Congo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Téléphone</p>
                    <p className="text-white font-medium">+242 06 822 22 20</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Email</p>
                    <p className="text-white font-medium">
                      <a href="mailto:ali-safa@alfa-constructions.com" className="hover:text-[#D4AF37] transition-colors">
                        ali-safa@alfa-constructions.com
                      </a>
                      <br />
                      <a href="mailto:alfa.btp.cg@gmail.com" className="hover:text-[#D4AF37] transition-colors text-white/70 mt-1 block">
                        alfa.btp.cg@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Direction</p>
                    <p className="text-white font-medium">
                      Ali Safa &mdash; Président Directeur Général
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                <Input
                  label="Sujet *"
                  {...register('subject')}
                  error={errors.subject?.message}
                />

                <Textarea
                  label="Message *"
                  {...register('message')}
                  error={errors.message?.message}
                />

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    {...register('privacyConsent')}
                    className="mt-1 rounded border-[#CBD5E1] bg-white focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-white/70">
                    J&apos;accepte les conditions de confidentialité et les politiques de
                    traitement des données.
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
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
