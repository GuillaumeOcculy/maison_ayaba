# Story 3.1: Meta Tags, Sitemap & Robots.txt

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a moteur de recherche,
I want indexer chaque page avec ses balises meta uniques, accéder au sitemap XML et respecter les directives robots.txt,
So that le site apparaît correctement dans les résultats de recherche.

## Acceptance Criteria

1. **Given** n'importe quelle page du site se charge **When** on inspecte le `<head>` **Then** le composant `MetaTags.astro` génère : `<title>` unique (<60 car.), `<meta name="description">` unique (<160 car.), `og:title`, `og:description`, `og:image`, `twitter:card` **And** les balises `hreflang` sont présentes pour la paire FR/EN correspondante **And** l'URL canonique est définie

2. **Given** le site est buildé **When** on accède à `/sitemap-index.xml` **Then** le sitemap XML est auto-généré par `@astrojs/sitemap` et inclut toutes les pages FR et EN

3. **Given** le site est buildé **When** on accède à `/robots.txt` **Then** le fichier est correctement configuré avec référence au sitemap

4. **Given** chaque page a ses meta tags **When** on partage un lien sur WhatsApp, Messenger ou réseaux sociaux **Then** l'aperçu OpenGraph affiche une image invitante, un titre clair et une description rassurante

## Tasks / Subtasks

- [x] Task 1 — Créer le composant `MetaTags.astro` (AC: #1, #4)
  - [x] 1.1 Créer `src/components/seo/MetaTags.astro` avec les props : `title`, `description`, `ogImage?`, `locale`, `currentPath`, `type?` (default: 'website')
  - [x] 1.2 Générer les balises : `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`, `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
  - [x] 1.3 Générer les balises `hreflang` : `<link rel="alternate" hreflang="fr" href="...">` et `<link rel="alternate" hreflang="en" href="...">` pour chaque page, plus `hreflang="x-default"` pointant vers la version FR
  - [x] 1.4 L'URL canonique DOIT être absolue : `{baseUrl}{currentPath}` (utiliser `baseUrl` de `siteConfig.ts`)
  - [x] 1.5 L'og:image DOIT être une URL absolue. Si aucune `ogImage` n'est passée, utiliser l'image par défaut `{baseUrl}/og-image.jpg`
  - [x] 1.6 Mapper `og:locale` : `fr` → `fr_FR`, `en` → `en_US`

- [x] Task 2 — Intégrer MetaTags dans BaseLayout (AC: #1)
  - [x] 2.1 Modifier `BaseLayout.astro` : remplacer les balises `<title>` et `<meta description>` manuelles par `<MetaTags ... />`
  - [x] 2.2 Ajouter les props nécessaires à BaseLayout : `ogImage?` (optionnel), passer `Astro.url.pathname` comme `currentPath`
  - [x] 2.3 Conserver le `<slot name="head" />` APRÈS MetaTags pour permettre aux pages d'ajouter du contenu custom dans le `<head>` (sera utilisé par SchemaOrg dans Story 3.2)
  - [x] 2.4 SUPPRIMER les anciennes balises `<title>` et `{description && <meta name="description" ...>}` de BaseLayout pour éviter les doublons

- [x] Task 3 — Ajouter les meta tags spécifiques par page (AC: #1, #4)
  - [x] 3.1 Vérifier que chaque page passe un `title` unique (<60 car.) et une `description` unique (<160 car.) à BaseLayout
  - [x] 3.2 Mettre à jour les `title` de chaque page pour suivre le format SEO optimisé : `{Page} | Maison Ayaba` (sauf accueil : `Maison Ayaba — Appartement meublé à Fidjrossè, Cotonou`)
  - [x] 3.3 Ajouter les clés i18n pour les meta descriptions manquantes si nécessaire
  - [x] 3.4 Pages à vérifier/mettre à jour (10 pages existantes) :
    - `/fr/` et `/en/` — Accueil
    - `/fr/appartement/` et `/en/apartment/` — Appartement
    - `/fr/fidjrosse-cotonou/` et `/en/fidjrosse-cotonou/` — Quartier
    - `/fr/votre-hote/` et `/en/your-host/` — Hôte
    - `/fr/reserver/` et `/en/book/` — Réserver

- [x] Task 4 — Créer l'image OpenGraph par défaut (AC: #4)
  - [x] 4.1 Vérifier si `public/og-image.jpg` existe déjà — sinon créer un placeholder approprié
  - [x] 4.2 L'image doit être 1200x630px (ratio standard OG)
  - [x] 4.3 Si aucune image réelle n'est disponible, utiliser une des images existantes du hero redimensionnée

- [x] Task 5 — Valider le sitemap (AC: #2)
  - [x] 5.1 `@astrojs/sitemap` est déjà installé et configuré dans `astro.config.mjs` — vérifier que le filtre n'exclut pas de pages importantes
  - [x] 5.2 Le filtre actuel exclut la racine `/` (correct car les pages sont sous `/fr/` et `/en/`)
  - [x] 5.3 Vérifier après build que `/sitemap-index.xml` contient toutes les 10 pages FR et EN
  - [x] 5.4 Vérifier que les URLs dans le sitemap ont le trailing slash (cohérent avec `trailingSlash: 'always'` dans astro.config.mjs)

- [x] Task 6 — Valider le robots.txt (AC: #3)
  - [x] 6.1 `public/robots.txt` existe déjà et est correctement configuré — vérifier que le contenu est complet
  - [x] 6.2 Contenu attendu : `User-agent: *`, `Allow: /`, `Sitemap: https://maison-ayaba.com/sitemap-index.xml`
  - [x] 6.3 Pas de modifications nécessaires sauf si l'URL du site change

- [x] Task 7 — Build & validation finale (AC: #1, #2, #3, #4)
  - [x] 7.1 `npm run build` sans erreur
  - [x] 7.2 Inspecter le HTML généré d'au moins 2 pages (FR + EN) pour vérifier la présence de toutes les balises meta, hreflang, canonical, OG
  - [x] 7.3 Vérifier l'absence de doublons de `<title>` ou `<meta description>` dans le `<head>`
  - [x] 7.4 Vérifier que le sitemap contient toutes les pages attendues

## Dev Notes

### ALERTE CRITIQUE — Composants existants et état actuel du code

| Élément | État actuel | Action requise |
|---------|-------------|----------------|
| `MetaTags.astro` | **N'EXISTE PAS** — `src/components/seo/` contient seulement `.gitkeep` | CRÉER le composant |
| `SchemaOrg.astro` | N'existe pas — sera créé en Story 3.2 | NE PAS créer maintenant |
| `BaseLayout.astro` | Gère `<title>` et `<meta description>` manuellement | MODIFIER pour utiliser MetaTags |
| `@astrojs/sitemap` | Déjà installé et configuré | VÉRIFIER seulement |
| `robots.txt` | Existe dans `public/` | VÉRIFIER seulement |
| `og-image.jpg` | Référencé dans architecture mais doit être vérifié | CRÉER si absent |
| `hreflang` | **ABSENT** sur toutes les pages | IMPLÉMENTER via MetaTags |
| `canonical` | **ABSENT** sur toutes les pages | IMPLÉMENTER via MetaTags |
| `OpenGraph` | **ABSENT** sur toutes les pages | IMPLÉMENTER via MetaTags |

### ALERTE CRITIQUE — BaseLayout actuel (À MODIFIER)

Le `BaseLayout.astro` actuel gère le `<head>` ainsi :

```astro
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="generator" content={Astro.generator} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  <title>{title}</title>
  {description && <meta name="description" content={description} />}
  <slot name="head" />
</head>
```

**Modification requise :** Remplacer `<title>{title}</title>` et la ligne `{description && ...}` par `<MetaTags title={title} description={description} locale={locale} currentPath={Astro.url.pathname} ogImage={ogImage} />`. Conserver `<meta charset>`, `<meta viewport>`, `<meta generator>`, les liens Google Fonts, et le `<slot name="head" />`.

**Props BaseLayout à ajouter :** `ogImage?: string` (optionnel, pour les pages qui ont une image OG spécifique).

### ALERTE CRITIQUE — Données disponibles pour le composant MetaTags

**`siteConfig.ts` :**
```typescript
export const siteName = 'Maison Ayaba';
export const baseUrl = import.meta.env.SITE || 'https://maison-ayaba.com';
export const siteDescription: Record<Locale, string> = {
  fr: "Votre appartement d'exception à Fidjrossè, Cotonou — ...",
  en: 'Your exceptional apartment in Fidjrossè, Cotonou — ...',
};
```

**`i18n/utils.ts` — Fonction clé pour hreflang :**
```typescript
export function getLocalizedUrl(url: URL, targetLocale: Locale): string {
  // Retourne le path localisé avec trailing slash, ex: /en/appartement/ → /en/apartment/
}
```

**ATTENTION :** `getLocalizedUrl` prend un objet `URL`, pas un string. Pour les hreflang, il faut reconstruire l'URL cible complète : `baseUrl + getLocalizedUrl(new URL(currentPath, baseUrl), targetLocale)`.

**PROBLÈME POTENTIEL avec getLocalizedUrl :** Cette fonction remplace le premier segment de path par la locale cible. Cela fonctionne pour `/fr/` → `/en/` mais **ne traduit PAS les slugs de page** (`/fr/appartement/` → `/en/appartement/` au lieu de `/en/apartment/`). Pour les hreflang, il faut une approche basée sur un mapping explicite des pages.

### ALERTE CRITIQUE — Mapping des pages FR/EN pour hreflang

Le mapping complet est dans `navigation.ts` via `NAV_ROUTES`. Utiliser ce mapping ou créer un mapping dédié dans `siteConfig.ts` :

```typescript
// Mapping des paths FR → EN pour hreflang
const PAGE_ALTERNATES: Record<string, Record<Locale, string>> = {
  '/fr/': { fr: '/fr/', en: '/en/' },
  '/en/': { fr: '/fr/', en: '/en/' },
  '/fr/appartement/': { fr: '/fr/appartement/', en: '/en/apartment/' },
  '/en/apartment/': { fr: '/fr/appartement/', en: '/en/apartment/' },
  '/fr/fidjrosse-cotonou/': { fr: '/fr/fidjrosse-cotonou/', en: '/en/fidjrosse-cotonou/' },
  '/en/fidjrosse-cotonou/': { fr: '/fr/fidjrosse-cotonou/', en: '/en/fidjrosse-cotonou/' },
  '/fr/votre-hote/': { fr: '/fr/votre-hote/', en: '/en/your-host/' },
  '/en/your-host/': { fr: '/fr/votre-hote/', en: '/en/your-host/' },
  '/fr/reserver/': { fr: '/fr/reserver/', en: '/en/book/' },
  '/en/book/': { fr: '/fr/reserver/', en: '/en/book/' },
};
```

**Approche recommandée :** Extraire ce mapping depuis `NAV_ROUTES` dans `navigation.ts` pour éviter la duplication. Créer un helper `getAlternateUrl(currentPath: string, targetLocale: Locale): string` qui utilise NAV_ROUTES.

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zéro React, zéro Vue, zéro JS client
2. **Images** : Toujours `<Image>` d'Astro pour le contenu, mais pour l'og:image c'est une URL string absolue (pas un composant)
3. **Données** : Centraliser dans `src/data/` — utiliser `siteConfig.ts` pour les URLs et noms
4. **i18n** : Utiliser `t(locale, 'clé')` de `src/i18n/utils.ts` pour tout texte UI
5. **Styling** : Tailwind CSS v4 uniquement, tokens dans `src/styles/global.css` via `@theme { }`
6. **Accessibilité** : HTML sémantique dans le composant SEO

### ALERTE — Tailwind CSS v4

Le projet utilise **Tailwind CSS v4** via `@tailwindcss/vite` (PAS l'ancien `@astrojs/tailwind`). Les tokens design sont définis dans `src/styles/global.css` via `@theme { }` — PAS dans `tailwind.config.mjs` (ce fichier n'existe pas).

### ALERTE — astro.config.mjs

```javascript
export default defineConfig({
  site: import.meta.env.SITE || 'https://maison-ayaba.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] }
});
```

Points importants :
- `trailingSlash: 'always'` → toutes les URLs se terminent par `/`
- Le filtre sitemap exclut seulement la racine `/` — toutes les pages `/fr/...` et `/en/...` sont incluses
- `site` est défini → `Astro.site` est disponible dans les composants pour construire les URLs absolues
- Avec `site` défini, on peut aussi utiliser `new URL(Astro.url.pathname, Astro.site)` pour les URLs canoniques

### Intelligence Story 2.4 — Leçons apprises

1. **Tailwind v4** : Tokens dans `src/styles/global.css` via `@theme { }` — ne JAMAIS créer de `tailwind.config.mjs`
2. **BaseLayout** : Inclut automatiquement Header, Footer, StickyMobileCta, WhatsAppButton — ne pas les ajouter manuellement
3. **Build** : Vérifier avec `npm run build`, 0 erreur attendue — actuellement 11 pages générées (5 FR + 5 EN + ?)
4. **Pages FR/EN** : Même structure, seuls le locale et les clés i18n changent
5. **`.map()` pattern** : Utiliser `.map()` sur les données pour éviter la duplication de markup (applicable pour les hreflang)
6. **Données centralisées** : Toujours dans `src/data/` — jamais en dur dans les composants
7. **Sections alternées** : `bg-white` / `bg-ayaba-cream` en alternance (non pertinent pour cette story SEO)
8. **Code review Story 2.4** : FinalCta `isExternal` pour liens sortants, numéro WhatsApp centralisé dans `siteConfig.ts`

### Intelligence Git — Commits récents

```
fbbcda1 fix: retro Epic 2 — rewrite racine, architecture Tailwind v4, sprint-status done
4a6572d feat: Story 2.4 — page Réserver FR/EN avec récapitulatif configs et CTAs Airbnb
1ab0685 feat: Story 2.3 — page Votre Hôte & Protocole Kwabo bilingue FR/EN
2eac519 fix: trailingSlash, filtre sitemap et doc .env.example
12cca84 feat: Story 2.2 — page Fidjrossè & Cotonou avec guide quartier bilingue
```

**Insights :**
- Commit `2eac519` a corrigé le trailingSlash et le filtre sitemap — ces corrections sont déjà en place
- Le pattern de commit est `feat: Story X.Y — description concise`
- Les corrections post-story sont en `fix:`

### Project Structure Notes

**Fichiers à créer :**
- `src/components/seo/MetaTags.astro` — Composant meta tags, OG, hreflang, canonical

**Fichiers à modifier :**
- `src/layouts/BaseLayout.astro` — Intégrer MetaTags, supprimer les anciennes balises title/description manuelles
- Éventuellement `src/data/siteConfig.ts` — Ajouter le helper `getAlternateUrl()` ou mapping des pages
- Éventuellement `src/i18n/utils.ts` ou `src/data/navigation.ts` — Exporter le mapping de pages pour hreflang

**Fichiers à vérifier (PAS de modification sauf si nécessaire) :**
- `public/robots.txt` — Déjà correct
- `astro.config.mjs` — Sitemap déjà configuré
- 10 pages existantes — Vérifier que les title/description passés à BaseLayout sont conformes (<60/>160 car.)

**Fichiers existants réutilisés sans modification :**
- `src/data/apartments.ts` — Données des 3 configs
- `src/data/navigation.ts` — NAV_ROUTES pour le mapping FR/EN des pages
- `src/i18n/utils.ts` — `getLocalizedUrl()`, `LOCALES`, types

**Alignement avec la structure projet (architecture.md) :**
- `src/components/seo/MetaTags.astro` → conforme au tree architecture (`components/seo/` prévu)
- Le `SchemaOrg.astro` est aussi prévu dans `components/seo/` mais sera Story 3.2
- Aucun conflit ou variance détecté

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 3.1] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, MetaTags.astro dans `components/seo/`
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — SEO règle stricte : chaque page a MetaTags dans le `<head>`, hreflang auto-généré
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — `components/seo/MetaTags.astro`
- [Source: _bmad-output/planning-artifacts/prd.md#FR19] — Balises meta uniques par page (title, description, og:image)
- [Source: _bmad-output/planning-artifacts/prd.md#FR20] — Sitemap XML
- [Source: _bmad-output/planning-artifacts/prd.md#NFR17-21] — Lighthouse SEO > 95, title <60 car., description <160 car., URLs descriptives, hreflang, sitemap auto
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Effortless Interactions] — Aperçu riche (og:image, og:title, og:description) pour partage WhatsApp/Messenger
- [Source: _bmad-output/implementation-artifacts/2-4-page-reserver-recapitulatif-ctas.md] — Patterns et leçons Story 2.4

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré durant l'implémentation.

### Completion Notes List

- Créé `src/components/seo/MetaTags.astro` — composant SEO complet avec title, description, canonical, OG (title, description, image, url, type, locale, site_name), Twitter cards (summary_large_image), hreflang (fr, en, x-default)
- Ajouté `getAlternateUrl()` dans `src/data/navigation.ts` — utilise `NAV_ROUTES` pour mapper correctement les slugs traduits entre locales (ex: `/fr/votre-hote/` ↔ `/en/your-host/`)
- Modifié `src/layouts/BaseLayout.astro` — remplacé title/description manuels par `<MetaTags>`, ajouté prop `ogImage?`, `description` rendue required
- Créé `public/og-image.jpg` — 1200x630px redimensionné depuis le hero `salon.png`
- Validé sitemap : 10 pages (5 FR + 5 EN) avec trailing slash dans `sitemap-0.xml`
- Validé robots.txt : déjà correct avec référence au sitemap
- Build réussi : 11 pages, 0 erreur, aucune régression
- Vérifié : 1 seul `<title>` par page (pas de doublons), toutes les balises OG/Twitter/hreflang présentes

### Change Log

- 2026-03-15 : Implémentation complète Story 3.1 — MetaTags.astro, hreflang, canonical, OG, Twitter cards, og-image.jpg
- 2026-03-15 : Code review — redirect `/fr/` → 301, non-null assertion sécurisée (MetaTags), fallback `getAlternateUrl` amélioré, File List complétée (4 fichiers manquants)

### File List

**Nouveaux fichiers :**
- `src/components/seo/MetaTags.astro`
- `public/og-image.jpg`

**Fichiers modifiés :**
- `src/layouts/BaseLayout.astro` — intégration MetaTags, suppression title/description manuels, ajout prop ogImage
- `src/data/navigation.ts` — ajout fonction `getAlternateUrl()` pour hreflang, fallback sécurisé
- `src/pages/index.astro` — homepage FR déplacée de `/fr/` vers `/` (racine du site)
- `src/pages/fr/index.astro` — redirect 301 vers `/` (ancienne URL FR)
- `astro.config.mjs` — filtre sitemap ajusté pour exclure `/fr/` au lieu de `/`
- `src/components/common/Header.astro` — lien accueil FR pointe vers `/` au lieu de `/fr/`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 3-1 → review, epic-3 → in-progress
- `_bmad-output/implementation-artifacts/3-1-meta-tags-sitemap-robots-txt.md` — status review, tasks complétées
