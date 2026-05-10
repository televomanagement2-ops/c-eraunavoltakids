import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAdminMode } from '../../context/AdminModeContext'
import { BrandMarkStatic } from '../navigation/BrandMark'

export function AdminLayout () {
  const { profile, user, signOut } = useAuth()
  const { isAdmin, toggleAdmin } = useAdminMode()

  const displayName =
    profile?.full_name?.trim()
    ?? user?.email?.split('@')[0]
    ?? 'Staff'
  const avatarLetter = displayName.slice(0, 1).toUpperCase()
  const showDevExit = import.meta.env.DEV

  if (!isAdmin) {
    return (
      <section className="admin-locked">
        <div className="admin-locked__card">
          <p className="admin-locked__label">Area riservata</p>
          <h2>Accesso negato</h2>
          <p>
            Questa sezione e dedicata allo staff. Continua lo shopping sulla
            vetrina pubblica.
          </p>
          <Link to="/" className="button button--primary">
            Torna alla home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <BrandMarkStatic />
          <span className="admin-badge">ADMIN</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end>
            Panoramica
          </NavLink>
          <NavLink to="/admin/catalogo">Catalogo</NavLink>
          <NavLink to="/admin/finanza">Finanza</NavLink>
        </nav>
        <div className="admin-profile">
          <div className="admin-avatar">{avatarLetter}</div>
          <div>
            <p>{displayName}</p>
            <span>{profile?.role === 'admin' ? 'ADMIN' : 'DEV'}</span>
          </div>
        </div>
        <button type="button" className="button button--ghost" onClick={() => void signOut()}>
          Disconnetti
        </button>
        {showDevExit ? (
          <button type="button" className="button button--ghost" onClick={toggleAdmin}>
            Toggle modalità admin (solo dev)
          </button>
        ) : null}
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}
