import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import AboutStore from './pages/AboutStore'
import Brands from './pages/Brands'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { AdminLayout } from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminCatalog from './pages/admin/Catalog'
import AdminFinance from './pages/admin/Finance'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
