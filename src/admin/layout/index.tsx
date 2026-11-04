import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { LogOut, LayoutDashboard, FolderOpen, FileText, Image as ImageIcon, Mail, MessageSquare, Settings, Home, Type } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const navItems = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Pages', href: '/admin/pages', icon: FileText },
  { label: 'Catégories', href: '/admin/categories', icon: FolderOpen },
  { label: 'Projets', href: '/admin/projects', icon: FolderOpen },
  { label: 'Services', href: '/admin/services', icon: FileText },
  { label: 'Médias', href: '/admin/media', icon: ImageIcon },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Devis', href: '/admin/quotations', icon: MessageSquare },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
  { label: 'Blocs', href: '/admin/content-blocks', icon: Type },
  { label: 'Hero Slides', href: '/admin/hero-slides', icon: ImageIcon },
];

interface AdminLayoutProps {
  children?: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <Layout noFooter>
        <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
          <div className="text-white">Chargement...</div>
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout noFooter noNavbar>
      <div className="min-h-screen bg-[#0A192F] text-white">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-white font-bold text-xl tracking-tight">
                ALFA<span className="text-[#D4AF37]"> ADMIN</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60 hidden sm:block">
                {user.display_name} ({user.role})
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" /> Site
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0 hidden md:block">
              <div className="bg-[#14263F] rounded-xl border border-white/10 p-4 space-y-1 sticky top-24">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      item.href === '/admin'
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile nav */}
            <div className="md:hidden mb-4 w-full">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#14263F] border border-white/10 text-white/60 hover:text-white text-sm whitespace-nowrap"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {children || <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
