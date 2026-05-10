import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { shopShelfChips } from '../../data/mockProducts'
import { BrandMarkLink } from './BrandMark'

type DesktopNavProps = {
  onOpenSidebar: () => void
}

export function DesktopNav({ onOpenSidebar }: DesktopNavProps) {
  const navigate = useNavigate()
  const { status, profile } = useAuth()
  const signedIn = status === 'signedIn'
  const [search, setSearch] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) {
      params.set('search', search.trim())
    }
    navigate(`/catalogo?${params.toString()}`)
  }

  return (
    <header className="nav-desktop">
      <div className="nav-desktop__top">
        <div className="nav-desktop__leading">
          <button
            type="button"
            className="icon-button icon-button--ghost icon-button--sm nav-desktop__menu"
            aria-label="Apri menu"
            onClick={onOpenSidebar}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <BrandMarkLink />
        </div>
        <form className="nav-search nav-search--desktop" onSubmit={onSubmit}>
          <svg
            className="nav-search__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 16l5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Cerca nel catalogo"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" className="button button--primary nav-search__submit">
            Cerca
          </button>
        </form>
        <div className="nav-desktop__right">
          <nav className="nav-links nav-links--inline">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/catalogo">Catalogo</NavLink>
          </nav>
          <div className="nav-utilities">
            {profile?.role === 'admin' ? (
              <Link
                to="/admin"
                className="button button--ghost button--compact nav-utilities__admin"
              >
                Admin
              </Link>
            ) : null}
            <Link
              to="/login"
              className="icon-button icon-button--ghost"
              title={signedIn ? 'Il tuo account' : 'Accedi'}
              aria-label={signedIn ? 'Vai all’account' : 'Accedi al profilo'}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-desktop__chips">
        {shopShelfChips.map((chip) => {
          const baseClass = chip.saleStyle
            ? 'chip chip--sale'
            : chip.variant === 'soft'
              ? 'chip chip--soft'
              : 'chip'

          if (chip.anchor && chip.key === 'chi-siamo') {
            return (
              <button
                key={chip.key}
                type="button"
                className={baseClass}
                onClick={() => navigate('/chi-siamo')}
              >
                {chip.label}
              </button>
            )
          }

          if (chip.anchor) {
            return (
              <a key={chip.key} href={chip.anchor} className={`${baseClass} chip--link`}>
                {chip.label}
              </a>
            )
          }

          if (chip.nuovi) {
            return (
              <button
                key={chip.key}
                type="button"
                className={baseClass}
                onClick={() => navigate(`/catalogo?nuovi=1`)}
              >
                {chip.label}
              </button>
            )
          }

          if (chip.saldi) {
            return (
              <button
                key={chip.key}
                type="button"
                className={baseClass}
                onClick={() => navigate(`/catalogo?saldi=1`)}
              >
                {chip.label}
              </button>
            )
          }

          return (
            <button
              key={chip.key}
              type="button"
              className={baseClass}
              onClick={() =>
                navigate(
                  `/catalogo?category=${encodeURIComponent(chip.category!)}`,
                )
              }
            >
              {chip.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
