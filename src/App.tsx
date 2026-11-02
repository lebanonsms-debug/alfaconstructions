import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

// Pages
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Carrieres from '@/pages/Services/Carrieres'
import Batiment from '@/pages/Services/Batiment'
import Transport from '@/pages/Services/Transport'
import BureauEtude from '@/pages/Services/BureauEtude'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Plateforme600 from '@/pages/Plateforme600'
import Quotation from '@/pages/Quotation'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import Legal from '@/pages/Legal'
import Faq from '@/pages/Faq'
import NotFound from '@/pages/NotFound'

// Admin
import AdminLayout from '@/admin/layout'
import AdminDashboard from '@/admin/pages/Dashboard'
import AdminProjects from '@/admin/pages/Projects'
import AdminServices from '@/admin/pages/Services'
import AdminMedia from '@/admin/pages/Media'
import AdminMessages from '@/admin/pages/Messages'
import AdminQuotations from '@/admin/pages/Quotations'
import AdminSettings from '@/admin/pages/Settings'
import AdminLogin from '@/admin/pages/Login'

function LangRoute({ lang, children }: { lang: string; children: React.ReactNode }) {
  const { i18n } = useTranslation();
  useEffect(() => { i18n.changeLanguage(lang); }, [lang, i18n]);
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Root redirect to French */}
        <Route path="/" element={<Navigate to="/fr/" replace />} />

        {/* French routes */}
        <Route path="/fr" element={<Navigate to="/fr/" replace />} />
        <Route path="/fr/" element={
          <LangRoute lang="fr"><Layout><Home /></Layout></LangRoute>
        } />
        <Route path="/fr/a-propos" element={<LangRoute lang="fr"><Layout><About /></Layout></LangRoute>} />
        <Route path="/fr/services" element={<LangRoute lang="fr"><Layout><Services /></Layout></LangRoute>} />
        <Route path="/fr/services/carrieres" element={<LangRoute lang="fr"><Layout><Carrieres /></Layout></LangRoute>} />
        <Route path="/fr/services/batiment" element={<LangRoute lang="fr"><Layout><Batiment /></Layout></LangRoute>} />
        <Route path="/fr/services/transport" element={<LangRoute lang="fr"><Layout><Transport /></Layout></LangRoute>} />
        <Route path="/fr/services/bureau-etude" element={<LangRoute lang="fr"><Layout><BureauEtude /></Layout></LangRoute>} />
        <Route path="/fr/realisations" element={<LangRoute lang="fr"><Layout><Projects /></Layout></LangRoute>} />
        <Route path="/fr/realisations/:slug" element={<LangRoute lang="fr"><Layout><ProjectDetail /></Layout></LangRoute>} />
        <Route path="/fr/plateforme-600" element={<LangRoute lang="fr"><Layout><Plateforme600 /></Layout></LangRoute>} />
        <Route path="/fr/devis" element={<LangRoute lang="fr"><Layout><Quotation /></Layout></LangRoute>} />
        <Route path="/fr/contact" element={<LangRoute lang="fr"><Layout><Contact /></Layout></LangRoute>} />
        <Route path="/fr/politique-de-confidentialite" element={<LangRoute lang="fr"><Layout noFooter><Privacy /></Layout></LangRoute>} />
        <Route path="/fr/mentions-legales" element={<LangRoute lang="fr"><Layout noFooter><Legal /></Layout></LangRoute>} />
        <Route path="/fr/faq" element={<LangRoute lang="fr"><Layout><Faq /></Layout></LangRoute>} />

        {/* English routes */}
        <Route path="/en" element={<Navigate to="/en/" replace />} />
        <Route path="/en/" element={
          <LangRoute lang="en"><Layout><Home /></Layout></LangRoute>
        } />
        <Route path="/en/about" element={<LangRoute lang="en"><Layout><About /></Layout></LangRoute>} />
        <Route path="/en/services" element={<LangRoute lang="en"><Layout><Services /></Layout></LangRoute>} />
        <Route path="/en/services/quarry" element={<LangRoute lang="en"><Layout><Carrieres /></Layout></LangRoute>} />
        <Route path="/en/services/building" element={<LangRoute lang="en"><Layout><Batiment /></Layout></LangRoute>} />
        <Route path="/en/services/transport" element={<LangRoute lang="en"><Layout><Transport /></Layout></LangRoute>} />
        <Route path="/en/services/engineering" element={<LangRoute lang="en"><Layout><BureauEtude /></Layout></LangRoute>} />
        <Route path="/en/projects" element={<LangRoute lang="en"><Layout><Projects /></Layout></LangRoute>} />
        <Route path="/en/projects/:slug" element={<LangRoute lang="en"><Layout><ProjectDetail /></Layout></LangRoute>} />
        <Route path="/en/platform-600" element={<LangRoute lang="en"><Layout><Plateforme600 /></Layout></LangRoute>} />
        <Route path="/en/quote" element={<LangRoute lang="en"><Layout><Quotation /></Layout></LangRoute>} />
        <Route path="/en/contact" element={<LangRoute lang="en"><Layout><Contact /></Layout></LangRoute>} />
        <Route path="/en/privacy" element={<LangRoute lang="en"><Layout noFooter><Privacy /></Layout></LangRoute>} />
        <Route path="/en/legal" element={<LangRoute lang="en"><Layout noFooter><Legal /></Layout></LangRoute>} />
        <Route path="/en/faq" element={<LangRoute lang="en"><Layout><Faq /></Layout></LangRoute>} />

        {/* 404 */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />

        {/* Admin routes (no language prefix) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
        <Route path="/admin/media" element={<AdminLayout><AdminMedia /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
        <Route path="/admin/quotations" element={<AdminLayout><AdminQuotations /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
