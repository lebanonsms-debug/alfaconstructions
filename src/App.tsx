import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout'

// Pages
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import Contact from '@/pages/Contact'
import Privacy from '@/pages/Privacy'
import Legal from '@/pages/Legal'
import Faq from '@/pages/Faq'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/apropos" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/realisations" element={<Layout><Projects /></Layout>} />
        <Route path="/realisations/:slug" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/politique-confidentialite" element={<Layout noFooter><Privacy /></Layout>} />
        <Route path="/mentions-legales" element={<Layout noFooter><Legal /></Layout>} />
        <Route path="/faq" element={<Layout><Faq /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
