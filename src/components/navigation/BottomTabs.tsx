import { NavLink } from 'react-router-dom'

export function BottomTabs() {
  return (
    <nav className="bottom-tabs">
      <NavLink to="/" end className="bottom-tabs__item">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Home
      </NavLink>
      <NavLink to="/catalogo" className="bottom-tabs__item">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
        Catalogo
      </NavLink>
      <NavLink to="/login" className="bottom-tabs__item">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 12a4 4 0 1 0-0.01 0z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 20a8 8 0 0 1 16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
        Profilo
      </NavLink>
    </nav>
  )
}
