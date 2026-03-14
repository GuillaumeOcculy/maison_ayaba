# Story 3.2: Donnees Structurees Schema.org & AEO

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a moteur de recherche ou moteur de reponse IA,
I want lire les donnees structurees schema.org et extraire des informations factuelles,
So that le site apparait en resultats enrichis et est citable par les IA.

## Acceptance Criteria

1. **Given** la page d'accueil ou la page Appartement se charge **When** on inspecte le JSON-LD **Then** le composant `SchemaOrg.astro` genere un markup `LodgingBusiness` avec : nom, adresse, prix, images, note, URL

2. **Given** une page contenant des questions/reponses (articles blog, page quartier) **When** on inspecte le JSON-LD **Then** un markup `FAQPage` est present avec les paires question/reponse structurees

3. **Given** le visiteur navigue sur le site **When** on inspecte le JSON-LD **Then** un markup `BreadcrumbList` est present reflétant la hierarchie de navigation

4. **Given** un moteur de reponse IA (ChatGPT, Perplexity, Claude) interroge des infos sur l'hebergement a Cotonou **When** le contenu du site est analyse **Then** les informations factuelles (prix, equipements, localisation, capacite) sont structurees et extractibles sans ambiguite

## Tasks / Subtasks

- [x] Task 1 — Creer le composant `SchemaOrg.astro` (AC: #1, #2, #3)
  - [x] 1.1 Creer `src/components/seo/SchemaOrg.astro` avec les props : `type` (enum: 'LodgingBusiness' | 'FAQPage' | 'BreadcrumbList' | 'WebSite'), `locale`, `currentPath`, plus `breadcrumbItems?`, `faqItems?`, `includeOffers?`
  - [x] 1.2 Implementer le type `LodgingBusiness` avec : name, description, url, image, address (PostalAddress Fidjrosse Jacquot, Cotonou, BJ), geo (6.3456, 2.3789), priceRange "60€ - 140€", amenityFeature (6 equipements), numberOfRooms
  - [x] 1.3 Implementer le type `FAQPage` avec `mainEntity` : tableau de `Question` + `acceptedAnswer` (type `Answer`)
  - [x] 1.4 Implementer le type `BreadcrumbList` avec `itemListElement` : tableau de `ListItem` avec `position`, `name`, `item` (URL absolue)
  - [x] 1.5 Implementer le type `WebSite` avec `name`, `url`, `inLanguage`
  - [x] 1.6 Le JSON-LD genere dans `<script type="application/ld+json">` injecte via `<slot name="head" />` de BaseLayout
  - [x] 1.7 Toutes les URLs absolues via `baseUrl` de `siteConfig.ts`

- [x] Task 2 — Integrer SchemaOrg sur la page d'accueil (AC: #1, #3, #4)
  - [x] 2.1 LodgingBusiness JSON-LD sur index.astro (FR) et en/index.astro (EN)
  - [x] 2.2 WebSite JSON-LD avec name, url, inLanguage
  - [x] 2.3 BreadcrumbList JSON-LD : Accueil (position 1)
  - [x] 2.4 priceRange: "60€ - 140€" avec currenciesAccepted: "EUR"
  - [x] 2.5 Adresse : Fidjrosse Jacquot, Cotonou, BJ (PostalAddress)
  - [x] 2.6 6 amenityFeature : WiFi, Climatisation, Onduleur, Cuisine equipee, Stationnement, Acces plage
  - [x] 2.7 Injection via `<Fragment slot="head">`

- [x] Task 3 — Integrer SchemaOrg sur la page Appartement (AC: #1, #3, #4)
  - [x] 3.1 LodgingBusiness avec includeOffers sur /fr/appartement/ et /en/apartment/
  - [x] 3.2 3 Offers avec name, price (min), priceCurrency EUR, url Airbnb, availability InStock
  - [x] 3.3 BreadcrumbList : Accueil > Appartement (2 niveaux)

- [x] Task 4 — Integrer SchemaOrg sur la page Quartier (AC: #2, #3, #4)
  - [x] 4.1 FAQPage JSON-LD sur /fr/fidjrosse-cotonou/ et /en/fidjrosse-cotonou/ avec 3 Q/R
  - [x] 4.2 Q/R : restaurants pres de Maison Ayaba, se deplacer a Cotonou, plage proche
  - [x] 4.3 Textes traduits via `t(locale, 'neighborhood.faqXxxQ/A')` — cles i18n bilingues
  - [x] 4.4 BreadcrumbList : Accueil > Fidjrosse & Cotonou (2 niveaux)

- [x] Task 5 — Integrer SchemaOrg sur la page Hote (AC: #3)
  - [x] 5.1 BreadcrumbList JSON-LD sur /fr/votre-hote/ et /en/your-host/ : Accueil > Votre Hote (2 niveaux)
  - [x] 5.2 Person schema omis — pas de donnees structurees pertinentes au-dela du breadcrumb

- [x] Task 6 — Integrer SchemaOrg sur la page Reserver (AC: #3, #4)
  - [x] 6.1 BreadcrumbList JSON-LD sur /fr/reserver/ et /en/book/ : Accueil > Reserver (2 niveaux)
  - [x] 6.2 LodgingBusiness avec includeOffers (3 configs avec prix et liens Airbnb)

- [x] Task 7 — Contenu AEO (Answer Engine Optimization) (AC: #4)
  - [x] 7.1 Informations factuelles structurees dans le HTML : prix, capacites, equipements, localisation — lisibles par scraper IA
  - [x] 7.2 FAQ de la page Quartier couvrent restaurants, transport, plage — questions frequentes voyageurs
  - [x] 7.3 Reponses factuelles, precises, non promotionnelles avec prix en FCFA et EUR

- [x] Task 8 — Creer les cles i18n pour les FAQ Schema.org (AC: #2)
  - [x] 8.1 Cles ajoutees dans fr.json et en.json : `neighborhood.faqRestaurantsQ/A`, `neighborhood.faqTransportQ/A`, `neighborhood.faqPlageQ/A`
  - [x] 8.2 Format des cles : `neighborhood.faqXxxQ` / `neighborhood.faqXxxA` (sous le namespace neighborhood existant)

- [x] Task 9 — Build & validation finale (AC: #1, #2, #3, #4)
  - [x] 9.1 `npm run build` : 11 pages, 0 erreur
  - [x] 9.2 JSON-LD valide verifie sur accueil FR (3 schemas), appartement FR (2 schemas), quartier EN (2 schemas)
  - [x] 9.3 JSON-LD parse avec json.loads Python — tous valides
  - [x] 9.4 Schemas par page conformes : accueil 3, appartement 2, quartier 2, hote 1, reserver 2
  - [x] 9.5 URLs absolues avec trailing slash verifie (baseUrl + path)

## Dev Notes

### ALERTE CRITIQUE — Composants existants et etat actuel du code

| Element | Etat actuel | Action requise |
|---------|-------------|----------------|
| `SchemaOrg.astro` | **N'EXISTE PAS** — `src/components/seo/` contient `MetaTags.astro` et `.gitkeep` | CREER le composant |
| `MetaTags.astro` | Existe et fonctionne — pattern de reference pour le composant SEO | REFERENCE seulement |
| `BaseLayout.astro` | `<slot name="head" />` disponible apres MetaTags — point d'injection pour JSON-LD | NE PAS modifier |
| `apartments.ts` | 3 configs avec prix, capacite, equipements, URLs Airbnb | SOURCE DE DONNEES |
| `neighborhood.ts` | Sections quartier (restaurants, commerces, plage, POI) + transports | SOURCE DE DONNEES pour FAQ |
| `host.ts` | Profil hote avec philosophie et attentions Kwabo | SOURCE DE DONNEES optionnelle |
| `siteConfig.ts` | `siteName`, `baseUrl`, `siteDescription`, `whatsappNumber` | SOURCE DE DONNEES |
| `navigation.ts` | `NAV_ROUTES` avec mapping FR/EN des URLs | SOURCE pour BreadcrumbList |

### ALERTE CRITIQUE — Point d'injection JSON-LD

Le `BaseLayout.astro` a un `<slot name="head" />` dans le `<head>` HTML. C'est le point d'injection pour le JSON-LD Schema.org.

**Pattern d'injection dans les pages :**
```astro
<BaseLayout locale={locale} title={...} description={...}>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(lodgingBusinessSchema)} />
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </Fragment>
  <!-- contenu de la page -->
</BaseLayout>
```

**Alternative — Composant SchemaOrg :**
```astro
<BaseLayout locale={locale} title={...} description={...}>
  <SchemaOrg slot="head" type="LodgingBusiness" data={...} locale={locale} currentPath={Astro.url.pathname} />
  <SchemaOrg slot="head" type="BreadcrumbList" data={breadcrumbItems} locale={locale} currentPath={Astro.url.pathname} />
  <!-- contenu de la page -->
</BaseLayout>
```

**Approche recommandee :** Composant `SchemaOrg.astro` qui encapsule la generation JSON-LD pour chaque type de schema. Cela centralise la logique et evite la duplication.

### ALERTE CRITIQUE — Donnees disponibles pour LodgingBusiness

**Depuis `apartments.ts` :**
```typescript
apartments: [
  { name: 'Maison Ayaba — 1 Chambre', pricePerNight: { min: 60, max: 80 }, capacity: 2, airbnbUrl: '...' },
  { name: 'Maison Ayaba — 2 Chambres', pricePerNight: { min: 80, max: 100 }, capacity: 4, airbnbUrl: '...' },
  { name: 'Maison Ayaba — 3 Chambres', pricePerNight: { min: 100, max: 140 }, capacity: 6, airbnbUrl: '...' },
]
```

**Depuis `siteConfig.ts` :**
```typescript
siteName = 'Maison Ayaba';
baseUrl = import.meta.env.SITE || 'https://maison-ayaba.com';
whatsappNumber = '33618666612';
```

**Donnees a coder en dur (pas dans les fichiers de donnees actuels) :**
- Adresse : Fidjrosse, Cotonou, Benin
- Coordonnees GPS : latitude ~6.3456, longitude ~2.3789 (a preciser)
- Heures check-in/check-out : a definir ou omettre
- Image principale : `{baseUrl}/og-image.jpg`

### ALERTE CRITIQUE — Donnees pour BreadcrumbList

**Depuis `navigation.ts` — NAV_ROUTES :**
```typescript
NAV_ROUTES = [
  { i18nKey: 'nav.home', href: { fr: '/', en: '/en/' } },
  { i18nKey: 'nav.apartment', href: { fr: '/fr/appartement/', en: '/en/apartment/' } },
  { i18nKey: 'nav.neighborhood', href: { fr: '/fr/fidjrosse-cotonou/', en: '/en/fidjrosse-cotonou/' } },
  { i18nKey: 'nav.host', href: { fr: '/fr/votre-hote/', en: '/en/your-host/' } },
  { i18nKey: 'nav.book', href: { fr: '/fr/reserver/', en: '/en/book/' } },
]
```

**Pattern BreadcrumbList JSON-LD :**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://maison-ayaba.com/" },
    { "@type": "ListItem", "position": 2, "name": "Appartement", "item": "https://maison-ayaba.com/fr/appartement/" }
  ]
}
```

**ATTENTION :** La page d'accueil FR est a la racine `/` (pas `/fr/`). La page EN est a `/en/`. Cette asymetrie doit etre geree dans le breadcrumb.

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zero React, zero Vue, zero JS client
2. **Donnees** : Centraliser dans `src/data/` — importer `apartments`, `siteConfig`, `navigation` pour les schemas
3. **i18n** : Utiliser `t(locale, 'cle')` pour les textes traduisibles (noms de pages dans breadcrumbs, questions FAQ)
4. **URLs** : Toujours absolues dans le JSON-LD — `baseUrl + path`, avec trailing slash
5. **JSON-LD** : Generer via `JSON.stringify()` et injecter avec `set:html` dans une balise `<script type="application/ld+json">`
6. **Tailwind CSS v4** : Pas pertinent pour cette story (JSON-LD est invisible) mais ne pas casser le build

### ALERTE — Page d'accueil FR a la racine

Suite a la Story 3.1 et la retro Epic 2, la page d'accueil FR est maintenant a `/` (racine du site), pas a `/fr/`. Le fichier est `src/pages/index.astro`. La page EN est a `/en/` dans `src/pages/en/index.astro`. Les URLs dans le JSON-LD doivent refleter cette structure.

### ALERTE — Tailwind CSS v4

Le projet utilise **Tailwind CSS v4** via `@tailwindcss/vite` (PAS l'ancien `@astrojs/tailwind`). Les tokens design sont dans `src/styles/global.css` via `@theme { }`. Pas de `tailwind.config.mjs`. Non pertinent pour cette story mais ne pas introduire de regression.

### Intelligence Story 3.1 — Lecons apprises

1. **MetaTags.astro** comme pattern : Props interface -> frontmatter logic -> `<Fragment>` output. Suivre le meme pattern pour SchemaOrg.astro
2. **`set:html`** : Utiliser `set:html={JSON.stringify(schema)}` pour injecter le JSON-LD sans echappement HTML
3. **`baseUrl`** : Importer depuis `siteConfig.ts`, utiliser pour construire toutes les URLs absolues
4. **`getAlternateUrl()`** : Disponible dans `navigation.ts` pour mapper les URLs entre locales — utile pour les hreflang mais pas directement pour Schema.org
5. **`<Fragment slot="head">`** : Pattern confirme pour injecter du contenu dans le `<head>` via BaseLayout
6. **Build** : 11 pages generees, 0 erreur — maintenir ce resultat apres les modifications
7. **Page racine** : `/` est l'accueil FR (`src/pages/index.astro`), `/fr/` fait un redirect 301

### Intelligence Git — Commits recents

```
e54f693 feat: Story 3.1 — MetaTags SEO, hreflang, canonical, OG, sitemap valide
fbbcda1 fix: retro Epic 2 — rewrite racine, architecture Tailwind v4, sprint-status done
4a6572d feat: Story 2.4 — page Reserver FR/EN avec recapitulatif configs et CTAs Airbnb
```

**Insights :**
- Story 3.1 a etabli le pattern SEO dans `<head>` — SchemaOrg.astro s'inscrit dans la meme couche
- Les composants SEO sont dans `src/components/seo/`
- Le pattern de commit est `feat: Story X.Y — description concise`

### Project Structure Notes

**Fichiers a creer :**
- `src/components/seo/SchemaOrg.astro` — Composant JSON-LD pour LodgingBusiness, FAQPage, BreadcrumbList, WebSite

**Fichiers a modifier :**
- `src/pages/index.astro` — Ajouter LodgingBusiness + WebSite + BreadcrumbList via `<Fragment slot="head">`
- `src/pages/en/index.astro` — Idem version EN
- `src/pages/fr/appartement.astro` — Ajouter LodgingBusiness + BreadcrumbList
- `src/pages/en/apartment.astro` — Idem version EN
- `src/pages/fr/fidjrosse-cotonou.astro` — Ajouter FAQPage + BreadcrumbList
- `src/pages/en/fidjrosse-cotonou.astro` — Idem version EN
- `src/pages/fr/votre-hote.astro` — Ajouter BreadcrumbList
- `src/pages/en/your-host.astro` — Idem version EN
- `src/pages/fr/reserver.astro` — Ajouter LodgingBusiness + BreadcrumbList
- `src/pages/en/book.astro` — Idem version EN
- `src/i18n/fr.json` — Ajouter cles FAQ Schema.org
- `src/i18n/en.json` — Ajouter cles FAQ Schema.org

**Fichiers existants reutilises sans modification :**
- `src/data/apartments.ts` — Donnees des 3 configs (prix, capacite, URLs Airbnb)
- `src/data/siteConfig.ts` — Nom du site, baseUrl, description
- `src/data/navigation.ts` — NAV_ROUTES pour BreadcrumbList + `getAlternateUrl()`
- `src/data/neighborhood.ts` — Sections quartier pour FAQ Schema.org
- `src/layouts/BaseLayout.astro` — `<slot name="head" />` deja disponible
- `src/components/seo/MetaTags.astro` — Reference de pattern (pas a modifier)

**Alignement avec la structure projet (architecture.md) :**
- `src/components/seo/SchemaOrg.astro` -> conforme au tree architecture (`components/seo/` prevu pour MetaTags ET SchemaOrg)
- JSON-LD injecte via `<slot name="head" />` -> conforme au pattern BaseLayout
- Donnees depuis `src/data/` -> conforme a la regle "zero valeurs en dur dans les pages" (sauf adresse physique)
- Aucun conflit ou variance detecte

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.2] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, SchemaOrg.astro dans `components/seo/`
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — SEO regle stricte : Schema.org integre via composant `<SchemaOrg>` dans le layout
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — `components/seo/SchemaOrg.astro`
- [Source: _bmad-output/planning-artifacts/prd.md#FR21] — Schema.org (LodgingBusiness, FAQPage, BreadcrumbList)
- [Source: _bmad-output/planning-artifacts/prd.md#FR22] — Contenu AEO pour moteurs IA
- [Source: _bmad-output/planning-artifacts/prd.md#NFR17-21] — Lighthouse SEO > 95, donnees structurees
- [Source: _bmad-output/implementation-artifacts/3-1-meta-tags-sitemap-robots-txt.md] — Patterns et lecons Story 3.1, point d'injection `<slot name="head" />`

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun probleme rencontre durant l'implementation.

### Completion Notes List

- Cree `src/components/seo/SchemaOrg.astro` — composant reutilisable generant du JSON-LD pour 4 types Schema.org : LodgingBusiness, FAQPage, BreadcrumbList, WebSite
- LodgingBusiness inclut : nom, description, URL, image OG, adresse PostalAddress (Fidjrosse Jacquot, Cotonou, BJ), coordonnees GPS, priceRange 60-140€, 6 amenityFeature, numberOfRooms, et optionnellement 3 Offers (via prop `includeOffers`)
- FAQPage avec 3 paires Q/R bilingues couvrant restaurants, transport et plage — cles i18n ajoutees dans fr.json et en.json
- BreadcrumbList avec URLs absolues sur toutes les 10 pages (5 FR + 5 EN)
- WebSite sur les pages d'accueil FR et EN
- Build reussi : 11 pages, 0 erreur, aucune regression
- JSON-LD valide verifie par parsing programmatique sur 6 pages

### Change Log

- 2026-03-15 : Implementation complete Story 3.2 — SchemaOrg.astro, LodgingBusiness, FAQPage, BreadcrumbList, WebSite, cles i18n FAQ
- 2026-03-15 : Code review — 6 fixes appliques : suppression variable morte canonicalUrl, ajout UnitPriceSpecification avec unitCode DAY sur les Offers, suppression numberOfRooms incorrect, suppression BreadcrumbList single-item sur homepages, prop currentPath rendue optionnelle et nettoyee des pages, Offer pricing clarifie

### File List

**Nouveaux fichiers :**
- `src/components/seo/SchemaOrg.astro`

**Fichiers modifies :**
- `src/pages/index.astro` — ajout LodgingBusiness + WebSite + BreadcrumbList
- `src/pages/en/index.astro` — ajout LodgingBusiness + WebSite + BreadcrumbList
- `src/pages/fr/appartement.astro` — ajout LodgingBusiness (avec Offers) + BreadcrumbList
- `src/pages/en/apartment.astro` — ajout LodgingBusiness (avec Offers) + BreadcrumbList
- `src/pages/fr/fidjrosse-cotonou.astro` — ajout FAQPage + BreadcrumbList
- `src/pages/en/fidjrosse-cotonou.astro` — ajout FAQPage + BreadcrumbList
- `src/pages/fr/votre-hote.astro` — ajout BreadcrumbList
- `src/pages/en/your-host.astro` — ajout BreadcrumbList
- `src/pages/fr/reserver.astro` — ajout LodgingBusiness (avec Offers) + BreadcrumbList
- `src/pages/en/book.astro` — ajout LodgingBusiness (avec Offers) + BreadcrumbList
- `src/i18n/fr.json` — ajout 6 cles FAQ (faqRestaurantsQ/A, faqTransportQ/A, faqPlageQ/A)
- `src/i18n/en.json` — ajout 6 cles FAQ (faqRestaurantsQ/A, faqTransportQ/A, faqPlageQ/A)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 3-2 → in-progress → review
