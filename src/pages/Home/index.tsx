import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { Mail } from "lucide-react";
import { HeroScrollReveal } from "@/components/animation";
import { AnimatedConstructionSite, AnimatedBuildingProgress, AnimatedBuildingConstruction } from "@/components/construction-animations";
import HeroCarousel from "@/components/HeroCarousel";
import { useTranslation } from "react-i18next";
import { useCmsCategories } from "@/hooks/useCms";

export default function Home() {
  const { t, i18n } = useTranslation();
  const { categories } = useCmsCategories();
  const isFr = i18n.language.startsWith('fr');

  const services = categories.length > 0
    ? categories.map((cat) => ({
        image: cat.image_path || '/images/hero-batiment.jpg',
        title: isFr ? (cat.name_fr || cat.name_en) : (cat.name_en || cat.name_fr),
        desc: isFr ? (cat.description_fr || cat.description_en) : (cat.description_en || cat.description_fr),
        slug: cat.slug,
      }))
    : [
        { image: '/images/hero-batiment.jpg', title: t('services.batiment'), desc: t('services.batimentDesc'), slug: 'batiment' },
        { image: '/images/hero-travaux-publics.jpg', title: t('services.travauxPublics'), desc: t('services.travauxPublicsDesc'), slug: 'travaux-publics' },
        { image: '/images/hero-transport.jpg', title: t('services.transport'), desc: t('services.transportDesc'), slug: 'transport' },
        { image: '/images/hero-earthworks.jpg', title: 'Terrassement & Engins', desc: 'Préparation de sites, bulldozers, excavateurs et engins de chantier.', slug: 'terrassement' },
        { image: 'https://images.pexels.com/photos/15391048/pexels-photo-15391048.jpeg?w=1920&q=80', title: t('services.rigMontage'), desc: t('services.rigMontageDesc'), slug: 'rig-montage' },
      ];

  const stats = [
    { value: "50+", label: t("home.stats.projects") },
    { value: "30+", label: t("home.stats.services") },
    { value: "15+", label: t("home.stats.experience") },
    { value: "100%", label: t("home.stats.client") },
  ];

  return (
    <>
      <HeroCarousel />

      <section className="py-8 sm:py-12 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
              {t("home.servicesTitle")}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t("services.title")}
            </h2>
            <p className="text-white/60 text-base max-w-2xl mx-auto">
              {t("home.servicesSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <div className="relative h-full bg-[#14263F] rounded-xl overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 hover:-translate-y-1">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14263F] via-[#14263F]/50 to-transparent" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#D4AF37] transition-colors">{service.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{service.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <HeroScrollReveal key={i}>
                <div className="text-center p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2 group hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 font-medium uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </HeroScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-[#D4AF37]">
              EN TEMPS RÉEL
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              CHANTIER EN DIRECT
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto">
              Suivez l'avancement de nos projets en temps réel
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
              <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#14263F] p-3">
                <AnimatedConstructionSite className="w-full h-auto" />
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-[#14263F] p-4 sm:p-5">
                  <div className="text-xs font-medium text-white/50 tracking-wider mb-2">PROJET ACTUEL</div>
                  <div className="text-white font-semibold text-lg mb-3">Plateforme 600 — Brazzaville</div>
                  <div className="text-xs font-medium text-white/50 tracking-wider mb-1">AVANCEMENT</div>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">20%</div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-[#D4AF37] h-2 rounded-full transition-all duration-500" style={{ width: '20%' }} />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#14263F] p-4 sm:p-5">
                  <div className="text-xs font-medium text-white/50 tracking-wider mb-3">PHASE ACTUELLE</div>
                  <div className="flex flex-wrap gap-2">
                    {['Terrain', 'Fondations', 'Murs', 'Toiture', 'Terminé'].map((step) => (
                      <span
                        key={step}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          step === 'Fondations'
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30'
                            : 'bg-white/5 text-white/60 border-white/10'
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-[#14263F] p-4">
                    <AnimatedBuildingProgress className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#14263F] p-4 flex items-center justify-center">
                    <AnimatedBuildingConstruction className="w-full h-auto max-h-[180px] object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {t("home.contactTitle")}
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto mb-6">
              {t("home.contactText")}
            </p>
            <Link to={`/${i18n.language}/contact`}>
              <Button variant="primary" size="lg" className="min-w-[220px]">
                <Mail className="w-4 h-4" /> {t("contact.title")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
