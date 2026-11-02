import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'

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

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/apropos" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/services/carrieres" element={<Layout><Carrieres /></Layout>} />
        <Route path="/services/batiment" element={<Layout><Batiment /></Layout>} />
        <Route path="/services/transport" element={<Layout><Transport /></Layout>} />
        <Route path="/services/bureau-etude" element={<Layout><BureauEtude /></Layout>} />
        <Route path="/realisations" element={<Layout><Projects /></Layout>} />
        <Route path="/realisations/:slug" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/plateforme-600" element={<Layout><Plateforme600 /></Layout>} />
        <Route path="/devis" element={<Layout><Quotation /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/politique-confidentialite" element={<Layout noFooter><Privacy /></Layout>} />
        <Route path="/mentions-legales" element={<Layout noFooter><Legal /></Layout>} />
        <Route path="/faq" element={<Layout><Faq /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />

        {/* Admin routes */}
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
