import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <Layout>
      <section className="py-20 sm:py-24 bg-[#0A192F] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-white/60 text-xl mb-8">
            La page que vous recherchez n&apos;existe pas.
          </p>
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A192F] font-semibold rounded-md hover:bg-[#E8C94A] transition-colors">
              <Home className="w-4 h-4" /> Retour à l'accueil
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
