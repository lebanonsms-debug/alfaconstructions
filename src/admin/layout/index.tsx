import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/navbar';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { LogOut, LayoutDashboard, FolderOpen, FileText, Image as ImageIcon, Mail, MessageSquare, Settings, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Projets', href: '/admin/projects', icon: FolderOpen },
  { label: 'Services', href: '/admin/services', icon: FileText },
  { label: 'Médias', href: '/admin/media', icon: ImageIcon },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
  { label: 'Devis', href: '/admin/quotations', icon: MessageSquare },
  { label: 'Paramètres', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // logout logic here
    navigate('/');
  };

  return (
    <Layout noFooter>
      <div className="min-h-screen bg-[#0A192F] text-white">
        <Navbar />
        <div className="pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="w-full lg:w-64 flex-shrink-0">
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

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
