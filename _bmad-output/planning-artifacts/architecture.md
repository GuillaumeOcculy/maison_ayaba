---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-03-14'
inputDocuments:
  - prd.md
  - product-brief-maison_ayaba-2026-03-14.md
workflowType: 'architecture'
project_name: 'maison_ayaba'
user_name: 'Onizuka'
date: '2026-03-14'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (32 FRs en 7 catégories) :**
- Contenu & Pages (FR1-FR6) : 5 pages vitrine + page réserver — architecture de pages statiques
- Blog & Contenu SEO (FR7-FR10) : Blog avec articles individuels indexables — système de contenu markdown
- Navigation & Internationalisation (FR11-FR14) : Menu, sélecteur de langue, URLs localisées — routing bilingue FR/EN
- Conversion & CTA (FR15-FR18) : Boutons Airbnb omniprésents, max 2-3 clics — composants CTA réutilisables
- SEO & Découvrabilité (FR19-FR22) : Meta tags, sitemap, schema.org, AEO — couche SEO technique
- Responsive & Accessibilité (FR23-FR25) : Mobile-first, clavier, lecteur d'écran — WCAG 2.1 AA
- Analytics & Suivi (FR26-FR28) : GA4 avec événements de conversion — intégration côté client
- Administration (FR29-FR32) : Gestion contenu dans le code, déploiement statique — workflow développeur

**Non-Functional Requirements (21 NFRs en 5 catégories) :**
- Performance (NFR1-5) : < 3s mobile 4G, Lighthouse > 90, FCP < 1.5s, CLS < 0.1, images optimisées
- Sécurité (NFR6-9) : HTTPS, headers sécurité, zero données utilisateur, rel noopener
- Scalabilité (NFR10-11) : CDN statique, distribution Europe + Afrique de l'Ouest
- Accessibilité (NFR12-16) : WCAG 2.1 AA, Lighthouse Accessibility > 90, contraste 4.5:1
- SEO Technique (NFR17-21) : Lighthouse SEO > 95, meta uniques, URLs propres, hreflang, sitemap auto

**Scale & Complexity:**

- Domaine principal : Web statique (SSG/MPA)
- Niveau de complexité : Basse
- Composants architecturaux estimés : ~8-10 (pages, layout, composants UI, système i18n, blog engine, SEO layer, analytics, build pipeline)

### Technical Constraints & Dependencies

- **Déploiement CDN** : Vercel, Netlify ou Cloudflare Pages — build statique obligatoire
- **Zero backend** : Pas de serveur, pas de BDD, pas de données utilisateur. Les articles blog sont des fichiers Markdown versionnés dans Git
- **Solo dev** : Architecture doit être simple à maintenir par une seule personne
- **Timeline serrée** : MVP 16-17 mars 2026 — la stack doit être productive immédiatement
- **Distribution géographique** : Latence acceptable depuis Europe ET Afrique de l'Ouest
- **Contenu bilingue** : Traduction manuelle (pas d'auto-traduction), qualité SEO requise
- **Phase 2 anticipée** : L'architecture doit permettre l'ajout futur de réservations directes sans réécriture

### Cross-Cutting Concerns Identified

- **Internationalisation (i18n)** : Impacte toutes les pages, le routing, le SEO, les meta tags
- **SEO/AEO** : Impacte la structure HTML, les données structurées, le contenu, les URLs
- **Performance** : Impacte le choix d'images, le build, le lazy loading, le CDN
- **Accessibilité** : Impacte tous les composants UI, la navigation, le contenu
- **Design System** : Cohérence visuelle entre toutes les pages et composants
- **Analytics** : Tracking à intégrer sur toutes les pages et interactions CTA

## Starter Template Evaluation

### Primary Technology Domain

Web statique (SSG/MPA) — site vitrine contenu-first avec blog Markdown intégré, bilingue FR/EN, SEO-first.

### Starter Options Considered

| Critère | Astro 6 | Next.js SSG |
|---------|---------|-------------|
| JavaScript envoyé | Zero par défaut (HTML pur) | Embarque React runtime + hydration |
| Performance | 40% plus rapide, 90% moins de JS | Bon mais plus lourd |
| SEO | HTML statique natif, Core Web Vitals parfaits | Bon mais nécessite plus de config |
| i18n SSG | Supporté nativement avec routing statique | i18n + SSG = workarounds nécessaires |
| Blog Markdown | Content Collections natif | Possible mais plus de plomberie |
| Complexité | Simple pour un site contenu | Surpuissant pour un site vitrine |
| Coût hébergement | Statique pur = quasi gratuit | Statique possible mais écosystème pousse vers SSR |
| Version actuelle | 6.0 (sorti 10 mars 2026) | 15.x |

### Selected Starter: Astro 6

**Rationale :**
- Framework construit pour les sites contenu statiques — exactement le cas d'usage de Maison Ayaba
- Zero JavaScript par défaut = performances maximales et Lighthouse scores > 90 garantis
- Content Collections natif pour le blog Markdown avec schéma typé
- i18n avec routing statique supporté nativement
- Intégrations officielles pour sitemap, Tailwind, Vercel
- Next.js serait du overkill pour un site vitrine sans backend

**Commande d'initialisation :**

```bash
npm create astro@latest maison-ayaba -- --template minimal --typescript strict --install --git
```

**Décisions architecturales fournies par le starter :**

**Langage & Runtime :**
- TypeScript (mode strict) — Node 22+
- Astro 6.0 avec compilateur Rust

**Styling :**
- À ajouter : Tailwind CSS via `@astrojs/tailwind` (intégration officielle)

**Build Tooling :**
- Vite (intégré) — output statique SSG par défaut
- Build rapide (~3x plus rapide que Next.js)

**Testing :**
- Non inclus dans le starter minimal — à configurer si nécessaire

**Organisation du code :**
- File-based routing (`src/pages/`)
- Composants Astro (`src/components/`)
- Layouts réutilisables (`src/layouts/`)
- Content Collections pour le blog (`src/content/`)

**Développement :**
- Dev server avec HMR via Vite
- TypeScript strict avec diagnostics natifs

**Intégrations à ajouter :**
- `@astrojs/sitemap` — sitemap XML auto-généré à chaque build
- `@astrojs/tailwind` — styling utility-first
- `@astrojs/vercel` — adapter de déploiement Vercel
- Schema.org via composants Astro custom
- GA4 via script inline (seule intégration externe)

**Note :** L'initialisation du projet avec cette commande sera la première story d'implémentation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation) :**
- Framework : Astro 6 (SSG)
- Styling : Tailwind CSS
- Déploiement : Vercel
- i18n : Routing statique bilingue FR/EN
- Contenu blog : Content Collections (Markdown)

**Important Decisions (Shape Architecture) :**
- Composants : 100% `.astro` (zero framework JS client)
- Images : `astro:assets` natif (optimisation automatique)
- Analytics : GA4 via script inline
- SEO : Schema.org via composants Astro custom

**Deferred Decisions (Post-MVP) :**
- Système de réservation directe (Phase 2)
- CMS headless éventuel (si besoin d'interface d'édition web)
- Tests automatisés (pas de pipeline CI en Phase 1)

### Data Architecture

**Non applicable en Phase 1.** Pas de base de données, pas de données utilisateur côté serveur.

- Contenu des pages : fichiers `.astro` dans `src/pages/`
- Articles blog : fichiers Markdown dans `src/content/` via Content Collections
- Données structurées (prix, configs, URLs Airbnb) : fichiers de données TypeScript ou JSON dans `src/data/`
- Traductions : fichiers JSON par langue dans `src/i18n/`

### Authentication & Security

**Non applicable en Phase 1.** Pas d'authentification, pas d'API, pas de données sensibles.

- HTTPS : fourni par Vercel (automatique)
- Headers de sécurité : configurés via `vercel.json` (CSP, X-Frame-Options, X-Content-Type-Options)
- Liens externes : `rel="noopener noreferrer"` sur tous les liens sortants
- Pas de cookies, pas de formulaires, pas de données utilisateur collectées

### API & Communication Patterns

**Non applicable en Phase 1.** Aucune API, aucune communication serveur.

- Liens sortants vers Airbnb (3 URLs d'annonces)
- GA4 : communication client → Google via gtag.js
- Pas de formulaire de contact en Phase 1

### Frontend Architecture

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Composants | `.astro` uniquement | Zero JS client, performance maximale, simplicité |
| Styling | Tailwind CSS (`@astrojs/tailwind`) | Utility-first, productif pour solo dev, responsive natif |
| Images | `astro:assets` (`<Image>`) | WebP/AVIF auto, responsive srcset, lazy loading natif |
| Routing | File-based (Astro natif) | `/fr/` et `/en/` via dossiers dans `src/pages/` |
| State management | Aucun | Site statique, pas d'état client |
| Bundle JS | Zero | Pas d'hydration, pas de framework client |
| Accessibilité | HTML sémantique + ARIA | WCAG 2.1 AA, contraste 4.5:1, navigation clavier |

### Infrastructure & Deployment

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Hébergement | Vercel (plan gratuit) | CDN global, auto-deploy sur git push, HTTPS automatique |
| CI/CD | Vercel auto-build | Build déclenché par `git push` sur `main`, zero config |
| Environnement | `.env` + Vercel env vars | GA4 Measurement ID, URLs Airbnb |
| Monitoring | Vercel Analytics (basique) | Suffisant pour Phase 1, pas de monitoring custom |
| Domaine | maisonayaba.com / maisonayaba.fr | Configuré dans Vercel DNS |

### Decision Impact Analysis

**Séquence d'implémentation :**
1. Initialisation projet Astro 6 + Tailwind + intégrations
2. Structure i18n (routing FR/EN, fichiers de traduction)
3. Layout principal + composants réutilisables (Header, Footer, CTA)
4. Pages vitrine (Accueil, Appartement, Quartier, Hôte, Réserver)
5. SEO technique (meta tags, schema.org, sitemap)
6. GA4 + tracking conversions
7. Blog + Content Collections
8. Déploiement Vercel + domaine

**Dépendances entre décisions :**
- i18n doit être en place avant les pages (structure de routing)
- Layout doit être prêt avant les pages (composants partagés)
- SEO layer doit être intégré au layout (meta tags dans le `<head>`)
- GA4 doit être dans le layout (chargé sur toutes les pages)

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Fichiers & Dossiers :**
- Pages : `kebab-case.astro` → `appartement.astro`, `votre-hote.astro`
- Composants : `PascalCase.astro` → `HeroSection.astro`, `AirbnbCta.astro`
- Layouts : `PascalCase.astro` → `BaseLayout.astro`, `BlogLayout.astro`
- Blog Markdown : `kebab-case.md` → `securite-cotonou.md`
- Données : `camelCase.ts` → `airbnbLinks.ts`, `siteConfig.ts`
- Traductions : `{locale}.json` → `fr.json`, `en.json`

**Variables & Fonctions (TypeScript) :**
- Variables : `camelCase` → `airbnbUrl`, `gaTrackingId`
- Fonctions : `camelCase` → `getLocalizedUrl()`, `trackAirbnbClick()`
- Constantes : `UPPER_SNAKE_CASE` → `AIRBNB_URLS`, `DEFAULT_LOCALE`
- Types/Interfaces : `PascalCase` → `BlogPost`, `ApartmentConfig`

**CSS (Tailwind) :**
- Classes custom : `kebab-case` → `cta-primary`, `section-hero`

### Structure Patterns

```
src/
├── pages/
│   ├── fr/                  # Pages françaises
│   │   ├── index.astro
│   │   ├── appartement.astro
│   │   ├── fidjrosse-cotonou.astro
│   │   ├── votre-hote.astro
│   │   ├── reserver.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── en/                  # Pages anglaises (même structure)
│       ├── index.astro
│       ├── apartment.astro
│       ├── fidjrosse-cotonou.astro
│       ├── your-host.astro
│       ├── book.astro
│       └── blog/
│           ├── index.astro
│           └── [slug].astro
├── components/
│   ├── common/              # Header, Footer, LanguageSwitcher
│   ├── sections/            # HeroSection, ApartmentCard, etc.
│   ├── seo/                 # SchemaOrg, MetaTags
│   └── ui/                  # Button, Card (primitives réutilisables)
├── layouts/
│   ├── BaseLayout.astro
│   └── BlogLayout.astro
├── content/
│   └── blog/
│       ├── fr/              # Articles français (.md)
│       └── en/              # Articles anglais (.md)
├── data/
│   ├── apartments.ts        # Configs appartements, prix, URLs Airbnb
│   └── navigation.ts        # Structure du menu
├── i18n/
│   ├── fr.json
│   ├── en.json
│   └── utils.ts             # Helpers i18n
├── styles/
│   └── global.css           # Tailwind directives + styles globaux
└── assets/
    └── images/              # Photos optimisées via astro:assets
```

### Process Patterns

**i18n — Règle stricte :**
- Locale par défaut : `fr`
- Chaque page existe en `/fr/` et `/en/`
- Les traductions UI sont dans `src/i18n/{locale}.json`
- Le contenu des pages est directement dans les fichiers `.astro` par langue (pas de traduction dynamique)
- Les articles blog ont leur version dans `src/content/blog/{locale}/`

**SEO — Règle stricte :**
- Chaque page a un composant `<MetaTags>` dans le `<head>` avec title, description, og:image
- `hreflang` généré automatiquement pour chaque paire FR/EN
- Schema.org intégré via composant `<SchemaOrg>` dans le layout

**CTA Airbnb — Règle stricte :**
- Toujours utiliser le composant `<AirbnbCta>` (jamais de lien Airbnb en dur)
- URLs Airbnb centralisées dans `src/data/apartments.ts`
- Chaque CTA déclenche un événement GA4 via `trackAirbnbClick(configId)`
- Attribut `rel="noopener noreferrer"` + `target="_blank"` systématique

**Images — Règle stricte :**
- Toujours utiliser `<Image>` d'Astro (jamais de `<img>` brut)
- Images sources dans `src/assets/images/`
- Alt text obligatoire et descriptif (accessibilité)

### Enforcement Guidelines

**Tout agent IA DOIT :**
1. Utiliser les conventions de nommage ci-dessus sans exception
2. Placer les fichiers dans les dossiers définis par la structure
3. Utiliser les composants partagés (`<AirbnbCta>`, `<MetaTags>`, `<Image>`) au lieu de réimplémenter
4. Centraliser les données dans `src/data/` (jamais de valeurs en dur dans les pages)
5. Maintenir la parité FR/EN pour toute nouvelle page ou article

**Anti-patterns à éviter :**
- Liens Airbnb codés en dur dans les pages
- Images avec `<img>` natif au lieu de `<Image>` Astro
- Styles inline au lieu de classes Tailwind
- Contenu traduit dynamiquement au lieu de fichiers par langue
- Composants React/Vue inutiles (rester en `.astro`)

## Project Structure & Boundaries

### Complete Project Directory Structure

```
maison-ayaba/
├── astro.config.mjs           # Config Astro + intégrations (sitemap, tailwind, vercel)
├── tailwind.config.mjs        # Config Tailwind (couleurs, fonts, breakpoints)
├── tsconfig.json              # TypeScript strict
├── package.json
├── .env                       # GA4_MEASUREMENT_ID (local)
├── .env.example               # Template pour les variables d'environnement
├── .gitignore
├── vercel.json                # Headers de sécurité (CSP, X-Frame-Options)
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── og-image.jpg           # Image OpenGraph par défaut
└── src/
    ├── pages/
    │   ├── fr/
    │   │   ├── index.astro              # Accueil FR
    │   │   ├── appartement.astro        # 3 configs côte à côte
    │   │   ├── fidjrosse-cotonou.astro  # Quartier & ville
    │   │   ├── votre-hote.astro         # Hôte + Protocole Kwabo
    │   │   ├── reserver.astro           # Récap + 3 CTAs Airbnb
    │   │   └── blog/
    │   │       ├── index.astro          # Liste articles
    │   │       └── [...slug].astro      # Article dynamique
    │   └── en/
    │       ├── index.astro
    │       ├── apartment.astro
    │       ├── fidjrosse-cotonou.astro
    │       ├── your-host.astro
    │       ├── book.astro
    │       └── blog/
    │           ├── index.astro
    │           └── [...slug].astro
    ├── components/
    │   ├── common/
    │   │   ├── Header.astro             # Nav + sélecteur langue
    │   │   ├── Footer.astro             # Liens, copyright
    │   │   └── LanguageSwitcher.astro   # Toggle FR/EN
    │   ├── sections/
    │   │   ├── HeroSection.astro        # Hero page d'accueil
    │   │   ├── ApartmentCard.astro      # Carte config (1ch/2ch/3ch)
    │   │   ├── ApartmentGrid.astro      # Grille 3 configs
    │   │   ├── HostSection.astro        # Section Protocole Kwabo
    │   │   └── NeighborhoodMap.astro    # Section quartier
    │   ├── seo/
    │   │   ├── MetaTags.astro           # title, description, og:*, hreflang
    │   │   └── SchemaOrg.astro          # LodgingBusiness, FAQPage, Breadcrumb
    │   └── ui/
    │       ├── AirbnbCta.astro          # Bouton réservation Airbnb (avec tracking GA4)
    │       ├── Button.astro             # Bouton générique
    │       └── ImageGallery.astro       # Galerie photos appartement
    ├── layouts/
    │   ├── BaseLayout.astro             # <html>, <head>, GA4 script, Header, Footer
    │   └── BlogLayout.astro             # Extension de Base pour articles
    ├── content/
    │   ├── config.ts                    # Schéma Content Collections (blog)
    │   └── blog/
    │       ├── fr/
    │       │   ├── securite-cotonou.md
    │       │   ├── transport-cotonou.md
    │       │   └── appartement-meuble-cotonou.md
    │       └── en/
    │           ├── cotonou-safety.md
    │           ├── cotonou-transport.md
    │           └── furnished-apartment-cotonou.md
    ├── data/
    │   ├── apartments.ts                # 3 configs : nom, prix, équipements, URL Airbnb
    │   ├── navigation.ts                # Items menu par langue
    │   └── siteConfig.ts                # Nom du site, URLs, GA4 ID, locales
    ├── i18n/
    │   ├── fr.json                      # Traductions UI (boutons, labels, nav)
    │   ├── en.json
    │   └── utils.ts                     # getLocale(), t(), getLocalizedUrl()
    ├── styles/
    │   └── global.css                   # @tailwind base/components/utilities + custom
    └── assets/
        └── images/
            ├── hero/                    # Photos hero sections
            ├── apartments/              # Photos par config (1ch, 2ch, 3ch)
            ├── neighborhood/            # Photos quartier Fidjrossè
            └── host/                    # Photo hôte
```

### Requirements → Structure Mapping

| FR Category | Fichiers concernés |
|---|---|
| FR1-FR6 : Contenu & Pages | `src/pages/fr/*.astro`, `src/pages/en/*.astro` |
| FR7-FR10 : Blog SEO | `src/content/blog/`, `src/pages/*/blog/`, `BlogLayout.astro` |
| FR11-FR14 : Navigation & i18n | `Header.astro`, `LanguageSwitcher.astro`, `src/i18n/`, `src/data/navigation.ts` |
| FR15-FR18 : CTA Conversion | `AirbnbCta.astro`, `src/data/apartments.ts` |
| FR19-FR22 : SEO & Découvrabilité | `MetaTags.astro`, `SchemaOrg.astro`, `astro.config.mjs` (sitemap) |
| FR23-FR25 : Responsive & Accessibilité | `BaseLayout.astro`, `global.css`, tous les composants |
| FR26-FR28 : Analytics | `BaseLayout.astro` (GA4 script), `AirbnbCta.astro` (tracking clics) |
| FR29-FR32 : Administration | `src/content/blog/`, `src/data/`, workflow `git push` → Vercel |

### Architectural Boundaries

**Component Boundaries :**
- `layouts/` → structure HTML globale, ne contient pas de contenu spécifique
- `components/sections/` → sections réutilisables avec props, ne font pas d'accès données
- `components/ui/` → primitives pures (bouton, carte), zéro logique métier
- `components/seo/` → meta tags et données structurées, reçoivent les données via props
- `data/` → source unique de vérité pour les données (prix, URLs, config)
- `i18n/` → source unique de vérité pour les traductions UI

**Data Flow :**
```
src/data/*.ts → pages/*.astro → composants (via props) → HTML statique
src/i18n/*.json → utils.ts → composants (via t()) → HTML statique
src/content/blog/ → [...slug].astro → BlogLayout → HTML statique
```

**External Integrations :**
- **Airbnb** : liens sortants uniquement via `AirbnbCta.astro` → URLs dans `apartments.ts`
- **GA4** : script `gtag.js` dans `BaseLayout.astro`, événements dans `AirbnbCta.astro`
- **Vercel** : `git push main` → build automatique → CDN global

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility :**
- Astro 6 + Tailwind CSS + Vercel : stack officiellement supportée, intégrations Astro dédiées
- TypeScript strict + Content Collections : typage natif des schémas blog
- SSG statique + CDN Vercel : zero conflit, mode par défaut d'Astro
- Aucune contradiction détectée entre les décisions

**Pattern Consistency :**
- Conventions de nommage alignées avec les standards Astro (PascalCase composants, kebab-case pages)
- Structure `src/` conforme au file-based routing d'Astro
- Patterns i18n (dossiers par locale) cohérents avec l'approche SSG

**Structure Alignment :**
- Structure projet supporte toutes les décisions : pages par langue, composants par responsabilité, données centralisées
- Boundaries claires : data → pages → composants → HTML
- Points d'intégration (GA4, Airbnb) encapsulés dans des composants dédiés

### Requirements Coverage Validation ✅

**Functional Requirements (32/32 couverts) :**

| FR | Couverture architecturale |
|---|---|
| FR1-FR6 (Pages) | ✅ Pages `.astro` dans `src/pages/fr/` et `src/pages/en/` |
| FR7-FR10 (Blog) | ✅ Content Collections + `BlogLayout` + `[...slug].astro` |
| FR11-FR14 (Nav & i18n) | ✅ `Header`, `LanguageSwitcher`, `src/i18n/`, routing par dossiers |
| FR15-FR18 (CTA) | ✅ `AirbnbCta.astro` centralisé + `apartments.ts` |
| FR19-FR22 (SEO) | ✅ `MetaTags`, `SchemaOrg`, `@astrojs/sitemap`, HTML sémantique |
| FR23-FR25 (Responsive/A11y) | ✅ Tailwind mobile-first, HTML sémantique, `<Image>` avec alt |
| FR26-FR28 (Analytics) | ✅ GA4 dans `BaseLayout`, événements dans `AirbnbCta` |
| FR29-FR32 (Admin) | ✅ Contenu dans le code, `git push` → Vercel auto-deploy |

**Non-Functional Requirements (21/21 couverts) :**

| NFR | Couverture |
|---|---|
| NFR1-5 (Performance) | ✅ SSG = HTML pré-rendu, zero JS, `<Image>` optimisation auto |
| NFR6-9 (Sécurité) | ✅ HTTPS Vercel, headers dans `vercel.json`, zero données utilisateur |
| NFR10-11 (Scalabilité) | ✅ CDN Vercel global (Europe + Afrique de l'Ouest) |
| NFR12-16 (Accessibilité) | ✅ HTML sémantique, Tailwind contraste, alt obligatoire, focus visible |
| NFR17-21 (SEO technique) | ✅ `MetaTags`, hreflang, sitemap auto, URLs descriptives |

### Implementation Readiness ✅

- Toutes les décisions critiques documentées avec versions
- Arbre projet complet avec chaque fichier nommé et sa responsabilité
- Conventions, anti-patterns et enforcement guidelines définis

### Gap Analysis

**Gaps critiques :** Aucun
**Gaps importants :** Aucun
**Suggestions mineures (non bloquantes) :**
- Pas de tests automatisés en Phase 1 — acceptable pour un MVP statique solo dev
- Pas de monitoring avancé — Vercel Analytics basique suffit
- Pas de design system formel — composants Tailwind suffisamment simples

### Architecture Completeness Checklist

- [x] Contexte projet analysé en profondeur
- [x] Échelle et complexité évaluées (basse)
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales mappées
- [x] Décisions critiques documentées avec versions
- [x] Stack technique complètement spécifiée
- [x] Patterns d'intégration définis
- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Anti-patterns identifiés
- [x] Structure de répertoires complète
- [x] Boundaries de composants établies
- [x] Points d'intégration mappés
- [x] Mapping requirements → structure complet

### Architecture Readiness Assessment

**Status : READY FOR IMPLEMENTATION ✅**
**Confidence : HIGH**

**Forces clés :**
- Architecture minimaliste alignée avec le cas d'usage
- Zero complexité inutile (pas de BDD, pas d'API, pas de framework JS client)
- Stack éprouvée et bien documentée (Astro + Tailwind + Vercel)
- Patterns clairs pour la cohérence entre agents IA

**Améliorations futures (Phase 2+) :**
- Tests automatisés (Playwright pour les parcours critiques)
- CMS headless si l'édition via code devient un frein
- Système de réservation directe (nécessitera un backend)

### Implementation Handoff

**AI Agent Guidelines :**
- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les patterns d'implémentation de manière cohérente
- Respecter la structure projet et les boundaries
- Consulter ce document pour toute question architecturale

**Première priorité d'implémentation :**
```bash
npm create astro@latest maison-ayaba -- --template minimal --typescript strict --install --git
```
