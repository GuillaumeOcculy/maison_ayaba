# Story 1.1 : Initialisation Astro 6, Tailwind & Structure i18n

Status: done

## Story

As a développeur,
I want un projet Astro 6 initialisé avec Tailwind, TypeScript strict et le routing bilingue FR/EN,
So that toute l'équipe peut développer sur une base configurée et cohérente.

## Acceptance Criteria

1. **Given** aucun projet n'existe **When** on exécute `npm create astro@latest` avec le template minimal et TypeScript strict **Then** le projet se build sans erreur **And** les intégrations `@astrojs/sitemap` et `@astrojs/vercel` sont installées et configurées dans `astro.config.mjs` **And** Tailwind CSS est installé via le plugin Vite officiel (`@tailwindcss/vite`)

2. **Given** le projet est initialisé **When** on consulte `src/styles/global.css` **Then** les tokens Maison Ayaba sont définis via `@theme` : couleurs (terra #A0522D, gold #C8A45C, cream #FAF7F2, dark #2C1810, muted #6B5E57, success #5A7247) et typographie (Playfair Display, Inter) **And** `global.css` contient `@import "tailwindcss"` et les directives `@theme`

3. **Given** le projet est configuré **When** on consulte la structure `src/` **Then** les dossiers existent : `pages/fr/`, `pages/en/`, `components/common/`, `components/sections/`, `components/seo/`, `components/ui/`, `layouts/`, `data/`, `i18n/`, `styles/`, `assets/images/` **And** `src/i18n/fr.json` et `src/i18n/en.json` contiennent les traductions UI de base (boutons, labels, nav) **And** `src/i18n/utils.ts` exporte `getLocale()`, `t()` et `getLocalizedUrl()` **And** `src/data/siteConfig.ts` contient le nom du site, les locales et les URLs de base **And** `src/data/apartments.ts` contient les 3 configs (nom, prix, capacité, équipements clés, URL Airbnb) **And** `src/data/navigation.ts` contient la structure du menu par langue

## Tasks / Subtasks

- [x] Task 1 — Initialisation projet Astro 6 (AC: #1)
  - [x] 1.1 Exécuter `npm create astro@latest maison-ayaba -- --template minimal --typescript strict --install --git`
  - [x] 1.2 Installer les intégrations : `npx astro add sitemap vercel`
  - [x] 1.3 Installer Tailwind CSS v4 : `npx astro add tailwind`
  - [x] 1.4 Configurer `astro.config.mjs` avec les 3 intégrations (sitemap, vercel adapter)
  - [x] 1.5 Vérifier que `npm run build` passe sans erreur

- [x] Task 2 — Configuration Tailwind CSS v4 avec tokens Maison Ayaba (AC: #2)
  - [x] 2.1 Configurer `src/styles/global.css` avec `@import "tailwindcss"` et bloc `@theme`
  - [x] 2.2 Définir les couleurs custom dans `@theme` : `--color-ayaba-terra: #A0522D`, `--color-ayaba-gold: #C8A45C`, `--color-ayaba-cream: #FAF7F2`, `--color-ayaba-dark: #2C1810`, `--color-ayaba-muted: #6B5E57`, `--color-ayaba-success: #5A7247`
  - [x] 2.3 Configurer les fonts dans `@theme` : `--font-heading: 'Playfair Display', Georgia, serif`, `--font-body: 'Inter', system-ui, sans-serif`
  - [x] 2.4 Ajouter les préchargements Google Fonts dans un futur `BaseLayout.astro` (noter dans les dev notes pour Story 1.2)

- [x] Task 3 — Création de la structure de dossiers (AC: #3)
  - [x] 3.1 Créer l'arborescence `src/` complète :
    - `src/pages/fr/` (avec fichier index.astro placeholder)
    - `src/pages/en/` (avec fichier index.astro placeholder)
    - `src/components/common/`
    - `src/components/sections/`
    - `src/components/seo/`
    - `src/components/ui/`
    - `src/layouts/`
    - `src/data/`
    - `src/i18n/`
    - `src/styles/` (global.css déjà créé en Task 2)
    - `src/assets/images/hero/`
    - `src/assets/images/apartments/`
    - `src/assets/images/neighborhood/`
    - `src/assets/images/host/`
    - `src/content/blog/fr/`
    - `src/content/blog/en/`

- [x] Task 4 — Système i18n (AC: #3)
  - [x] 4.1 Créer `src/i18n/fr.json` avec les traductions UI de base :
    - Navigation : Accueil, Appartement, Fidjrossè & Cotonou, Votre Hôte, Réserver, Blog
    - Boutons : Réserver sur Airbnb, Voir l'appartement, Changer de langue
    - Labels : par nuit, par personne, chambres, équipements
    - Footer : Tous droits réservés, Mentions légales
  - [x] 4.2 Créer `src/i18n/en.json` avec les traductions EN correspondantes :
    - Navigation : Home, Apartment, Fidjrossè & Cotonou, Your Host, Book, Blog
    - Boutons : Book on Airbnb, View apartment, Switch language
    - Labels : per night, per person, bedrooms, amenities
    - Footer : All rights reserved, Legal notice
  - [x] 4.3 Créer `src/i18n/utils.ts` avec les exports :
    - `type Locale = 'fr' | 'en'`
    - `const DEFAULT_LOCALE: Locale = 'fr'`
    - `const LOCALES: Locale[] = ['fr', 'en']`
    - `getLocale(url: URL): Locale` — extrait la locale depuis le chemin URL
    - `t(locale: Locale, key: string): string` — retourne la traduction pour une clé donnée
    - `getLocalizedUrl(url: URL, targetLocale: Locale): string` — construit l'URL dans l'autre langue

- [x] Task 5 — Fichiers de données centralisées (AC: #3)
  - [x] 5.1 Créer `src/data/siteConfig.ts` :
    - `siteName: 'Maison Ayaba'`
    - `siteDescription` (FR et EN)
    - `defaultLocale: 'fr'`
    - `locales: ['fr', 'en']`
    - `baseUrl` (configurable via env ou constante)
  - [x] 5.2 Créer `src/data/apartments.ts` avec les 3 configurations :
    - Config 1 chambre : nom, slug, prix/nuit, capacité, équipements clés (WiFi, onduleur, clim, bureau), URL Airbnb (placeholder)
    - Config 2 chambres : nom, slug, prix/nuit, capacité, équipements clés, URL Airbnb (placeholder)
    - Config 3 chambres : nom, slug, prix/nuit, capacité, équipements clés (lit bébé, machine à laver), URL Airbnb (placeholder)
    - Types TypeScript : `ApartmentConfig` interface
  - [x] 5.3 Créer `src/data/navigation.ts` :
    - Structure de menu par langue (FR et EN)
    - Type `NavItem = { label: string; href: string }`
    - Export `getNavigation(locale: Locale): NavItem[]`

- [x] Task 6 — Configuration projet racine (AC: #1)
  - [x] 6.1 Créer `vercel.json` avec les headers de sécurité (CSP, X-Frame-Options, X-Content-Type-Options)
  - [x] 6.2 Créer `.env.example` avec les variables documentées (GA4_MEASUREMENT_ID)
  - [x] 6.3 Vérifier que `.env` est dans `.gitignore`
  - [x] 6.4 Créer `public/robots.txt` basique
  - [x] 6.5 Vérifier build final : `npm run build` sans erreur

## Dev Notes

### ALERTE CRITIQUE — Tailwind v4 vs v3

L'architecture document référence `@astrojs/tailwind` et `tailwind.config.mjs` — ce sont des patterns **Tailwind v3**. Astro 6 (>=5.2.0) utilise **Tailwind CSS v4** par défaut avec :

- **Plugin Vite** : `@tailwindcss/vite` (pas l'intégration `@astrojs/tailwind`)
- **Configuration CSS** : Les tokens se définissent dans CSS via `@theme { }` (pas dans `tailwind.config.mjs`)
- **Import** : `@import "tailwindcss"` dans `global.css` (pas `@tailwind base/components/utilities`)
- **Pas de fichier `tailwind.config.mjs`** : Toute la config est en CSS

**Commande d'installation correcte :**
```bash
npx astro add tailwind
```
Cela installe automatiquement `@tailwindcss/vite` et configure le plugin dans `astro.config.mjs`.

**Exemple de configuration `global.css` pour Tailwind v4 :**
```css
@import "tailwindcss";

@theme {
  --color-ayaba-terra: #A0522D;
  --color-ayaba-gold: #C8A45C;
  --color-ayaba-cream: #FAF7F2;
  --color-ayaba-dark: #2C1810;
  --color-ayaba-muted: #6B5E57;
  --color-ayaba-success: #5A7247;

  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

**Utilisation dans les templates :**
```html
<h1 class="text-ayaba-dark font-heading">Titre</h1>
<p class="bg-ayaba-cream font-body">Contenu</p>
<button class="bg-ayaba-terra text-white hover:bg-ayaba-gold">CTA</button>
```

### Conventions de nommage (Architecture)

- Pages : `kebab-case.astro` → `appartement.astro`, `votre-hote.astro`
- Composants : `PascalCase.astro` → `HeroSection.astro`, `AirbnbCta.astro`
- Layouts : `PascalCase.astro` → `BaseLayout.astro`, `BlogLayout.astro`
- Données : `camelCase.ts` → `apartments.ts`, `siteConfig.ts`
- Traductions : `{locale}.json` → `fr.json`, `en.json`
- Variables TS : `camelCase` → `airbnbUrl`, `gaTrackingId`
- Constantes TS : `UPPER_SNAKE_CASE` → `AIRBNB_URLS`, `DEFAULT_LOCALE`
- Types/Interfaces : `PascalCase` → `BlogPost`, `ApartmentConfig`

### Patterns architecturaux stricts

- **Composants `.astro` uniquement** — zero framework JS client (React, Vue interdit)
- **Images via `astro:assets` (`<Image>`)** exclusivement — jamais de `<img>` brut
- **Données centralisées dans `src/data/`** — jamais de valeurs en dur dans les pages
- **Traductions UI dans `src/i18n/{locale}.json`** — jamais de texte en dur
- **Routing i18n par dossiers** (`src/pages/fr/`, `src/pages/en/`)
- **Blog via Content Collections Markdown** (`src/content/blog/{locale}/`)

### Couleurs Maison Ayaba — Règles d'usage

| Token | Hex | Rôle | Contraste sur blanc |
|-------|-----|------|---------------------|
| `ayaba-terra` | #A0522D | Primaire — titres, liens, CTA | 4.8:1 ✅ AA |
| `ayaba-gold` | #C8A45C | Accent — badges, hover, Kwabo | 2.8:1 ❌ décoratif uniquement |
| `ayaba-dark` | #2C1810 | Texte principal | 14.7:1 ✅ AAA |
| `ayaba-muted` | #6B5E57 | Texte secondaire (16px+ uniquement) | 4.6:1 ✅ AA |
| `ayaba-success` | #5A7247 | Rassurance (checks, confirmations) | 4.5:1 ✅ AA |
| `ayaba-cream` | #FAF7F2 | Fond sections alternées | Surface |

**IMPORTANT :** `ayaba-gold` JAMAIS pour du texte seul. CTA primaire = fond `ayaba-terra` + texte blanc (#FFF) → ratio 7.2:1 AAA.

### Typographie

- **Titres (h1, h2)** : Playfair Display, bold (700)
- **Corps et reste** : Inter, regular (400) / semi-bold (600)
- **Chargement** : Google Fonts avec `font-display: swap`, `<link rel="preload">` (sera dans BaseLayout — Story 1.2)
- **Subset** : Latin uniquement pour réduire le poids
- Jamais de texte < 14px

### Données appartements (à compléter avec les vrais prix/URLs)

Les 3 configurations correspondent aux annonces Airbnb existantes de Maison Wabi-Sabi, Fidjrossè Jacquot :
- **Config 1 chambre** : Voyageur d'affaires / couple — bureau, WiFi, onduleur, clim — ~60-80€/nuit
- **Config 2 chambres** : Petit groupe / famille — cuisine équipée, salon — ~80-100€/nuit
- **Config 3 chambres** : Grand groupe / famille élargie — lit bébé, machine à laver, terrasse — ~100-140€/nuit

Les URLs Airbnb sont des placeholders en attendant les vrais liens. Les stocker dans `apartments.ts` avec un commentaire `// TODO: remplacer par les vrais liens Airbnb`.

### Fichiers de configuration racine

**`vercel.json`** — Headers de sécurité :
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com" }
      ]
    }
  ]
}
```

### Pages placeholder (index.astro)

Les fichiers `src/pages/fr/index.astro` et `src/pages/en/index.astro` doivent être des placeholders minimaux qui importent `global.css` et affichent un titre basique. Le vrai layout (BaseLayout) sera créé en Story 1.2.

```astro
---
import '../styles/global.css'
---
<html lang="fr">
  <head><meta charset="utf-8" /><title>Maison Ayaba</title></head>
  <body class="bg-white text-ayaba-dark font-body">
    <h1 class="font-heading text-ayaba-terra">Maison Ayaba</h1>
    <p>Site en construction — Story 1.1 complète</p>
  </body>
</html>
```

### Project Structure Notes

- Alignement avec la structure unifiée définie dans `architecture.md` section "Complete Project Directory Structure"
- Tous les sous-dossiers de `components/` (`common/`, `sections/`, `seo/`, `ui/`) créés vides avec `.gitkeep` si nécessaire
- Le dossier `src/content/blog/` est préparé mais ne sera peuplé qu'en Epic 4
- Le fichier `src/content/config.ts` (schéma Content Collections) sera créé en Story 4.1

### Dépendances Story 1.2

La Story 1.2 (BaseLayout, Header, Footer & Navigation) dépend directement de cette story. Éléments à préparer :
- `global.css` avec les tokens Tailwind v4 → utilisé par BaseLayout
- `src/i18n/utils.ts` → utilisé par LanguageSwitcher
- `src/data/navigation.ts` → utilisé par Header
- Structure de dossiers → BaseLayout va dans `src/layouts/`
- Google Fonts preload → à intégrer dans BaseLayout `<head>`

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation] — Commande init Astro 6
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules] — Conventions nommage
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure] — Arborescence projet
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System] — Palette couleurs avec ratios contraste
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System] — Échelle typographique
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1] — Acceptance criteria et user story
- [Source: Astro 6 Docs — v6.docs.astro.build/en/guides/styling] — Tailwind v4 setup avec @tailwindcss/vite
- [Source: Astro 6 Docs — v6.docs.astro.build/en/guides/integrations-guide/sitemap] — Configuration sitemap
- [Source: Astro 6 Docs — v6.docs.astro.build/en/guides/integrations-guide/vercel] — Vercel adapter

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

- Astro `npm create astro@latest` crée dans un sous-dossier quand le répertoire n'est pas vide → fichiers déplacés à la racine manuellement
- `--typescript strict` n'est plus nécessaire depuis Astro v5 (c'est le défaut)
- `src/pages/index.astro` racine transformé en redirection vers `/fr/` (locale par défaut)
- Renommage global `ayaba_stays`/`ayaba-stays` → `maison_ayaba`/`maison-ayaba` effectué sur demande utilisateur

### Completion Notes List

- Projet Astro 6.0.4 initialisé avec template minimal et TypeScript strict (défaut)
- Intégrations installées : `@astrojs/sitemap`, `@astrojs/vercel`, `@tailwindcss/vite` + `tailwindcss`
- Tokens Maison Ayaba configurés en CSS via `@theme` (Tailwind v4) : 6 couleurs + 2 fonts
- Structure de dossiers complète créée avec .gitkeep pour les dossiers vides
- Système i18n : fr.json, en.json, utils.ts avec getLocale(), t(), getLocalizedUrl()
- Données centralisées : siteConfig.ts, apartments.ts (3 configs), navigation.ts
- Configuration racine : vercel.json (headers sécurité), .env.example, robots.txt
- Pages placeholder FR/EN + redirection racine → /fr/
- Build final réussi : 3 pages construites sans erreur

### Change Log

- 2026-03-14 : Story 1.1 implémentée — initialisation complète du projet Astro 6 avec Tailwind v4, i18n bilingue et données centralisées
- 2026-03-14 : Code review — 8 corrections appliquées :
  - [H1] Ajout propriété `site` dans astro.config.mjs (sitemap fonctionnel)
  - [H2] navigation.ts refactorisé pour utiliser les clés i18n au lieu de labels en dur
  - [H3] siteConfig.ts réutilise DEFAULT_LOCALE/LOCALES de i18n/utils.ts (suppression duplication)
  - [H4] apartments.ts amenities internationalisées via clés i18n + ajout amenityNames dans fr.json/en.json
  - [M1] Ajout <!DOCTYPE html> dans pages placeholder FR/EN
  - [M2] Ajout <meta name="viewport"> dans pages placeholder FR/EN
  - [M3] Ajout variable SITE dans .env.example

### File List

- `package.json` (nouveau)
- `package-lock.json` (nouveau)
- `tsconfig.json` (nouveau)
- `astro.config.mjs` (nouveau)
- `.gitignore` (nouveau)
- `vercel.json` (nouveau)
- `.env.example` (nouveau)
- `public/robots.txt` (nouveau)
- `src/styles/global.css` (nouveau)
- `src/pages/index.astro` (nouveau — redirection → /fr/)
- `src/pages/fr/index.astro` (nouveau — placeholder)
- `src/pages/en/index.astro` (nouveau — placeholder)
- `src/i18n/fr.json` (nouveau)
- `src/i18n/en.json` (nouveau)
- `src/i18n/utils.ts` (nouveau)
- `src/data/siteConfig.ts` (nouveau)
- `src/data/apartments.ts` (nouveau)
- `src/data/navigation.ts` (nouveau)
- `src/components/common/.gitkeep` (nouveau)
- `src/components/sections/.gitkeep` (nouveau)
- `src/components/seo/.gitkeep` (nouveau)
- `src/components/ui/.gitkeep` (nouveau)
- `src/layouts/.gitkeep` (nouveau)
- `src/assets/images/hero/.gitkeep` (nouveau)
- `src/assets/images/apartments/.gitkeep` (nouveau)
- `src/assets/images/neighborhood/.gitkeep` (nouveau)
- `src/assets/images/host/.gitkeep` (nouveau)
- `src/content/blog/fr/.gitkeep` (nouveau)
- `src/content/blog/en/.gitkeep` (nouveau)
