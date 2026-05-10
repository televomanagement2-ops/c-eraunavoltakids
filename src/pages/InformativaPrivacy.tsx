import { PageShell } from '../components/layout/PageShell'

export default function InformativaPrivacy () {
  return (
    <PageShell footerOnMobile>
      <section className="section section--tight-top">
        <div className="section__header">
          <span className="eyebrow">Privacy</span>
          <h1>Informativa privacy</h1>
          <p className="muted">
            Informativa resa ai sensi del Regolamento (UE) 2016/679 (“GDPR”) e della normativa italiana
            applicabile. Il testo è organizzato per sezioni per rendere più semplice la consultazione.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Titolare del trattamento</h2>
          <p>
            Il Titolare del trattamento è la ditta individuale:
            {' '}
            <strong>Lorella Trocchi</strong>
            {' '}
            con sede in
            {' '}
            <strong>Via Edoardo Barberini, 24, 05100 Terni TR</strong>
            {' '}
            (CF/P.IVA:
            {' '}
            <strong>[DA COMPILARE]</strong>
            ).
          </p>
          <p>
            Per richieste privacy puoi scrivere a:
            {' '}
            <a href="mailto:ceraunavoltakidz@gmail.com">ceraunavoltakidz@gmail.com</a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Quali dati trattiamo</h2>
          <p>
            A seconda dei servizi utilizzati, possiamo trattare:
          </p>
          <ul>
            <li><strong>Dati di account</strong> (es. email e credenziali di accesso) quando ti registri/accedi.</li>
            <li><strong>Dati di contatto</strong> (es. nome, contenuto del messaggio) se ci scrivi tramite la sezione Contattaci.</li>
            <li><strong>Dati tecnici</strong> (es. log, indirizzo IP, identificativi di sessione) necessari al funzionamento e alla sicurezza del sito.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Finalità e basi giuridiche</h2>
          <ul>
            <li>
              <strong>Gestione dell’account e autenticazione</strong>
              {' '}
              (creazione account, login, gestione sessione).
              {' '}
              Base giuridica: esecuzione di misure precontrattuali/contratto (art. 6.1.b GDPR).
            </li>
            <li>
              <strong>Assistenza e richieste di contatto</strong>
              {' '}
              (rispondere alle richieste inviate).
              {' '}
              Base giuridica: legittimo interesse del Titolare a gestire le richieste (art. 6.1.f GDPR) e/o misure precontrattuali (art. 6.1.b GDPR) a seconda del caso.
            </li>
            <li>
              <strong>Sicurezza e prevenzione abusi</strong>
              {' '}
              (monitoraggio tecnico, prevenzione frodi, sicurezza applicativa).
              {' '}
              Base giuridica: legittimo interesse (art. 6.1.f GDPR).
            </li>
            <li>
              <strong>Adempimenti di legge</strong>
              {' '}
              (quando applicabile, es. obblighi contabili/fiscali connessi a vendite).
              {' '}
              Base giuridica: obbligo legale (art. 6.1.c GDPR).
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Modalità del trattamento e misure di sicurezza</h2>
          <p>
            I dati sono trattati con strumenti informatici e organizzativi idonei a garantire un livello
            di sicurezza adeguato, anche mediante misure volte a prevenire accessi non autorizzati,
            divulgazione, modifica o distruzione non consentita.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Destinatari e fornitori</h2>
          <p>
            Possiamo comunicare i dati a fornitori che operano come responsabili del trattamento
            (art. 28 GDPR) per servizi tecnici indispensabili (es. hosting, piattaforme di autenticazione
            e database). In base alla configurazione attuale del sito, può essere utilizzato un fornitore
            cloud per autenticazione e gestione dati (es. Supabase).
          </p>
          <p>
            L’elenco aggiornato dei responsabili può essere richiesto contattando il Titolare ai recapiti indicati.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Trasferimenti extra SEE</h2>
          <p>
            Se alcuni fornitori trattano dati al di fuori dello Spazio Economico Europeo, il trasferimento avviene
            nel rispetto del GDPR (es. decisioni di adeguatezza o Clausole Contrattuali Standard e misure supplementari,
            ove necessarie). In caso di dubbi puoi richiedere maggiori informazioni al Titolare.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Tempi di conservazione</h2>
          <ul>
            <li><strong>Dati account</strong>: per il tempo necessario a mantenere l’account attivo; in caso di richiesta di cancellazione, saranno eliminati o anonimizzati salvo obblighi di legge.</li>
            <li><strong>Richieste di contatto</strong>: per il tempo necessario a gestire la richiesta e, di norma, fino a 12 mesi per esigenze organizzative e tutela dei diritti.</li>
            <li><strong>Log tecnici e sicurezza</strong>: per il tempo strettamente necessario e secondo i tempi tecnici del fornitore/hosting, salvo necessità di accertamento di illeciti.</li>
          </ul>
          
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Diritti dell’interessato</h2>
          <p>
            Puoi esercitare i diritti previsti dagli artt. 15–22 GDPR (accesso, rettifica, cancellazione, limitazione,
            portabilità, opposizione) contattando il Titolare. Hai inoltre diritto di proporre reclamo al
            {' '}
            <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Garante per la protezione dei dati personali</a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Aggiornamenti</h2>
          <p>
            Potremmo aggiornare periodicamente questa informativa. Ti invitiamo a consultarla regolarmente per
            rimanere informato su eventuali modifiche.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

