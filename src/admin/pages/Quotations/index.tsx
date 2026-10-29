import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Plus, Edit, Trash2, CheckCircle, Clock, Archive, XCircle } from 'lucide-react';

export default function AdminQuotations() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', service_id: '', project_location: '', project_description: '', estimated_budget: '', desired_start_date: '', status: 'Nouveau' });

  useEffect(() => {
    fetchQuotes();
    const channel = supabase
      .channel('quotations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotation_requests' }, () => fetchQuotes())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      let query = supabase.from('quotation_requests').select('*').order('created_at', { ascending: false });
      if (statusFilter !== 'Tous') {
        query = query.neq('status', statusFilter);
      }
      const { data, error } = await query;
      if (!error) setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await supabase.from('quotation_requests').update(formData).eq('id', editingId);
      } else {
        await supabase.from('quotation_requests').insert(formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', company: '', email: '', phone: '', service_id: '', project_location: '', project_description: '', estimated_budget: '', desired_start_date: '', status: 'Nouveau' });
      fetchQuotes();
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await supabase.from('quotation_requests').update({ status: newStatus }).eq('id', id);
      fetchQuotes();
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce devis ?')) {
      try {
        await supabase.from('quotation_requests').delete().eq('id', id);
        fetchQuotes();
      } catch (error) {
        console.error('Error deleting quote:', error);
      }
    }
  };

  const openAdd = () => { setEditingId(null); setFormData({ name: '', company: '', email: '', phone: '', service_id: '', project_location: '', project_description: '', estimated_budget: '', desired_start_date: '', status: 'Nouveau' }); setShowModal(true); };
  const openEdit = (q) => { setEditingId(q.id); setFormData({ name: q.name, company: q.company, email: q.email, phone: q.phone, service_id: q.service_id, project_location: q.project_location, project_description: q.project_description, estimated_budget: q.estimated_budget, desired_start_date: q.desired_start_date, status: q.status }); setShowModal(true); };

  const statusColors = { 'Nouveau': 'bg-blue-500/20 text-blue-400', 'En cours': 'bg-yellow-500/20 text-yellow-400', 'Traité': 'bg-green-500/20 text-green-400', 'Archivé': 'bg-gray-500/20 text-gray-400' };

  const statusOptions = ['Tous', 'Nouveau', 'En cours', 'Traité', 'Archivé'];

  return (
    <Layout>
      <section className="py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Devis</h1>
            <p className="text-sm text-white/50 mt-1">Gérez les demandes de devis</p>
          </div>
          <Button variant="primary" size="sm" onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Nouveau devis</Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {statusOptions.map((status) => (
            <Button key={status} variant={statusFilter === status ? 'primary' : 'outline'} size="sm" onClick={() => setStatusFilter(status)}>{status}</Button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse"><div className="h-4 bg-white/10 rounded mb-2"></div><div className="h-3 bg-white/10 rounded w-1/3"></div></div>)}</div>
        ) : quotes.length === 0 ? (
          <div className="bg-white/5 rounded-xl p-8 text-center"><MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" /><p className="text-white/50">Aucun devis pour le moment</p></div>
        ) : (
          <div className="space-y-3">
            {quotes.map((q) => (
              <div key={q.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{q.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[q.status] || ''}`}>{q.status}</span>
                    </div>
                    <p className="text-sm text-white/60 mb-1">{q.project_description}</p>
                    <p className="text-xs text-white/40">{q.project_location}</p>
                    {q.estimated_budget && <p className="text-xs text-white/40 mt-1">Budget estimé : {q.estimated_budget}</p>
                    }
                    <p className="text-xs text-white/40 mt-2">{new Date(q.created_at).toLocaleString('fr-FR')}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(q.id, 'Traité')}><CheckCircle className="w-4 h-4 text-green-400" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleStatusChange(q.id, 'Archivé')}><XCircle className="w-4 h-4 text-red-400" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(q)}><Edit className="w-4 h-4 text-white/60" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(q.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
            <div className="bg-[#0A192F] rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-4">{editingId ? 'Modifier le devis' : 'Nouveau devis'}</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Nom" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Entreprise" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Téléphone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <input type="text" placeholder="Localisation du projet" value={formData.project_location} onChange={(e) => setFormData({ ...formData, project_location: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <textarea placeholder="Description du projet" value={formData.project_description} onChange={(e) => setFormData({ ...formData, project_description: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] min-h-[80px]" />
                <input type="text" placeholder="Budget estimé" value={formData.estimated_budget} onChange={(e) => setFormData({ ...formData, estimated_budget: e.target.value })} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]" />
                <div className="flex gap-2 justify-end mt-4">
                  <Button variant="outline" onClick={() => setShowModal(false)}>Annuler</Button>
                  <Button variant="primary" onClick={handleSave}>{editingId ? 'Mettre à jour' : 'Envoyer'}</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
