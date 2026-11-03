import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { ArrowRight, Landmark, MapPin, Mail, Building, Wrench, Route, Truck, Building2, Award, Users, Globe } from "lucide-react";
import { HeroScrollReveal, AnimatedCrane } from "@/components/animation";
import { AnimatedConstructionSite, AnimatedExcavator, AnimatedDumpTruck, AnimatedBuildingProgress, AnimatedBuildingConstruction } from "@/components/construction-animations";
import { HorizontalScrollBanner, Scroll3DScene, TestimonialsCarousel, ProjectPortfolio, ConstructionTimeline } from "@/components/advanced-animations";
import HeroCarousel from "@/components/HeroCarousel";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const services = [
    { icon: Wrench, title: t("services.carrieres"), desc: t("services.carrieresDesc"), featured: true },
    { icon: Building2, title: t("services.batiment"), desc: t("services.batimentDesc"), featured: false },
    { icon: Route, title: t("services.travauxPublics"), desc: t("services.travauxPublicsDesc"), featured: false },
    { icon: Truck, title: t("services.transport"), desc: t("services.transportDesc"), featured: false },
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

      <HorizontalScrollBanner className="mt-8" />

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                {t("home.servicesTitle")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t("services.title")}
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                {t("home.servicesSubtitle")}
              </p>
            </HeroScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <HeroScrollReveal key={i}>
                <div className="group relative h-full bg-[#14263F] rounded-xl p-6 sm:p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/5 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{service.desc}</p>
                </div>
              </HeroScrollReveal>
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
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                {t("home.realisationsTitle")}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t("home.realisationsTitle")}
              </h2>
              <p className="text-white/60 text-base max-w-2xl mx-auto">
                {t("home.realisationsSubtitle")}
              </p>
            </HeroScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <HeroScrollReveal>
              <Scroll3DScene />
            </HeroScrollReveal>
            <HeroScrollReveal delay={150}>
              <ProjectPortfolio />
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#14263F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <HeroScrollReveal>
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                  {t("home.methodTitle")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {t("home.methodTitle")}
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-4">
                  {t("home.methodText1")}
                </p>
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  {t("home.methodText2")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/${i18n.language}/a-propos`}>
                    <Button variant="primary" size="lg" className="gap-2">
                      {t("home.learnMore")}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to={`/${i18n.language}/services`}>
                    <Button variant="outline" size="lg">
                      <Wrench className="w-4 h-4" /> {t("services.title")}
                    </Button>
                  </Link>
                </div>
              </div>
            </HeroScrollReveal>
            <HeroScrollReveal delay={150}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#0A192F] rounded-3xl" />
                <div className="relative bg-[#0A192F] rounded-3xl p-4 sm:p-6">
                  <AnimatedCrane className="w-full h-auto opacity-50" />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HeroScrollReveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                EN TEMPS RÉEL
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                CHANTIER EN DIRECT
              </h2>
              <p className="text-white/60 text-base">
                Suivez l'avancement de nos projets en temps réel
              </p>
            </HeroScrollReveal>
          </div>
          <div className="max-w-6xl mx-auto">
            <HeroScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <AnimatedConstructionSite className="w-full h-auto" />
                </div>
                <div className="flex flex-col justify-center p-4 sm:p-6">
                  <AnimatedBuildingProgress className="w-full h-auto mb-4" />
                  <AnimatedBuildingConstruction className="w-full h-auto max-h-[300px] object-contain" />
                </div>
              </div>
            </HeroScrollReveal>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />
      <ConstructionTimeline />

      <section className="py-16 sm:py-24 bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HeroScrollReveal>
            <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-2xl bg-[#0A192F]/50 border border-white/10 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4 text-xs font-medium tracking-wide text-white/60">
                  <Mail className="w-3.5 h-3.5 mr-2" />
                  {t("contact.title")}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {t("home.contactTitle")}
                </h2>
                <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
                  {t("home.contactText")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to={`/${i18n.language}/contact`}>
                    <Button variant="primary" size="lg" className="gap-2 min-w-[220px]">
                      <Mail className="w-4 h-4" /> {t("contact.title")}
                    </Button>
                  </Link>
                  <Link to={`/${i18n.language}/a-propos`}>
                    <Button variant="outline" size="lg" className="min-w-[220px]">
                      {t("home.learnMore")}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </HeroScrollReveal>
        </div>
      </section>
    </>
  );
}
