import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, Send, Edit, Trash2, CheckCircle, Clock, Archive, XCircle, Eye, Plus } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Nouveau' | 'En cours' | 'Traité' | 'Archivé';
  created_at: string;
}

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', status: 'Nouveau' as ContactMessage['status'] });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
    const messageChannel = supabase
      .channel('contact_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_messages' }, () => fetchMessages())
      .subscribe();
    const unsubscribe = () => supabase.removeChannel(messageChannel);
    return unsubscribe;
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      let query = supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'Tous') {
        query = query.neq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error) {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Nouveau': 'bg-blue-500/20 text-blue-400',
      'En cours': 'bg-yellow-500/20 text-yellow-400',
      'En attente': 'bg-purple-500/20 text-purple-400',
      'Traité': 'bg-green-500/20 text-green-400',
      'Archivé': 'bg-gray-500/20 text-gray-400',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-500/20 text-gray-400'}`}>{status}</span>;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await supabase.from('contact_messages').update({ status: newStatus }).eq('id', id);
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'Nouveau'
      });
      if (!error) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', email: '', subject: '', message: '' });
        fetchMessages();
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const statusOptions = ['Tous', 'Nouveau', 'En cours', 'En attente', 'Traité', 'Archivé'];

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Messages & Devis</h1>
            <p className="text-sm text-white/50 mt-1">
              Suivez les demandes de contact et de devis
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouveau message
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status === 'Tous' ? 'Tous' : status}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 text-center">
            <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">Aucun message pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{msg.name}</h3>
                      {getStatusBadge(msg.status)}
                    </div>
                    <p className="text-sm text-white/60 mb-1">{msg.subject}</p>
                    <p className="text-sm text-white/40 line-clamp-2">{msg.message}</p>
                    {msg.email && (
                      <p className="text-xs text-white/40 mt-2 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {msg.email}
                      </p>
                    )}
                    {msg.phone && (
                      <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" /> {msg.phone}
                      </p>
                    )}
                    <p className="text-xs text-white/30 mt-2">{new Date(msg.created_at).toLocaleString('fr-FR')}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(msg.id, 'Traité')}
                      title="Marquer comme traité"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(msg.id, 'Archivé')}
                      title="Archiver"
                    >
                      <Archive className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingId(msg.id); setFormData({ name: msg.name, email: msg.email || '', subject: msg.subject, message: msg.message }); setShowModal(true); }}
                      title="Voir/A modifier"
                    >
                      <Edit className="w-4 h-4 text-white/60" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(msg.id, 'Archivé')}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingId ? 'Modifier le message' : 'Nouveau message'}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  type="text"
                  placeholder="Sujet"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-h-[100px]"
                />
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Annuler
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    {editingId ? 'Mettre à jour' : 'Envoyer'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
