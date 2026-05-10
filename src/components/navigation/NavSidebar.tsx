import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type NavSidebarProps = {
  open: boolean
  onClose: () => void
}

export function NavSidebar({ open, onClose }: NavSidebarProps) {
  const navigate = useNavigate()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeRef.current?.focus(), 50)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const go = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <div
      className={`nav-sidebar-root ${open ? 'is-open' : ''}`}
      aria-hidden={!open}
      inert={!open || undefined}
    >
      <div
        className="nav-sidebar__backdrop"
        role="presentation"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nav-sidebar-title"
        className="nav-sidebar"
      >
        <div className="nav-sidebar__header">
          <h2 id="nav-sidebar-title" className="nav-sidebar__title">
            Menu
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="icon-button icon-button--ghost icon-button--sm nav-sidebar__close"
            aria-label="Chiudi"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="nav-sidebar__body" aria-label="Sezioni sito">
          <button
            type="button"
            className="nav-sidebar__menu-btn"
            onClick={() => go('/chi-siamo')}
          >
            Chi siamo
          </button>
          <button
            type="button"
            className="nav-sidebar__menu-btn"
            onClick={() => go('/marchi')}
          >
            I nostri marchi
          </button>
        </nav>
      </div>
    </div>
  )
}
