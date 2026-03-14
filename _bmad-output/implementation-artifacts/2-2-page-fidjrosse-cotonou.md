# Story 2.2 : Page Fidjrossè & Cotonou

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want découvrir le quartier Fidjrossè et la ville de Cotonou avec les infos pratiques,
So that je peux me projeter dans mon séjour et savoir ce qu'il y a autour.

## Acceptance Criteria

1. **Given** le visiteur accède à `/fr/fidjrosse-cotonou/` ou `/en/fidjrosse-cotonou/` **When** la page se charge **Then** il voit les sections : restaurants à proximité, commerces, transports (zem, Gozem, chauffeur), plage, et points d'intérêt

2. **Given** le visiteur lit la section transports **When** il consulte les informations **Then** les options sont présentées factuellement avec tarifs indicatifs et conseils pratiques **And** le contenu est utile aussi bien avant la réservation (projection) que pendant le séjour (guide pratique)

3. **Given** le visiteur a fini d'explorer la page **When** il cherche à réserver **Then** un CTA Airbnb est visible en fin de page (et sticky sur mobile via BaseLayout) **And** des liens internes mènent vers la page Appartement

4. **Given** la page est bilingue **When** on compare les versions FR et EN **Then** le contenu est complet et traduit dans les deux langues **And** les URLs sont localisées (`/fr/fidjrosse-cotonou/`, `/en/fidjrosse-cotonou/`)

## Tasks / Subtasks

- [x] Task 1 — Créer les données du quartier dans `src/data/neighborhood.ts` (AC: #1, #2)
  - [x] 1.1 Créer le fichier `src/data/neighborhood.ts` avec le type `NeighborhoodSection` contenant les infos structurées du quartier
  - [x] 1.2 Structurer les données en catégories : restaurants, commerces, transports, plage, points d'intérêt
  - [x] 1.3 Pour les transports : inclure zem (moto-taxi), Gozem (VTC app), chauffeur privé avec tarifs indicatifs
  - [x] 1.4 Toutes les descriptions/textes doivent utiliser des clés i18n — pas de texte en dur

- [x] Task 2 — Ajouter les clés i18n pour la page Fidjrossè (AC: #1, #2, #3, #4)
  - [x] 2.1 Ajouter dans `fr.json` et `en.json` une section `"neighborhood"` avec les clés : `pageTitle`, `pageDescription`, `metaTitle`, `heroTitle`, `heroSubtitle`, `sectionRestaurants`, `sectionCommerces`, `sectionTransports`, `sectionPlage`, `sectionPointsInteret`, descriptions pour chaque section, `finalCtaTitle`, `finalCtaSubtitle`, `viewApartment`
  - [x] 2.2 Ajouter les noms et descriptions des restaurants, commerces, modes de transport
  - [x] 2.3 Ajouter les tarifs indicatifs transports en format localisé

- [x] Task 3 — Créer les composants de section pour la page quartier (AC: #1, #2)
  - [x] 3.1 Créer `src/components/sections/NeighborhoodSection.astro` — composant générique de section avec titre, description et liste d'éléments (réutilisable pour restaurants, commerces, etc.)
  - [x] 3.2 Props : `title: string`, `description?: string`, `items: { name: string; detail: string }[]`, `icon?: string`, `bgClass?: string`
  - [x] 3.3 Chaque item affiche le nom et un détail pratique (distance, tarif, etc.)
  - [x] 3.4 Check vert `ayaba-success` pour les éléments de rassurance (proximité, prix accessibles, etc.)
  - [x] 3.5 Créer `src/components/sections/TransportSection.astro` — section spécifique transports avec tarifs indicatifs et conseils pratiques par mode de transport (zem, Gozem, chauffeur)

- [x] Task 4 — Créer les pages `/fr/fidjrosse-cotonou/` et `/en/fidjrosse-cotonou/` (AC: #1, #2, #3, #4)
  - [x] 4.1 Créer `src/pages/fr/fidjrosse-cotonou.astro` et `src/pages/en/fidjrosse-cotonou.astro`
  - [x] 4.2 Utiliser `BaseLayout` (inclut Header, Footer, StickyMobileCta, WhatsAppButton automatiquement)
  - [x] 4.3 Structure de page :
    1. Hero compact (titre + sous-titre descriptif — pas de hero plein-cadre, même pattern que la page Appartement)
    2. Section Quartier intro — texte de présentation de Fidjrossè (fond blanc)
    3. Section Restaurants à proximité (fond crème `ayaba-cream`)
    4. Section Commerces & services (fond blanc)
    5. Section Transports — zem, Gozem, chauffeur avec tarifs (fond crème)
    6. Section Plage — accès, distance, ambiance (fond blanc)
    7. Section Points d'intérêt — lieux à visiter à Cotonou et environs (fond crème)
    8. Lien interne vers la page Appartement — "Découvrir nos configurations" ou similaire
    9. FinalCta — "Prêt à réserver ?" avec lien vers `/fr/reserver/` ou `/en/book/`
  - [x] 4.4 Meta tags via `BaseLayout` : title et description uniques et SEO-optimisés
  - [x] 4.5 Les données proviennent de `neighborhood.ts` + clés i18n — jamais de contenu en dur

- [x] Task 5 — Validation responsive et accessibilité (AC: #1, #2, #3, #4)
  - [x] 5.1 Vérifier le rendu sur mobile (<768px) : sections empilées, CTA pleine largeur
  - [x] 5.2 Vérifier le rendu desktop (>1024px) : sections bien espacées, max-width cohérent
  - [x] 5.3 Navigation clavier : focus visible sur tous les éléments interactifs
  - [x] 5.4 HTML sémantique : `<section>`, `<h2>`, `<h3>`, listes `<ul>/<li>`
  - [x] 5.5 Cibles tactiles minimum 44x44px sur mobile
  - [x] 5.6 `npm run build` sans erreur, vérifier le nombre de pages générées (+2)

## Dev Notes

### ALERTE CRITIQUE — Composants existants à réutiliser

| Composant | Chemin | Utilisation pour cette story |
|-----------|--------|------------------------------|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Layout principal — inclut Header + Footer + StickyMobileCta + WhatsAppButton |
| `FinalCta` | `src/components/sections/FinalCta.astro` | CTA final en bas de page — props: `title`, `subtitle`, `ctaText`, `ctaHref` |
| `AirbnbCta` | `src/components/ui/AirbnbCta.astro` | Si CTA Airbnb spécifique nécessaire dans le contenu — props: `configId`, `variant`, `size`, `label`, `locale` |
| `QuartierTeaser` | `src/components/sections/QuartierTeaser.astro` | NE PAS réutiliser directement — c'est le teaser homepage (split image/texte). La page quartier a besoin de sections complètes. Cependant, le **pattern visuel** est le même (grid 2 colonnes, image + texte) |

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zéro React, zéro Vue, zéro JS client sauf script inline minimal si nécessaire
2. **Images** : Toujours `<Image>` d'Astro (import depuis `astro:assets`), jamais de `<img>` brut. Vérifier `src/assets/images/neighborhood/` pour des images existantes AVANT de créer des placeholders. Si pas d'images disponibles, utiliser des sections texte avec icônes/emojis ou des divs colorées `ayaba-cream` comme placeholder
3. **Données** : Centraliser dans `src/data/neighborhood.ts` — JAMAIS de valeurs en dur dans les pages
4. **i18n** : Utiliser `t(locale, 'clé')` de `src/i18n/utils.ts` pour tout texte UI. Le contenu descriptif long peut être dans les clés i18n ou directement dans les fichiers `.astro` par langue (un fichier par langue)
5. **CTA Airbnb** : Via `<AirbnbCta>` si lien direct, ou via `<FinalCta>` avec lien vers `/fr/reserver/`
6. **Styling** : Tailwind CSS uniquement, tokens design : `ayaba-terra`, `ayaba-gold`, `ayaba-cream`, `ayaba-dark`, `ayaba-muted`, `ayaba-success`
7. **Accessibilité** : HTML sémantique, focus visible, cibles tactiles 44x44px

### ALERTE — Tailwind CSS v4

Le projet utilise **Tailwind CSS v4.2.1** via `@tailwindcss/vite` (PAS l'ancien `@astrojs/tailwind`). Les tokens design sont définis dans `src/styles/global.css` via `@theme { }` — PAS dans `tailwind.config.mjs` (ce fichier n'existe pas).

```css
/* src/styles/global.css — extrait */
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

### ALERTE — Images disponibles

**Pas de dossier `src/assets/images/neighborhood/` actuellement.** Images existantes dans le projet :
- `src/assets/images/hero/salon.png` — hero salon (utilisée sur homepage)
- `src/assets/images/apartments/chambre{1,2,3}.png` — photos configs
- `src/assets/images/logo.png`

**Stratégie images :** Créer les sections sans images (contenu textuel factuel). Les sections de la page quartier sont principalement informatives (listes, tarifs, conseils). Utiliser des icônes/emojis ou des encadrés colorés pour structurer visuellement. Si des images de Fidjrossè sont ajoutées plus tard dans `src/assets/images/neighborhood/`, les intégrer.

### ALERTE — Contenu factuel requis

La page Fidjrossè est un **guide pratique** — le ton est "ami bien informé, pas un vendeur" (UX spec). Le contenu doit être :
- **Factuel** : distances réelles, tarifs indicatifs en FCFA/EUR, noms de lieux réels
- **Utile avant ET pendant le séjour** : projection pré-réservation + guide pratique sur place
- **Anti-peurs** : adresser les peurs transport, sécurité quartier, accès services

**Contenu indicatif pour les sections :**

**Restaurants :** Noms de restaurants/maquis réels à proximité de Fidjrossè Jacquot, distance à pied, type de cuisine, fourchette de prix
**Commerces :** Supermarchés (Érevan, etc.), marchés locaux, pharmacies, distance
**Transports :**
- Zem (moto-taxi) : tarif course ~200-500 FCFA en ville, hélable dans la rue
- Gozem (app VTC) : tarif estimé, paiement app, plus sécurisé
- Chauffeur privé : arrangement via l'hôte, tarif journée
- Aéroport : distance ~20 min, navette possible
**Plage :** Plage de Fidjrossè à ~10 min à pied, ambiance, sécurité
**Points d'intérêt :** Fondation Zinsou, Marché Dantokpa, Ouidah (Route des Esclaves), Ganvié (cité lacustre), Porto-Novo

**Note :** Les données exactes doivent être vérifiées/complétées par l'hôte (Onizuka). Utiliser des valeurs indicatives réalistes.

### Intelligence Story 2.1 — Leçons apprises

1. **Tailwind v4** : Tokens dans `src/styles/global.css` via `@theme { }` — ne JAMAIS créer de `tailwind.config.mjs`
2. **Pattern page détail** : Hero compact (pas plein-cadre), sections alternées blanc/crème, FinalCta en bas
3. **Build** : Vérifié avec `npm run build`, aucune erreur — vérifier que les 2 nouvelles pages sont générées
4. **Commit pattern** : `feat: Story X.Y — description courte`
5. **Pages FR/EN** : Même structure, seuls le locale et les clés i18n changent
6. **BaseLayout** : Inclut automatiquement Header, Footer, StickyMobileCta, WhatsAppButton — ne pas les ajouter manuellement
7. **FinalCta** : Réutiliser tel quel avec les props personnalisées
8. **Sections alternées** : `bg-white` / `bg-ayaba-cream` en alternance

### Intelligence Git — Commits récents

```
06b0299 feat: Story 2.1 — page Appartement avec 3 configurations détaillées
5a33925 feat: corrections post-rétro Epic 1 — Option A, images, social, redirects
22333a8 feat: Story 1.4 — page d'accueil FR & EN avec 8 composants de section
d34ac8a feat: Story 1.3 — composants AirbnbCta et StickyMobileCta
1a6a9fc feat: Story 1.2 — BaseLayout, Header, Footer, navigation bilingue
```

### Project Structure Notes

**Fichiers à créer :**
- `src/data/neighborhood.ts` — Données structurées du quartier
- `src/components/sections/NeighborhoodSection.astro` — Section générique quartier (réutilisable)
- `src/components/sections/TransportSection.astro` — Section transports avec tarifs
- `src/pages/fr/fidjrosse-cotonou.astro` — Page quartier FR
- `src/pages/en/fidjrosse-cotonou.astro` — Page quartier EN

**Fichiers à modifier :**
- `src/i18n/fr.json` — Ajouter section `neighborhood` + contenu quartier
- `src/i18n/en.json` — Idem en anglais

**Fichiers existants réutilisés sans modification :**
- `src/layouts/BaseLayout.astro` — Layout principal
- `src/components/sections/FinalCta.astro` — CTA final
- `src/components/ui/AirbnbCta.astro` — Si CTA Airbnb inline nécessaire

**Alignement avec la structure projet (architecture.md) :**
- `src/pages/fr/fidjrosse-cotonou.astro` → conforme au tree architecture
- `src/pages/en/fidjrosse-cotonou.astro` → conforme au tree architecture
- `src/data/neighborhood.ts` → extension logique de `src/data/`
- `src/components/sections/NeighborhoodSection.astro` → extension logique de `sections/`
- Aucun conflit ou variance détecté

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, zero JS client, Tailwind, Image Astro
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — Arbre projet avec `src/pages/fr/fidjrosse-cotonou.astro`
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — Conventions de nommage, anti-patterns, enforcement guidelines
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb via composant, données dans `src/data/`
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Target Users] — Fabrice (diaspora) utilise la page quartier comme outil de projection, Amina & Thomas (couple) cherchent restaurants/plage
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Effortless Interactions] — CTA sticky mobile, pas de popup, contenu factuel
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Experience Principles] — "Rassurer d'abord, vendre ensuite", "Montrer, ne pas dire", ton "ami bien informé"
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#QuartierTeaser.astro] — Pattern split image/texte pour le quartier
- [Source: _bmad-output/planning-artifacts/prd.md#FR4] — Page Fidjrossè & Cotonou avec informations du quartier
- [Source: _bmad-output/planning-artifacts/prd.md#Parcours 3 Fabrice] — Page quartier comme ressource pendant et après le séjour
- [Source: _bmad-output/implementation-artifacts/2-1-page-appartement-3-configurations-detaillees.md] — Patterns et leçons Story 2.1

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré durant l'implémentation.

### Completion Notes List

- Créé `src/data/neighborhood.ts` avec types `NeighborhoodSection`, `TransportMode` et données structurées (restaurants, commerces, plage, POI, transports) — toutes les valeurs textuelles via clés i18n
- Ajouté ~60 clés i18n dans `fr.json` et `en.json` section `neighborhood` : meta, hero, intro, 4 restaurants, 4 commerces, 4 modes de transport avec tarifs FCFA/EUR et conseils, 3 infos plage, 5 points d'intérêt, CTA final
- Créé `NeighborhoodSection.astro` — composant générique réutilisable (titre, description, items avec check vert `ayaba-success`, icon, bgClass)
- Créé `TransportSection.astro` — section transports avec cards blanches sur fond crème, tarifs en `ayaba-terra`, conseils en `ayaba-success`
- Créé pages FR (`/fr/fidjrosse-cotonou/`) et EN (`/en/fidjrosse-cotonou/`) : hero compact, intro, 5 sections alternées blanc/crème, lien appartement, FinalCta
- Build réussi : 7 pages (5 existantes + 2 nouvelles), 0 erreur
- HTML sémantique : `<section>`, `<h2>`, `<h3>`, `<ul>/<li>`, focus visible, cibles tactiles 44px

### Change Log

- 2026-03-14 : Implémentation complète Story 2.2 — page Fidjrossè & Cotonou FR/EN avec données quartier, composants section, i18n bilingue
- 2026-03-14 : Code review — 3 MEDIUM + 1 LOW corrigés : Érevan remplacé par Chez Clarice dans restaurants, `<h3>` ajouté dans NeighborhoodSection, sections refactorisées avec `.map()`, clé `metaTitle` morte supprimée

### File List

**Nouveaux fichiers :**
- `src/data/neighborhood.ts`
- `src/components/sections/NeighborhoodSection.astro`
- `src/components/sections/TransportSection.astro`
- `src/pages/fr/fidjrosse-cotonou.astro`
- `src/pages/en/fidjrosse-cotonou.astro`

**Fichiers modifiés :**
- `src/i18n/fr.json` — ajout section `neighborhood`
- `src/i18n/en.json` — ajout section `neighborhood`
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 2-2 → in-progress → review
- `_bmad-output/implementation-artifacts/2-2-page-fidjrosse-cotonou.md` — tasks cochés, status review
