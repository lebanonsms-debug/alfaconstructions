import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui';
import {
  BarChart3, FolderOpen, FileText, Mail, MessageSquare, Settings, ArrowUp, ArrowDown, Plus, Edit, Trash2, Eye, EyeOff
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    { id: '1', title: 'Plateforme 600', status: 'published', updatedAt: '2026-10-25' },
    { id: '2', title: 'Route d\'accès', status: 'draft', updatedAt: '2026-10-20' },
    { id: '3', title: 'Carrière de granulats', status: 'published', updatedAt: '2026-10-15' },
  ]);
  const [messages, setMessages] = useState([
    { id: '1', name: 'Jean Dupont', email: 'jean@exemple.com', subject: 'Devis', status: 'Nouveau', createdAt: '2026-10-28' },
    { id: '2', name: 'Marie Curie', email: 'marie@exemple.com', subject: 'Projets publics', status: 'En cours', createdAt: '2026-10-27' },
  ]);

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Tableau de bord
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Vue d&apos;ensemble de vos activités et statuts.
            </p>
          </div>
          <Button variant="secondary">
            <Plus className="w-4 h-4" /> Nouveau projet
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-white/50">Projets publiés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="text-xs text-white/50">Brouillons</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">2</p>
                  <p className="text-xs text-white/50">Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4</p>
                  <p className="text-xs text-white/50">Services actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projets récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        p.status === 'published' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        <FolderOpen className={`w-4 h-4 ${p.status === 'published' ? 'text-green-400' : 'text-yellow-400'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{p.title}</p>
                        <p className="text-xs text-white/40">Mis à jour le {p.updatedAt}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      p.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-md hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-white">{m.name}</p>
                      <p className="text-xs text-white/40">{m.subject}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        m.status === 'Nouveau' ? 'bg-blue-500/20 text-blue-400' :
                        m.status === 'En cours' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {m.status}
                      </span>
                      <Button size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-sm text-white/40">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </section>
    </Layout>
  );
}
