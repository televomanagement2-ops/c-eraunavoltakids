import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import AboutStore from './pages/AboutStore'
import Brands from './pages/Brands'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import InformativaPrivacy from './pages/InformativaPrivacy'
import TerminiDiServizio from './pages/TerminiDiServizio'
import CookiePolicy from './pages/CookiePolicy'
import { AdminLayout } from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCatalog from './pages/admin/Catalog'
import AdminFinance from './pages/admin/Finance'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/chi-siamo" element={<AboutStore />} />
        <Route path="/marchi" element={<Brands />} />
        <Route path="/login" element={<Login />} />
        <Route path="/informativa-privacy" element={<InformativaPrivacy />} />
        <Route path="/termini-di-servizio" element={<TerminiDiServizio />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/prodotto/:productId" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="catalogo" element={<AdminCatalog />} />
          <Route path="finanza" element={<AdminFinance />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
