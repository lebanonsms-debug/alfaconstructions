const fs = require('fs');
const path = '/c/Users/elielb/alfaconstructions/src/pages/Home/index.tsx';

const content = `import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { fontFamily } from "@/config/brand";
import { ArrowRight, Landmark, MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A192F] pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#14263F] opacity-50 blur-[100px]" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#14263F] opacity-40 blur-[100px]" />
          <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-[#D4AF37] opacity-[0.04] blur-[80px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-xs font-medium text-white/60 tracking-wide">
                Entreprise de batiment & travaux publics
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: fontFamily.heading }}
            >
              Construisons l'avenir,
              <br />
              <span className="text-[#D4AF37]">un projet a la fois.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              ALFA CONSTRUCTION est une entreprise de batiment, de travaux publics,
              de transport et de logistique basée en Republique du Congo.
              Nos equipes expertes realisent des projets de precision, du concept a la
              livraison, pour des resultats a la hauteur de vos attentes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/realisations">
                <Button variant="primary" size="lg" className="gap-2">
                  Découvrir nos projets
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2">
                  Demander un devis
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
}
`;

fs.writeFileSync(path, content, 'utf-8');
console.log('Written:', path);
