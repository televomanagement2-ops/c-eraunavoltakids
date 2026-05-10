import type { ReactNode } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { DesktopNav } from '../navigation/DesktopNav'
import { MobileHeader } from '../navigation/MobileHeader'
import { NavSidebar } from '../navigation/NavSidebar'
import { BottomTabs } from '../navigation/BottomTabs'
import { SiteFooter } from '../navigation/SiteFooter'

type PageShellProps = {
  children: ReactNode
  showFooter?: boolean
  /** Mostra il footer anche sotto viewport mobile (es. Chi siamo). */
  footerOnMobile?: boolean
}

export function PageShell({ children, showFooter = true, footerOnMobile = false }: PageShellProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const showFooterBlock = showFooter && (isDesktop || footerOnMobile)

  const shellClass =
    footerOnMobile ? 'app-shell app-shell--footer-mobile' : 'app-shell'

  const showPageBackBar = pathname !== '/'

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <div className={shellClass}>
      <NavSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {isDesktop ? (
        <DesktopNav onOpenSidebar={() => setSidebarOpen(true)} />
      ) : (
        <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />
      )}
      <main className="app-main">
        {showPageBackBar ? (
          <div className="page-back-bar">
            <button type="button" className="page-back-bar__btn" onClick={goBack} aria-label="Torna indietro">
              <svg className="page-back-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M15 7l-6 6 6 6M9 13h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="page-back-bar__label">Indietro</span>
            </button>
          </div>
        ) : null}
        {children}
      </main>
      {showFooterBlock ? <SiteFooter /> : null}
      {!isDesktop ? <BottomTabs /> : null}
    </div>
  )
}
