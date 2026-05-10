import { Link } from 'react-router-dom'
import { PageShell } from '../components/layout/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <section className="section">
        <h2>Pagina non trovata</h2>
        <p className="muted">
          La pagina che cerchi non esiste o e stata spostata.
        </p>
        <Link to="/" className="button button--primary">
          Torna alla home
        </Link>
      </section>
    </PageShell>
  )
}
