---
title: 'Epic 4 — Blog & Contenu Anti-Peurs'
slug: 'epic-4-blog-contenu-anti-peurs'
created: '2026-03-15'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Astro 6.0 Content Collections', 'Markdown', 'Tailwind CSS v4 (@tailwindcss/vite)', 'TypeScript strict', 'Vercel adapter']
files_to_modify:
  - 'src/content/config.ts (CREATE)'
  - 'src/layouts/BlogLayout.astro (CREATE)'
  - 'src/pages/fr/blog/index.astro (CREATE)'
  - 'src/pages/en/blog/index.astro (CREATE)'
  - 'src/pages/fr/blog/[slug].astro (CREATE)'
  - 'src/pages/en/blog/[slug].astro (CREATE)'
  - 'src/content/blog/fr/securite-cotonou.md (CREATE)'
  - 'src/content/blog/fr/transport-cotonou.md (CREATE)'
  - 'src/content/blog/fr/appartement-meuble-cotonou.md (CREATE)'
  - 'src/content/blog/en/cotonou-safety.md (CREATE)'
  - 'src/content/blog/en/cotonou-transport.md (CREATE)'
  - 'src/content/blog/en/furnished-apartment-cotonou.md (CREATE)'
  - 'src/i18n/fr.json (MODIFY — ajouter clés blog.*)'
  - 'src/i18n/en.json (MODIFY — ajouter clés blog.*)'
  - 'src/components/common/Header.astro (MODIFY — .slice(0,5))'
  - 'src/components/common/Footer.astro (MODIFY — .slice(0,6))'
  - 'src/data/navigation.ts (MODIFY — ajouter mapping alternateSlug blog)'
code_patterns:
  - 'BaseLayout props: locale, title, description, ogImage?, hideHeader?'
  - 'MetaTags props: title, description, ogImage?, locale, currentPath, type?'
  - 'SchemaOrg props: type, locale, faqItems?, breadcrumbItems?'
  - 'i18n: t(locale, key, params?) — clés dot-notated dans {locale}.json'
  - 'Navigation: getNavigation(locale) retourne NavItem[], getAlternateUrl(path, locale)'
  - 'getAlternateUrl fallback: remplace le segment locale dans le path — fonctionne pour /fr/blog/slug/ → /en/blog/slug/ mais les slugs FR≠EN nécessitent un mapping via frontmatter alternateSlug'
  - 'Composants .astro uniquement — zero JS client sauf script inline GA4'
  - 'trailingSlash: always — tous les URLs finissent par /'
test_patterns: ['Pas de tests automatisés en Phase 1 — validation manuelle build + navigation']
---

# Tech-Spec: Epic 4 — Blog & Contenu Anti-Peurs

**Created:** 2026-03-15

## Overview

### Problem Statement

Les visiteurs anxieux à propos de Cotonou (sécurité, transport, hébergement) n'ont pas de contenu SEO qui répond à leurs peurs et les guide naturellement vers Maison Ayaba. Sans blog, le site rate une source majeure de trafic organique et ne convertit pas les visiteurs en phase de recherche.

### Solution

Implémenter l'infrastructure blog complète via Astro Content Collections (Markdown) + 3 articles bilingues FR/EN anti-peurs avec maillage interne vers les pages existantes, schema FAQ et meta tags SEO optimisés.

### Scope

**In Scope:**
- Story 4.1 : Infrastructure Blog — Content Collections schema, BlogLayout, pages dynamiques
- Story 4.2 : Liste d'articles & navigation blog — pages index, lien blog dans Header, suggestions fin d'article
- Story 4.3 : 3 articles SEO anti-peurs FR + EN (sécurité, transport, hébergement meublé)
- Traductions blog dans fr.json / en.json
- Schema.org FAQPage sur les articles Q/R
- Meta tags SEO optimisés par article

**Out of Scope:**
- CMS headless ou interface d'édition web
- Commentaires sur les articles
- Newsletter ou abonnement
- Articles supplémentaires au-delà des 3 premiers
- Pagination (3 articles seulement)
- Recherche dans le blog

## Context for Development

### Codebase Patterns

- Composants `.astro` uniquement — zero framework JS client
- Routing i18n par dossiers (`src/pages/fr/`, `src/pages/en/`)
- Données centralisées dans `src/data/` — jamais de valeurs en dur
- Traductions UI dans `src/i18n/{locale}.json` via helper `t(locale, key, params?)`
- Images via `astro:assets` (`<Image>`) exclusivement
- CTA Airbnb toujours via composant `<AirbnbCta>` avec tracking GA4
- SEO via composants `<MetaTags>` et `<SchemaOrg>` dans les layouts
- BaseLayout fournit : `<html>`, `<head>` (MetaTags, GA4), Header, `<main>`, Footer, StickyMobileCta, WhatsAppButton
- BaseLayout props : `{ locale: Locale, title: string, description: string, ogImage?: string, hideHeader?: boolean }`
- MetaTags génère : canonical, hreflang (via `getAlternateUrl`), OG tags, Twitter cards
- MetaTags props : `{ title, description, ogImage?, locale, currentPath, type? }` — type défaut `'website'`, passer `'article'` pour les articles blog
- SchemaOrg supporte : `LodgingBusiness`, `FAQPage`, `BreadcrumbList`, `WebSite`
- SchemaOrg FAQPage accepte `faqItems: { question: string, answer: string }[]`
- Navigation : `getNavigation(locale)` retourne `NavItem[]` (6 items), `getAlternateUrl(currentPath, targetLocale)` avec fallback swap-locale-prefix
- Header utilise `.slice(0, 4)` → exclut Réserver et Blog du menu desktop/mobile
- Footer utilise `.slice(0, 5)` → inclut Réserver mais exclut Blog
- `trailingSlash: 'always'` dans astro.config → tous les URLs doivent finir par `/`
- `astro.config.mjs` n'a PAS de config Content Collections — Astro 6 les détecte automatiquement via `src/content/config.ts`

### Files to Reference

| File | Purpose | Impact |
| ---- | ------- | ------ |
| `src/layouts/BaseLayout.astro` | Layout parent — HTML, head, GA4, Header/Footer, slot head | BlogLayout l'étend, passe `type='article'` |
| `src/components/seo/MetaTags.astro` | Canonical, hreflang, OG, Twitter | Supporte déjà `type` prop — passer `'article'` |
| `src/components/seo/SchemaOrg.astro` | JSON-LD structured data | Utiliser FAQPage + BreadcrumbList dans BlogLayout |
| `src/components/ui/AirbnbCta.astro` | CTA Airbnb avec GA4 tracking | Réutiliser dans les articles pour les CTA fin d'article |
| `src/i18n/utils.ts` | `Locale`, `getLocale()`, `t()`, `DEFAULT_LOCALE`, `LOCALES` | Aucune modification nécessaire |
| `src/i18n/fr.json` | Traductions UI FR — `nav.blog` existe déjà | Ajouter section `blog.*` |
| `src/i18n/en.json` | Traductions UI EN — `nav.blog` existe déjà | Ajouter section `blog.*` |
| `src/data/navigation.ts` | NAV_ROUTES (6 items), `getNavigation()`, `getAlternateUrl()` | `getAlternateUrl` fallback swap-prefix fonctionne si slugs identiques entre locales — sinon utiliser frontmatter `alternateSlug` |
| `src/data/siteConfig.ts` | `siteName`, `baseUrl`, `locales`, `defaultLocale`, `whatsappNumber` | Aucune modification |
| `src/data/apartments.ts` | Configs appartements (noms, prix, URLs Airbnb) | Référencé dans articles pour liens internes |
| `src/components/common/Header.astro` | `.slice(0, 4)` — exclut Réserver et Blog | Changer en `.slice(0, 5)` pour inclure Blog |
| `src/components/common/Footer.astro` | `.slice(0, 5)` — exclut Blog | Changer en `.slice(0, 6)` pour inclure Blog |
| `astro.config.mjs` | site, trailingSlash, sitemap, vercel adapter | Aucune modification — Content Collections auto-détectées |

### Technical Decisions

1. **Content Collections Astro 6** — Créer `src/content/config.ts` avec `defineCollection` + `z.object` pour le schéma blog. Champs : `title`, `description`, `pubDate` (date), `author`, `tags` (string[]), `ogImage` (string optionnel), `alternateSlug` (string — slug de l'article dans l'autre locale pour hreflang)
2. **Articles Markdown** dans `src/content/blog/fr/` et `src/content/blog/en/` — le nom de fichier = slug URL
3. **BlogLayout étend BaseLayout** — passe `type='article'` à MetaTags, ajoute SchemaOrg (BreadcrumbList + FAQPage si faqItems), affiche date/auteur, slot pour contenu Markdown rendu
4. **Routing dynamique** via `[slug].astro` dans chaque dossier locale — utilise `getCollection('blog')` filtré par locale
5. **hreflang blog** — chaque article a un champ `alternateSlug` dans le frontmatter. `[slug].astro` construit l'URL alternative et la passe via le slot `head` de BaseLayout (ou un prop dédié)
6. **Header `.slice(0, 5)`** pour inclure Blog, **Footer `.slice(0, 6)`** pour tout afficher
7. **Pattern article anti-peurs** : titre SEO (question/peur) → réponse factuelle structurée (h2/h3) → découverte Maison Ayaba (lien interne) → CTA Airbnb en fin d'article
8. **FAQ structurées** : les articles avec des Q/R incluent les `faqItems` dans le frontmatter pour le markup FAQPage schema.org

## Implementation Plan

### Tasks

#### Phase 1 — Infrastructure Blog (Story 4.1)

- [ ] Task 1: Créer le schéma Content Collections
  - File: `src/content/config.ts` (CREATE)
  - Action: Définir la collection `blog` avec `defineCollection` et le schéma Zod :
    ```typescript
    import { defineCollection, z } from 'astro:content';

    const blog = defineCollection({
      type: 'content',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('Onizuka'),
        tags: z.array(z.string()).default([]),
        ogImage: z.string().optional(),
        alternateSlug: z.string(), // slug de l'article dans l'autre locale
        faqItems: z.array(z.object({
          question: z.string(),
          answer: z.string(),
        })).optional(),
      }),
    });

    export const collections = { blog };
    ```
  - Notes: `alternateSlug` est obligatoire pour le hreflang. `faqItems` optionnel pour le markup FAQPage.

- [ ] Task 2: Créer le BlogLayout
  - File: `src/layouts/BlogLayout.astro` (CREATE)
  - Action: Créer un layout qui étend BaseLayout avec les spécificités article :
    - Import BaseLayout, SchemaOrg, AirbnbCta, t, type Locale
    - Props : `{ locale, title, description, pubDate, author, ogImage?, alternateSlug, faqItems?, currentPath }`
    - Passer à BaseLayout : `locale`, `title`, `description`, `ogImage`
    - Dans le slot `head` de BaseLayout : injecter le tag hreflang alternatif pour l'article blog (construire l'URL avec `alternateSlug` et l'autre locale)
    - Contenu : `<article>` avec `<header>` (h1 titre, date formatée selon locale, auteur), `<div class="prose">` pour le slot Markdown, section fin d'article avec liens articles suggérés + CTA Airbnb
    - SchemaOrg BreadcrumbList : Accueil > Blog > Titre article
    - SchemaOrg FAQPage : si `faqItems` est passé et non vide
    - Styling Tailwind : `max-w-3xl mx-auto`, typographie article (Playfair Display h1, Inter corps), espacement généreux, alternance blanc/crème
  - Notes: Le `<slot name="head">` de BaseLayout est déjà prévu (ligne 46 de BaseLayout). Le hreflang de l'article alternatif doit être un `<link rel="alternate">` supplémentaire.

- [ ] Task 3: Créer la page article dynamique FR
  - File: `src/pages/fr/blog/[slug].astro` (CREATE)
  - Action:
    - `getStaticPaths()` : utiliser `getCollection('blog')` filtré par les fichiers dans `fr/` (les entries ont un `id` commençant par `fr/`). Retourner `{ params: { slug }, props: { entry } }` pour chaque article.
    - Render : `const { Content } = await entry.render()`, passer les données au BlogLayout, rendre `<Content />` dans le slot.
    - Locale fixée à `'fr'`.
  - Notes: Le slug est extrait du nom de fichier. `entry.id` sera de la forme `fr/securite-cotonou.md`.

- [ ] Task 4: Créer la page article dynamique EN
  - File: `src/pages/en/blog/[slug].astro` (CREATE)
  - Action: Identique à Task 3 mais avec locale `'en'` et filtre `en/`.

#### Phase 2 — Navigation & Liste (Story 4.2)

- [ ] Task 5: Ajouter les traductions blog
  - File: `src/i18n/fr.json` (MODIFY)
  - Action: Ajouter la section `blog` :
    ```json
    "blog": {
      "pageTitle": "Blog — Maison Ayaba",
      "pageDescription": "Conseils pratiques pour votre séjour à Cotonou : sécurité, transport, hébergement. Tout ce qu'il faut savoir avant de partir.",
      "heroTitle": "Le Blog Maison Ayaba",
      "heroSubtitle": "Conseils pratiques et guides pour préparer votre séjour à Cotonou",
      "readMore": "Lire l'article",
      "publishedOn": "Publié le {date}",
      "backToList": "← Retour au blog",
      "readNext": "À lire aussi",
      "articleCta": "Découvrir nos appartements"
    }
    ```

- [ ] Task 6: Ajouter les traductions blog EN
  - File: `src/i18n/en.json` (MODIFY)
  - Action: Ajouter la section `blog` :
    ```json
    "blog": {
      "pageTitle": "Blog — Maison Ayaba",
      "pageDescription": "Practical tips for your stay in Cotonou: safety, transport, accommodation. Everything you need to know before you go.",
      "heroTitle": "The Maison Ayaba Blog",
      "heroSubtitle": "Practical tips and guides to prepare your stay in Cotonou",
      "readMore": "Read article",
      "publishedOn": "Published on {date}",
      "backToList": "← Back to blog",
      "readNext": "Read next",
      "articleCta": "Discover our apartments"
    }
    ```

- [ ] Task 7: Créer la page liste blog FR
  - File: `src/pages/fr/blog/index.astro` (CREATE)
  - Action:
    - Import : BaseLayout, SchemaOrg, getCollection, t, type Locale
    - Récupérer les articles FR : `getCollection('blog')` filtré par `id` commençant par `fr/`, triés par `pubDate` décroissant
    - Layout : BaseLayout avec `locale='fr'`, title et description depuis `t()`
    - Contenu : section hero (h1 + sous-titre), grille de cartes d'articles (titre, description, date, lien "Lire l'article")
    - SchemaOrg BreadcrumbList : Accueil > Blog
    - Styling : cartes avec fond blanc, ombre légère, hover subtle, responsive (1 col mobile, 2-3 cols desktop)

- [ ] Task 8: Créer la page liste blog EN
  - File: `src/pages/en/blog/index.astro` (CREATE)
  - Action: Identique à Task 7 avec locale `'en'`.

- [ ] Task 9: Ajouter Blog au Header
  - File: `src/components/common/Header.astro` (MODIFY)
  - Action: Ligne 12, changer `.slice(0, 4)` en `.slice(0, 5)` pour que le menu inclut Blog.
  - Notes: Blog apparaîtra en 5ème position dans le menu (après Hôte, avant le CTA Réserver qui reste séparé à droite).

- [ ] Task 10: Ajouter Blog au Footer
  - File: `src/components/common/Footer.astro` (MODIFY)
  - Action: Changer `.slice(0, 5)` en `.slice(0, 6)` pour inclure Blog dans les liens du footer.

#### Phase 3 — Articles Anti-Peurs (Story 4.3)

- [ ] Task 11: Article FR — Sécurité à Cotonou
  - File: `src/content/blog/fr/securite-cotonou.md` (CREATE)
  - Action: Rédiger l'article "Est-ce que Cotonou est sûr ? Guide pratique pour les voyageurs"
  - Frontmatter :
    ```yaml
    title: "Est-ce que Cotonou est sûr ? Guide pratique pour les voyageurs"
    description: "Sécurité à Cotonou : conseils pratiques, quartiers sûrs, précautions et retour d'expérience. Tout pour voyager sereinement au Bénin."
    pubDate: 2026-03-15
    author: "Onizuka"
    tags: ["sécurité", "cotonou", "bénin", "guide"]
    alternateSlug: "cotonou-safety"
    faqItems:
      - question: "Est-ce que Cotonou est une ville sûre pour les touristes ?"
        answer: "Oui, Cotonou est globalement sûre pour les touristes. Le Bénin est l'un des pays les plus stables d'Afrique de l'Ouest. Les précautions de base (éviter de montrer des objets de valeur, privilégier les taxis de confiance) suffisent."
      - question: "Quel quartier est le plus sûr à Cotonou ?"
        answer: "Fidjrossè est un quartier résidentiel calme, prisé par les expatriés et les familles. C'est l'un des quartiers les plus sûrs de Cotonou."
      - question: "Faut-il prendre des précautions particulières la nuit à Cotonou ?"
        answer: "Comme dans toute grande ville, évitez de vous promener seul la nuit dans des zones peu éclairées. Privilégiez Gozem (VTC) pour vos déplacements nocturnes."
    ```
  - Structure article : Introduction rassurante → Contexte Bénin/stabilité → Quartiers sûrs (Fidjrossè avec lien vers `/fr/fidjrosse-cotonou/`) → Précautions de base → Transport sûr (lien vers page quartier, mention Gozem) → FAQ → Section "Et votre hébergement ?" avec lien vers `/fr/appartement/` (caméra Ring, serrure connectée, quartier résidentiel) → CTA Airbnb
  - Notes: ~800-1200 mots. Ton factuel et rassurant, pas anxiogène.

- [ ] Task 12: Article FR — Transport à Cotonou
  - File: `src/content/blog/fr/transport-cotonou.md` (CREATE)
  - Action: Rédiger "Comment se déplacer à Cotonou : Zem, Gozem, chauffeur privé"
  - Frontmatter :
    ```yaml
    title: "Comment se déplacer à Cotonou : Zem, Gozem, chauffeur privé"
    description: "Guide transport Cotonou : zem (moto-taxi), Gozem (VTC), chauffeur privé. Tarifs, conseils et astuces pour se déplacer sereinement."
    pubDate: 2026-03-15
    author: "Onizuka"
    tags: ["transport", "cotonou", "zem", "gozem", "guide"]
    alternateSlug: "cotonou-transport"
    faqItems:
      - question: "Combien coûte un zem à Cotonou ?"
        answer: "Une course en zem (moto-taxi) coûte entre 200 et 500 FCFA en ville, soit environ 0,30 à 0,80€. Négociez le prix avant de monter."
      - question: "Quelle est la meilleure app de VTC à Cotonou ?"
        answer: "Gozem est l'application la plus utilisée à Cotonou. Elle fonctionne comme Uber avec tarif affiché à l'avance et paiement via l'app. Téléchargez-la avant votre arrivée."
      - question: "Comment aller de l'aéroport de Cotonou à Fidjrossè ?"
        answer: "L'aéroport Cadjehoun est à environ 20 minutes de Fidjrossè. Comptez 3 000 à 5 000 FCFA en Gozem (5 à 8€). Votre hôte peut aussi organiser un transfert."
    ```
  - Structure : Introduction → Zem (explication, tarifs, conseils sécurité casque) → Gozem (comment ça marche, tarifs, avantages) → Chauffeur privé (via hôte, tarif journée, excursions) → Depuis l'aéroport → FAQ → Section "Votre base à Fidjrossè" avec lien vers `/fr/fidjrosse-cotonou/` → CTA Airbnb
  - Notes: Reprendre les données factuelles déjà dans `fr.json` (neighborhood.transport*). ~800-1200 mots.

- [ ] Task 13: Article FR — Appartement meublé à Cotonou
  - File: `src/content/blog/fr/appartement-meuble-cotonou.md` (CREATE)
  - Action: Rédiger "Appartement meublé à Cotonou : que vérifier avant de réserver"
  - Frontmatter :
    ```yaml
    title: "Appartement meublé à Cotonou : que vérifier avant de réserver"
    description: "Checklist appartement meublé Cotonou : onduleur, WiFi, clim, sécurité, quartier. Les critères essentiels pour un séjour sans mauvaise surprise."
    pubDate: 2026-03-15
    author: "Onizuka"
    tags: ["hébergement", "cotonou", "appartement", "checklist"]
    alternateSlug: "furnished-apartment-cotonou"
    faqItems:
      - question: "Comment vérifier qu'un appartement à Cotonou a un onduleur ?"
        answer: "Demandez explicitement à l'hôte si l'appartement dispose d'un onduleur automatique (pas un simple groupe électrogène). Les coupures d'électricité sont fréquentes à Cotonou — un onduleur garantit zéro interruption."
      - question: "Quel prix pour un appartement meublé de qualité à Cotonou ?"
        answer: "Comptez entre 60€ et 140€ par nuit pour un appartement meublé haut de gamme à Cotonou, selon la taille (1 à 3 chambres). C'est plus cher qu'un hôtel basique mais le confort et l'espace sont incomparables."
      - question: "Fidjrossè est-il un bon quartier pour loger à Cotonou ?"
        answer: "Oui, Fidjrossè est l'un des meilleurs quartiers pour les voyageurs. Résidentiel, calme, proche de la plage (10 min à pied), avec restaurants et commerces à proximité. Très prisé par les expatriés."
    ```
  - Structure : Introduction (les pièges à éviter) → Checklist point par point (onduleur, WiFi, clim, sécurité serrure/caméra, quartier, avis, prix) → Le pattern "objection → réponse → preuve" sur chaque point → Liens internes vers `/fr/appartement/` et `/fr/votre-hote/` → FAQ → CTA Airbnb
  - Notes: Article le plus commercial — positionne Maison Ayaba comme la réponse à chaque critère. ~800-1200 mots.

- [ ] Task 14: Article EN — Cotonou Safety
  - File: `src/content/blog/en/cotonou-safety.md` (CREATE)
  - Action: Traduction complète et adaptée de Task 11. Pas de traduction mot-à-mot — adapter au lecteur anglophone (touriste international, diaspora anglophone).
  - Frontmatter : `alternateSlug: "securite-cotonou"`, title "Is Cotonou Safe? A Practical Guide for Travelers", faqItems traduits.
  - Liens internes : `/en/fidjrosse-cotonou/`, `/en/apartment/`

- [ ] Task 15: Article EN — Cotonou Transport
  - File: `src/content/blog/en/cotonou-transport.md` (CREATE)
  - Action: Traduction complète et adaptée de Task 12.
  - Frontmatter : `alternateSlug: "transport-cotonou"`, title "Getting Around Cotonou: Zem, Gozem & Private Driver", faqItems traduits.
  - Liens internes : `/en/fidjrosse-cotonou/`

- [ ] Task 16: Article EN — Furnished Apartment Cotonou
  - File: `src/content/blog/en/furnished-apartment-cotonou.md` (CREATE)
  - Action: Traduction complète et adaptée de Task 13.
  - Frontmatter : `alternateSlug: "appartement-meuble-cotonou"`, title "Furnished Apartment in Cotonou: What to Check Before Booking", faqItems traduits.
  - Liens internes : `/en/apartment/`, `/en/your-host/`

#### Phase 4 — Suppression des .gitkeep

- [ ] Task 17: Supprimer les .gitkeep des dossiers blog
  - Files: `src/content/blog/fr/.gitkeep`, `src/content/blog/en/.gitkeep` (DELETE)
  - Action: Supprimer les fichiers placeholder maintenant que des articles existent.

### Acceptance Criteria

#### Infrastructure (Story 4.1)

- [ ] AC1: Given `src/content/config.ts` existe, when le site est buildé, then le build réussit sans erreur et la collection `blog` est reconnue par Astro.
- [ ] AC2: Given un fichier `.md` avec le frontmatter requis dans `src/content/blog/fr/`, when on accède à `/fr/blog/{slug}/`, then l'article s'affiche avec le BlogLayout (titre h1, date, auteur, contenu Markdown rendu, CTA Airbnb en fin d'article).
- [ ] AC3: Given un article FR avec `alternateSlug: "cotonou-safety"`, when on inspecte le `<head>`, then un tag `<link rel="alternate" hreflang="en" href="https://maison-ayaba.com/en/blog/cotonou-safety/">` est présent.
- [ ] AC4: Given un article avec `faqItems` dans le frontmatter, when on inspecte le JSON-LD, then un markup `FAQPage` schema.org est présent avec les paires Q/R.
- [ ] AC5: Given un article sans `faqItems`, when on inspecte le JSON-LD, then seul le BreadcrumbList est présent (pas de FAQPage vide).

#### Navigation & Liste (Story 4.2)

- [ ] AC6: Given le visiteur accède à `/fr/blog/` ou `/en/blog/`, when la page se charge, then il voit la liste des articles dans la langue courante triés par date décroissante, avec titre, description, date et lien "Lire l'article".
- [ ] AC7: Given le visiteur est sur n'importe quelle page, when il regarde le Header desktop, then le lien "Blog" est visible dans le menu de navigation (5ème item).
- [ ] AC8: Given le visiteur est sur n'importe quelle page, when il regarde le Footer, then le lien "Blog" est visible dans les liens de navigation.
- [ ] AC9: Given le visiteur lit un article, when il arrive en fin d'article, then il voit un lien retour vers la liste du blog et des suggestions d'autres articles.
- [ ] AC10: Given le visiteur est sur `/fr/blog/`, when il clique sur le sélecteur de langue, then il est redirigé vers `/en/blog/` (et inversement).

#### Articles Anti-Peurs (Story 4.3)

- [ ] AC11: Given le blog est fonctionnel, when on consulte les articles disponibles, then 3 articles existent en FR et 3 en EN (6 fichiers Markdown total).
- [ ] AC12: Given le visiteur lit un article, when il parcourt le contenu, then l'article suit le pattern : question SEO → réponse factuelle → découverte Maison Ayaba → CTA Airbnb.
- [ ] AC13: Given chaque article, when on vérifie les meta tags, then le `<title>` est unique (< 60 car.) et la `<meta description>` est unique (< 160 car.).
- [ ] AC14: Given chaque article, when on vérifie le contenu, then il contient au moins un lien interne vers une page du site (Appartement, Quartier ou Hôte).
- [ ] AC15: Given chaque article FR, when on vérifie le hreflang, then il pointe vers l'article EN correspondant (et inversement).

#### Cross-cutting

- [ ] AC16: Given le site est buildé avec les articles, when on lance `npm run build`, then le build réussit sans erreur ni warning.
- [ ] AC17: Given les articles sont déployés, when on accède au sitemap XML, then les 6 URLs d'articles blog (3 FR + 3 EN) sont incluses.
- [ ] AC18: Given le visiteur accède à un article sur mobile, when la page se charge, then le layout est responsive, le texte est lisible et le CTA Airbnb est accessible.

## Additional Context

### Dependencies

- Epics 1-3 terminés — toute l'infrastructure (layout, SEO, i18n, GA4) est en place
- Dossiers `src/content/blog/fr/` et `src/content/blog/en/` existent déjà (avec .gitkeep)
- `nav.blog` déjà traduit dans les fichiers i18n
- Aucune dépendance externe supplémentaire — Content Collections est natif à Astro 6

### Testing Strategy

- **Build test** : `npm run build` doit réussir sans erreur après chaque phase
- **Navigation manuelle** : vérifier les 6 articles (3 FR + 3 EN), les pages liste, les liens Header/Footer
- **SEO validation** : inspecter les meta tags, hreflang, JSON-LD sur chaque article
- **Responsive** : vérifier le rendu mobile/tablette/desktop sur les pages liste et articles
- **hreflang** : vérifier que chaque article pointe vers son équivalent dans l'autre locale
- **Liens internes** : vérifier que tous les liens internes dans les articles pointent vers des pages existantes
- **Sitemap** : vérifier que les URLs blog apparaissent dans `/sitemap-index.xml`

### Notes

- Les 3 articles ciblent des requêtes SEO longue traîne en français et anglais
- Chaque article doit contenir au moins un lien interne vers une page existante du site
- Les articles Q/R doivent être structurés pour le markup FAQPage (schema.org)
- Le contenu des articles s'appuie sur les données factuelles déjà présentes dans le site (page quartier, page hôte) — cohérence garantie
- Les articles ne sont PAS des traductions mot-à-mot — ils sont adaptés au lecteur de chaque langue
- Risque identifié : la API Content Collections d'Astro 6 peut avoir évolué par rapport à Astro 4/5 — consulter la doc Astro 6 pour `getCollection()` et `defineCollection()` avant d'implémenter

## Review Notes
- Adversarial review completed (2026-03-15)
- Findings: 5 total, 3 fixed, 2 skipped (feature gaps)
- Resolution approach: auto-fix
- F1 (Critical): Fixed — hreflang dupliqué/conflictuel résolu via prop `alternateUrls` dans MetaTags/BaseLayout
- F2 (Critical): Fixed — self-referencing hreflang et x-default maintenant corrects via `alternateUrls`
- F4 (Medium): Fixed — regex ancrée `^fr\/` / `^en\/` pour le strip de préfixe locale
- F3 (Medium): Skipped — ogImage schema validation (pas de breakage actuel, aucun article n'utilise ogImage)
- F5 (Medium): Skipped — BlogPosting schema.org (amélioration SEO future, pas un bug)
