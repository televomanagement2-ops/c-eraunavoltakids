import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { shopShelfChips } from '../../data/mockProducts'
import { BrandMarkLink } from './BrandMark'

type MobileHeaderProps = {
  onOpenSidebar: () => void
}

export function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) {
      params.set('search', search.trim())
    }
    navigate(`/catalogo?${params.toString()}`)
    setSearchOpen(false)
  }

  return (
    <header className="nav-mobile">
      <div className="nav-mobile__top">
        <button
          type="button"
          className="icon-button icon-button--ghost icon-button--sm"
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
        <BrandMarkLink className="nav-brand--mobile" />
        <div className="nav-utilities nav-utilities--mobile">
          <button
            type="button"
            className={`icon-button icon-button--ghost icon-button--sm ${searchOpen ? 'is-active' : ''}`}
            title="Cerca"
            aria-label="Apri ricerca nel catalogo"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`nav-mobile__search ${searchOpen ? 'is-open' : ''}`}>
        <form className="nav-search nav-search--mobile" onSubmit={onSubmit}>
          <svg className="nav-search__icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16 16l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Cerca nel catalogo"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Cerca nel catalogo"
          />
          <button type="submit" className="button button--primary button--compact">
            Ok
          </button>
        </form>
      </div>
      <div className="nav-scroll-chips">
        {shopShelfChips.map((chip) => {
          const baseClass =
            chip.saleStyle
              ? 'chip chip--mobile chip--sale'
              : chip.variant === 'soft'
                ? 'chip chip--mobile chip--soft'
                : 'chip chip--mobile'

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
