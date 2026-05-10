import { BrandMarkStatic } from './BrandMark'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__trust" role="presentation">
        <div className="trust-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="trust-pill__icon">
            <path
              d="M12 21s-6-4.35-6-10a6 6 0 0 1 12 0c0 5.65-6 10-6 10Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M12 11h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Fatto con cura</span>
        </div>
        <div className="trust-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="trust-pill__icon">
            <path
              d="M12 3l2 4 4 .5-3 3 1 4.5L12 17l-4-2.5 1-4.5-3-3 4-.5 2-4Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span>Materiali scelti</span>
        </div>
        <div className="trust-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="trust-pill__icon">
            <path
              d="M4 12a8 8 0 0 1 16 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M8 12h8M12 8v8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span>Resi semplici</span>
        </div>
      </div>

      <div className="site-footer__main">
        <div className="site-footer__brand" id="chi-siamo">
          <BrandMarkStatic />
          <p>
            Abbigliamento morbido e colori naturali per accompagnare ogni
            avventura, dalla nanna al parco.
          </p>
        </div>
        <div className="site-footer__columns">
          <div>
            <h4>Contattaci</h4>
            <p>Chat live</p>
            <p>Supporto email</p>
            <p>+39 000 000 0000</p>
          </div>
          <div>
            <h4>Aiuto</h4>
            <p>FAQ e assistenza</p>
            <p>Ordini e pagamenti</p>
            <p>Spedizioni e resi</p>
          </div>
          <div>
            <h4>Azienda</h4>
            <p>Chi siamo</p>
            <p>Categorie</p>
            <p>Impostazioni</p>
          </div>
          <div>
            <h4>Privacy</h4>
            <p>Informativa privacy</p>
            <p>Termini di servizio</p>
            <p>Preferenze cookie</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
