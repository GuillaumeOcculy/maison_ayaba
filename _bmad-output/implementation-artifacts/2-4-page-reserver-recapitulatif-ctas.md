# Story 2.4 : Page Réserver — Récapitulatif & CTAs

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want voir un récapitulatif des 3 configurations avec les liens directs vers Airbnb,
So that je peux finaliser mon choix et réserver en un clic.

## Acceptance Criteria

1. **Given** le visiteur accède à `/fr/reserver/` ou `/en/book/` **When** la page se charge **Then** il voit les 3 configurations en format récapitulatif : nom, photo principale, capacité, prix par nuit, et un CTA Airbnb dédié par config

2. **Given** le visiteur clique sur un CTA Airbnb **When** il choisit une configuration **Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

3. **Given** la page est une page de conversion **When** on vérifie le design **Then** la page est épurée, focalisée sur l'action — pas de contenu superflu **And** les 3 CTAs sont clairement différenciés par configuration **And** la page est accessible en maximum 1 clic depuis le menu principal

4. **Given** la page est bilingue **When** on compare les versions FR et EN **Then** le contenu est complet et traduit dans les deux langues **And** les URLs sont localisées (`/fr/reserver/`, `/en/book/`)

## Tasks / Subtasks

- [x] Task 1 — Ajouter les clés i18n pour la page Réserver (AC: #1, #3, #4)
  - [x] 1.1 Ajouter dans `fr.json` et `en.json` une section `"booking"` avec les clés : `pageTitle`, `pageDescription`, `heroTitle`, `heroSubtitle`
  - [x] 1.2 Ajouter les clés pour les cartes récap : réutilise `home.config*Name`, `home.config*Note`, `home.capacityLabel`, `labels.pricePerNight` existants
  - [x] 1.3 Section réassurance non ajoutée — page épurée conversion-focused (AC#3)
  - [x] 1.4 Ajouter les clés CTA final : `finalCtaTitle`, `finalCtaSubtitle`, `finalCtaCta` (WhatsApp pour questions)

- [x] Task 2 — Créer les pages `/fr/reserver/` et `/en/book/` (AC: #1, #2, #3, #4)
  - [x] 2.1 Créer `src/pages/fr/reserver.astro` et `src/pages/en/book.astro`
  - [x] 2.2 Utiliser `BaseLayout` (inclut Header + Footer + StickyMobileCta + WhatsAppButton automatiquement)
  - [x] 2.3 Structure de page :
    1. Hero compact (titre + sous-titre — même pattern que pages Appartement, Fidjrossè, Votre Hôte)
    2. Section 3 cartes récap (fond blanc) — une carte par configuration avec : photo, nom, capacité, prix/nuit, CTA `<AirbnbCta>` par config
    3. FinalCta — "Une question avant de réserver ?" avec lien WhatsApp
  - [x] 2.4 Meta tags via `BaseLayout` : title et description uniques et SEO-optimisés
  - [x] 2.5 Les données proviennent de `apartments.ts` + clés i18n — jamais de contenu en dur

- [x] Task 3 — Intégrer les composants CTA Airbnb (AC: #2, #3)
  - [x] 3.1 Utiliser `<AirbnbCta configId="1ch" variant="primary" size="large" locale={locale} />` pour chaque configuration
  - [x] 3.2 Vérifier que chaque CTA pointe vers la bonne URL Airbnb (`apartments.ts` → `airbnbUrl`)
  - [x] 3.3 Vérifier `target="_blank"` + `rel="noopener noreferrer"` (déjà dans le composant)
  - [x] 3.4 Vérifier le tracking GA4 (`airbnb_click` event avec `configId` et `page`)

- [x] Task 4 — Validation responsive et accessibilité (AC: #1, #2, #3, #4)
  - [x] 4.1 Vérifier le rendu mobile (<768px) : cartes empilées en 1 colonne (`grid-cols-1`), CTA pleine largeur
  - [x] 4.2 Vérifier le rendu desktop (>1024px) : 3 cartes en grille côte à côte (`md:grid-cols-3`)
  - [x] 4.3 Navigation clavier : focus visible sur tous les CTAs (via AirbnbCta composant)
  - [x] 4.4 HTML sémantique : `<section>`, `<h2>`, alt descriptif sur les photos (apt.name)
  - [x] 4.5 Cibles tactiles minimum 44x44px sur mobile (via AirbnbCta `min-h-[44px]`)
  - [x] 4.6 `npm run build` sans erreur — 11 pages générées (9 + 2 nouvelles) ✓

## Dev Notes

### ALERTE CRITIQUE — Composants existants à réutiliser

| Composant | Chemin | Utilisation pour cette story |
|-----------|--------|------------------------------|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Layout principal — inclut Header + Footer + StickyMobileCta + WhatsAppButton |
| `AirbnbCta` | `src/components/ui/AirbnbCta.astro` | CTA Airbnb avec tracking GA4 — props: `configId: '1ch'\|'2ch'\|'3ch'`, `variant`, `size`, `label?`, `locale`. RÉUTILISER TEL QUEL ! |
| `FinalCta` | `src/components/sections/FinalCta.astro` | CTA final en bas de page — props: `title`, `subtitle`, `ctaText`, `ctaHref` |
| `StickyMobileCta` | `src/components/ui/StickyMobileCta.astro` | Barre sticky mobile — pointe déjà vers `/fr/reserver/` ou `/en/book/`. Déjà inclus dans BaseLayout |

### ALERTE CRITIQUE — NE PAS créer de composant carte dédié

La page Réserver est une page **épurée de conversion** (AC#3). Les cartes récap sont des **sections inline simples** directement dans la page — PAS besoin d'un composant `BookingCard.astro` séparé. Utiliser un `.map()` sur `apartments` avec le markup directement dans la page (même pattern que les sections répétitives de la page Fidjrossè).

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zéro React, zéro Vue, zéro JS client (sauf le script GA4 déjà dans AirbnbCta)
2. **Images** : Toujours `<Image>` d'Astro (import depuis `astro:assets`). Les photos existent déjà : `src/assets/images/apartments/chambre1.png`, `chambre2.png`, `chambre3.png`
3. **Données** : Centraliser dans `src/data/apartments.ts` — JAMAIS de valeurs en dur. Les URLs Airbnb, prix, capacités sont déjà dans `apartments.ts`
4. **i18n** : Utiliser `t(locale, 'clé')` de `src/i18n/utils.ts` pour tout texte UI
5. **CTA Airbnb** : TOUJOURS via `<AirbnbCta>` — jamais de `<a href="airbnb...">` en dur
6. **Styling** : Tailwind CSS v4 uniquement, tokens design : `ayaba-terra`, `ayaba-gold`, `ayaba-cream`, `ayaba-dark`, `ayaba-muted`
7. **Accessibilité** : HTML sémantique, focus visible, cibles tactiles 44x44px, alt descriptif

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

### ALERTE — Données déjà disponibles dans apartments.ts

**Ne PAS recréer les données.** Tout est dans `src/data/apartments.ts` :

```typescript
// 3 configs avec tout ce qu'il faut :
apartments[0] → { name: 'Maison Ayaba — 1 Chambre', slug: '1-chambre', bedrooms: 1, pricePerNight: { min: 60, max: 80 }, capacity: 2, airbnbUrl: '...', galleryImageSlugs: ['chambre1'] }
apartments[1] → { name: 'Maison Ayaba — 2 Chambres', slug: '2-chambres', bedrooms: 2, pricePerNight: { min: 80, max: 100 }, capacity: 4, ... }
apartments[2] → { name: 'Maison Ayaba — 3 Chambres', slug: '3-chambres', bedrooms: 3, pricePerNight: { min: 100, max: 140 }, capacity: 6, ... }
```

### ALERTE — Images disponibles

Les photos des configurations **existent déjà** dans `src/assets/images/apartments/` :
- `chambre1.png` — config 1 chambre
- `chambre2.png` — config 2 chambres
- `chambre3.png` — config 3 chambres

**Import pattern :**
```typescript
import chambre1 from '../../assets/images/apartments/chambre1.png';
import chambre2 from '../../assets/images/apartments/chambre2.png';
import chambre3 from '../../assets/images/apartments/chambre3.png';

const configImages = [chambre1, chambre2, chambre3];
```

### ALERTE — AirbnbCta interface rappel

```typescript
interface Props {
  configId: '1ch' | '2ch' | '3ch';  // Mappe sur apartments[0|1|2]
  variant?: 'primary' | 'outline';   // 'primary' = bg-terra, 'outline' = bordure terra
  size?: 'default' | 'large';        // 'large' recommandé pour cette page
  label?: string;                     // Override du texte (sinon "Réserver"/"Book")
  locale: Locale;
}
```

Le composant gère automatiquement : URL Airbnb, `target="_blank"`, `rel="noopener noreferrer"`, tracking GA4, accessibilité.

### ALERTE — Design conversion-focused

Cette page est le **dernier point de contact avant Airbnb**. Design épuré :
- Pas de long texte explicatif
- Pas de sections philosophie/quartier/hôte (ça c'est fait sur les autres pages)
- Juste : titre → 3 cartes → CTA final
- Alternance sections : hero (blanc) → cartes (blanc) → FinalCta (crème)
- Chaque carte doit avoir UN seul CTA primaire clair par configuration

### ALERTE — Navigation déjà configurée

La route `/fr/reserver/` et `/en/book/` est **déjà définie** dans `src/data/navigation.ts` (ligne 18). Le Header et le StickyMobileCta pointent déjà vers ces URLs. Il suffit de créer les fichiers de page.

### Intelligence Story 2.3 — Leçons apprises

1. **Tailwind v4** : Tokens dans `src/styles/global.css` via `@theme { }` — ne JAMAIS créer de `tailwind.config.mjs`
2. **Pattern page détail** : Hero compact (pas plein-cadre), sections alternées blanc/crème, FinalCta en bas
3. **Build** : Vérifié avec `npm run build`, aucune erreur — vérifier que les 2 nouvelles pages sont générées (total = 11)
4. **Pages FR/EN** : Même structure, seuls le locale et les clés i18n changent
5. **BaseLayout** : Inclut automatiquement Header, Footer, StickyMobileCta, WhatsAppButton — ne pas les ajouter manuellement
6. **FinalCta** : Réutiliser tel quel avec les props personnalisées
7. **Sections alternées** : `bg-white` / `bg-ayaba-cream` en alternance — ne pas mettre deux crèmes consécutifs
8. **Code review Story 2.3** : Prop `imageSrc?` optionnel important, supprimer les clés i18n mortes, grille adaptative au nombre d'items
9. **`.map()` pattern** : Utiliser `.map()` sur les données pour éviter la duplication de markup

### Intelligence Git — Commits récents

```
1ab0685 feat: Story 2.3 — page Votre Hôte & Protocole Kwabo bilingue FR/EN
2eac519 fix: trailingSlash, filtre sitemap et doc .env.example
12cca84 feat: Story 2.2 — page Fidjrossè & Cotonou avec guide quartier bilingue
06b0299 feat: Story 2.1 — page Appartement avec 3 configurations détaillées
5a33925 feat: corrections post-rétro Epic 1 — Option A, images, social, redirects
```

### Project Structure Notes

**Fichiers à créer :**
- `src/pages/fr/reserver.astro` — Page Réserver FR
- `src/pages/en/book.astro` — Page Réserver EN

**Fichiers à modifier :**
- `src/i18n/fr.json` — Ajouter section `booking`
- `src/i18n/en.json` — Idem en anglais

**Fichiers existants réutilisés sans modification :**
- `src/layouts/BaseLayout.astro` — Layout principal
- `src/components/ui/AirbnbCta.astro` — CTA Airbnb avec tracking GA4
- `src/components/sections/FinalCta.astro` — CTA final
- `src/data/apartments.ts` — Données des 3 configs (prix, capacité, URLs Airbnb)
- `src/data/navigation.ts` — Routes déjà configurées

**Alignement avec la structure projet (architecture.md) :**
- `src/pages/fr/reserver.astro` → conforme au tree architecture
- `src/pages/en/book.astro` → conforme au tree architecture
- Navigation déjà configurée : `/fr/reserver/` et `/en/book/` dans `navigation.ts`
- StickyMobileCta pointe déjà vers ces URLs
- Aucun conflit ou variance détecté

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.4] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, zero JS client, Tailwind, Image Astro
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — Arbre projet avec `src/pages/fr/reserver.astro`
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb via composant, données dans `src/data/`
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Conversion Page] — Page épurée, focalisée action, cartes récap
- [Source: _bmad-output/planning-artifacts/prd.md#FR6] — Page Réserver avec récapitulatif des 3 configurations
- [Source: _bmad-output/planning-artifacts/prd.md#FR17] — CTA Airbnb depuis la page Réserver
- [Source: _bmad-output/implementation-artifacts/2-3-page-votre-hote-protocole-kwabo.md] — Patterns et leçons Story 2.3

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré durant l'implémentation.

### Completion Notes List

- Ajouté 7 clés i18n dans `fr.json` et `en.json` section `booking` : meta, hero, CTA final WhatsApp
- Réutilisé clés i18n existantes : `home.config*Name`, `home.config*Note`, `home.capacityLabel`, `labels.pricePerNight` — aucune duplication
- Créé pages FR (`/fr/reserver/`) et EN (`/en/book/`) : hero compact, 3 cartes récap avec `<AirbnbCta>`, FinalCta WhatsApp
- Cartes récap : photo (`<Image>` Astro avec responsive widths), label note, nom config, prix/nuit, capacité, CTA Airbnb primary large
- Utilisé `.map()` sur `apartments` pour éviter la duplication de markup
- FinalCta secondaire pointe vers WhatsApp ("Une question avant de réserver ?") — logique car les 3 CTAs Airbnb sont dans les cartes
- Build réussi : 11 pages (9 existantes + 2 nouvelles), 0 erreur
- Design épuré conversion-focused : titre → 3 cartes → WhatsApp CTA. Pas de contenu superflu (AC#3)
- Navigation déjà configurée dans `navigation.ts`, StickyMobileCta pointe déjà vers ces URLs

### Change Log

- 2026-03-14 : Implémentation complète Story 2.4 — page Réserver FR/EN avec 3 cartes récap et CTAs Airbnb
- 2026-03-14 : Code review — 4 fixes appliqués : FinalCta `isExternal` pour liens sortants, alt text i18n, numéro WhatsApp centralisé dans `siteConfig.ts`, fourchette prix affichée

### File List

**Nouveaux fichiers :**
- `src/pages/fr/reserver.astro`
- `src/pages/en/book.astro`

**Fichiers modifiés :**
- `src/i18n/fr.json` — ajout section `booking`
- `src/i18n/en.json` — ajout section `booking`
- `src/data/siteConfig.ts` — ajout `whatsappNumber` centralisé
- `src/components/sections/FinalCta.astro` — ajout prop `isExternal` pour `target="_blank"` + `rel="noopener noreferrer"`
- `src/components/ui/WhatsAppButton.astro` — utilise `whatsappNumber` de siteConfig
- `src/components/common/Footer.astro` — utilise `whatsappNumber` de siteConfig
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 2-4 → done
- `_bmad-output/implementation-artifacts/2-4-page-reserver-recapitulatif-ctas.md` — status done, fixes documentés
