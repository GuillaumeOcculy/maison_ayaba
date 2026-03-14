---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
workflow_completed: true
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# maison_ayaba - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for maison_ayaba, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1 : Le visiteur peut consulter la page d'accueil avec l'accroche, un aperçu des 3 configurations et des boutons de réservation Airbnb
FR2 : Le visiteur peut consulter la page Appartement avec les 3 configurations côte à côte (1ch/2ch/3ch), incluant galerie photos, équipements et prix
FR3 : Le visiteur peut accéder au bouton "Réserver sur Airbnb" dédié à chaque configuration (1 lien par annonce)
FR4 : Le visiteur peut consulter la page Fidjrossè & Cotonou avec les informations du quartier (restaurants, commerces, transports, plage)
FR5 : Le visiteur peut consulter la page Votre Hôte avec la présentation de l'hôte et du Protocole Kwabo
FR6 : Le visiteur peut consulter la page Réserver avec un récapitulatif des 3 configurations et leurs liens Airbnb
FR7 : Le visiteur peut accéder à un blog avec des articles indexables individuellement
FR8 : Le visiteur peut lire des articles de blog avec un contenu structuré (titres, paragraphes, images)
FR9 : Le visiteur peut naviguer du blog vers les pages du site via des liens internes
FR10 : Le visiteur peut naviguer entre les articles via une liste ou un système de navigation
FR11 : Le visiteur peut naviguer entre toutes les pages via un menu principal
FR12 : Le visiteur peut basculer entre français et anglais à tout moment via un sélecteur de langue
FR13 : Le visiteur peut accéder à tout le contenu dans la langue sélectionnée (FR ou EN)
FR14 : Le visiteur peut accéder à chaque page via une URL propre et descriptive dans sa langue
FR15 : Le visiteur peut cliquer sur un CTA Airbnb depuis la page d'accueil
FR16 : Le visiteur peut cliquer sur un CTA Airbnb spécifique à chaque configuration depuis la page Appartement
FR17 : Le visiteur peut cliquer sur un CTA Airbnb depuis la page Réserver
FR18 : Le visiteur peut accéder aux CTA Airbnb en maximum 2-3 clics depuis n'importe quelle page
FR19 : Les moteurs de recherche peuvent indexer chaque page avec ses propres balises meta (title, description, og:image)
FR20 : Les moteurs de recherche peuvent accéder au sitemap XML du site
FR21 : Les moteurs de recherche peuvent lire les données structurées schema.org (LodgingBusiness, FAQPage, BreadcrumbList)
FR22 : Les moteurs de réponse IA peuvent extraire des informations factuelles structurées du site
FR23 : Le visiteur peut consulter le site de manière optimale sur mobile, tablette et desktop
FR24 : Le visiteur peut naviguer entièrement au clavier
FR25 : Le visiteur utilisant un lecteur d'écran peut accéder à tout le contenu via textes alternatifs et HTML sémantique
FR26 : Le système enregistre chaque visite de page dans Google Analytics 4
FR27 : Le système enregistre chaque clic sur un CTA Airbnb comme événement de conversion dans GA4
FR28 : L'administrateur peut consulter les données de trafic et de conversion dans Google Analytics
FR29 : L'administrateur peut mettre à jour le contenu des pages (textes, prix, photos) directement dans le code
FR30 : L'administrateur peut ajouter un nouvel article de blog avec ses meta tags SEO
FR31 : L'administrateur peut déployer les changements en production via un build statique
FR32 : L'administrateur peut vérifier le rendu du site sur mobile et desktop après déploiement

### NonFunctional Requirements

NFR1 : Toutes les pages se chargent en moins de 3 secondes sur mobile 4G
NFR2 : Lighthouse Performance score > 90 sur toutes les pages
NFR3 : Images servies en format optimisé (WebP/AVIF) avec lazy loading hors viewport
NFR4 : First Contentful Paint (FCP) < 1,5 seconde
NFR5 : Cumulative Layout Shift (CLS) < 0,1
NFR6 : Site servi exclusivement via HTTPS
NFR7 : En-têtes de sécurité HTTP configurés (CSP, X-Frame-Options, X-Content-Type-Options)
NFR8 : Aucune donnée utilisateur collectée ou stockée côté serveur
NFR9 : Liens externes avec rel="noopener noreferrer"
NFR10 : Site statique hébergé sur CDN avec distribution géographique (Europe + Afrique de l'Ouest)
NFR11 : Support des pics de trafic sans dégradation grâce à l'architecture statique
NFR12 : Conformité WCAG 2.1 niveau AA
NFR13 : Lighthouse Accessibility score > 90
NFR14 : Ratio de contraste minimum 4.5:1 pour le texte courant
NFR15 : Toutes les images ont un attribut alt descriptif
NFR16 : Navigation clavier complète avec indicateurs de focus visibles
NFR17 : Lighthouse SEO score > 95
NFR18 : Title unique (< 60 car.) et meta description unique (< 160 car.) par page
NFR19 : URLs descriptives, minuscules, avec tirets
NFR20 : Balises hreflang correctement configurées pour chaque paire FR/EN
NFR21 : Sitemap XML auto-généré et mis à jour à chaque build

### Additional Requirements

**Depuis l'Architecture :**

- Starter template : Astro 6 via `npm create astro@latest maison-ayaba -- --template minimal --typescript strict --install --git` — constitue la Story 1.1
- Intégrations à installer : `@astrojs/sitemap`, `@astrojs/tailwind`, `@astrojs/vercel`
- TypeScript mode strict obligatoire
- Composants `.astro` uniquement — zero framework JS client (React, Vue interdit)
- Images via `astro:assets` (`<Image>`) exclusivement — jamais de `<img>` brut
- Données centralisées dans `src/data/` (prix, URLs Airbnb, config site) — jamais de valeurs en dur dans les pages
- Traductions UI dans `src/i18n/{locale}.json`
- Routing i18n par dossiers (`src/pages/fr/`, `src/pages/en/`)
- Blog via Content Collections Markdown (`src/content/blog/{locale}/`)
- Headers de sécurité via `vercel.json` (CSP, X-Frame-Options, X-Content-Type-Options)
- GA4 via script inline dans BaseLayout — seule intégration externe
- CTA Airbnb toujours via composant `<AirbnbCta>` avec tracking GA4 intégré
- Séquence d'implémentation : init → i18n → layout/composants → pages → SEO → GA4 → blog → déploiement

**Depuis l'UX Design :**

- CTA sticky mobile : bouton "Réserver sur Airbnb" flottant en bas de l'écran sur mobile, toujours accessible
- Zéro popup, zéro newsletter, zéro cookie banner
- Galerie photos manuelle uniquement — pas de carrousel auto-play
- Palette couleurs Maison Ayaba : terra (#A0522D), gold (#C8A45C), cream (#FAF7F2), dark (#2C1810), muted (#6B5E57), success (#5A7247)
- Typographie : Playfair Display (titres) + Inter (corps)
- Pattern de section "objection → réponse → preuve" pour les contenus de rassurance
- 3 cartes de configuration côte à côte sur accueil et page Appartement
- Espacement généreux, sections alternées blanc/crème
- Touch-first mobile : cibles tactiles larges, navigation par scroll vertical
- Responsive mobile-first : breakpoints mobile (<768px), tablette (768-1024px), desktop (>1024px)
- Fond blanc principal, footer fond sombre (ayaba-dark)
- Hero image plein-cadre avec overlay sombre et texte blanc
- Page Hôte avec visage réel et histoire personnelle
- Aperçu OpenGraph soigné sur chaque page pour le partage WhatsApp/Messenger
- Sticky header sur mobile : logo + hamburger menu + CTA Airbnb

### FR Coverage Map

| FR | Epic | Description |
|---|---|---|
| FR1 | Epic 1 | Page d'accueil avec accroche, 3 configs, CTAs |
| FR3 | Epic 1 | CTA Airbnb dédié par configuration |
| FR11 | Epic 1 | Menu principal de navigation |
| FR12 | Epic 1 | Sélecteur de langue FR/EN |
| FR13 | Epic 1 | Contenu dans la langue sélectionnée |
| FR14 | Epic 1 | URLs propres et descriptives par langue |
| FR15 | Epic 1 | CTA Airbnb depuis la page d'accueil |
| FR18 | Epic 1 | CTA Airbnb en max 2-3 clics |
| FR23 | Epic 1 | Responsive mobile/tablette/desktop |
| FR24 | Epic 1 | Navigation clavier complète |
| FR25 | Epic 1 | Accessibilité lecteur d'écran |
| FR29 | Epic 1 | Mise à jour contenu dans le code |
| FR31 | Epic 1 | Déploiement via build statique |
| FR32 | Epic 1 | Vérification rendu mobile/desktop |
| FR2 | Epic 2 | Page Appartement 3 configs détaillées |
| FR4 | Epic 2 | Page Fidjrossè & Cotonou |
| FR5 | Epic 2 | Page Votre Hôte + Protocole Kwabo |
| FR6 | Epic 2 | Page Réserver récapitulative |
| FR16 | Epic 2 | CTA Airbnb par config sur page Appartement |
| FR17 | Epic 2 | CTA Airbnb depuis page Réserver |
| FR19 | Epic 3 | Balises meta uniques par page |
| FR20 | Epic 3 | Sitemap XML |
| FR21 | Epic 3 | Schema.org (LodgingBusiness, FAQPage, Breadcrumb) |
| FR22 | Epic 3 | Contenu AEO pour moteurs IA |
| FR26 | Epic 3 | GA4 tracking visites |
| FR27 | Epic 3 | GA4 tracking clics Airbnb (conversions) |
| FR28 | Epic 3 | Consultation données GA4 |
| FR7 | Epic 4 | Blog avec articles indexables |
| FR8 | Epic 4 | Articles structurés (titres, paragraphes, images) |
| FR9 | Epic 4 | Liens internes blog → pages du site |
| FR10 | Epic 4 | Navigation entre articles |
| FR30 | Epic 4 | Ajout d'articles avec meta tags SEO |

**NFRs :** Cross-cutting — intégrées dès l'Epic 1 (performance, sécurité, accessibilité, SEO technique) et maintenues tout au long.

## Epic List

### Epic 1 : Site Fondation & Page d'Accueil
Le visiteur accède au site bilingue, découvre les 3 configurations sur la page d'accueil et peut réserver sur Airbnb. Le site est responsive, accessible et déployé en production.
**FRs couvertes :** FR1, FR3, FR11, FR12, FR13, FR14, FR15, FR18, FR23, FR24, FR25, FR29, FR31, FR32

### Epic 2 : Pages Appartement, Quartier & Hôte
Le visiteur explore les 3 configs en détail, découvre Fidjrossè et rencontre l'hôte — sa confiance est construite avant de réserver.
**FRs couvertes :** FR2, FR4, FR5, FR6, FR16, FR17

### Epic 3 : SEO, Découvrabilité & Analytics
Les moteurs de recherche indexent le site, les IA citent les infos factuelles, et chaque conversion Airbnb est mesurée dans GA4.
**FRs couvertes :** FR19, FR20, FR21, FR22, FR26, FR27, FR28

### Epic 4 : Blog & Contenu Anti-Peurs
Le visiteur trouve des réponses à ses peurs via le blog SEO et navigue naturellement vers les appartements.
**FRs couvertes :** FR7, FR8, FR9, FR10, FR30

## Epic 1 : Site Fondation & Page d'Accueil

Le visiteur accède au site bilingue, découvre les 3 configurations sur la page d'accueil et peut réserver sur Airbnb. Le site est responsive, accessible et déployé en production.

### Story 1.1 : Initialisation Astro 6, Tailwind & Structure i18n

As a développeur,
I want un projet Astro 6 initialisé avec Tailwind, TypeScript strict et le routing bilingue FR/EN,
So that toute l'équipe peut développer sur une base configurée et cohérente.

**Acceptance Criteria:**

**Given** aucun projet n'existe
**When** on exécute `npm create astro@latest` avec le template minimal et TypeScript strict
**Then** le projet se build sans erreur
**And** les intégrations `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/vercel` sont installées et configurées dans `astro.config.mjs`

**Given** le projet est initialisé
**When** on consulte `tailwind.config.mjs`
**Then** les tokens Maison Ayaba sont définis : couleurs (terra, gold, cream, dark, muted, success) et typographie (Playfair Display, Inter)
**And** `global.css` contient les directives Tailwind

**Given** le projet est configuré
**When** on consulte la structure `src/`
**Then** les dossiers existent : `pages/fr/`, `pages/en/`, `components/`, `layouts/`, `data/`, `i18n/`, `styles/`, `assets/images/`
**And** `src/i18n/fr.json` et `src/i18n/en.json` contiennent les traductions UI de base (boutons, labels, nav)
**And** `src/i18n/utils.ts` exporte `getLocale()`, `t()` et `getLocalizedUrl()`
**And** `src/data/siteConfig.ts` contient le nom du site, les locales et les URLs de base
**And** `src/data/apartments.ts` contient les 3 configs (nom, prix, capacité, équipements clés, URL Airbnb)
**And** `src/data/navigation.ts` contient la structure du menu par langue

### Story 1.2 : BaseLayout, Header, Footer & Navigation

As a visiteur,
I want naviguer sur un site avec un layout professionnel, un menu et un sélecteur de langue,
So that je peux parcourir toutes les pages facilement en FR ou EN.

**Acceptance Criteria:**

**Given** le visiteur accède à n'importe quelle page
**When** la page se charge
**Then** le `BaseLayout.astro` fournit la structure HTML sémantique (`<html>`, `<head>`, `<header>`, `<main>`, `<footer>`)
**And** la balise `<html lang="">` reflète la locale de la page (fr ou en)

**Given** le visiteur est sur une page quelconque
**When** il regarde le header
**Then** il voit le logo Maison Ayaba, un menu de navigation avec 5 items (Accueil, Appartement, Quartier, Hôte, Réserver) et un sélecteur FR/EN
**And** sur mobile, le header est sticky avec logo + hamburger menu + CTA Airbnb
**And** les liens du menu pointent vers les URLs dans la locale courante

**Given** le visiteur clique sur le sélecteur de langue
**When** il bascule de FR vers EN (ou inversement)
**Then** il est redirigé vers la même page dans l'autre langue (pas la page d'accueil)

**Given** le visiteur regarde le footer
**When** la page se charge
**Then** le footer a un fond sombre (`ayaba-dark`), contient les liens de navigation, le copyright et les informations de contact

**Given** le visiteur navigue au clavier
**When** il utilise Tab pour parcourir la navigation
**Then** chaque élément interactif a un indicateur de focus visible
**And** l'ordre de tabulation est logique (header → contenu → footer)

**Given** le visiteur consulte le site sur mobile (<768px), tablette (768-1024px) ou desktop (>1024px)
**When** la page se charge
**Then** le layout s'adapte à chaque breakpoint (mobile-first)
**And** les cibles tactiles font minimum 44x44px sur mobile

### Story 1.3 : Composant AirbnbCta

As a visiteur,
I want voir des boutons "Réserver sur Airbnb" clairs et dédiés à chaque configuration,
So that je peux réserver l'appartement qui me convient en un clic.

**Acceptance Criteria:**

**Given** le composant `AirbnbCta.astro` est utilisé sur une page
**When** le visiteur voit le bouton
**Then** il affiche le texte "Réserver sur Airbnb" (ou "Book on Airbnb" en EN) avec le nom de la configuration
**And** le bouton utilise le style primaire (fond `ayaba-terra`, texte blanc, hover `ayaba-gold`)
**And** le lien pointe vers l'URL Airbnb de la configuration, tirée de `apartments.ts`
**And** le lien a `target="_blank"` et `rel="noopener noreferrer"`

**Given** le visiteur est sur mobile
**When** il scrolle sur une page avec du contenu appartement
**Then** un CTA sticky flottant reste visible en bas de l'écran
**And** le CTA est facilement accessible au pouce

**Given** le composant est intégré
**When** on inspecte le code
**Then** aucune URL Airbnb n'est codée en dur — toutes proviennent de `src/data/apartments.ts`

### Story 1.4 : Page d'Accueil FR & EN

As a visiteur,
I want voir la page d'accueil avec une accroche percutante, un aperçu des 3 configurations et des CTA Airbnb,
So that je comprends l'offre en moins de 30 secondes et je peux réserver.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/` ou `/en/`
**When** la page se charge
**Then** il voit un hero plein-cadre avec overlay sombre et le texte "Tout le confort que vous attendez. À Cotonou." (ou équivalent EN)
**And** le hero est suivi d'une section avec les 3 cartes de configuration côte à côte

**Given** le visiteur regarde les 3 cartes de configuration
**When** elles se chargent
**Then** chaque carte affiche : nom de la config, photo, capacité, prix par nuit, équipements clés et un CTA Airbnb dédié
**And** les cartes sont responsives : côte à côte sur desktop, empilées sur mobile
**And** les prix et données proviennent de `src/data/apartments.ts`

**Given** le visiteur veut réserver
**When** il clique sur un CTA Airbnb depuis la page d'accueil
**Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

**Given** le visiteur est sur la page d'accueil
**When** il compte les clics vers un CTA Airbnb
**Then** il peut y accéder en maximum 1-2 clics (CTA visible sans scroll ou scroll + clic)

**Given** les sections de la page d'accueil
**When** on vérifie le rythme visuel
**Then** les sections alternent fond blanc et fond crème (`ayaba-cream`)
**And** les titres utilisent Playfair Display, le corps utilise Inter
**And** l'espacement entre sections est généreux

### Story 1.5 : Déploiement Vercel & Configuration Production

As a administrateur,
I want déployer le site sur Vercel avec HTTPS et les headers de sécurité,
So that le site est accessible en production avec les bonnes performances.

**Acceptance Criteria:**

**Given** le projet est prêt
**When** on push sur `main`
**Then** Vercel déclenche un build automatique et déploie le site sur son CDN

**Given** le site est déployé
**When** on accède au site via navigateur
**Then** il est servi exclusivement en HTTPS
**And** les headers de sécurité sont présents : CSP, X-Frame-Options, X-Content-Type-Options (configurés dans `vercel.json`)

**Given** le fichier `.env.example` existe
**When** on configure l'environnement
**Then** les variables sont documentées (GA4_MEASUREMENT_ID, etc.)
**And** `.env` est dans `.gitignore`

**Given** le site est déployé
**When** l'admin vérifie le rendu
**Then** le site s'affiche correctement sur mobile et desktop
**And** le build statique se complète sans erreur

## Epic 2 : Pages Appartement, Quartier & Hôte

Le visiteur explore les 3 configs en détail, découvre Fidjrossè et rencontre l'hôte — sa confiance est construite avant de réserver.

### Story 2.1 : Page Appartement — 3 Configurations Détaillées

As a visiteur,
I want voir les 3 configurations d'appartement en détail avec galerie photos, équipements complets et prix,
So that je peux comparer et choisir la configuration qui correspond à mes besoins.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/appartement` ou `/en/apartment`
**When** la page se charge
**Then** il voit les 3 configurations présentées côte à côte (desktop) ou empilées (mobile)
**And** chaque configuration affiche : nom, galerie photos manuelle, capacité, prix par nuit, prix par personne (pour groupes), liste complète des équipements et un CTA Airbnb dédié

**Given** le visiteur consulte une galerie photos
**When** il interagit avec les photos
**Then** il peut naviguer manuellement entre les photos (pas de carrousel auto-play)
**And** les images utilisent `<Image>` d'Astro (WebP/AVIF, lazy loading, alt descriptif)
**And** le composant `ImageGallery.astro` est utilisé

**Given** le visiteur consulte les équipements
**When** il voit la section équipements d'une config
**Then** les éléments clés sont mis en avant : WiFi, onduleur, clim, bureau (config 1ch), lit bébé (config 3ch), machine à laver, cuisine
**And** les éléments de rassurance utilisent la couleur `ayaba-success` (check vert)

**Given** le visiteur veut réserver depuis la page Appartement
**When** il clique sur un CTA Airbnb d'une config spécifique
**Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

### Story 2.2 : Page Fidjrossè & Cotonou

As a visiteur,
I want découvrir le quartier Fidjrossè et la ville de Cotonou avec les infos pratiques,
So that je peux me projeter dans mon séjour et savoir ce qu'il y a autour.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/fidjrosse-cotonou` ou `/en/fidjrosse-cotonou`
**When** la page se charge
**Then** il voit les sections : restaurants à proximité, commerces, transports (zem, Gozem, chauffeur), plage, et points d'intérêt

**Given** le visiteur lit la section transports
**When** il consulte les informations
**Then** les options sont présentées factuellement avec tarifs indicatifs et conseils pratiques
**And** le contenu est utile aussi bien avant la réservation (projection) que pendant le séjour (guide pratique)

**Given** le visiteur a fini d'explorer la page
**When** il cherche à réserver
**Then** un CTA Airbnb est visible en fin de page (et sticky sur mobile)
**And** des liens internes mènent vers la page Appartement

**Given** la page est bilingue
**When** on compare les versions FR et EN
**Then** le contenu est complet et traduit dans les deux langues
**And** les URLs sont localisées (`/fr/fidjrosse-cotonou`, `/en/fidjrosse-cotonou`)

### Story 2.3 : Page Votre Hôte & Protocole Kwabo

As a visiteur,
I want découvrir qui est l'hôte et le Protocole Kwabo (accueil anticipatoire),
So that je me sens en confiance avec quelqu'un qui a pensé à tout.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/votre-hote` ou `/en/your-host`
**When** la page se charge
**Then** il voit une photo réelle de l'hôte, son histoire personnelle et sa philosophie d'accueil
**And** le ton est chaleureux et authentique — "un ami bien informé, pas un vendeur"

**Given** le visiteur découvre le Protocole Kwabo
**When** il lit la section dédiée
**Then** les micro-attentions sont décrites : message personnalisé avant l'arrivée, clim pré-allumée, panier de bienvenue local, mot manuscrit "Kwabo"
**And** la section est visuellement distincte (accent `ayaba-gold`) pour marquer le changement de registre émotionnel
**And** des photos des détails illustrent les attentions (panier, fruits locaux)

**Given** le visiteur est rassuré
**When** il arrive en fin de page
**Then** un CTA Airbnb est visible pour passer à la réservation
**And** des liens mènent vers la page Appartement pour revoir les configurations

### Story 2.4 : Page Réserver — Récapitulatif & CTAs

As a visiteur,
I want voir un récapitulatif des 3 configurations avec les liens directs vers Airbnb,
So that je peux finaliser mon choix et réserver en un clic.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/reserver` ou `/en/book`
**When** la page se charge
**Then** il voit les 3 configurations en format récapitulatif : nom, photo principale, capacité, prix par nuit, et un CTA Airbnb dédié par config

**Given** le visiteur clique sur un CTA Airbnb
**When** il choisit une configuration
**Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

**Given** la page est une page de conversion
**When** on vérifie le design
**Then** la page est épurée, focalisée sur l'action — pas de contenu superflu
**And** les 3 CTAs sont clairement différenciés par configuration
**And** la page est accessible en maximum 1 clic depuis le menu principal

## Epic 3 : SEO, Découvrabilité & Analytics

Les moteurs de recherche indexent le site, les IA citent les infos factuelles, et chaque conversion Airbnb est mesurée dans GA4.

### Story 3.1 : Meta Tags, Sitemap & Robots.txt

As a moteur de recherche,
I want indexer chaque page avec ses balises meta uniques, accéder au sitemap XML et respecter les directives robots.txt,
So that le site apparaît correctement dans les résultats de recherche.

**Acceptance Criteria:**

**Given** n'importe quelle page du site se charge
**When** on inspecte le `<head>`
**Then** le composant `MetaTags.astro` génère : `<title>` unique (<60 car.), `<meta description>` unique (<160 car.), `og:title`, `og:description`, `og:image`, `twitter:card`
**And** les balises `hreflang` sont présentes pour la paire FR/EN correspondante
**And** l'URL canonique est définie

**Given** le site est buildé
**When** on accède à `/sitemap-index.xml`
**Then** le sitemap XML est auto-généré par `@astrojs/sitemap` et inclut toutes les pages FR et EN

**Given** le site est buildé
**When** on accède à `/robots.txt`
**Then** le fichier est correctement configuré avec référence au sitemap

**Given** chaque page a ses meta tags
**When** on partage un lien sur WhatsApp, Messenger ou réseaux sociaux
**Then** l'aperçu OpenGraph affiche une image invitante, un titre clair et une description rassurante

### Story 3.2 : Données Structurées Schema.org & AEO

As a moteur de recherche ou moteur de réponse IA,
I want lire les données structurées schema.org et extraire des informations factuelles,
So that le site apparaît en résultats enrichis et est citable par les IA.

**Acceptance Criteria:**

**Given** la page d'accueil ou la page Appartement se charge
**When** on inspecte le JSON-LD
**Then** le composant `SchemaOrg.astro` génère un markup `LodgingBusiness` avec : nom, adresse, prix, images, note, URL

**Given** une page contenant des questions/réponses (articles blog, page quartier)
**When** on inspecte le JSON-LD
**Then** un markup `FAQPage` est présent avec les paires question/réponse structurées

**Given** le visiteur navigue sur le site
**When** on inspecte le JSON-LD
**Then** un markup `BreadcrumbList` est présent reflétant la hiérarchie de navigation

**Given** un moteur de réponse IA (ChatGPT, Perplexity, Claude) interroge des infos sur l'hébergement à Cotonou
**When** le contenu du site est analysé
**Then** les informations factuelles (prix, équipements, localisation, capacité) sont structurées et extractibles sans ambiguïté

### Story 3.3 : Google Analytics 4 & Tracking Conversions

As a administrateur,
I want que chaque visite et chaque clic Airbnb soient enregistrés dans GA4,
So that je peux mesurer le trafic et les conversions pour optimiser le site.

**Acceptance Criteria:**

**Given** le visiteur accède à n'importe quelle page
**When** la page se charge
**Then** le script GA4 (`gtag.js`) est chargé dans le `BaseLayout.astro` via script inline
**And** un événement `page_view` est envoyé à GA4

**Given** le visiteur clique sur un CTA Airbnb
**When** le clic est déclenché
**Then** un événement personnalisé est envoyé à GA4 avec : nom de l'événement (ex: `airbnb_click`), la configuration cliquée (1ch/2ch/3ch) et la page source
**And** cet événement est configuré comme conversion dans GA4

**Given** l'administrateur accède à Google Analytics
**When** il consulte le tableau de bord
**Then** il peut voir : nombre de visiteurs, pages vues, sources de trafic et nombre de clics Airbnb par configuration

**Given** le GA4 Measurement ID
**When** on vérifie la configuration
**Then** l'ID est stocké dans les variables d'environnement (pas en dur dans le code)
**And** le script GA4 respecte le NFR8 (aucune donnée utilisateur collectée côté serveur)

## Epic 4 : Blog & Contenu Anti-Peurs

Le visiteur trouve des réponses à ses peurs via le blog SEO et navigue naturellement vers les appartements.

### Story 4.1 : Infrastructure Blog — Content Collections & BlogLayout

As a administrateur,
I want un système de blog basé sur Content Collections Markdown avec un layout dédié,
So that je peux ajouter des articles SEO facilement avec leurs meta tags.

**Acceptance Criteria:**

**Given** le dossier `src/content/blog/` est configuré
**When** on consulte `src/content/config.ts`
**Then** le schéma Content Collections définit : title, description, date, author, locale, tags, og:image
**And** les articles sont organisés par langue : `src/content/blog/fr/` et `src/content/blog/en/`

**Given** un fichier Markdown est ajouté dans `src/content/blog/fr/`
**When** le site est buildé
**Then** l'article est accessible via une URL propre et descriptive (ex: `/fr/blog/securite-cotonou`)
**And** la page utilise le `BlogLayout.astro` qui étend le `BaseLayout`

**Given** le `BlogLayout.astro` est appliqué à un article
**When** la page se charge
**Then** l'article affiche : titre (h1), date de publication, contenu structuré (titres, paragraphes, images), et liens internes vers les pages du site
**And** le layout inclut le header, footer et navigation du site

**Given** l'admin veut ajouter un nouvel article
**When** il crée un fichier `.md` avec le frontmatter requis dans le bon dossier de langue
**Then** l'article est automatiquement disponible après build, avec ses meta tags SEO générés depuis le frontmatter

### Story 4.2 : Liste d'Articles & Navigation Blog

As a visiteur,
I want voir la liste des articles du blog et naviguer entre eux,
So that je peux trouver les réponses à mes questions sur Cotonou.

**Acceptance Criteria:**

**Given** le visiteur accède à `/fr/blog/` ou `/en/blog/`
**When** la page se charge
**Then** il voit la liste des articles dans la langue courante, triés par date (plus récent en premier)
**And** chaque article affiche : titre, extrait/description, date et lien vers l'article complet

**Given** le visiteur lit un article
**When** il arrive en fin d'article
**Then** il voit des suggestions d'articles liés ou un lien retour vers la liste du blog
**And** des liens internes mènent vers les pages du site (Appartement, Quartier, Hôte)

**Given** le visiteur est sur la page liste du blog
**When** il consulte la navigation
**Then** le blog est accessible depuis le menu principal ou le footer
**And** la page liste est bilingue (FR et EN)

### Story 4.3 : 3 Premiers Articles SEO Anti-Peurs

As a visiteur anxieux à propos de Cotonou,
I want lire des articles factuels qui répondent à mes peurs (sécurité, transport, hébergement),
So that ma confiance est construite et je découvre les appartements Maison Ayaba.

**Acceptance Criteria:**

**Given** le blog est fonctionnel
**When** on consulte les articles disponibles
**Then** 3 articles existent en FR et EN :
1. "Est-ce que Cotonou est sûr ? Guide pratique" / "Is Cotonou Safe? A Practical Guide"
2. "Comment se déplacer à Cotonou : Zem, Gozem, chauffeur" / "Getting Around Cotonou: Zem, Gozem, Driver"
3. "Appartement meublé à Cotonou : que vérifier avant de réserver" / "Furnished Apartment in Cotonou: What to Check Before Booking"

**Given** le visiteur lit un article
**When** il parcourt le contenu
**Then** l'article suit le pattern : peur/question SEO → réponse factuelle → découverte de Maison Ayaba → CTA Airbnb
**And** le contenu est structuré avec des titres (h2, h3), des paragraphes aérés et des informations factuelles
**And** chaque article contient au moins un lien interne vers une page du site (Appartement, Quartier ou Hôte)

**Given** les articles contiennent des questions/réponses
**When** le contenu s'y prête
**Then** les paires Q/R sont structurées pour permettre un markup `FAQPage` (schema.org)

**Given** chaque article
**When** on vérifie les meta tags
**Then** le title (<60 car.) et la description (<160 car.) sont uniques et optimisés pour le SEO
**And** l'og:image est définie pour le partage social
