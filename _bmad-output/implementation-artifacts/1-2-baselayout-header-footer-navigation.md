# Story 1.2 : BaseLayout, Header, Footer & Navigation

Status: done

## Story

As a visiteur,
I want naviguer sur un site avec un layout professionnel, un menu et un sélecteur de langue,
So that je peux parcourir toutes les pages facilement en FR ou EN.

## Acceptance Criteria

1. **Given** le visiteur accède à n'importe quelle page **When** la page se charge **Then** le `BaseLayout.astro` fournit la structure HTML sémantique (`<html>`, `<head>`, `<header>`, `<main>`, `<footer>`) **And** la balise `<html lang="">` reflète la locale de la page (fr ou en)

2. **Given** le visiteur est sur une page quelconque **When** il regarde le header **Then** il voit le logo Maison Ayaba, un menu de navigation avec 5 items (Accueil, Appartement, Quartier, Hôte, Réserver) et un sélecteur FR/EN **And** sur mobile, le header est sticky avec logo + hamburger menu + CTA Airbnb **And** les liens du menu pointent vers les URLs dans la locale courante

3. **Given** le visiteur clique sur le sélecteur de langue **When** il bascule de FR vers EN (ou inversement) **Then** il est redirigé vers la même page dans l'autre langue (pas la page d'accueil)

4. **Given** le visiteur regarde le footer **When** la page se charge **Then** le footer a un fond sombre (`ayaba-dark`), contient les liens de navigation, le copyright et les informations de contact

5. **Given** le visiteur navigue au clavier **When** il utilise Tab pour parcourir la navigation **Then** chaque élément interactif a un indicateur de focus visible **And** l'ordre de tabulation est logique (header → contenu → footer)

6. **Given** le visiteur consulte le site sur mobile (<768px), tablette (768-1024px) ou desktop (>1024px) **When** la page se charge **Then** le layout s'adapte à chaque breakpoint (mobile-first) **And** les cibles tactiles font minimum 44x44px sur mobile

## Tasks / Subtasks

- [x] Task 1 — Créer BaseLayout.astro (AC: #1)
  - [x] 1.1 Créer `src/layouts/BaseLayout.astro` avec structure HTML sémantique complète (`<!DOCTYPE html>`, `<html lang={locale}>`, `<head>`, `<body>`)
  - [x] 1.2 Intégrer dans `<head>` : charset, viewport, generator, import `global.css`
  - [x] 1.3 Ajouter les préchargements Google Fonts (Playfair Display 700, Inter 400+600) avec `<link rel="preconnect">` + `<link rel="preload">` et `font-display: swap`, subset latin
  - [x] 1.4 Ajouter un `<slot name="head" />` pour les meta tags spécifiques à chaque page
  - [x] 1.5 Structure body : `<Header />` → `<main>` avec `<slot />` (contenu par défaut) → `<Footer />`
  - [x] 1.6 Props du composant : `locale: Locale`, `title: string`, `description?: string`
  - [x] 1.7 Ajouter lien "Skip to content" invisible au focus qui cible `<main id="main-content">`

- [x] Task 2 — Créer Header.astro (AC: #2, #3, #5, #6)
  - [x] 2.1 Créer `src/components/common/Header.astro` avec `<header>` sémantique
  - [x] 2.2 Intégrer le logo texte "Maison Ayaba" (lien vers accueil dans la locale courante)
  - [x] 2.3 Intégrer `<nav>` avec les 5 items de navigation (depuis `getNavigation(locale)` de `src/data/navigation.ts`) — **exclure le Blog** du menu principal pour le MVP (6 items dans navigation.ts mais seuls les 5 premiers sont dans le menu)
  - [x] 2.4 Mettre en surbrillance l'item actif (couleur `ayaba-terra`) en comparant `Astro.url.pathname` avec les hrefs
  - [x] 2.5 Intégrer le composant `<LanguageSwitcher />`
  - [x] 2.6 Ajouter le CTA "Réserver" dans la nav desktop à droite (style bouton primaire `ayaba-terra`, texte blanc)
  - [x] 2.7 Mobile : header sticky en haut, affichant logo + hamburger menu + CTA "Réserver"
  - [x] 2.8 Mobile : menu hamburger qui toggle la nav via `:has([aria-expanded="true"])` (CSS only, zero JS si possible ; sinon script inline minimal avec `<script>` dans le composant Astro)
  - [x] 2.9 Accessibilité : `aria-label="Menu principal"` sur `<nav>`, `aria-expanded` sur le bouton hamburger, focus visible `outline-2 outline-ayaba-terra`
  - [x] 2.10 Cibles tactiles minimum 44x44px sur mobile pour tous les liens et boutons

- [x] Task 3 — Créer LanguageSwitcher.astro (AC: #3)
  - [x] 3.1 Créer `src/components/common/LanguageSwitcher.astro`
  - [x] 3.2 Afficher "FR | EN" avec la locale active en gras/couleur `ayaba-terra`, l'autre en `ayaba-muted`
  - [x] 3.3 Le lien pointe vers `getLocalizedUrl(Astro.url, targetLocale)` — la même page dans l'autre langue
  - [x] 3.4 Accessible : `aria-label` descriptif ("Basculer vers l'anglais" / "Switch to French")

- [x] Task 4 — Créer Footer.astro (AC: #4, #5, #6)
  - [x] 4.1 Créer `src/components/common/Footer.astro` avec `<footer>` sémantique
  - [x] 4.2 Fond sombre `bg-ayaba-dark`, texte `text-ayaba-cream`
  - [x] 4.3 Contenu : logo ou nom "Maison Ayaba", liens de navigation (mêmes que le header), copyright "© {year} Maison Ayaba. {t(locale, 'footer.allRightsReserved')}"
  - [x] 4.4 Responsive : liens en colonne sur mobile, en ligne sur desktop
  - [x] 4.5 Liens avec focus visible, cibles tactiles 44x44px sur mobile

- [x] Task 5 — Mettre à jour les pages placeholder FR/EN (AC: #1)
  - [x] 5.1 Refactoriser `src/pages/fr/index.astro` pour utiliser `<BaseLayout>` au lieu du HTML inline
  - [x] 5.2 Refactoriser `src/pages/en/index.astro` de même
  - [x] 5.3 Vérifier que les pages build sans erreur et que le header/footer s'affichent correctement
  - [x] 5.4 Vérifier que le sélecteur de langue redirige correctement entre /fr/ et /en/

- [x] Task 6 — Validation responsive et accessibilité (AC: #5, #6)
  - [x] 6.1 Vérifier le rendu sur mobile (<768px) : header sticky, hamburger menu, nav en overlay/dropdown
  - [x] 6.2 Vérifier le rendu sur tablette (768-1024px) : transition entre mobile et desktop
  - [x] 6.3 Vérifier le rendu sur desktop (>1024px) : nav horizontale complète, CTA visible
  - [x] 6.4 Vérifier la navigation au clavier : Tab parcourt header → contenu → footer, focus visible
  - [x] 6.5 Vérifier `npm run build` sans erreur

## Dev Notes

### ALERTE CRITIQUE — Tailwind v4 (pas v3)

Le projet utilise **Tailwind CSS v4** avec `@tailwindcss/vite`. Les tokens sont définis dans `src/styles/global.css` via `@theme { }`, PAS dans un fichier `tailwind.config.mjs`.

**Classes Tailwind disponibles :**
- Couleurs : `text-ayaba-terra`, `bg-ayaba-dark`, `text-ayaba-cream`, `bg-ayaba-cream`, `text-ayaba-muted`, `text-ayaba-success`, `bg-ayaba-gold`
- Fonts : `font-heading` (Playfair Display), `font-body` (Inter)

**Tailwind v4 et classes custom :** Si des classes utilitaires custom sont nécessaires (ex: max-width container), les définir dans `global.css` via `@theme` ou `@utility`, PAS dans un fichier de config JS.

### Google Fonts — Chargement dans BaseLayout

**Méthode recommandée pour Astro 6 :**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
```

**Subset latin** : Le paramètre `&subset=latin` n'est plus nécessaire — Google Fonts v2 sert les subsets automatiquement via unicode-range.

**Performances :** Les `preconnect` accélèrent la résolution DNS. Le `display=swap` garantit que le texte est visible immédiatement avec la font fallback (Georgia / system-ui) puis bascule quand la Google Font est chargée — pas de FOIT (Flash of Invisible Text).

### Structure HTML sémantique du BaseLayout

```astro
---
import '../styles/global.css';
import Header from '../components/common/Header.astro';
import Footer from '../components/common/Footer.astro';
import type { Locale } from '../i18n/utils';

interface Props {
  locale: Locale;
  title: string;
  description?: string;
}

const { locale, title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    <!-- Google Fonts preload -->
    <!-- ... -->
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <slot name="head" />
  </head>
  <body class="bg-white text-ayaba-dark font-body min-h-screen flex flex-col">
    <a href="#main-content" class="sr-only focus:not-sr-only ...">
      Skip to content
    </a>
    <Header locale={locale} currentPath={Astro.url.pathname} />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <Footer locale={locale} />
  </body>
</html>
```

### Header — Design Direction (UX hybride Immersif-Minimaliste-Corporate)

**Desktop :**
- Fond blanc, ombre légère ou bordure bottom subtile
- Logo "Maison Ayaba" à gauche (texte `font-heading text-ayaba-terra`)
- 5 liens de nav au centre ou à droite des liens : Accueil, Appartement, Fidjrossè & Cotonou, Votre Hôte, Réserver
- Item actif : `text-ayaba-terra font-semibold` ou avec un `border-bottom-2 border-ayaba-terra`
- Items inactifs : `text-ayaba-dark hover:text-ayaba-terra`
- Sélecteur FR/EN discret à droite
- CTA "Réserver" bouton à droite : `bg-ayaba-terra text-white hover:bg-ayaba-terra/90 px-4 py-2 rounded`
- Sticky au scroll

**Mobile (<768px) :**
- Header sticky : logo + hamburger + CTA "Réserver" compact
- Menu hamburger ouvre un dropdown/overlay avec les 5 liens + sélecteur de langue
- Navigation par CSS `:has([aria-expanded="true"])` pour zero JS (pattern Astro 6 recommandé)
- Si `:has()` ne suffit pas pour l'UX, un `<script>` inline minimal est acceptable dans le composant Astro

**Pattern hamburger CSS-only (Astro 6) :**
```css
.nav-links {
  display: none;
}

:has(.menu-toggle[aria-expanded="true"]) .nav-links {
  display: block;
}

@media screen and (min-width: 768px) {
  .nav-links {
    display: flex;
  }
  .menu-toggle {
    display: none;
  }
}
```

### Footer — Design

- Fond `bg-ayaba-dark`, texte `text-ayaba-cream`
- Section avec logo/nom du site
- Liens de navigation (les mêmes que le header, en colonne sur mobile, en ligne sur desktop)
- Ligne de copyright en bas : `text-sm text-ayaba-muted`
- Espacement généreux, padding vertical `py-12` desktop, `py-8` mobile
- Liens : `text-ayaba-cream hover:text-ayaba-gold` avec `underline-offset-4`

### Navigation — Points d'attention

**5 items dans le menu, pas 6 :** Le fichier `navigation.ts` contient 6 routes (incluant Blog). Pour le MVP (Story 1.2), le Blog n'est pas encore implémenté (Epic 4). Deux options :
- **Option A** (recommandée) : Afficher les 5 premiers items seulement (filtrer Blog dans Header.astro)
- **Option B** : Afficher les 6 items mais le lien Blog pointe vers une page qui n'existe pas encore

**CTA "Réserver" dans la nav :** L'UX spec précise "Réserver" comme texte du CTA dans la nav (pas "Réserver sur Airbnb"). Le CTA dans la nav pointe vers la page `/fr/reserver/` ou `/en/book/` — ce n'est PAS un lien Airbnb direct. C'est la page récapitulatif qui contient les vrais CTAs Airbnb par configuration.

**Feedback UX (Onizuka/testeurs) :** CTA doit dire "Réserver" partout, pas "Réserver sur Airbnb".

### LanguageSwitcher — Implémentation

Le composant utilise `getLocalizedUrl(Astro.url, targetLocale)` de `src/i18n/utils.ts`. Cette fonction :
- Prend l'URL courante et la locale cible
- Remplace le premier segment de chemin (la locale) par la locale cible
- Retourne le nouveau chemin

**Attention au trailing slash :** `getLocalizedUrl` retourne un chemin SANS trailing slash. Astro attend des trailing slashes par défaut. Vérifier que la redirection fonctionne correctement. Si besoin, ajouter un `/` à la fin dans `getLocalizedUrl` ou configurer `trailingSlash: 'always'` dans `astro.config.mjs`.

### Accessibilité — Checklist

- [ ] `<a href="#main-content">Skip to content</a>` — visible uniquement au focus clavier
- [ ] `<nav aria-label="Menu principal">` (ou traduit EN: "Main navigation")
- [ ] `<button aria-expanded="false/true" aria-controls="nav-menu">` pour le hamburger
- [ ] Focus visible : `outline-2 outline-offset-2 outline-ayaba-terra` sur tous les éléments interactifs
- [ ] Ordre de tabulation logique : skip link → logo → nav items → lang switch → CTA → contenu → footer
- [ ] Alt text sur le logo si c'est une image (ou texte si c'est un `<a>` avec texte)
- [ ] Contrastes : texte `ayaba-dark` sur blanc = 14.7:1 AAA ✅, liens `ayaba-terra` sur blanc = 4.8:1 AA ✅, texte `ayaba-cream` sur `ayaba-dark` = vérifier ratio

### Couleurs — Rappel des règles d'usage

| Token | Hex | Rôle dans cette story |
|-------|-----|----------------------|
| `ayaba-terra` #A0522D | Logo, liens actifs, CTA bouton fond, focus outline |
| `ayaba-gold` #C8A45C | Hover footer links (décoratif uniquement, JAMAIS texte seul) |
| `ayaba-dark` #2C1810 | Texte principal body, fond footer |
| `ayaba-cream` #FAF7F2 | Texte footer, fond sections alternées (pas directement dans cette story) |
| `ayaba-muted` #6B5E57 | Texte secondaire (copyright footer), langue inactive dans switcher |

### Typographie — Rappel

- **Titres h1, h2** : `font-heading` (Playfair Display), `font-bold` (700)
- **Corps, nav, boutons** : `font-body` (Inter), `font-normal` (400) ou `font-semibold` (600)
- **Jamais de texte < 14px** (accessibilité mobile)
- **Logo texte** : `font-heading` pour la marque

### Espacement — Rappel (UX spec)

- Container max-width : `max-w-7xl` (1280px)
- Padding horizontal container : `px-4` mobile, `px-6` tablette, `px-8` desktop
- Cibles tactiles : minimum `min-h-[44px] min-w-[44px]` sur mobile

### Patterns architecturaux stricts

- **Composants `.astro` uniquement** — zero framework JS client
- **Données centralisées dans `src/data/`** — les liens de nav viennent de `navigation.ts`
- **Traductions UI dans `src/i18n/{locale}.json`** — le texte "Skip to content", les labels d'accessibilité doivent être traduits. Ajouter les clés manquantes dans fr.json et en.json
- **Props Astro (pas de state client)** — la locale et le currentPath sont passés comme props du serveur

### Nouvelles clés i18n à ajouter

Ajouter dans `src/i18n/fr.json` et `src/i18n/en.json` :

```json
{
  "accessibility": {
    "skipToContent": "Aller au contenu principal" / "Skip to content",
    "mainNavigation": "Menu principal" / "Main navigation",
    "openMenu": "Ouvrir le menu" / "Open menu",
    "closeMenu": "Fermer le menu" / "Close menu",
    "switchToFrench": "Basculer vers le français" / "Switch to French",
    "switchToEnglish": "Basculer vers l'anglais" / "Switch to English"
  },
  "site": {
    "copyright": "© {year} Maison Ayaba. Tous droits réservés." / "© {year} Maison Ayaba. All rights reserved."
  }
}
```

### Dépendances amont (Story 1.1 — DONE)

Fichiers existants utilisés par cette story :
- `src/styles/global.css` — tokens Tailwind v4 (couleurs, fonts) ✅
- `src/i18n/utils.ts` — `getLocale()`, `t()`, `getLocalizedUrl()`, `Locale`, `DEFAULT_LOCALE`, `LOCALES` ✅
- `src/i18n/fr.json` / `en.json` — traductions existantes (nav, buttons, labels, footer) ✅
- `src/data/navigation.ts` — `getNavigation(locale)` retourne les 6 `NavItem[]` ✅
- `src/data/siteConfig.ts` — `siteName`, `siteDescription`, `baseUrl` ✅
- `astro.config.mjs` — config Astro avec sitemap + vercel + tailwindcss/vite ✅

### Dépendances aval (Story 1.3, 1.4)

Composants créés dans cette story et utilisés par les stories suivantes :
- `BaseLayout.astro` → utilisé par TOUTES les pages futures (page accueil, appartement, etc.)
- `Header.astro` → inclus dans BaseLayout, réutilisé tel quel
- `Footer.astro` → inclus dans BaseLayout, réutilisé tel quel
- `LanguageSwitcher.astro` → inclus dans Header, réutilisé tel quel

**Story 1.3 (AirbnbCta)** ajoutera le composant `AirbnbCta.astro` qui sera potentiellement intégré dans le header mobile (CTA sticky). Pour l'instant, le CTA "Réserver" dans le header est un simple lien vers la page `/fr/reserver/` ou `/en/book/`.

### Intelligence Story 1.1 — Leçons apprises

De la story précédente :
1. **Tailwind v4 vs v3** : L'architecture doc référençait des patterns v3. La story 1.1 a corrigé en utilisant `@tailwindcss/vite` + `@theme` dans CSS. Continuer ce pattern.
2. **Astro crée dans un sous-dossier** quand le répertoire n'est pas vide → ne s'applique pas ici (projet déjà initialisé)
3. **TypeScript strict est le défaut** depuis Astro v5
4. **Redirection racine** : `src/pages/index.astro` redirige vers `/fr/` — ne pas toucher
5. **Navigation.ts utilise les clés i18n** (pas de labels en dur) — approche correcte à maintenir
6. **apartments.ts amenities via clés i18n** — pattern à suivre pour tout texte localisé
7. **Code review Story 1.1** : a ajouté `site` dans astro.config, viewport meta, DOCTYPE — ces éléments sont déjà en place

### Project Structure Notes

- `BaseLayout.astro` → `src/layouts/BaseLayout.astro`
- `Header.astro` → `src/components/common/Header.astro`
- `Footer.astro` → `src/components/common/Footer.astro`
- `LanguageSwitcher.astro` → `src/components/common/LanguageSwitcher.astro`
- Alignement complet avec la structure définie dans `architecture.md`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules] — Conventions nommage et patterns stricts
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure] — Emplacement des fichiers
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, zero JS client
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Transferable UX Patterns] — Nav minimale 5 items, sticky header mobile, CTA
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Chosen Direction] — Direction hybride Immersif-Minimaliste-Corporate, structure page d'accueil
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Color System] — Palette couleurs avec ratios contraste
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Typography System] — Échelle typographique, chargement fonts
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Spacing & Layout Foundation] — Container, padding, grille responsive
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Accessibility Considerations] — WCAG 2.1 AA, skip-to-content, focus visible, cibles tactiles
- [Source: _bmad-output/implementation-artifacts/1-1-initialisation-astro-tailwind-structure-i18n.md] — Fichiers existants, patterns établis, leçons apprises
- [Source: Astro 6 Docs — v6.docs.astro.build/en/basics/layouts] — Layout component avec slots
- [Source: Astro 6 Docs — v6.docs.astro.build/en/tutorial/3-components/4] — CSS mobile navigation avec :has()

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème bloquant rencontré.

### Completion Notes List

- BaseLayout.astro créé avec structure HTML sémantique complète, Google Fonts preconnect/preload, slot head, skip-to-content link traduit FR/EN
- Header.astro avec 4 items nav texte + CTA "Réserver" bouton (Blog exclu), logo texte, language switcher, item actif surligné ayaba-terra, sticky header
- Menu hamburger mobile via CSS `:has([aria-expanded="true"])` + script inline minimal pour toggle aria-expanded
- LanguageSwitcher.astro avec FR|EN, locale active en gras ayaba-terra, lien vers même page dans l'autre langue via getLocalizedUrl + trailing slash
- Footer.astro avec fond ayaba-dark, texte ayaba-cream, liens nav identiques au header, copyright dynamique avec année
- Pages FR/EN refactorisées pour utiliser BaseLayout au lieu du HTML inline
- Clés i18n ajoutées : accessibility.skipToContent, mainNavigation, openMenu, closeMenu, switchToFrench, switchToEnglish, site.copyright
- Toutes les cibles tactiles minimum 44x44px sur mobile
- Focus visible outline-2 outline-ayaba-terra sur tous les éléments interactifs
- Build vérifié sans erreur, rendu vérifié sur mobile (375px), tablette (900px) et desktop (1280px) via Playwright

### Change Log

- 2026-03-14: Implémentation complète Story 1.2 — BaseLayout, Header, Footer, LanguageSwitcher, refactoring pages FR/EN, clés i18n accessibilité
- 2026-03-14: Code review — 6 issues corrigées : doublon "Réserver" dans nav (slice 0,4), ajout infos contact footer (AC #4), fix getLocalizedUrl trailing slash à la source, toggle aria-label hamburger open/close, préfixe focus: sur outline classes, retrait aria-current sur spans

### File List

- src/layouts/BaseLayout.astro (nouveau)
- src/components/common/Header.astro (nouveau)
- src/components/common/Footer.astro (nouveau)
- src/components/common/LanguageSwitcher.astro (nouveau)
- src/pages/fr/index.astro (modifié — utilise BaseLayout)
- src/pages/en/index.astro (modifié — utilise BaseLayout)
- src/i18n/fr.json (modifié — ajout clés accessibility + site + footer.contact/location)
- src/i18n/en.json (modifié — ajout clés accessibility + site + footer.contact/location)
- src/i18n/utils.ts (modifié — getLocalizedUrl retourne trailing slash)
