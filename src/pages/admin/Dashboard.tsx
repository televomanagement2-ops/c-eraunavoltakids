export default function AdminDashboard() {
  return (
    <section className="admin-page">
      <header className="admin-page__header">
        <div>
          <span className="eyebrow">ADMIN</span>
          <h2>Centro di comando</h2>
          <p>Ciao Filippo. Rivedi ordini, aggiorna stock e chiudi la giornata.</p>
        </div>
        <button type="button" className="button button--ghost">
          Focus giornaliero
        </button>
      </header>
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Ordini oggi</h3>
          <p className="admin-card__value">42</p>
          <span className="muted">+12% vs ieri</span>
        </div>
        <div className="admin-card">
          <h3>Nuovi arrivi</h3>
          <p className="admin-card__value">18</p>
          <span className="muted">Drop in arrivo</span>
        </div>
        <div className="admin-card">
          <h3>Esauriti</h3>
          <p className="admin-card__value">6</p>
          <span className="muted">Da riordinare</span>
        </div>
      </div>
      <div className="admin-highlight">
        <div>
          <span className="eyebrow">IN EVIDENZA</span>
          <h3>Selezione fresca per il tuo prossimo ordine</h3>
          <p>Scopri prodotti di tendenza e mantieni lo shopping semplice.</p>
        </div>
        <div className="admin-highlight__actions">
          <button type="button" className="button button--primary">
            Acquista ora
          </button>
          <button type="button" className="button button--ghost">
            Vai al carrello
          </button>
        </div>
      </div>
    </section>
  )
}
