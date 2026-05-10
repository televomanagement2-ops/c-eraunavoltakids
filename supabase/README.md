# Backend Supabase (questo progetto)

## Applicare lo schema SQL

### Opzione A — Supabase CLI

Dalla radice del repository (con CLI installata e progetto linkato):

```bash
supabase db push
```

oppure copia/incolla [`migrations/20260510120000_init.sql`](migrations/20260510120000_init.sql) nell’editor SQL della dashboard.

### Opzione B — Solo dashboard

Dashboard Supabase → **SQL Editor** → **New query** → incolla il contenuto di `supabase/migrations/20260510120000_init.sql` → **Run**.

## Chiavi nell’app (Vite)

Nella dashboard: **Project Settings → API**:

- copia **Project URL** in `VITE_SUPABASE_URL`
- copia la chiave **`anon`** (non la `service_role` nel frontend) in `VITE_SUPABASE_ANON_KEY`

Usa [.env.example](../.env.example) come modello nella radice di `website/`.

## Autenticazione

1. **Authentication → Providers**
   - abilita **Email**
   - abilita **Google** e inserisci Client ID / Client Secret dalla Google Cloud Console (OAuth consent screen tipo “External”; redirect autorizzati come indicato dalla dashboard Supabase).

2. **Authentication → URL configuration**
   - **Site URL**: es. `http://localhost:5173` in sviluppo, poi il dominio di produzione.
   - **Redirect URLs**: includi gli stessi URL (wildcard `http://localhost:5173/**` è comoda in locale) e l’URL di callback che la dashboard propone per OAuth.

3. **Primo amministratore** (dopo la prima registrazione utente)

   In **SQL Editor**, sostituisci l’UUID con quello dell’utente (**Authentication → Users**):

```sql
update public.profiles
set role = 'admin'
where id = '<uuid-utente>';
```

## Storage

La migration crea i bucket pubblici **`product-images`** e **`avatars`** con policy RLS allineate al piano (`is_admin()` per caricare foto prodotto; cartella nominata come `auth.uid()` per gli avatar).

Gli URL caricati nel bucket pubblico sono quelli da salvare in `products.images` (array di stringhe).

## Note

Il client web usa solo la **`anon`** key: le operazioni admin su catalogo/finanza passano dall’utenza JWT del membro staff con `role = 'admin'`. Non esporre mai la **`service_role`** nell’app Vite.
