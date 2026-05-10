import { PageShell } from '../components/layout/PageShell'

export default function TerminiDiServizio () {
  return (
    <PageShell footerOnMobile>
      <section className="section section--tight-top">
        <div className="section__header">
          <span className="eyebrow">Azienda</span>
          <h1>Termini di servizio</h1>
          <p className="muted">
            Questi Termini regolano l’uso del sito e dei relativi contenuti. Se utilizzi il sito, accetti
            i Termini qui indicati.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Titolare del sito e contatti</h2>
          <p>
            Titolare (ditta individuale):
            {' '}
            <strong>Lorella Trocchi</strong>
            {' '}
            – sede:
            {' '}
            <strong>Via Edoardo Barberini, 24, 05100 Terni TR</strong>
            {' '}
            – CF/P.IVA:
            {' '}
            <strong>[DA COMPILARE]</strong>
            .
          </p>
          <p>
            Email supporto:
            {' '}
            <a href="mailto:ceraunavoltakidz@gmail.com">ceraunavoltakidz@gmail.com</a>
            {' '}
            – Telefono:
            {' '}
            <a href="tel:0744404633">0744 404633</a>
            {' '}
            – Orari: lun–sab 9:30–20:00.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Uso del sito</h2>
          <p>
            Puoi navigare e utilizzare il sito per finalità lecite e personali. È vietato utilizzare il sito per
            attività illecite, tentativi di accesso non autorizzato, o per interferire con il funzionamento
            dell’infrastruttura tecnica.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Account</h2>
          <p>
            Se crei un account, sei responsabile della riservatezza delle credenziali e delle attività effettuate
            tramite il tuo account. In caso di sospetto uso improprio, contattaci.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Contenuti e proprietà intellettuale</h2>
          <p>
            Testi, loghi, grafiche, foto e layout del sito sono protetti da diritti di proprietà intellettuale.
            È vietata la riproduzione, distribuzione o modifica senza autorizzazione, salvo i limiti di legge.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Disponibilità del servizio</h2>
          <p>
            Ci impegniamo a mantenere il sito accessibile, ma non possiamo garantire continuità assoluta. Potrebbero
            verificarsi sospensioni per manutenzione, aggiornamenti o cause non dipendenti da noi.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Limitazioni di responsabilità</h2>
          <p>
            Nei limiti consentiti dalla legge, non siamo responsabili per danni indiretti o conseguenti derivanti
            dall’uso o dall’impossibilità di usare il sito. Nulla in questi Termini limita diritti inderogabili
            del consumatore o responsabilità che non possono essere escluse per legge.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Link a siti terzi</h2>
          <p>
            Il sito può contenere link a siti o servizi di terze parti. Non controlliamo tali risorse e non siamo
            responsabili dei loro contenuti o delle loro politiche.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Modifiche ai Termini</h2>
          <p>
            Possiamo aggiornare questi Termini in qualsiasi momento. Le modifiche entrano in vigore dalla pubblicazione
            su questa pagina. Se continui a usare il sito dopo la pubblicazione, accetti i Termini aggiornati.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Legge applicabile e foro</h2>
          <p>
            I Termini sono regolati dalla legge italiana. Per le controversie con consumatori si applicano le norme
            inderogabili sulla competenza territoriale previste dal Codice del Consumo.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

