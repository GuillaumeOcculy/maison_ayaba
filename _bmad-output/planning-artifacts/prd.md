---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
workflow_completed: true
inputDocuments:
  - product-brief-maison_ayaba-2026-03-14.md
  - brainstorming-session-2026-03-13-001.md
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 1
  projectDocs: 0
workflowType: 'prd'
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document — Maison Ayaba

**Author:** Onizuka
**Date:** 2026-03-14

## Résumé Exécutif

Le site web Maison Ayaba (maisonayaba.com / maisonayaba.fr) est le bras digital d'une marque de location courte durée premium à Cotonou, Bénin. Son rôle : capter les voyageurs en recherche active d'hébergement à Cotonou via le SEO, détruire leur anxiété pré-réservation (coupures, sécurité, confort, transport), et les convertir vers les 3 annonces Airbnb existantes (1, 2 ou 3 chambres — Maison Wabi-Sabi, Fidjrossè Jacquot).

Le site cible 5 profils principaux : voyageurs d'affaires, couples en escapade, groupes d'amis, familles et explorateurs pré-installation (diaspora/programme nationalité). Il fonctionne comme un "anxiolytique digital" — chaque page répond à une peur spécifique et la transforme en confiance, reflétant en ligne le Protocole Kwabo (accueil anticipatoire signature de la marque).

Le site est bilingue (FR/EN), responsive mobile-first, avec une stratégie SEO et AEO (Answer Engine Optimization) intégrée. En Phase 1, il redirige exclusivement vers Airbnb. En Phase 2 (installation au Bénin fin 2026), il prépare la transition vers des réservations directes.

### Ce qui rend ce produit unique

Le différenciateur du site n'est pas technique — c'est ce qu'il rend visible. Maison Ayaba est la seule marque hôtelière structurée sur le marché Airbnb de Cotonou : bail commercial 5 ans, 20 000€+ d'investissement infrastructure, équipe opérationnelle sur place, process documentés et reproductibles. Le site transforme cette crédibilité invisible (qu'une annonce Airbnb seule ne peut pas communiquer) en confiance tangible et partageable.

L'insight fondamental : le vrai concurrent n'est pas les hôtels ou les autres Airbnb — c'est l'anxiété du voyageur face à l'Afrique de l'Ouest. Le site détruit cette peur point par point (contenu SEO anti-peurs, transparence sur les coupures d'électricité, preuves visuelles d'équipement, avis intégrés) avant même que le voyageur n'arrive sur Airbnb.

Le guide de bienvenue existant (14 pages) constitue l'actif contenu fondateur — chaque section = un article de blog, une page du site, un post réseaux sociaux.

## Classification Projet

- **Type :** Web App — site vitrine MPA avec blog intégré, multilingue, responsive
- **Domaine :** Général (hospitality/tourisme) — pas de contraintes réglementaires lourdes
- **Complexité :** Basse — contenu statique, pas de système de paiement, pas de données sensibles
- **Contexte :** Greenfield — nouveau produit, pas de code existant

## Critères de Succès

### Succès Utilisateur

- Le visiteur comprend l'offre (configurations, prix, localisation) en moins de 30 secondes
- Le visiteur trouve les réponses à ses peurs (coupures, sécurité, confort, transport) sans quitter le site
- Le parcours site → Airbnb est fluide : maximum 2-3 clics jusqu'au bouton "Réserver sur Airbnb"
- Le contenu blog répond aux questions réelles des voyageurs (recherche Google ou questions posées aux IA)

### Succès Business

| KPI | Mesure | Cible Phase 1 (mois 1-3) | Cible Phase 2 (mois 3-6) |
|-----|--------|---------------------------|---------------------------|
| Visites site | Visiteurs uniques / semaine | Mesurer baseline | Croissance +20%/mois |
| Visites site | Visiteurs uniques / mois | Mesurer baseline | 500+ /mois |
| Clics vers Airbnb | Clics boutons réservation / semaine | Mesurer baseline | Croissance régulière |
| Taux de conversion site→Airbnb | Clics Airbnb / visiteurs | Mesurer baseline | Optimiser (cible 15-25%) |
| Positionnement SEO | Requêtes clés en page 1 Google | Indexation + premiers signaux | 3-5 requêtes en page 1 |
| Découvrabilité IA | Mentions dans réponses ChatGPT/Claude/Perplexity | Baseline (probablement 0) | Premières mentions |
| Sources de trafic | Répartition Google / réseaux / direct / IA | Identifier canaux | Investir canaux performants |

### Succès Technique

- Temps de chargement < 3s, Lighthouse scores > 90 (détails en section NFR)
- SEO technique complet : sitemap, meta tags, schema.org, Google Search Console (détails en section Web App)
- AEO-ready : contenu structuré pour les moteurs de réponse IA (détails en section Web App)
- Google Analytics 4 opérationnel dès le lancement avec tracking des clics Airbnb comme conversions

### Jalons Mesurables

- **Mois 1** : Site en ligne, indexé par Google, GA4 actif, premières visites organiques
- **Mois 3** : Baseline trafic établie, premières requêtes SEO qui progressent, données de conversion disponibles
- **Mois 6** : 3-5 requêtes clés en page 1, trafic organique régulier, site partageable comme carte de visite digitale, premières mentions IA potentielles

## User Journeys

### Parcours 1 — Kofi, le voyageur d'affaires efficace

**Persona :** Kofi, 35 ans, consultant en stratégie, Franco-Ghanéen basé à Paris. Mission de 2 semaines à Cotonou. N'a jamais trouvé d'hébergement pour travailler confortablement en Afrique de l'Ouest.

**Opening Scene :** Kofi ouvre Google un dimanche soir. Il tape "appartement meublé Cotonou longue durée". Il scrolle — annonces Airbnb sans contexte, hôtels hors de prix. Puis un résultat organique : "Appartement meublé à Cotonou — Bureau, WiFi, onduleur | Maison Ayaba".

**Rising Action :** Il clique. "Tout le confort que vous attendez. À Cotonou." Il voit les 3 configurations avec les prix. 60-80€/nuit pour un appartement entier avec bureau ? Il compare avec le Novotel à 200€. Il clique sur "L'Appartement", découvre la config 1 chambre. Photos du bureau, de l'onduleur, du WiFi. Machine à laver, cuisine complète. "Je peux vivre normalement ici."

**Climax :** La section sur les coupures d'électricité. Le site l'adresse frontalement : "Oui, il y a des coupures. Non, ça ne vous impactera pas — onduleur automatique." Kofi passe de "intéressant" à "je réserve".

**Resolution :** Clic sur "Réserver sur Airbnb" config 1 chambre. Temps total sur le site : 4 minutes. Il reviendra consulter le guide quartier pendant son séjour.

**Capabilities :** SEO requêtes directes, page appartement comparative, transparence équipements, CTA Airbnb par config, guide quartier.

---

### Parcours 2 — Les Mensah, la famille qui a besoin d'être rassurée

**Persona :** Marie Mensah, 38 ans, infirmière à Lyon, d'origine béninoise. Premières vacances familiales au Bénin avec mari et 2 enfants (6 ans et 18 mois). Sa belle-mère : "Cotonou c'est pas pour les enfants."

**Opening Scene :** Marie tape "est-ce que Cotonou est sûr pour les enfants". Article blog Maison Ayaba : "Voyager à Cotonou avec des enfants — guide pratique". Ton factuel, rassurant sans être naïf.

**Rising Action :** Lien vers "Notre appartement familial à Fidjrossè". Config 3 chambres. "Lit parapluie disponible sur demande" — quelqu'un a pensé à ça ? Alarme Ring, smart lock, clim dans chaque chambre. Elle montre à son mari.

**Climax :** Page "Votre Hôte". Le Protocole Kwabo : message personnalisé, clim pré-allumée, panier de bienvenue. Elle imagine arriver avec les enfants fatigués et trouver un appartement frais avec un mot "Kwabo" et des fruits locaux. "Si quelqu'un anticipe tout ça, je peux faire confiance."

**Resolution :** Réservation config 3 chambres. Les avis Airbnb confirment. Elle enverra le lien à sa belle-mère comme preuve que "c'est sérieux".

**Capabilities :** Blog SEO anti-peurs comme point d'entrée, contenu rassurant factuel, équipements famille visibles, Protocole Kwabo, avis intégrés, site partageable.

---

### Parcours 3 — Fabrice, l'explorateur qui demande à l'IA

**Persona :** Fabrice, 32 ans, développeur web full remote à Bruxelles, d'origine haïtienne. Envisage le Bénin via le programme de nationalité diaspora. Séjour exploratoire de 3 semaines.

**Opening Scene :** Fabrice tape sur Perplexity : "Quel quartier pour vivre à Cotonou en tant que digital nomad ?". La réponse cite Fidjrossè et Maison Ayaba comme option d'hébergement avec bureau et WiFi fiable.

**Rising Action :** Page "Fidjrossè & Cotonou". Restaurants à pied, coworking, plage à 10 minutes. Il se projette. Config 1 chambre avec bureau, onduleur. 60-80€/nuit pour 3 semaines, dans son budget.

**Climax :** Article "S'installer au Bénin — guide du séjour exploratoire". Programme de nationalité, coût de la vie, démarches. Le site comprend exactement son projet. Il bookmarke le site comme ressource.

**Resolution :** Réservation 3 semaines. Pendant le séjour, il consulte le guide quartier régulièrement. À son retour, il envoie maisonayaba.com à ses amis.

**Capabilities :** Contenu AEO citable par les IA, page quartier détaillée, blog comme ressource au-delà de l'hébergement, contenu diaspora/installation.

---

### Parcours 4 — Onizuka, l'administrateur

**Persona :** Onizuka, fondateur et hôte, basé en France (puis au Bénin fin 2026).

**Scénario :** Mise à jour des prix saisonniers et ajout d'un article blog avant la haute saison.

**Actions :** Modification du contenu dans le code → déploiement → vérification rendu mobile/desktop → contrôle GA4 (visites, clics Airbnb, requêtes SEO) → partage article sur Instagram et groupes Facebook.

**Résultat :** Site à jour en moins de 30 minutes. Article indexé sous 48h.

**Capabilities :** Gestion contenu dans le code, déploiement rapide, analytics consultables, workflow blog simple.

---

### Matrice Capabilities × Journeys

| Capability | Kofi (Business) | Mensah (Famille) | Fabrice (Diaspora/IA) | Admin |
|---|---|---|---|---|
| SEO requêtes directes | ✅ Point d'entrée | | | |
| Blog SEO anti-peurs | | ✅ Point d'entrée | | ✅ Publication |
| Contenu AEO | | | ✅ Point d'entrée | |
| Page Appartement (3 configs) | ✅ | ✅ | ✅ | ✅ Mise à jour |
| Page Quartier | ✅ Pendant séjour | | ✅ Projection | |
| Page Hôte / Protocole Kwabo | | ✅ Rassurance | | |
| CTA Airbnb par configuration | ✅ | ✅ | ✅ | ✅ Vérification |
| Avis intégrés | | ✅ | | |
| Site partageable | | ✅ Belle-mère | ✅ Ami | ✅ Réseaux sociaux |
| Bilingue FR/EN | ✅ | ✅ | ✅ | |
| Analytics / tracking | | | | ✅ |
| Schema.org / données structurées | ✅ | ✅ | ✅ | |

## Spécifications Web App

### Vue d'ensemble

Site vitrine MPA (Multi-Page Application) avec pré-rendu statique (SSG). Chaque page est une URL distincte avec son contenu indexable, ses balises meta et ses données structurées. Le HTML est lisible sans JavaScript — optimal pour SEO, AEO et performance.

Framework hybride recommandé (type Astro, Next.js SSG, ou équivalent) permettant du contenu statique avec des composants interactifs si nécessaire.

### Architecture Technique

**Compatibilité navigateurs :**
- Chrome, Safari, Firefox, Edge — 2 dernières versions
- Safari iOS et Chrome Android — priorité mobile
- Pas de support IE11 ni navigateurs obsolètes

**Responsive Design :**
- Mobile-first : conception du mobile vers le desktop
- Breakpoints : mobile (< 768px), tablette (768-1024px), desktop (> 1024px)
- Images responsives (srcset/picture) pour réseaux 3G/4G

**SEO & AEO :**
- HTML sémantique (header, main, nav, article, section)
- Balises meta uniques par page (title, description, og:image, twitter:card)
- Sitemap XML auto-généré, robots.txt configuré
- Données structurées schema.org : LodgingBusiness, FAQPage, BreadcrumbList
- Contenu factuel dense pour consommation par les moteurs de réponse IA
- URLs propres et descriptives (ex : /fr/appartement, /en/apartment)

**Internationalisation :**
- 2 langues : Français (défaut) + Anglais
- URLs localisées avec balises hreflang
- Contenu traduit manuellement (qualité requise pour SEO)
- Sélecteur de langue visible et accessible

**Déploiement & Infrastructure :**
- Build statique déployable sur CDN (Vercel, Netlify, Cloudflare Pages ou équivalent)
- Distribution géographique : Europe + Afrique de l'Ouest minimum
- Blog : pages markdown ou CMS headless — chaque article = page MPA indexable
- Google Analytics 4 avec événements personnalisés (clics Airbnb = conversions)
- Uptime monitoring basique (99,5%+)

## Scoping & Développement Phasé

### Stratégie MVP

**Approche :** Experience MVP — site complet et soigné dès le jour 1, pas de "version beta". Le site doit inspirer confiance immédiatement.

**Ressources :** Solo dev (Onizuka), 10+ ans d'expérience web.

**Timeline :**
- **16 mars 2026** : MVP en production (5 pages vitrine + SEO technique + GA4)
- **17 mars 2026** : Blog avec 3 premiers articles SEO

### Phase 1 — MVP (16-17 mars 2026)

**Journeys supportés :**
- Parcours 1 (Kofi) : Google → site → appartement → Airbnb ✅
- Parcours 2 (Mensah) : Blog → site → rassurance → Airbnb ✅ (17 mars)
- Parcours 3 (Fabrice) : IA → site → quartier → Airbnb ✅ (AEO via schema.org)
- Parcours 4 (Admin) : Gestion directe dans le code ✅

**Jour 1 (16 mars) :**
1. Page Accueil — Hero + accroche + aperçu 3 configs + CTA Airbnb
2. Page Appartement — 3 configurations, galerie photos, équipements, prix, CTA Airbnb par annonce
3. Page Fidjrossè & Cotonou — Quartier, restaurants, commerces, transports
4. Page Votre Hôte — Présentation, Protocole Kwabo
5. Page Réserver — 3 liens Airbnb avec récap
6. Bilingue FR/EN avec sélecteur de langue
7. Responsive mobile-first
8. SEO technique : meta tags, sitemap, robots.txt, schema.org (LodgingBusiness)
9. Google Analytics 4 avec tracking clics Airbnb
10. Déploiement sur CDN

**Jour 2 (17 mars) :**
1. Blog fonctionnel avec structure SEO (URL propres, meta tags par article)
2. 3 premiers articles :
   - "Est-ce que Cotonou est sûr ? Guide pratique"
   - "Comment se déplacer à Cotonou : Zem, Gozem, chauffeur"
   - "Appartement meublé à Cotonou : que vérifier avant de réserver"
3. Données structurées FAQPage sur les articles pertinents
4. Inscription Google Search Console + soumission sitemap

### Phase 2 — Croissance (semaines 2-4, mars-avril 2026)

- Articles blog supplémentaires (contenu anti-peurs, guides touristiques)
- Pages d'atterrissage SEO ciblées ("Airbnb Fidjrossè", "hébergement famille Cotonou")
- Google Business Profile créé et lié au site
- Intégration avis Airbnb (statique ou dynamique)
- Optimisation AEO (données structurées enrichies, contenu factuel dense)

### Phase 3 — Maturité (mois 3-6, Superhost acquis)

- Contenu régulier blog (1-2 articles/mois)
- Optimisation conversion (A/B testing CTA, analyse parcours GA4)
- Instagram @maisonayaba avec liens vers le site
- Pages excursions (Ouidah, Ganvié, Porto-Novo)

### Phase 4 — Expansion (fin 2026+, installation au Bénin)

- Page corporate "Maison Ayaba Business"
- Début réservations directes (système de booking intégré)
- Gestion multi-biens
- Système de parrainage

### Risques & Mitigations

| Risque | Niveau | Mitigation |
|--------|--------|------------|
| Technique | Faible | Stack SSG classique, solo dev expérimenté, pas d'expérimentation ce week-end |
| Marché (SEO lent) | Moyen | Site aussi utilisable comme outil de partage immédiat (réseaux, groupes, prospects). AEO peut accélérer |
| Ressources (solo) | Moyen | Site statique = quasi zéro maintenance technique. Seul effort récurrent = contenu |

## Functional Requirements

### Contenu & Pages

- FR1 : Le visiteur peut consulter la page d'accueil avec l'accroche, un aperçu des 3 configurations et des boutons de réservation Airbnb
- FR2 : Le visiteur peut consulter la page Appartement avec les 3 configurations côte à côte (1ch/2ch/3ch), incluant galerie photos, équipements et prix
- FR3 : Le visiteur peut accéder au bouton "Réserver sur Airbnb" dédié à chaque configuration (1 lien par annonce)
- FR4 : Le visiteur peut consulter la page Fidjrossè & Cotonou avec les informations du quartier (restaurants, commerces, transports, plage)
- FR5 : Le visiteur peut consulter la page Votre Hôte avec la présentation de l'hôte et du Protocole Kwabo
- FR6 : Le visiteur peut consulter la page Réserver avec un récapitulatif des 3 configurations et leurs liens Airbnb

### Blog & Contenu SEO

- FR7 : Le visiteur peut accéder à un blog avec des articles indexables individuellement
- FR8 : Le visiteur peut lire des articles de blog avec un contenu structuré (titres, paragraphes, images)
- FR9 : Le visiteur peut naviguer du blog vers les pages du site via des liens internes
- FR10 : Le visiteur peut naviguer entre les articles via une liste ou un système de navigation

### Navigation & Internationalisation

- FR11 : Le visiteur peut naviguer entre toutes les pages via un menu principal
- FR12 : Le visiteur peut basculer entre français et anglais à tout moment via un sélecteur de langue
- FR13 : Le visiteur peut accéder à tout le contenu dans la langue sélectionnée (FR ou EN)
- FR14 : Le visiteur peut accéder à chaque page via une URL propre et descriptive dans sa langue

### Conversion & Call-to-Action

- FR15 : Le visiteur peut cliquer sur un CTA Airbnb depuis la page d'accueil
- FR16 : Le visiteur peut cliquer sur un CTA Airbnb spécifique à chaque configuration depuis la page Appartement
- FR17 : Le visiteur peut cliquer sur un CTA Airbnb depuis la page Réserver
- FR18 : Le visiteur peut accéder aux CTA Airbnb en maximum 2-3 clics depuis n'importe quelle page

### SEO & Découvrabilité

- FR19 : Les moteurs de recherche peuvent indexer chaque page avec ses propres balises meta (title, description, og:image)
- FR20 : Les moteurs de recherche peuvent accéder au sitemap XML du site
- FR21 : Les moteurs de recherche peuvent lire les données structurées schema.org (LodgingBusiness, FAQPage, BreadcrumbList)
- FR22 : Les moteurs de réponse IA peuvent extraire des informations factuelles structurées du site

### Responsive & Accessibilité

- FR23 : Le visiteur peut consulter le site de manière optimale sur mobile, tablette et desktop
- FR24 : Le visiteur peut naviguer entièrement au clavier
- FR25 : Le visiteur utilisant un lecteur d'écran peut accéder à tout le contenu via textes alternatifs et HTML sémantique

### Analytics & Suivi

- FR26 : Le système enregistre chaque visite de page dans Google Analytics 4
- FR27 : Le système enregistre chaque clic sur un CTA Airbnb comme événement de conversion dans GA4
- FR28 : L'administrateur peut consulter les données de trafic et de conversion dans Google Analytics

### Administration & Contenu

- FR29 : L'administrateur peut mettre à jour le contenu des pages (textes, prix, photos) directement dans le code
- FR30 : L'administrateur peut ajouter un nouvel article de blog avec ses meta tags SEO
- FR31 : L'administrateur peut déployer les changements en production via un build statique
- FR32 : L'administrateur peut vérifier le rendu du site sur mobile et desktop après déploiement

## Non-Functional Requirements

### Performance

- NFR1 : Toutes les pages se chargent en moins de 3 secondes sur mobile 4G
- NFR2 : Lighthouse Performance score > 90 sur toutes les pages
- NFR3 : Images servies en format optimisé (WebP/AVIF) avec lazy loading hors viewport
- NFR4 : First Contentful Paint (FCP) < 1,5 seconde
- NFR5 : Cumulative Layout Shift (CLS) < 0,1

### Sécurité

- NFR6 : Site servi exclusivement via HTTPS
- NFR7 : En-têtes de sécurité HTTP configurés (CSP, X-Frame-Options, X-Content-Type-Options)
- NFR8 : Aucune donnée utilisateur collectée ou stockée côté serveur
- NFR9 : Liens externes avec rel="noopener noreferrer"

### Scalabilité

- NFR10 : Site statique hébergé sur CDN avec distribution géographique (Europe + Afrique de l'Ouest)
- NFR11 : Support des pics de trafic sans dégradation grâce à l'architecture statique

### Accessibilité

- NFR12 : Conformité WCAG 2.1 niveau AA
- NFR13 : Lighthouse Accessibility score > 90
- NFR14 : Ratio de contraste minimum 4.5:1 pour le texte courant
- NFR15 : Toutes les images ont un attribut alt descriptif
- NFR16 : Navigation clavier complète avec indicateurs de focus visibles

### SEO Technique

- NFR17 : Lighthouse SEO score > 95
- NFR18 : Title unique (< 60 car.) et meta description unique (< 160 car.) par page
- NFR19 : URLs descriptives, minuscules, avec tirets
- NFR20 : Balises hreflang correctement configurées pour chaque paire FR/EN
- NFR21 : Sitemap XML auto-généré et mis à jour à chaque build
