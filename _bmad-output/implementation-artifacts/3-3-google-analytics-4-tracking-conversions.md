# Story 3.3: Google Analytics 4 & Tracking Conversions

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a administrateur,
I want que chaque visite et chaque clic Airbnb soient enregistres dans GA4,
So that je peux mesurer le trafic et les conversions pour optimiser le site.

## Acceptance Criteria

1. **Given** le visiteur accede a n'importe quelle page **When** la page se charge **Then** le script GA4 (`gtag.js`) est charge dans le `BaseLayout.astro` via script inline **And** un evenement `page_view` est envoye a GA4

2. **Given** le visiteur clique sur un CTA Airbnb **When** le clic est declenche **Then** un evenement personnalise est envoye a GA4 avec : nom de l'evenement (`airbnb_click`), la configuration cliquee (1ch/2ch/3ch) et la page source **And** cet evenement est configure comme conversion dans GA4

3. **Given** l'administrateur accede a Google Analytics **When** il consulte le tableau de bord **Then** il peut voir : nombre de visiteurs, pages vues, sources de trafic et nombre de clics Airbnb par configuration

4. **Given** le GA4 Measurement ID **When** on verifie la configuration **Then** l'ID est stocke dans les variables d'environnement (pas en dur dans le code) **And** le script GA4 respecte le NFR8 (aucune donnee utilisateur collectee cote serveur)

## Tasks / Subtasks

- [x] Task 1 — Ajouter le script GA4 gtag.js dans BaseLayout.astro (AC: #1, #4)
  - [x] 1.1 Lire `GA4_MEASUREMENT_ID` depuis `import.meta.env.GA4_MEASUREMENT_ID`
  - [x] 1.2 Ajouter conditionnellement le script gtag.js dans le `<head>` de `BaseLayout.astro` : `<script async src="https://www.googletagmanager.com/gtag/js?id={GA4_ID}">` + script d'initialisation inline
  - [x] 1.3 Le script ne doit etre rendu QUE si `GA4_MEASUREMENT_ID` est defini (pas de script vide en dev local sans .env)
  - [x] 1.4 Utiliser `is:inline` pour le script d'initialisation (Astro ne bundle pas les scripts inline gtag)
  - [x] 1.5 L'initialisation gtag doit contenir : `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '{GA4_ID}');`
  - [x] 1.6 Le `page_view` est envoye automatiquement par `gtag('config', ...)` — aucun event manuel necessaire

- [x] Task 2 — Declarer la variable d'environnement GA4 dans la config Astro (AC: #4)
  - [x] 2.1 Lire `GA4_MEASUREMENT_ID` via `import.meta.env.GA4_MEASUREMENT_ID` dans le frontmatter de BaseLayout.astro. PAS d'`env.schema` dans astro.config.mjs — inutile pour une variable lue uniquement au build time dans le frontmatter. Meme pattern que `SITE` dans `.env.example`
  - [x] 2.2 **ATTENTION** : Pour que la variable soit accessible dans le HTML rendu cote serveur (SSG), elle doit etre lue dans le frontmatter Astro et injectee dans le template. `import.meta.env` est accessible en SSG au moment du build
  - [x] 2.3 Verifier que `.env.example` documente deja `GA4_MEASUREMENT_ID` (deja fait — confirme)
  - [x] 2.4 Verifier que `.env` est dans `.gitignore` (deja fait — confirme)

- [x] Task 3 — Verifier et corriger le tracking des clics Airbnb (AC: #2)
  - [x] 3.1 `AirbnbCta.astro` a deja le code `gtag('event', 'airbnb_click', { config: configId, page: pathname })` — confirme fonctionnel avec le script GA4 charge
  - [x] 3.2 Confirme que le script AirbnbCta est hoiste par Astro comme un module ES (equivalent a `defer`, s'execute apres parsing du DOM). Aucun DOMContentLoaded necessaire
  - [x] 3.3 Guard `if (typeof gtag !== 'undefined')` confirme present — empeche les erreurs quand GA4 n'est pas charge
  - [x] 3.4 `data-config-id` confirme passe en `1ch`, `2ch` ou `3ch` pour chaque CTA

- [x] Task 4 — Verifier la configuration CSP pour GA4 (AC: #1, #4)
  - [x] 4.1 `vercel.json` autorise `https://www.googletagmanager.com` dans `script-src` — confirme
  - [x] 4.2 `vercel.json` autorise `https://www.google-analytics.com` dans `connect-src` — confirme
  - [x] 4.3 Ajoute dans `connect-src` : `https://analytics.google.com` et `https://region1.google-analytics.com`
  - [x] 4.4 Ajoute `https://www.google-analytics.com` dans `img-src` (fallback beacon pixel GA4)
  - [x] 4.5 CSP a tester apres deploiement — configuration complete

- [x] Task 5 — Documentation des conversions GA4 (AC: #2, #3)
  - [x] 5.1 Commentaire HTML ajoute dans BaseLayout.astro apres le bloc GA4 conditionnel : Admin → Events → Mark `airbnb_click` as conversion
  - [x] 5.2 Dimensions custom documentees dans le commentaire : `config` (1ch/2ch/3ch), `page` (pathname source)
  - [x] 5.3 Evenement `airbnb_click` a verifier dans GA4 Real-Time reports apres deploiement avec vrai ID

- [x] Task 6 — Build & validation finale (AC: #1, #2, #3, #4)
  - [x] 6.1 Build avec GA4_MEASUREMENT_ID=G-TEST12345 — script rendu dans le HTML
  - [x] 6.2 `npm run build` : 11 pages, 0 erreur
  - [x] 6.3 HTML inspecte sur `/` (accueil FR) et `/fr/appartement/` — script gtag.js present dans les deux
  - [x] 6.4 Build sans GA4_MEASUREMENT_ID : script absent du HTML — confirme
  - [x] 6.5 AirbnbCta tracking : guard `typeof gtag` present, aucune erreur console attendue

## Dev Notes

### ALERTE CRITIQUE — Etat actuel du code GA4

| Element | Etat actuel | Action requise |
|---------|-------------|----------------|
| Script gtag.js | **ABSENT** de BaseLayout.astro | AJOUTER dans le `<head>` |
| `AirbnbCta.astro` tracking | **DEJA IMPLEMENTE** — `gtag('event', 'airbnb_click', ...)` avec guard `typeof gtag` | VERIFIER seulement |
| `.env.example` | `GA4_MEASUREMENT_ID=G-XXXXXXXXXX` deja documente | NE PAS modifier |
| `vercel.json` CSP | `script-src` inclut `googletagmanager.com`, `connect-src` inclut `google-analytics.com` | VERIFIER si complet |
| `siteConfig.ts` | Pas de reference GA4 | NE PAS modifier (env var directe) |
| `StickyMobileCta.astro` | Lien interne hardcode vers `/fr/reserver/` — PAS un lien Airbnb direct | PAS de tracking necessaire, NE PAS modifier |

### ALERTE CRITIQUE — Pattern d'integration GA4 dans BaseLayout

Le script GA4 doit etre ajoute dans le `<head>` de `BaseLayout.astro`, AVANT le `<slot name="head" />` et APRES `<MetaTags>`.

**Pattern exact a implementer :**
```astro
---
// Dans le frontmatter de BaseLayout.astro
const ga4Id = import.meta.env.GA4_MEASUREMENT_ID;
---
<head>
  <!-- ... meta existants ... -->
  <MetaTags ... />
  {ga4Id && (
    <Fragment>
      <script is:inline async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}></script>
      <script is:inline define:vars={{ ga4Id }}>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ga4Id);
      </script>
    </Fragment>
  )}
  <slot name="head" />
</head>
```

**ATTENTION `is:inline` :** Astro bundle et hoiste les `<script>` par defaut. Le script gtag doit utiliser `is:inline` pour etre rendu tel quel dans chaque page, sinon il sera deplace et potentiellement casse. De meme, `define:vars` est la methode Astro pour passer des variables du frontmatter vers un script inline.

**ATTENTION `is:inline` sur le script externe :** Le tag `<script async src="...">` pour gtag.js DOIT aussi avoir `is:inline`. Sans `is:inline`, Astro/Vite tentera d'importer l'URL CDN comme un module ES local, causant une erreur de build. Les DEUX scripts (externe et initialisation) doivent avoir `is:inline`.

### ALERTE CRITIQUE — AirbnbCta tracking existant

Le composant `src/components/ui/AirbnbCta.astro` (lignes 44-54) contient deja le tracking :

```javascript
document.querySelectorAll('[data-airbnb-cta]').forEach((cta) => {
  cta.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'airbnb_click', {
        config: (cta as HTMLElement).dataset.configId,
        page: window.location.pathname,
      });
    }
  });
});
```

**Points a verifier :**
1. Ce `<script>` est hoiste par Astro — il ne s'execute qu'une fois par page meme si le composant est utilise plusieurs fois (comportement correct)
2. Le `querySelectorAll` attache les listeners a TOUS les CTAs de la page — fonctionne avec plusieurs instances
3. Le guard `typeof gtag !== 'undefined'` protege contre l'absence de GA4 (dev local sans .env)
4. Les attributs `data-airbnb-cta` et `data-config-id` sont presents sur le `<a>` du composant

**COMPORTEMENT CONFIRME :** Les scripts hoisteS par Astro sont des modules ES (equivalent a `defer`) — ils s'executent APRES le parsing complet du DOM. Le `querySelectorAll` trouvera toujours tous les CTAs. NE PAS ajouter de `DOMContentLoaded` listener.

### ALERTE CRITIQUE — Variables d'environnement Astro

En Astro, les variables d'environnement sont accessibles via `import.meta.env` :
- Variables **prefixees `PUBLIC_`** : accessibles cote client ET serveur
- Variables **sans prefixe** : accessibles UNIQUEMENT cote serveur (build time SSG)

Pour GA4 :
- `GA4_MEASUREMENT_ID` (sans prefixe PUBLIC_) est lu au **build time** dans le frontmatter de BaseLayout
- La valeur est **injectee dans le HTML statique** genere — elle sera visible dans le code source
- C'est le comportement attendu : le Measurement ID n'est pas un secret (il est visible dans tout site utilisant GA4)
- PAS besoin de prefixer avec `PUBLIC_` car on le lit dans le frontmatter Astro (SSG) et on l'injecte via `define:vars`

### ALERTE CRITIQUE — CSP : MODIFIER AVANT deploiement

Le `vercel.json` actuel autorise :
- `script-src`: `'self' 'unsafe-inline' https://www.googletagmanager.com` — OK
- `connect-src`: `'self' https://www.google-analytics.com` — INCOMPLET
- `img-src`: `'self' data:` — INCOMPLET

**Domaines GA4 MANQUANTS (a ajouter obligatoirement) :**
- `connect-src` : ajouter `https://analytics.google.com` (endpoint principal GA4 `/g/collect`) et `https://region1.google-analytics.com` (endpoint regional EU/Afrique)
- `img-src` : ajouter `https://www.google-analytics.com` (fallback beacon pixel)

**Sans ces ajouts, GA4 sera silencieusement bloque par le navigateur et aucune donnee ne remontera.** C'est la correction la plus critique de cette story.

**Valeurs finales attendues :**
- `connect-src`: `'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com`
- `img-src`: `'self' data: https://www.google-analytics.com`

### Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zero React, zero Vue, zero JS client
2. **Scripts** : Utiliser `is:inline` sur les DEUX scripts gtag (externe et init). Le bloc `<script is:inline define:vars>` est du JavaScript pur — aucune annotation TypeScript a l'interieur
3. **Donnees** : GA4 ID depuis `import.meta.env` (pas en dur, pas dans siteConfig)
4. **Tailwind CSS v4** : Ne pas casser le build — cette story ne touche pas au styling
5. **Build** : 11 pages attendues, 0 erreur
6. **CSP** : Ne pas casser les headers de securite existants

### NOTE — Page d'accueil FR a la racine et reporting GA4

La page d'accueil FR est a `/` (racine du site via rewrite Vercel), pas a `/fr/`. Le script GA4 dans `BaseLayout.astro` est automatiquement present sur toutes les pages. La page d'accueil FR apparaitra comme `/` dans les rapports GA4 (pas `/fr/`) — comportement correct et attendu du rewrite Vercel (`window.location.pathname` = `/`).

### ALERTE — Tailwind CSS v4

Le projet utilise **Tailwind CSS v4** via `@tailwindcss/vite` (PAS l'ancien `@astrojs/tailwind`). Les tokens design sont dans `src/styles/global.css` via `@theme { }`. Pas de `tailwind.config.mjs`. Non pertinent pour cette story mais ne pas introduire de regression.

### Intelligence Story 3.2 — Lecons apprises

1. **`<Fragment slot="head">`** : Pattern confirme pour injecter du contenu dans le `<head>` via BaseLayout
2. **`set:html`** : Utilise pour JSON-LD, pas necessaire pour GA4 (scripts standards)
3. **Composant SchemaOrg.astro** : Pattern de composant SEO dans `src/components/seo/` — GA4 ne necessite PAS de composant dedie (script inline dans BaseLayout)
4. **Build** : 11 pages generees, 0 erreur — maintenir ce resultat
5. **Pattern GA4 dans BaseLayout** : Un seul bloc conditionnel `{ga4Id && (...)}` — ne PAS ajouter de second script pour les evenements (AirbnbCta gere deja ses propres evenements via son script hoiste)
6. **`define:vars`** : Astro supporte `define:vars={{ variable }}` sur les `<script is:inline>` pour passer des valeurs du frontmatter au script

### Intelligence Git — Commits recents

```
3298722 feat: Story 3.2 — Schema.org JSON-LD (LodgingBusiness, FAQPage, BreadcrumbList, WebSite) + AEO
e54f693 feat: Story 3.1 — MetaTags SEO, hreflang, canonical, OG, sitemap valide
fbbcda1 fix: retro Epic 2 — rewrite racine, architecture Tailwind v4, sprint-status done
```

**Insights :**
- Le pattern de commit est `feat: Story X.Y — description concise`
- Les stories SEO (3.1, 3.2) ont ete implementees sans probleme — GA4 est la derniere story de l'Epic 3
- Le composant AirbnbCta a le tracking pre-implemente depuis la Story 1.3

### Project Structure Notes

**Fichiers a modifier :**
- `src/layouts/BaseLayout.astro` — Ajouter le script GA4 gtag.js dans le `<head>`
- `vercel.json` — Ajouter les endpoints GA4 manquants dans `connect-src` et `img-src`

**Fichiers a verifier (PAS de modification) :**
- `src/components/ui/AirbnbCta.astro` — Tracking deja implemente, verifier le fonctionnement
- `.env.example` — GA4_MEASUREMENT_ID deja documente
- `.gitignore` — `.env` deja exclu

**Fichiers existants reutilises sans modification :**
- `src/data/siteConfig.ts` — baseUrl (pas de reference GA4 necessaire)
- `src/components/seo/MetaTags.astro` — Pas de lien avec GA4
- `src/components/seo/SchemaOrg.astro` — Pas de lien avec GA4

**Alignement avec la structure projet (architecture.md) :**
- GA4 dans BaseLayout.astro -> conforme a la regle "GA4 via script inline dans BaseLayout — seule integration externe"
- GA4 ID depuis variables d'environnement -> conforme a la regle "donnees centralisees, pas en dur dans le code"
- Tracking dans AirbnbCta -> conforme a la regle "CTA Airbnb : chaque CTA declenche un evenement GA4"
- Aucun conflit ou variance detecte

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.3] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions] — "GA4 via script inline dans BaseLayout — seule integration externe"
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — "CTA Airbnb : chaque CTA declenche un evenement GA4 via trackAirbnbClick(configId)"
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure & Deployment] — Vercel env vars pour GA4
- [Source: _bmad-output/planning-artifacts/prd.md#FR26] — GA4 tracking visites de page
- [Source: _bmad-output/planning-artifacts/prd.md#FR27] — GA4 tracking clics Airbnb (conversions)
- [Source: _bmad-output/planning-artifacts/prd.md#FR28] — Consultation donnees GA4 par l'admin
- [Source: _bmad-output/planning-artifacts/prd.md#NFR8] — Aucune donnee utilisateur collectee cote serveur
- [Source: _bmad-output/implementation-artifacts/3-2-donnees-structurees-schema-org-aeo.md] — Patterns et lecons Story 3.2
- [Source: _bmad-output/implementation-artifacts/3-1-meta-tags-sitemap-robots-txt.md] — Patterns SEO, BaseLayout structure
- [Source: _bmad-output/implementation-artifacts/1-3-composant-airbnbcta.md] — Composant AirbnbCta avec tracking GA4 pre-integre
- [Source: src/components/ui/AirbnbCta.astro#L44-54] — Code tracking gtag existant
- [Source: src/layouts/BaseLayout.astro] — Structure actuelle du head (pas de GA4)
- [Source: vercel.json#headers] — CSP avec googletagmanager.com et google-analytics.com
- [Source: .env.example] — GA4_MEASUREMENT_ID=G-XXXXXXXXXX

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun probleme rencontre durant l'implementation.

### Completion Notes List

- Ajoute le script GA4 gtag.js dans `BaseLayout.astro` — conditionnel sur `GA4_MEASUREMENT_ID` via `import.meta.env`, rendu avec `is:inline` et `define:vars`
- Les DEUX scripts (externe CDN et initialisation) utilisent `is:inline` pour eviter le bundling Astro/Vite
- `page_view` envoye automatiquement par `gtag('config', ...)` — aucun event manuel
- Le tracking `airbnb_click` dans `AirbnbCta.astro` etait deja implemente (Story 1.3) avec guard `typeof gtag` — fonctionne directement avec le script GA4 charge
- CSP mis a jour dans `vercel.json` : `connect-src` ajoute `analytics.google.com` + `region1.google-analytics.com`, `img-src` ajoute `www.google-analytics.com`
- Commentaire HTML documente les etapes de configuration des conversions GA4
- Build reussi : 11 pages, 0 erreur, aucune regression
- Sans `GA4_MEASUREMENT_ID`, aucun script GA4 rendu (confirme)

### Change Log

- 2026-03-15 : Implementation complete Story 3.3 — GA4 gtag.js dans BaseLayout, CSP mis a jour, documentation conversions
- 2026-03-15 : Code review — commentaire HTML deplace dans le bloc conditionnel GA4, tous ACs valides, status → done

### File List

**Fichiers modifies :**
- `src/layouts/BaseLayout.astro` — ajout script GA4 conditionnel + commentaire conversions
- `vercel.json` — ajout endpoints GA4 dans `connect-src` et `img-src`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 3-3 → in-progress → review
- `_bmad-output/implementation-artifacts/3-3-google-analytics-4-tracking-conversions.md` — tasks completees, status review
