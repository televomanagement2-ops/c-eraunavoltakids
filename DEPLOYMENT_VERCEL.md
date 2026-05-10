## Deploy su Vercel (Vite + React Router)

Questa app usa `BrowserRouter` (routing client-side). Per evitare errori 404 su refresh o su link diretti
(`/<route>`), Vercel deve fare rewrite verso `index.html`.

Nel repo è presente `vercel.json` con una rewrite catch-all per tutte le route senza estensione file.

### Impostazioni consigliate su Vercel

In **Project Settings → Build & Output Settings**:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` (default)

### Test rapido dopo il deploy

Apri direttamente in una nuova tab e poi fai refresh (Ctrl+F5):

- `/chi-siamo`
- `/catalogo`
- `/informativa-privacy`
- `/prodotto/<id>`

Se la rewrite è corretta, non devi mai vedere la pagina Vercel “404: NOT_FOUND”.

