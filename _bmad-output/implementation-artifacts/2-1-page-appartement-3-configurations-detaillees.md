# Story 2.1 : Page Appartement — 3 Configurations Détaillées

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want voir les 3 configurations d'appartement en détail avec galerie photos, équipements complets et prix,
So that je peux comparer et choisir la configuration qui correspond à mes besoins.

## Acceptance Criteria

1. **Given** le visiteur accède à `/fr/appartement/` ou `/en/apartment/` **When** la page se charge **Then** il voit les 3 configurations présentées côte à côte (desktop) ou empilées (mobile) **And** chaque configuration affiche : nom, galerie photos manuelle, capacité, prix par nuit, prix par personne (pour groupes), liste complète des équipements et un CTA Airbnb dédié

2. **Given** le visiteur consulte une galerie photos **When** il interagit avec les photos **Then** il peut naviguer manuellement entre les photos (pas de carrousel auto-play) **And** les images utilisent `<Image>` d'Astro (WebP/AVIF, lazy loading, alt descriptif) **And** le composant `ImageGallery.astro` est utilisé

3. **Given** le visiteur consulte les équipements **When** il voit la section équipements d'une config **Then** les éléments clés sont mis en avant : WiFi, onduleur, clim, bureau (config 1ch), lit bébé (config 3ch), machine à laver, cuisine **And** les éléments de rassurance utilisent la couleur `ayaba-success` (check vert)

4. **Given** le visiteur veut réserver depuis la page Appartement **When** il clique sur un CTA Airbnb d'une config spécifique **Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

## Tasks / Subtasks

- [x] Task 1 — Étendre le modèle de données `apartments.ts` (AC: #1, #3)
  - [x] 1.1 Ajouter au type `ApartmentConfig` les champs manquants pour la page détail : `pricePerPerson` (optionnel, pour groupes), `fullAmenityKeys` (liste complète des équipements), `galleryImages` (tableau de slugs ou chemins d'images), `description` (objet `Record<Locale, string>` pour les descriptions détaillées)
  - [x] 1.2 Compléter chaque configuration avec les équipements complets : WiFi, onduleur, clim, cuisine équipée, machine à laver, draps/serviettes, fer à repasser, etc. — en plus des `keyAmenityKeys` déjà existants
  - [x] 1.3 Ajouter le calcul du prix par personne pour les configs multi-voyageurs (config 2ch : ~25€/nuit pour 4, config 3ch : ~23€/nuit pour 6)
  - [x] 1.4 S'assurer que toutes les valeurs utilisent les clés i18n existantes dans `amenityNames` — ajouter les nouvelles clés manquantes dans `fr.json` et `en.json`

- [x] Task 2 — Créer le composant `ImageGallery.astro` (AC: #2)
  - [x] 2.1 Créer `src/components/ui/ImageGallery.astro` avec les props : `images: { src: ImageMetadata; alt: string }[]`, `configName: string`
  - [x] 2.2 Afficher une image principale en grand et les miniatures en dessous
  - [x] 2.3 Implémenter la navigation manuelle entre photos (clic sur miniature → change l'image principale) — utiliser un script inline minimal (data attributes + event listener, pas de framework JS)
  - [x] 2.4 Utiliser le composant `<Image>` d'Astro pour toutes les images (optimisation WebP/AVIF automatique, lazy loading)
  - [x] 2.5 Alt text descriptif sur chaque image, `aria-label` sur les contrôles de navigation
  - [x] 2.6 Responsive : galerie pleine largeur sur mobile, proportionnelle sur desktop
  - [x] 2.7 Pas de carrousel auto-play — navigation manuelle uniquement (clic/tap)

- [x] Task 3 — Créer le composant `ApartmentDetailSection.astro` (AC: #1, #3)
  - [x] 3.1 Créer `src/components/sections/ApartmentDetailSection.astro` — section détaillée pour une configuration
  - [x] 3.2 Props : `apartment: ApartmentConfig`, `images: { src: ImageMetadata; alt: string }[]`, `locale: Locale`, `description: string`, `pricePerPerson?: string`
  - [x] 3.3 Layout : `ImageGallery` à gauche/en haut, détails à droite/en bas (2 colonnes desktop, empilé mobile)
  - [x] 3.4 Afficher : nom, description, capacité, prix par nuit (range min-max), prix par personne si applicable
  - [x] 3.5 Section équipements : liste complète avec icône check `ayaba-success` (✓ vert) pour chaque élément
  - [x] 3.6 CTA Airbnb dédié via le composant `<AirbnbCta>` existant — pas de lien Airbnb en dur
  - [x] 3.7 Espacement généreux, sections alternées blanc/crème selon la position (pair/impair)

- [x] Task 4 — Ajouter les clés i18n pour la page Appartement (AC: #1, #3)
  - [x] 4.1 Ajouter dans `fr.json` et `en.json` une section `"apartment"` avec les clés : `pageTitle`, `pageDescription`, `metaTitle`, `metaDescription`, `sectionTitle`, `sectionSubtitle`, `pricePerPersonLabel`, `amenitiesTitle`, `galleryLabel`, `comparisonHint`
  - [x] 4.2 Ajouter les nouvelles clés d'équipements manquantes dans `amenityNames` : `ironBoard`, `towelsLinens`, `hotWater`, `securityCamera`, `smartLock`, `parking`, `quietArea`, etc.
  - [x] 4.3 Ajouter les descriptions de chaque configuration en FR et EN

- [x] Task 5 — Créer les pages `/fr/appartement/` et `/en/apartment/` (AC: #1, #2, #3, #4)
  - [x] 5.1 Créer `src/pages/fr/appartement.astro` et `src/pages/en/apartment.astro`
  - [x] 5.2 Utiliser `BaseLayout` (qui inclut Header, Footer, StickyMobileCta, WhatsAppButton automatiquement)
  - [x] 5.3 Structure de page :
    1. Hero compact (titre "Nos configurations" + sous-titre descriptif) — pas de hero plein-cadre, plutôt un header de section élégant
    2. Section config 1 chambre (fond blanc)
    3. Section config 2 chambres (fond crème `ayaba-cream`)
    4. Section config 3 chambres (fond blanc)
    5. FinalCta — "Prêt à réserver ?" avec lien vers `/fr/reserver/` ou `/en/book/`
  - [x] 5.4 Importer les images depuis `src/assets/images/apartments/` — utiliser les images existantes (chambre1.png, chambre2.png, chambre3.png) comme images principales, ajouter des images supplémentaires si disponibles
  - [x] 5.5 Passer les données depuis `apartments.ts` — jamais de valeurs en dur dans les pages
  - [x] 5.6 Meta tags via `BaseLayout` : title et description uniques et SEO-optimisés pour la page Appartement

- [x] Task 6 — Validation responsive et accessibilité (AC: #1, #2, #3, #4)
  - [x] 6.1 Vérifier le rendu sur mobile (<768px) : galeries empilées, sections 1 colonne, CTA pleine largeur
  - [x] 6.2 Vérifier le rendu tablette (768-1024px) : grille 2 colonnes où possible
  - [x] 6.3 Vérifier le rendu desktop (>1024px) : galerie + détails côte à côte, 3 sections bien espacées
  - [x] 6.4 Navigation clavier : Tab entre les miniatures de galerie, focus visible sur les contrôles
  - [x] 6.5 Alt text sur toutes les images (galerie + icônes)
  - [x] 6.6 Cibles tactiles minimum 44x44px sur mobile
  - [x] 6.7 `npm run build` sans erreur, vérifier le nombre de pages générées (+2)

## Dev Notes

### ALERTE CRITIQUE — Composants existants à réutiliser

Le projet contient déjà des composants créés pendant l'Epic 1 qui DOIVENT être réutilisés :

| Composant | Chemin | Utilisation pour cette story |
|-----------|--------|------------------------------|
| `AirbnbCta` | `src/components/ui/AirbnbCta.astro` | CTA de réservation dans chaque section config — props: `configId`, `variant`, `size`, `label`, `locale` |
| `StickyMobileCta` | `src/components/ui/StickyMobileCta.astro` | Déjà inclus dans BaseLayout — pas besoin de l'ajouter |
| `WhatsAppButton` | `src/components/ui/WhatsAppButton.astro` | Déjà inclus dans BaseLayout — pas besoin de l'ajouter |
| `ApartmentCard` | `src/components/sections/ApartmentCard.astro` | NE PAS réutiliser ici — ce composant est la version résumée (homepage). La page détail a besoin d'un composant plus complet (`ApartmentDetailSection`) |
| `FinalCta` | `src/components/sections/FinalCta.astro` | Réutiliser en fin de page pour le CTA final |
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Layout principal — inclut Header + Footer + StickyMobileCta + WhatsAppButton |

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Images** : Toujours `<Image>` d'Astro (import depuis `astro:assets`), jamais de `<img>` brut. Les images sources sont dans `src/assets/images/apartments/`
2. **Données** : Toutes les données (prix, capacité, URLs Airbnb, équipements) proviennent de `src/data/apartments.ts` — JAMAIS de valeurs en dur dans les pages ou composants
3. **i18n** : Utiliser `t(locale, 'clé')` de `src/i18n/utils.ts` pour tout texte UI. Le contenu descriptif peut être directement dans le fichier `.astro` puisqu'il y a un fichier par langue
4. **CTA Airbnb** : Toujours via `<AirbnbCta configId="1ch|2ch|3ch" />` — ce composant gère le tracking GA4 et les URLs centralisées
5. **Styling** : Tailwind CSS uniquement (pas de styles inline), utiliser les tokens design : `ayaba-terra`, `ayaba-gold`, `ayaba-cream`, `ayaba-dark`, `ayaba-muted`, `ayaba-success`
6. **Composants** : Fichiers `.astro` uniquement — zéro React, zéro Vue
7. **Accessibilité** : HTML sémantique, alt sur images, focus visible, cibles tactiles 44x44px

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

Utilisation dans les composants : `text-ayaba-terra`, `bg-ayaba-cream`, `font-heading`, `font-body`, etc.

### ALERTE — Images disponibles

Images existantes dans `src/assets/images/apartments/` :
- `chambre1.png` (6.6 MB) — photo config 1 chambre
- `chambre2.png` (7.1 MB) — photo config 2 chambres
- `chambre3.png` (6.8 MB) — photo config 3 chambres

**Pour la galerie** : chaque config n'a actuellement qu'une seule image. L'`ImageGallery` doit supporter le cas où une seule image est disponible (afficher l'image sans miniatures). Si de nouvelles photos sont ajoutées ultérieurement dans `src/assets/images/apartments/{slug}/`, la galerie les prendra en charge.

**Vérifier s'il existe d'autres images** dans le dossier avant de créer des placeholders. [Source: feedback — toujours scanner les assets existants avant de créer des placeholders]

### ALERTE — Galerie photos : JavaScript minimal

La galerie nécessite un script inline minimal pour le changement d'image au clic sur les miniatures. Pattern à suivre (identique au toggle menu du Header.astro) :

```astro
<script>
  // Vanilla JS avec data attributes
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const thumbs = gallery.querySelectorAll('[data-thumb]');
    const main = gallery.querySelector('[data-main-image]');
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        // Swap image source
      });
    });
  });
</script>
```

**Note importante** : Le composant `<Image>` d'Astro génère des images optimisées au build time. Pour le swap dynamique côté client, les images de galerie devront utiliser l'approche `getImage()` d'Astro ou bien pré-rendre toutes les images en les cachant/affichant via CSS classes (approche plus simple et sans JS complexe — recommandée).

**Approche recommandée (CSS-only + data attributes) :**
- Pré-rendre toutes les images avec `<Image>` dans le HTML
- Masquer les images non-actives via `hidden` ou `opacity-0`
- Le script toggle les classes pour afficher/masquer
- Avantage : toutes les images sont optimisées au build, pas de manipulation src dynamique

### Intelligence Story 1.4/1.5 — Leçons apprises de l'Epic 1

1. **Tailwind v4** : Les tokens sont dans `src/styles/global.css` via `@theme { }`, pas `tailwind.config.mjs` — ne pas essayer de créer un tailwind.config
2. **Images placeholder** : Les composants existants supportent `image?: ImageMetadata` optionnel avec div coloré quand pas d'image
3. **Build warnings** : Des warnings `vite:resolve` sur `node-gyp-build`, `detect-libc`, `nopt` apparaissent — inoffensifs, liés à Sharp
4. **Commit pattern** : `feat: Story X.Y — description courte`
5. **Pages FR/EN** : Les deux pages ont la même structure, seuls le locale et les clés i18n changent
6. **ApartmentGrid** utilise un mapping `imagesBySlug` pour associer les images aux configs — même pattern à suivre
7. **AirbnbCta** prend un `configId` ('1ch'|'2ch'|'3ch') qui est dérivé du slug via `${slug.replace('-chambres', 'ch').replace('-chambre', 'ch')}`
8. **Sections alternées** : fond blanc / fond crème (`bg-white` / `bg-ayaba-cream`) — pattern déjà utilisé sur la homepage

### Intelligence Git — Commits récents

```
5a33925 feat: corrections post-rétro Epic 1 — Option A, images, social, redirects
22333a8 feat: Story 1.4 — page d'accueil FR & EN avec 8 composants de section
d34ac8a feat: Story 1.3 — composants AirbnbCta et StickyMobileCta
1a6a9fc feat: Story 1.2 — BaseLayout, Header, Footer, navigation bilingue
9517056 feat: Story 1.1 — initialisation Astro 6, Tailwind v4, i18n bilingue
```

Le dernier commit (5a33925) a simplifié la homepage vers l'Option A (immersive), gardé les composants TrustBar, KwaboSection, QuartierTeaser, HostSection dans le codebase pour l'Epic 2. Ces composants sont disponibles pour réutilisation sur d'autres pages si pertinent.

### Project Structure Notes

**Fichiers à créer :**
- `src/pages/fr/appartement.astro` — Page détail appartement FR
- `src/pages/en/apartment.astro` — Page détail appartement EN
- `src/components/ui/ImageGallery.astro` — Galerie photos manuelle
- `src/components/sections/ApartmentDetailSection.astro` — Section détaillée d'une configuration

**Fichiers à modifier :**
- `src/data/apartments.ts` — Étendre le modèle de données avec équipements complets
- `src/i18n/fr.json` — Ajouter section `apartment` + nouvelles clés `amenityNames`
- `src/i18n/en.json` — Idem en anglais

**Fichiers existants réutilisés sans modification :**
- `src/layouts/BaseLayout.astro` — Layout principal
- `src/components/ui/AirbnbCta.astro` — CTA Airbnb
- `src/components/sections/FinalCta.astro` — CTA final

**Alignement avec la structure projet définie dans l'architecture :**
- `src/pages/fr/appartement.astro` → conforme au tree architecture
- `src/pages/en/apartment.astro` → conforme au tree architecture
- `src/components/ui/ImageGallery.astro` → conforme au tree architecture (déjà prévu)
- `src/components/sections/ApartmentDetailSection.astro` → extension logique des `sections/`
- Aucun conflit ou variance détecté

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.1] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, zero JS client, Tailwind, Image Astro
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — Arbre projet avec `src/pages/fr/appartement.astro`, `src/components/ui/ImageGallery.astro`
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — Conventions de nommage, anti-patterns, enforcement guidelines
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb via composant, Images via `<Image>` Astro, données dans `src/data/`
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Effortless Interactions] — Galerie photos manuelle, zéro carrousel auto-play, CTA sticky mobile
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Transferable UX Patterns] — 3 cartes côte à côte, comparateur simplifié, alternance blanc/crème
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Target Users] — Kofi (bureau, WiFi), Les Mensah (lit bébé, sécurité), La Bande à Sena (prix par personne)
- [Source: _bmad-output/implementation-artifacts/1-5-deploiement-vercel-configuration-production.md] — Stack technique exacte, Tailwind v4 alert, build patterns
- [Source: src/data/apartments.ts] — Modèle de données actuel (3 configs, prix, URLs Airbnb, amenityKeys)
- [Source: src/components/ui/AirbnbCta.astro] — Composant CTA existant avec configId mapping et GA4 tracking
- [Source: src/components/sections/ApartmentCard.astro] — Pattern de carte résumée (ne pas réutiliser pour le détail)
- [Source: src/components/sections/ApartmentGrid.astro] — Pattern imagesBySlug pour mapping images → configs
- [Source: src/i18n/utils.ts] — Fonctions t(), getLocale(), getLocalizedUrl()
- [Source: src/styles/global.css] — Tokens Tailwind v4 @theme

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun bug rencontré.

### Completion Notes List

- Étendu `ApartmentConfig` avec `pricePerPerson`, `fullAmenityKeys`, `descriptionKey`, `galleryImageSlugs`
- Ajouté `getFullAmenities()` helper dans apartments.ts
- Créé `ImageGallery.astro` avec navigation manuelle (CSS show/hide + data attributes), support 1 ou N images, accessibilité (role=tab, aria-selected, aria-label)
- Créé `ApartmentDetailSection.astro` — layout 2 colonnes desktop, empilé mobile, équipements en grille 2 colonnes, CTA Airbnb via composant existant
- Ajouté 6 nouvelles clés amenityNames (ironBoard, towelsLinens, hotWater, smartLock, parking, quietArea) en FR et EN
- Ajouté section i18n `apartment` complète (pageTitle, pageDescription, sectionTitle, sectionSubtitle, priceRange, pricePerPersonLabel, amenitiesTitle, galleryLabel, descriptions configs, finalCta) en FR et EN
- Créé pages `/fr/appartement/` et `/en/apartment/` avec BaseLayout, hero compact, 3 sections alternées blanc/crème, FinalCta
- Build: 5 pages générées sans erreur (3 existantes + 2 nouvelles)
- Aucune régression sur les pages existantes

### Change Log

- 2026-03-14: Implémentation complète Story 2.1 — Page Appartement avec 3 configurations détaillées
- 2026-03-14: Code review — 9 issues corrigés (C1/C2/H1: ajout équipements clés par config, H2: clés i18n manquantes, M1: aria-labels localisés, M2: focus-visible galerie, M3: namespace capacityLabel, M4: guard imagesBySlug, M5: File List mise à jour)

### File List

**Créés :**
- src/components/ui/ImageGallery.astro
- src/components/sections/ApartmentDetailSection.astro
- src/pages/fr/appartement.astro
- src/pages/en/apartment.astro

**Modifiés :**
- src/data/apartments.ts
- src/i18n/fr.json
- src/i18n/en.json
