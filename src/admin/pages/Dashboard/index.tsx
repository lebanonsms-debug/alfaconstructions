import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import {
  BarChart3, FolderOpen, FileText, Mail, MessageSquare, Settings, Users, PenTool, TrendingUp, Clock, CheckCircle, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0, services: 0, messages: 0, quotations: 0, totalProjects: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
    const projectChannel = supabase
      .channel('projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => fetchStats())
      .subscribe();
    const messageChannel = supabase
      .channel('contact_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchStats())
      .subscribe();
    const quotationChannel = supabase
      .channel('quotations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotation_requests' }, () => fetchStats())
      .subscribe();
    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(quotationChannel);
    };
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [projRes, servRes, msgRes, quoRes] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('quotation_requests').select('*', { count: 'exact', head: true })
      ]);
      setStats({
        projects: projRes.count || 0,
        services: servRes.count || 0,
        messages: msgRes.count || 0,
        quotations: quoRes.count || 0,
        totalProjects: projRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const statCards = [
    { label: 'Projets', value: stats.projects, icon: FolderOpen },
    { label: 'Services', value: stats.services, icon: PenTool },
    { label: 'Messages', value: stats.messages, icon: Mail },
    { label: 'Devis', value: stats.quotations, icon: MessageSquare },
  ];

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Tableau de bord</h1>
            <p className="text-sm text-white/50 mt-1">Vue d'ensemble de votre entreprise</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchStats()}>
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Rafraîchir
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/admin/messages')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-8 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statCards.map((card, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#0A192F]">
                      <card.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">{card.label}</p>
                      <p className="text-2xl font-bold text-white">{card.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-semibold text-white">Activité récente</h3>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white/80">
                        <span className="font-medium text-white">Projets</span> mise à jour
                      </p>
                    </div>
                    <span className="text-xs text-white/40">2 min</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
