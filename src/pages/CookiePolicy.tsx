import { PageShell } from '../components/layout/PageShell'

export default function CookiePolicy () {
  return (
    <PageShell footerOnMobile>
      <section className="section section--tight-top">
        <div className="section__header">
          <span className="eyebrow">Privacy</span>
          <h1>Cookie policy</h1>
          <p className="muted">
            Questa pagina descrive l’uso dei cookie su questo sito. Al momento utilizziamo
            solo cookie tecnici/necessari (non cookie di profilazione o marketing).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Cosa sono i cookie</h2>
          <p>
            I cookie sono piccoli file di testo che i siti visitati inviano al tuo dispositivo
            (computer, smartphone o tablet) e che vengono memorizzati per poi essere ritrasmessi
            agli stessi siti alla visita successiva. Servono, ad esempio, a far funzionare correttamente
            alcune funzionalità o a ricordare preferenze.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Cookie tecnici/necessari</h2>
          <p>
            I cookie tecnici sono indispensabili per il funzionamento del sito e non richiedono
            il tuo consenso preventivo. Possono includere, ad esempio, cookie per la gestione
            della sessione, la sicurezza e la memorizzazione di preferenze essenziali.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Cookie di analisi e marketing</h2>
          <p>
            Al momento non utilizziamo cookie di analisi (analytics) né cookie di profilazione/marketing.
            Se in futuro dovessimo introdurli, aggiorneremo questa Cookie policy e, ove necessario,
            richiederemo il tuo consenso secondo la normativa applicabile.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Come gestire o disabilitare i cookie</h2>
          <p>
            Puoi configurare il tuo browser per accettare, rifiutare o cancellare i cookie. Le modalità
            variano in base al browser utilizzato (Chrome, Safari, Firefox, Edge). Tieni presente che
            la disabilitazione dei cookie tecnici può compromettere alcune funzionalità del sito.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

