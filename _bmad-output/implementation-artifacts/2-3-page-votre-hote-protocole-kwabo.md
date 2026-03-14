# Story 2.3 : Page Votre Hôte & Protocole Kwabo

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want découvrir qui est l'hôte et le Protocole Kwabo (accueil anticipatoire),
So that je me sens en confiance avec quelqu'un qui a pensé à tout.

## Acceptance Criteria

1. **Given** le visiteur accède à `/fr/votre-hote/` ou `/en/your-host/` **When** la page se charge **Then** il voit une photo réelle de l'hôte, son histoire personnelle et sa philosophie d'accueil **And** le ton est chaleureux et authentique — "un ami bien informé, pas un vendeur"

2. **Given** le visiteur découvre le Protocole Kwabo **When** il lit la section dédiée **Then** les micro-attentions sont décrites : message personnalisé avant l'arrivée, clim pré-allumée, panier de bienvenue local, mot manuscrit "Kwabo" **And** la section est visuellement distincte (accent `ayaba-gold`) pour marquer le changement de registre émotionnel **And** des photos des détails illustrent les attentions (panier, fruits locaux)

3. **Given** le visiteur est rassuré **When** il arrive en fin de page **Then** un CTA Airbnb est visible pour passer à la réservation **And** des liens mènent vers la page Appartement pour revoir les configurations

4. **Given** la page est bilingue **When** on compare les versions FR et EN **Then** le contenu est complet et traduit dans les deux langues **And** les URLs sont localisées (`/fr/votre-hote/`, `/en/your-host/`)

## Tasks / Subtasks

- [x] Task 1 — Créer les données de l'hôte dans `src/data/host.ts` (AC: #1, #2)
  - [x] 1.1 Créer le fichier `src/data/host.ts` avec les types `HostProfile` et `KwaboAttention`
  - [x] 1.2 Structurer les données : profil hôte (nom, rôle, philosophie — via clés i18n) + liste des micro-attentions Kwabo (icône, clé titre, clé description)
  - [x] 1.3 Les micro-attentions Kwabo : message personnalisé, clim pré-allumée, panier bienvenue local, mot manuscrit "Kwabo" — avec icônes emoji
  - [x] 1.4 Toutes les valeurs textuelles via clés i18n — pas de texte en dur

- [x] Task 2 — Ajouter les clés i18n pour la page Hôte (AC: #1, #2, #3, #4)
  - [x] 2.1 Ajouter dans `fr.json` et `en.json` une section `"host"` avec les clés : `pageTitle`, `pageDescription`, `heroTitle`, `heroSubtitle`, `introTitle`, `introStory` (histoire personnelle de l'hôte), `philosophyTitle`, `philosophyDesc`
  - [x] 2.2 Ajouter les clés Protocole Kwabo : `kwaboLabel`, `kwaboTitle`, `kwaboSubtitle`, puis pour chaque micro-attention : `kwaboMessageTitle`, `kwaboMessageDesc`, `kwaboClimTitle`, `kwaboClimDesc`, `kwaboPanierTitle`, `kwaboPanierDesc`, `kwaboMotTitle`, `kwaboMotDesc`
  - [x] 2.3 Ajouter les clés de fin de page : `viewApartment`, `finalCtaTitle`, `finalCtaSubtitle`, `finalCtaCta`

- [x] Task 3 — Créer les composants spécifiques pour la page Hôte (AC: #1, #2)
  - [x] 3.1 Créer `src/components/sections/HostIntroSection.astro` — section biographie de l'hôte avec photo à gauche et texte à droite (desktop), empilé (mobile). Props : `imageSrc?`, `imageAlt`, `name`, `role`, `story` (texte long), `locale`
  - [x] 3.2 La photo hôte doit utiliser `<Image>` d'Astro si image disponible, sinon fallback avec un div coloré `ayaba-cream` avec initiales de l'hôte en grand
  - [x] 3.3 Créer `src/components/sections/HostPhilosophySection.astro` — section philosophie d'accueil avec titre, description et liste de valeurs. Fond blanc, texte centré
  - [x] 3.4 Ne PAS recréer `KwaboSection.astro` — il existe déjà et sera réutilisé directement avec les props appropriées depuis les données de la page

- [x] Task 4 — Créer les pages `/fr/votre-hote/` et `/en/your-host/` (AC: #1, #2, #3, #4)
  - [x] 4.1 Créer `src/pages/fr/votre-hote.astro` et `src/pages/en/your-host.astro`
  - [x] 4.2 Utiliser `BaseLayout` (inclut Header + Footer + StickyMobileCta + WhatsAppButton automatiquement)
  - [x] 4.3 Structure de page :
    1. Hero compact (titre + sous-titre — même pattern que page Appartement et Fidjrossè)
    2. Section Intro Hôte — photo réelle + histoire personnelle (fond blanc, layout 2 colonnes desktop)
    3. Section Philosophie d'accueil — valeurs et approche (fond crème `ayaba-cream`)
    4. Section Protocole Kwabo — réutiliser `<KwaboSection>` existant avec les 4 micro-attentions (fond `ayaba-cream`, accent `ayaba-gold`)
    5. Lien interne vers la page Appartement — "Découvrir nos configurations"
    6. FinalCta — "Prêt à réserver ?" avec lien vers `/fr/reserver/` ou `/en/book/`
  - [x] 4.4 Meta tags via `BaseLayout` : title et description uniques et SEO-optimisés
  - [x] 4.5 Les données proviennent de `host.ts` + clés i18n — jamais de contenu en dur

- [ ] Task 6 — Follow-up Code Review : photos Kwabo (AC: #2)
  - [ ] 6.1 Ajouter photos des micro-attentions (panier bienvenue, fruits locaux) dans `src/assets/images/host/` quand disponibles
  - [ ] 6.2 Étendre KwaboSection ou créer une variante pour afficher des images par item

- [x] Task 5 — Validation responsive et accessibilité (AC: #1, #2, #3, #4)
  - [x] 5.1 Vérifier le rendu sur mobile (<768px) : sections empilées, photo au-dessus du texte
  - [x] 5.2 Vérifier le rendu desktop (>1024px) : layout 2 colonnes pour la section bio, sections bien espacées
  - [x] 5.3 Navigation clavier : focus visible sur tous les éléments interactifs
  - [x] 5.4 HTML sémantique : `<section>`, `<h2>`, `<h3>`, alt descriptif sur la photo hôte
  - [x] 5.5 Cibles tactiles minimum 44x44px sur mobile
  - [x] 5.6 `npm run build` sans erreur, vérifier le nombre de pages générées (+2)

## Dev Notes

### ALERTE CRITIQUE — Composants existants à réutiliser

| Composant | Chemin | Utilisation pour cette story |
|-----------|--------|------------------------------|
| `BaseLayout` | `src/layouts/BaseLayout.astro` | Layout principal — inclut Header + Footer + StickyMobileCta + WhatsAppButton |
| `KwaboSection` | `src/components/sections/KwaboSection.astro` | Section Protocole Kwabo — props: `label`, `title`, `subtitle`, `items: KwaboItem[]` (chaque item: `icon`, `title`, `description`). RÉUTILISER TEL QUEL, ne pas recréer ! |
| `FinalCta` | `src/components/sections/FinalCta.astro` | CTA final en bas de page — props: `title`, `subtitle`, `ctaText`, `ctaHref` |
| `HostSection` | `src/components/sections/HostSection.astro` | Section homepage (fond sombre) — NE PAS réutiliser pour la page dédiée. C'est un teaser compact pour la homepage, pas un layout complet. La page hôte a besoin de sections plus élaborées |

### ALERTE CRITIQUE — Patterns de code obligatoires

1. **Composants** : Fichiers `.astro` uniquement — zéro React, zéro Vue, zéro JS client
2. **Images** : Toujours `<Image>` d'Astro (import depuis `astro:assets`), jamais de `<img>` brut. Vérifier `src/assets/images/host/` pour des images existantes AVANT de créer des placeholders. Le dossier `host/` existe mais est vide — utiliser un fallback élégant (div coloré avec initiales ou silhouette stylisée)
3. **Données** : Centraliser dans `src/data/host.ts` — JAMAIS de valeurs en dur dans les pages
4. **i18n** : Utiliser `t(locale, 'clé')` de `src/i18n/utils.ts` pour tout texte UI
5. **CTA Airbnb** : Via `<FinalCta>` avec lien vers `/fr/reserver/` ou `/en/book/`
6. **Styling** : Tailwind CSS uniquement, tokens design : `ayaba-terra`, `ayaba-gold`, `ayaba-cream`, `ayaba-dark`, `ayaba-muted`, `ayaba-success`
7. **Accessibilité** : HTML sémantique, focus visible, cibles tactiles 44x44px, alt descriptif obligatoire sur photo hôte

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

**Le dossier `src/assets/images/host/` existe mais est VIDE.** Images existantes dans le projet :
- `src/assets/images/hero/salon.png` — hero salon (homepage)
- `src/assets/images/apartments/chambre{1,2,3}.png` — photos configs
- `src/assets/images/logo.png`

**Stratégie images :** La page Hôte est une page de confiance — la photo réelle de l'hôte est critique (UX spec: "page Hôte avec visage et histoire"). Comme le dossier `host/` est vide :
1. Créer un fallback élégant : div rond avec fond `ayaba-cream`, bordure `ayaba-gold`, et initiales ou icône silhouette stylisée
2. Coder le composant pour accepter une image optionnelle via `<Image>` — quand la photo sera ajoutée dans `src/assets/images/host/`, le composant l'affichera automatiquement
3. NE PAS utiliser de stock photo ou placeholder générique

### ALERTE — Contenu émotionnel requis

La page Hôte est le **pivot émotionnel** du site (UX spec). L'ordre émotionnel est crucial :
1. **D'abord la confiance** — L'histoire personnelle, le parcours, l'investissement dans la propriété. Ton factuel et chaleureux
2. **Puis la surprise** — Le Protocole Kwabo arrive APRÈS la confiance. "La surprise vient après la confiance" (UX principle #2)
3. **Le ton** — "Un ami bien informé, pas un vendeur." Factuel, chaleureux, jamais défensif. Histoire personnelle authentique

**Contenu indicatif pour les sections :**

**Intro Hôte :**
- Nom : (à compléter par Onizuka — utiliser une clé i18n)
- Histoire : parcours diaspora, découverte de Cotonou, décision d'investir dans l'hébergement de qualité
- Pourquoi Fidjrossè : quartier calme, proche plage, accès facile aéroport
- L'investissement : 20 000€+ en infrastructure (onduleur, smart lock, Ring, mobilier), bail 5 ans

**Philosophie d'accueil :**
- Chaque détail compte — de la qualité du matelas au débit WiFi
- Anticiper les besoins que le voyageur n'ose pas formuler
- Transparence totale — adresser les réalités de Cotonou honnêtement

**Protocole Kwabo (4 micro-attentions) :**
1. 📱 Message personnalisé avant l'arrivée — conseils transport aéroport, infos pratiques
2. ❄️ Clim pré-allumée — l'appartement est frais à l'arrivée, pas de chaleur d'accueil
3. 🧺 Panier de bienvenue local — fruits de saison, boissons fraîches, petit déjeuner du lendemain
4. ✍️ Mot manuscrit "Kwabo" — bienvenue en Fon, la langue locale

**Note :** Le contenu exact sera affiné par l'hôte (Onizuka). Utiliser des clés i18n pour tout le contenu textuel.

### Intelligence Story 2.2 — Leçons apprises

1. **Tailwind v4** : Tokens dans `src/styles/global.css` via `@theme { }` — ne JAMAIS créer de `tailwind.config.mjs`
2. **Pattern page détail** : Hero compact (pas plein-cadre), sections alternées blanc/crème, FinalCta en bas
3. **Build** : Vérifié avec `npm run build`, aucune erreur — vérifier que les 2 nouvelles pages sont générées
4. **Commit pattern** : `feat: Story X.Y — description courte`
5. **Pages FR/EN** : Même structure, seuls le locale et les clés i18n changent
6. **BaseLayout** : Inclut automatiquement Header, Footer, StickyMobileCta, WhatsAppButton — ne pas les ajouter manuellement
7. **FinalCta** : Réutiliser tel quel avec les props personnalisées
8. **Sections alternées** : `bg-white` / `bg-ayaba-cream` en alternance
9. **NeighborhoodSection** : Pattern `.map()` avec données filtrées + i18n — réutiliser le même pattern data-driven
10. **Code review Story 2.2** : Éviter les noms de commerces non vérifiés, utiliser `.map()` pour les sections répétitives, supprimer les clés i18n mortes

### Intelligence Git — Commits récents

```
2eac519 fix: trailingSlash, filtre sitemap et doc .env.example
12cca84 feat: Story 2.2 — page Fidjrossè & Cotonou avec guide quartier bilingue
06b0299 feat: Story 2.1 — page Appartement avec 3 configurations détaillées
5a33925 feat: corrections post-rétro Epic 1 — Option A, images, social, redirects
22333a8 feat: Story 1.4 — page d'accueil FR & EN avec 8 composants de section
```

### KwaboSection — Rappel interface existante

Le composant `KwaboSection.astro` accepte ces props :
```typescript
interface KwaboItem {
  icon: string;     // Emoji
  title: string;    // Texte traduit
  description: string; // Texte traduit
}

interface Props {
  label: string;    // Ex: "LE PROTOCOLE KWABO"
  title: string;    // Ex: "Posez vos valises, on s'occupe du reste"
  subtitle: string; // Sous-texte descriptif
  items: KwaboItem[];
}
```

Ce composant affiche : ligne dorée décorative → label gold uppercase → H2 titre → sous-texte → grille 3 colonnes d'items (icône dans cercle blanc + titre + description). Fond `ayaba-cream`. Pour la page hôte, l'utiliser avec 4 items (la grille passera à 1 colonne sur mobile, les items seront centrés).

### Project Structure Notes

**Fichiers à créer :**
- `src/data/host.ts` — Données structurées de l'hôte et du Protocole Kwabo
- `src/components/sections/HostIntroSection.astro` — Section biographie avec photo (2 colonnes desktop)
- `src/components/sections/HostPhilosophySection.astro` — Section philosophie d'accueil
- `src/pages/fr/votre-hote.astro` — Page Hôte FR
- `src/pages/en/your-host.astro` — Page Hôte EN

**Fichiers à modifier :**
- `src/i18n/fr.json` — Ajouter section `host`
- `src/i18n/en.json` — Idem en anglais

**Fichiers existants réutilisés sans modification :**
- `src/layouts/BaseLayout.astro` — Layout principal
- `src/components/sections/KwaboSection.astro` — Section Protocole Kwabo (réutiliser telle quelle)
- `src/components/sections/FinalCta.astro` — CTA final

**Alignement avec la structure projet (architecture.md) :**
- `src/pages/fr/votre-hote.astro` → conforme au tree architecture
- `src/pages/en/your-host.astro` → conforme au tree architecture
- `src/data/host.ts` → extension logique de `src/data/`
- `src/components/sections/HostIntroSection.astro` → extension logique de `sections/`
- Navigation déjà configurée : `/fr/votre-hote/` et `/en/your-host/` dans `navigation.ts`
- Aucun conflit ou variance détecté

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.3] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture] — Composants .astro uniquement, zero JS client, Tailwind, Image Astro
- [Source: _bmad-output/planning-artifacts/architecture.md#Structure Patterns] — Arbre projet avec `src/pages/fr/votre-hote.astro`
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns] — Conventions de nommage, anti-patterns, enforcement guidelines
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb via composant, données dans `src/data/`
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#HostSection.astro] — Fond sombre, label gold, texte crème, CTA outline (teaser homepage)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#KwaboSection.astro] — Ligne dorée, label gold, items en grille, moment émotionnel
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Emotional Design Principles] — "La surprise vient après la confiance" — Kwabo après l'intro hôte
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design Implications] — Page Hôte avec visage et histoire = confiance
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Parcours Mensah] — "Page Votre Hôte → Protocole Kwabo" comme dernier levier avant conversion
- [Source: _bmad-output/planning-artifacts/prd.md#FR5] — Page Votre Hôte avec présentation de l'hôte et du Protocole Kwabo
- [Source: _bmad-output/implementation-artifacts/2-2-page-fidjrosse-cotonou.md] — Patterns et leçons Story 2.2

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré durant l'implémentation.

### Completion Notes List

- Créé `src/data/host.ts` avec types `HostProfile`, `KwaboAttention`, `PhilosophyValue` et données structurées — profil hôte + 3 valeurs philosophie + 4 micro-attentions Kwabo, toutes via clés i18n
- Ajouté ~30 clés i18n dans `fr.json` et `en.json` section `host` : meta, hero, nom, rôle, histoire personnelle complète (parcours diaspora, investissement 20k€+, infrastructure), philosophie d'accueil (3 valeurs), 4 micro-attentions Kwabo détaillées, CTA final
- Créé `HostIntroSection.astro` — section biographie 2 colonnes (photo fallback rond avec initiales + texte), responsive (empilé mobile)
- Créé `HostPhilosophySection.astro` — section philosophie centrée avec grille 3 colonnes de valeurs (icône cercle blanc + titre + description)
- Réutilisé `KwaboSection.astro` existant avec 4 items au lieu de 3 (homepage) — fonctionne parfaitement
- Créé pages FR (`/fr/votre-hote/`) et EN (`/en/your-host/`) : hero compact, intro hôte, philosophie, Kwabo, lien appartement, FinalCta
- Build réussi : 9 pages (7 existantes + 2 nouvelles), 0 erreur
- HTML sémantique : `<section>`, `<h2>`, `<h3>`, `role="img"` avec `aria-label` sur le fallback photo, focus visible, cibles tactiles 44px
- Contenu émotionnel respecte l'ordre UX : confiance (intro + philosophie) → surprise (Kwabo)

### Change Log

- 2026-03-14 : Implémentation complète Story 2.3 — page Votre Hôte & Protocole Kwabo FR/EN avec données hôte, composants section, i18n bilingue
- 2026-03-14 : Code review — 5 corrections appliquées (H1: imageSrc? prop, M1: alternance bg, M2: grille Kwabo 4 items, M3: clé i18n morte supprimée). Follow-up H2: photos Kwabo à ajouter quand disponibles.

### File List

**Nouveaux fichiers :**
- `src/data/host.ts`
- `src/components/sections/HostIntroSection.astro`
- `src/components/sections/HostPhilosophySection.astro`
- `src/pages/fr/votre-hote.astro`
- `src/pages/en/your-host.astro`

**Fichiers modifiés :**
- `src/i18n/fr.json` — ajout section `host`, suppression clé morte `introTitle`
- `src/i18n/en.json` — idem
- `src/components/sections/KwaboSection.astro` — grille adaptative (2 cols pour 4 items, 3 cols pour 3)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` — story 2-3 → in-progress → review
- `_bmad-output/implementation-artifacts/2-3-page-votre-hote-protocole-kwabo.md` — tasks cochés, status review
