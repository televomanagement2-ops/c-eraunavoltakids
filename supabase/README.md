# Backend Supabase (questo progetto)

## Applicare lo schema SQL

Applica **tutte** le migration nella cartella [`migrations/`](migrations/) in ordine di timestamp (o usa la CLI che lo fa automaticamente).

### Opzione A — Supabase CLI

Dalla radice del repository (con CLI installata e progetto linkato):

```bash
supabase db push
```

### Opzione B — Solo dashboard

Dashboard Supabase → **SQL Editor** → per ogni file `*.sql` in `supabase/migrations/`, dal più vecchio al più recente, incolla ed esegui.

File principali:

- [`20260510120000_init.sql`](migrations/20260510120000_init.sql) — schema, RLS, trigger, Storage.
- [`20260511100000_ensure_profile.sql`](migrations/20260511100000_ensure_profile.sql) — funzione `ensure_profile()` per utenti senza riga in `profiles`.
- [`20260511101000_profiles_visible_for_review_authors.sql`](migrations/20260511101000_profiles_visible_for_review_authors.sql) — lettura nomi autori recensioni.

Se PostgreSQL non accetta `EXECUTE FUNCTION` sui trigger, sostituisci con `EXECUTE PROCEDURE` sugli stessi trigger nello script `init`.

## Chiavi nell’app (Vite)

Nella dashboard: **Project Settings → API**:

- copia **Project URL** in `VITE_SUPABASE_URL`
- copia la chiave **`anon`** (non la `service_role` nel frontend) in `VITE_SUPABASE_ANON_KEY`

Usa [.env.example](../.env.example) come modello nella radice di `website/`.

Opzionale: `VITE_USE_CATALOG_MOCK=true` usa i prodotti mock quando la tabella `products` è vuota (solo sviluppo).

## Autenticazione

1. **Authentication → Providers**
   - abilita **Email**
   - abilita **Google** e inserisci Client ID / Client Secret dalla Google Cloud Console (OAuth consent screen tipo “External”; redirect autorizzati come indicato dalla dashboard Supabase).

2. **Authentication → URL configuration**
   - **Site URL**: es. `http://localhost:5173` in sviluppo, poi il dominio di produzione.
   - **Redirect URLs**: includi gli stessi URL (wildcard `http://localhost:5173/**` è comoda in locale) e l’URL di callback che la dashboard propone per OAuth.

3. **Conferma email (sviluppo)**

   In **Authentication → Providers → Email**: se vuoi entrare subito dopo la registrazione senza aprire il link nell’email, disattiva temporaneamente la richiesta di conferma (solo in dev). In produzione lascia la conferma attiva.

4. **Primo amministratore** (dopo la prima registrazione utente)

   In **SQL Editor**, sostituisci l’UUID con quello dell’utente (**Authentication → Users**):

```sql
update public.profiles
set role = 'admin'
where id = '<uuid-utente>';
```

## Problemi comuni (login / sessione)

| Sintomo | Cosa controllare |
|--------|-------------------|
| OAuth/Google ritorna senza sessione | Redirect URL nella dashboard devono corrispondere esattamente al tuo origin (es. `http://localhost:5173`). |
| “Email not confirmed” | Conferma l’email o disattiva conferma in dev (vedi sopra). |
| Accesso ok ma `profiles` mancante | Applica la migration `ensure_profile`; l’app la chiama anche via RPC. Verifica trigger `on_auth_user_created` su `auth.users`. |
| Recensioni senza nomi autori | Applica la migration `profiles_visible_for_review_authors` (policy RLS). |
| Catalogo sempre mock | Tabella `products` vuota: inserisci dati, oppure imposta `VITE_USE_CATALOG_MOCK=true` in dev. |

## Storage

La migration crea i bucket pubblici **`product-images`** e **`avatars`** con policy RLS allineate al piano (`is_admin()` per caricare foto prodotto; cartella nominata come `auth.uid()` per gli avatar).

Gli URL caricati nel bucket pubblico sono quelli da salvare in `products.images` (array di stringhe).

## Note

Il client web usa solo la **`anon`** key: le operazioni admin su catalogo/finanza passano dall’utenza JWT del membro staff con `role = 'admin'`. Non esporre mai la **`service_role`** nell’app Vite.
