# First Step Bebe – Admin Patch (Decap CMS + JSON)
Acest patch îți adaugă un panou `/admin` (Decap CMS) și un fișier de date `content/products.json` pe care front‑endul îl poate citi direct.

## 1) Ce include
- `admin/index.html` – pornește Decap CMS
- `admin/config.yml` – configurat cu Git Gateway și o colecție „Produse” (un singur fișier JSON)
- `content/products.json` – inițial gol (`{ "items": [] }`)
- `assets/uploads/` – folder pentru imagini încărcate din CMS
- `js/loadProducts.js` – script care încarcă și afișează produsele
- `css/products.css` – stiluri de bază pentru grid

## 2) Pași de instalare
1. Copiază folderele `admin/`, `content/`, `assets/`, `js/`, `css/` în rădăcina proiectului tău.
2. Fă commit & push pe `main` în GitHub.
3. În Netlify: **Identity → Enable Identity**, apoi **Settings → Identity → Services → Enable Git Gateway**.
4. În **Identity → Invite users**, trimite-ți invitație pe email și accept-o.
5. După deploy, intră la `https://<site-ul-tau>.netlify.app/admin` → adaugă/editează produse → **Publish**.

## 3) Conectează front‑endul
- Adaugă în pagina unde listezi produsele:
  ```html
  <link rel="stylesheet" href="/css/products.css">
  <div id="products-grid" class="products-grid"></div>
  <script src="/js/loadProducts.js"></script>
  ```

## 4) Cum arată structura produsului
Fiecare produs are câmpuri:
- `title` (string)
- `sku` (string)
- `price` (number, TVA inclus)
- `pack10` (boolean – implicit true)
- `sizes` (listă de obiecte `{ size: "..." }`)
- `colors` (listă de obiecte `{ color: "..." }`)
- `images` (listă de URL‑uri imagine)
- `description` (text, opțional)

## 5) Verificări dacă „nu apare pe site”
- GitHub: s-a actualizat `content/products.json` după Publish?
- Netlify → Deploys: există deploy nou?
- Poți accesa direct `https://<site>.netlify.app/content/products.json`?
- Reîncarcă pagina cu Ctrl+F5 / golește cache‑ul.

## 6) Notă despre securitate
`/admin` este accesibil doar cu autentificare Netlify Identity. Nu publica linkul sau contul.
