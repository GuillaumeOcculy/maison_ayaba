# Story 1.4 : Page d'Accueil FR & EN

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want voir la page d'accueil avec une accroche percutante, un aperçu des 3 configurations et des CTA Airbnb,
So that je comprends l'offre en moins de 30 secondes et je peux réserver.

## Acceptance Criteria

1. **Given** le visiteur accède à `/fr/` ou `/en/` **When** la page se charge **Then** il voit un hero plein-cadre avec overlay sombre et le texte "Tout le confort que vous attendez. À Cotonou." (ou "All the comfort you expect. In Cotonou." en EN) **And** le hero est suivi d'une barre de confiance (TrustBar), puis des 3 cartes de configuration côte à côte

2. **Given** le visiteur regarde les 3 cartes de configuration **When** elles se chargent **Then** chaque carte affiche : nom de la config, photo, capacité, prix par nuit, équipements clés (avec checks verts `ayaba-success`) et un CTA Airbnb outline dédié **And** les cartes sont responsives : 3 colonnes sur desktop (≥1024px), 2 colonnes sur tablette (768-1023px), 1 colonne empilée sur mobile (<768px, max 420px centrée) **And** les prix et données proviennent de `src/data/apartments.ts`

3. **Given** le visiteur veut réserver **When** il clique sur un CTA Airbnb depuis la page d'accueil **Then** il est redirigé vers l'annonce Airbnb correspondante dans un nouvel onglet

4. **Given** le visiteur est sur la page d'accueil **When** il compte les clics vers un CTA Airbnb **Then** il peut y accéder en maximum 1-2 clics (CTA visible après scroll ou directement dans le hero)

5. **Given** les sections de la page d'accueil **When** on vérifie le rythme visuel **Then** les sections alternent fond blanc et fond crème (`ayaba-cream`) **And** les titres utilisent Playfair Display (`font-heading`), le corps utilise Inter (`font-body`) **And** l'espacement entre sections est généreux (padding 80px vertical desktop, adapté mobile)

6. **Given** la page d'accueil complète **When** on vérifie la structure des sections **Then** l'ordre est : HeroSection → TrustBar → ApartmentGrid → KwaboSection → QuartierTeaser → HostSection → FinalCta

7. **Given** le visiteur navigue au clavier **When** il utilise Tab **Then** chaque élément interactif a un indicateur de focus visible (`focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra`) **And** l'ordre de tabulation est logique

8. **Given** les images utilisées dans les sections **When** on inspecte le code **Then** toutes les images utilisent `<Image>` d'Astro (`astro:assets`) avec alt descriptif **And** les images sont servies en WebP/AVIF avec lazy loading hors viewport (le hero peut utiliser `loading="eager"`)

## Tasks / Subtasks

- [x] Task 1 — Créer les composants de section (AC: #1, #2, #5, #6, #8)
  - [x] 1.1 Créer `src/components/sections/HeroSection.astro`
  - [x] 1.2 Créer `src/components/sections/TrustBar.astro`
  - [x] 1.3 Créer `src/components/sections/ApartmentCard.astro`
  - [x] 1.4 Créer `src/components/sections/ApartmentGrid.astro`
  - [x] 1.5 Créer `src/components/sections/KwaboSection.astro`
  - [x] 1.6 Créer `src/components/sections/QuartierTeaser.astro`
  - [x] 1.7 Créer `src/components/sections/HostSection.astro`
  - [x] 1.8 Créer `src/components/sections/FinalCta.astro`

- [x] Task 2 — Ajouter les clés i18n pour la page d'accueil (AC: #1, #2, #5)
  - [x] 2.1 Ajouter dans `fr.json` et `en.json` toutes les clés nécessaires pour le hero, TrustBar, Kwabo, QuartierTeaser, HostSection, FinalCta (voir section Dev Notes pour la liste complète)

- [x] Task 3 — Ajouter les images placeholder (AC: #8)
  - [x] 3.1 Ajouter une image hero dans `src/assets/images/hero/` (format recommandé : 1920×1080 ou similaire, WebP/JPG)
  - [x] 3.2 Ajouter 3 images d'appartement dans `src/assets/images/apartments/` (une par configuration)
  - [x] 3.3 Ajouter une image quartier dans `src/assets/images/neighborhood/`
  - [x] 3.4 **Note :** Si les vraies photos ne sont pas encore disponibles, utiliser des images placeholder de dimensions correctes. Astro les optimisera automatiquement via `astro:assets`

- [x] Task 4 — Implémenter la page FR `/fr/index.astro` (AC: #1-8)
  - [x] 4.1 Remplacer le contenu placeholder de `src/pages/fr/index.astro`
  - [x] 4.2 Importer et intégrer les 7 composants de section dans l'ordre : HeroSection → TrustBar → ApartmentGrid → KwaboSection → QuartierTeaser → HostSection → FinalCta
  - [x] 4.3 Passer les données localisées (FR) à chaque composant via props
  - [x] 4.4 Vérifier que toutes les données viennent de `apartments.ts` et des clés i18n (aucune valeur en dur)

- [x] Task 5 — Implémenter la page EN `/en/index.astro` (AC: #1-8)
  - [x] 5.1 Remplacer le contenu placeholder de `src/pages/en/index.astro`
  - [x] 5.2 Même structure que la page FR mais avec `locale="en"` et données anglaises
  - [x] 5.3 Vérifier la parité FR/EN complète

- [x] Task 6 — Validation et tests (AC: #1-8)
  - [x] 6.1 `npm run build` sans erreur
  - [x] 6.2 Vérifier le rendu responsive : mobile (<768px), tablette (768-1024px), desktop (>1024px)
  - [x] 6.3 Vérifier l'alternance des fonds blanc/crème entre sections
  - [x] 6.4 Vérifier que les CTAs Airbnb ouvrent dans un nouvel onglet avec `target="_blank"` et `rel="noopener noreferrer"`
  - [x] 6.5 Vérifier la navigation clavier et le focus visible sur tous les éléments interactifs
  - [x] 6.6 Vérifier que les images ont des alt descriptifs
  - [x] 6.7 Vérifier la cohérence FR/EN (mêmes sections, même structure)

## Dev Notes

### ALERTE CRITIQUE — Tailwind v4 (pas v3)

Le projet utilise **Tailwind CSS v4** avec `@tailwindcss/vite` (v4.2.1). Les tokens sont définis dans `src/styles/global.css` via `@theme { }`, PAS dans un fichier `tailwind.config.mjs`.

**Classes Tailwind disponibles :**
- Couleurs : `text-ayaba-terra`, `bg-ayaba-terra`, `bg-ayaba-dark`, `text-ayaba-cream`, `bg-ayaba-cream`, `text-ayaba-muted`, `text-ayaba-success`, `bg-ayaba-gold`, `border-ayaba-terra`, `text-ayaba-gold`
- Fonts : `font-heading` (Playfair Display), `font-body` (Inter)

### Stack technique exacte

- Astro 6.0.4
- Tailwind CSS 4.2.1 (via `@tailwindcss/vite`)
- TypeScript strict
- Node ≥ 22.12.0
- Composants `.astro` uniquement — ZERO framework JS client

### Composants de section — Spécifications détaillées

#### HeroSection.astro

**Fichier :** `src/components/sections/HeroSection.astro`

**Props :**
- `image: ImageMetadata` — image hero (via `import` depuis `astro:assets`)
- `imageAlt: string`
- `label: string` — ex: "MAISON AYABA — FIDJROSSÈ, COTONOU"
- `title: string` — "Tout le confort que vous attendez. À Cotonou."
- `subtitle: string`
- `stats: Array<{value: string, label: string}>` — ex: [{value: "60€", label: "PAR NUIT"}, {value: "3", label: "CONFIGS"}, {value: "6", label: "VOYAGEURS"}, {value: "10 min", label: "PLAGE"}]
- `primaryCta: {text: string, href: string}` — ex: {text: "Réserver", href: "/fr/reserver/"}
- `secondaryCta: {text: string, href: string}` — ex: {text: "Découvrir ↓", href: "#configurations"}

**Layout :**
- Image via `<Image>` d'Astro, couvre la section en `object-cover`, `loading="eager"` (above the fold)
- Overlay gradient CSS au-dessus de l'image :
  ```css
  background: linear-gradient(180deg,
    rgba(44,24,16,0.05) 0%,
    rgba(44,24,16,0.55) 50%,
    rgba(44,24,16,0.88) 100%
  );
  ```
- Contenu aligné en bas à gauche de la section
- **Desktop :** 90vh hauteur, h1 48px, stats sur une ligne (flex, gap 32px)
- **Mobile :** 75vh hauteur, h1 28px, stats sur grille 2×2, padding 24px

**Stats :**
- Valeur : `text-ayaba-gold`, `font-heading`, 24px, font-weight 700
- Label : `rgba(255,255,255,0.6)`, 11px, uppercase, letter-spacing 1.5px

**CTAs :**
- CTA primaire : `bg-ayaba-terra text-white hover:bg-ayaba-terra/90 rounded-md px-6 py-3 font-body font-semibold`
- CTA secondaire : `border border-white/30 text-white hover:bg-white/10 rounded-md px-6 py-3 font-body`

**Accessibilité :**
- Image via `<Image>` avec alt descriptif (PAS en background CSS — pour SEO)
- Overlay en `<div aria-hidden="true">`
- Stats avec sémantique `<dl><dt><dd>` pour les lecteurs d'écran

#### TrustBar.astro

**Fichier :** `src/components/sections/TrustBar.astro`

**Props :**
- `items: Array<{icon: string, title: string, description: string}>`

**Layout :**
- Fond `ayaba-cream`, padding 40px vertical, grille 4 colonnes desktop / 2×2 mobile
- Icône : 28px, emoji ou SVG inline
- Titre : Inter 14px semi-bold, `ayaba-dark`
- Description : Inter 13px, `ayaba-muted`

**Items de confiance (4) :**
- FR : "🔌 Onduleur automatique / Zéro coupure pour vous", "❄️ Clim dans chaque chambre / Confort garanti", "📶 WiFi haut débit / Travail et streaming", "🏖️ 10 min de la plage / Fidjrossè, quartier résidentiel"
- EN : "🔌 Automatic inverter / Zero blackouts for you", "❄️ AC in every room / Comfort guaranteed", "📶 High-speed WiFi / Work and streaming", "🏖️ 10 min from beach / Fidjrossè, residential area"

#### ApartmentCard.astro

**Fichier :** `src/components/sections/ApartmentCard.astro`

**Props :**
- `image: ImageMetadata`
- `imageAlt: string`
- `name: string` — "1 Chambre", "2 Chambres", "3 Chambres"
- `subtitle: string` — "Solo ou couple · Bureau inclus"
- `price: string` — "60€", "80€", "100€"
- `priceUnit: string` — "/nuit"
- `priceNote?: string` — "Idéal voyageur d'affaires"
- `features: string[]` — liste des features clés
- `configId: '1ch' | '2ch' | '3ch'`
- `locale: 'fr' | 'en'`

**Layout :**
- Fond blanc, `border border-[#ede6dd] rounded-2xl overflow-hidden`
- Hover : `hover:shadow-[0_8px_32px_rgba(44,24,16,0.1)] transition-shadow duration-300`
- Image : hauteur 240px, `object-cover`, hover `scale-[1.03]` (transition 400ms)
- Padding contenu 28px
- H3 nom : `font-heading text-[22px]`
- Sous-titre : `text-ayaba-muted text-sm`
- Prix : `text-ayaba-terra text-[28px] font-bold` + unité `text-ayaba-muted text-sm`
- Features : liste avec check "✓" en `text-ayaba-success font-bold` + texte `text-ayaba-dark text-sm`
- CTA : utiliser `<AirbnbCta configId={configId} variant="outline" locale={locale} />`

#### ApartmentGrid.astro

**Fichier :** `src/components/sections/ApartmentGrid.astro`

**Props :**
- `locale: 'fr' | 'en'`

**Layout :**
- Fond blanc, padding 80px vertical, max-width 1200px centré
- **Desktop (≥1024px) :** 3 colonnes, gap 28px
- **Tablette (768-1023px) :** 2 colonnes
- **Mobile (<768px) :** 1 colonne, max-width 420px centré
- Titre de section au-dessus : "Choisissez votre configuration" / "Choose your configuration" — `font-heading text-ayaba-dark text-center`
- id="configurations" pour le lien ancre depuis le hero "Découvrir ↓"

**Données :** Importer `apartments` et `getAmenities` depuis `src/data/apartments.ts`. Mapper chaque config vers un `<ApartmentCard>`.

#### KwaboSection.astro

**Fichier :** `src/components/sections/KwaboSection.astro`

**Props :**
- `title: string` — "Posez vos valises, on s'occupe du reste"
- `subtitle: string`
- `items: Array<{icon: string, title: string, description: string}>`

**Layout :**
- Fond `ayaba-cream`, padding 80px vertical
- Ligne dorée décorative en haut : `w-[60px] h-[2px] bg-ayaba-gold mx-auto mb-6`
- Label "LE PROTOCOLE KWABO" : `text-ayaba-gold text-xs uppercase tracking-[1.5px] font-semibold`
- H2 : `font-heading text-ayaba-dark text-[32px]` desktop / 24px mobile
- Sous-texte : `text-ayaba-muted text-base`
- 3 items en grille (3 colonnes desktop / 1 colonne mobile, gap 28px)
  - Icône dans cercle blanc 56px avec shadow subtile
  - H4 titre, P description

**Items Kwabo (3) :**
- FR : "Message personnalisé avant l'arrivée / On prépare votre séjour en amont", "Clim pré-allumée et appartement prêt / Vous arrivez dans un espace frais et accueillant", "Panier de bienvenue local / Fruits frais, café, et un mot manuscrit 'Kwabo'"
- EN : "Personal message before arrival / We prepare your stay in advance", "AC pre-set and apartment ready / You arrive in a cool, welcoming space", "Local welcome basket / Fresh fruits, coffee, and a handwritten 'Kwabo' note"

#### QuartierTeaser.astro

**Fichier :** `src/components/sections/QuartierTeaser.astro`

**Props :**
- `image: ImageMetadata`, `imageAlt: string`
- `label: string` — "LE QUARTIER"
- `title: string` — "Fidjrossè — le calme à 10 minutes de tout"
- `description: string`
- `ctaText: string` — "Découvrir le quartier"
- `ctaHref: string` — "/fr/fidjrosse-cotonou/"

**Layout :**
- Fond blanc, CSS Grid 2 colonnes égales, min-height 480px
- Image côté gauche, `object-cover`
- Texte côté droit, padding 60px
- **Mobile :** 1 colonne empilée (image min-height 280px, texte padding 40px 24px)
- CTA outline : `border-2 border-ayaba-terra text-ayaba-terra hover:bg-ayaba-terra hover:text-white rounded-md px-4 py-2 transition-colors`

#### HostSection.astro

**Fichier :** `src/components/sections/HostSection.astro`

**Layout :**
- Fond `ayaba-dark`, pleine largeur
- Contenu centré, max-width 600px, padding 80px
- Label : `text-ayaba-gold text-xs uppercase tracking-[1.5px]` — "VOTRE HÔTE"
- H2 : `text-ayaba-cream font-heading text-[28px]` — "Un hôte qui a pensé à tout"
- Description : `text-[#a09080] text-base`
- CTA outline clair : `border border-white/30 text-ayaba-cream hover:bg-white/10 rounded-md px-4 py-2`
- Lien vers `/fr/votre-hote/` ou `/en/your-host/`

#### FinalCta.astro

**Fichier :** `src/components/sections/FinalCta.astro`

**Layout :**
- Fond `ayaba-cream`, texte centré, padding 80px
- H2 : `font-heading text-ayaba-dark text-[32px]` — "Prêt pour Cotonou ?" / "Ready for Cotonou?"
- Sous-texte : `text-ayaba-muted text-base`
- CTA primaire : `bg-ayaba-terra text-white hover:bg-ayaba-terra/90 rounded-md px-10 py-4 font-body font-semibold text-base`
- Lien vers `/fr/reserver/` ou `/en/book/`

### Clés i18n à ajouter

Les clés suivantes doivent être ajoutées dans `fr.json` et `en.json` :

```json
{
  "home": {
    "heroLabel": "MAISON AYABA — FIDJROSSÈ, COTONOU",
    "heroTitle": "Tout le confort que vous attendez. À Cotonou.",
    "heroSubtitle": "Appartement meublé haut de gamme à Fidjrossè — WiFi, onduleur, climatisation. De 60€ la nuit.",
    "heroPrimaryCta": "Réserver",
    "heroSecondaryCta": "Découvrir ↓",
    "statPriceValue": "60€",
    "statPriceLabel": "PAR NUIT",
    "statConfigsValue": "3",
    "statConfigsLabel": "CONFIGS",
    "statGuestsValue": "6",
    "statGuestsLabel": "VOYAGEURS",
    "statBeachValue": "10 min",
    "statBeachLabel": "PLAGE",
    "trustInverterTitle": "Onduleur automatique",
    "trustInverterDesc": "Zéro coupure pour vous",
    "trustAcTitle": "Clim dans chaque chambre",
    "trustAcDesc": "Confort garanti",
    "trustWifiTitle": "WiFi haut débit",
    "trustWifiDesc": "Travail et streaming",
    "trustBeachTitle": "10 min de la plage",
    "trustBeachDesc": "Fidjrossè, quartier résidentiel",
    "configurationsTitle": "Choisissez votre configuration",
    "configurationsSubtitle": "3 formules adaptées à votre séjour — du solo au groupe de 6",
    "config1chSubtitle": "Solo ou couple · Bureau inclus",
    "config2chSubtitle": "Couple ou famille · Espace salon",
    "config3chSubtitle": "Famille ou amis · Jusqu'à 6 voyageurs",
    "config1chNote": "Idéal voyageur d'affaires",
    "config2chNote": "Le plus populaire",
    "config3chNote": "Meilleur rapport qualité/prix",
    "kwaboLabel": "LE PROTOCOLE KWABO",
    "kwaboTitle": "Posez vos valises, on s'occupe du reste",
    "kwaboSubtitle": "Chaque séjour commence par des attentions qui font la différence",
    "kwaboItem1Title": "Message personnalisé",
    "kwaboItem1Desc": "On prépare votre séjour en amont — transfert, recommandations, questions pratiques",
    "kwaboItem2Title": "Appartement prêt",
    "kwaboItem2Desc": "Clim pré-allumée, draps frais, WiFi configuré — vous arrivez chez vous",
    "kwaboItem3Title": "Panier de bienvenue",
    "kwaboItem3Desc": "Fruits frais locaux, café, et un mot manuscrit « Kwabo »",
    "quartierLabel": "LE QUARTIER",
    "quartierTitle": "Fidjrossè — le calme à 10 minutes de tout",
    "quartierDesc": "Quartier résidentiel prisé des expatriés, entre plage, restaurants et commodités. L'emplacement idéal pour vivre Cotonou sereinement.",
    "quartierCta": "Découvrir le quartier",
    "hostLabel": "VOTRE HÔTE",
    "hostTitle": "Un hôte qui a pensé à tout",
    "hostDesc": "Derrière Maison Ayaba, un hôte passionné qui connaît Cotonou et anticipe chacun de vos besoins. Découvrez sa philosophie d'accueil.",
    "hostCta": "Faire connaissance",
    "finalCtaTitle": "Prêt pour Cotonou ?",
    "finalCtaSubtitle": "Réservez votre appartement et commencez à préparer votre séjour",
    "finalCtaCta": "Réserver"
  }
}
```

**EN équivalent :**
```json
{
  "home": {
    "heroLabel": "MAISON AYABA — FIDJROSSÈ, COTONOU",
    "heroTitle": "All the comfort you expect. In Cotonou.",
    "heroSubtitle": "Premium furnished apartment in Fidjrossè — WiFi, inverter, AC. From €60/night.",
    "heroPrimaryCta": "Book",
    "heroSecondaryCta": "Discover ↓",
    "statPriceValue": "€60",
    "statPriceLabel": "PER NIGHT",
    "statConfigsValue": "3",
    "statConfigsLabel": "CONFIGS",
    "statGuestsValue": "6",
    "statGuestsLabel": "GUESTS",
    "statBeachValue": "10 min",
    "statBeachLabel": "BEACH",
    "trustInverterTitle": "Automatic inverter",
    "trustInverterDesc": "Zero blackouts for you",
    "trustAcTitle": "AC in every room",
    "trustAcDesc": "Comfort guaranteed",
    "trustWifiTitle": "High-speed WiFi",
    "trustWifiDesc": "Work and streaming",
    "trustBeachTitle": "10 min from beach",
    "trustBeachDesc": "Fidjrossè, residential area",
    "configurationsTitle": "Choose your configuration",
    "configurationsSubtitle": "3 options tailored to your stay — from solo to a group of 6",
    "config1chSubtitle": "Solo or couple · Office included",
    "config2chSubtitle": "Couple or family · Living room",
    "config3chSubtitle": "Family or friends · Up to 6 guests",
    "config1chNote": "Ideal for business travelers",
    "config2chNote": "Most popular",
    "config3chNote": "Best value for money",
    "kwaboLabel": "THE KWABO PROTOCOL",
    "kwaboTitle": "Drop your bags, we'll handle the rest",
    "kwaboSubtitle": "Every stay begins with the little touches that make the difference",
    "kwaboItem1Title": "Personal message",
    "kwaboItem1Desc": "We prepare your stay in advance — transfer, recommendations, practical questions",
    "kwaboItem2Title": "Apartment ready",
    "kwaboItem2Desc": "AC pre-set, fresh linens, WiFi configured — you arrive home",
    "kwaboItem3Title": "Welcome basket",
    "kwaboItem3Desc": "Fresh local fruits, coffee, and a handwritten 'Kwabo' note",
    "quartierLabel": "THE NEIGHBORHOOD",
    "quartierTitle": "Fidjrossè — calm, 10 minutes from everything",
    "quartierDesc": "A residential area popular with expats, between beach, restaurants and amenities. The ideal location to experience Cotonou peacefully.",
    "quartierCta": "Discover the neighborhood",
    "hostLabel": "YOUR HOST",
    "hostTitle": "A host who's thought of everything",
    "hostDesc": "Behind Maison Ayaba, a passionate host who knows Cotonou and anticipates your every need. Discover their hosting philosophy.",
    "hostCta": "Meet your host",
    "finalCtaTitle": "Ready for Cotonou?",
    "finalCtaSubtitle": "Book your apartment and start planning your stay",
    "finalCtaCta": "Book"
  }
}
```

### Images — Gestion des assets

**ATTENTION :** Le dossier `src/assets/images/` existe mais est VIDE (que des `.gitkeep`). Il faut :
1. **Soit** ajouter les vraies photos avant d'implémenter (recommandé)
2. **Soit** créer des images placeholder temporaires (ex: via un outil comme `sharp` ou des fichiers de couleur unie)
3. **Soit** utiliser des URLs d'images placeholder en dur temporairement (⚠️ anti-pattern mais pragmatique pour un premier rendu)

**Option recommandée :** Utiliser des `<div>` avec fond coloré comme placeholder quand l'image n'est pas disponible, avec un commentaire `<!-- TODO: remplacer par Image d'Astro quand les photos seront prêtes -->`. Prévoir le composant avec la prop `image` optionnelle pour une transition facile.

**Quand les images seront ajoutées :**
```typescript
import heroImage from '../../assets/images/hero/salon-maison-ayaba.jpg';
// Puis dans le composant :
<Image src={heroImage} alt="Salon de Maison Ayaba à Fidjrossè" loading="eager" />
```

### Patterns architecturaux stricts (rappel)

- **Composants `.astro` uniquement** — zero framework JS client
- **Données centralisées dans `src/data/`** — les URLs Airbnb viennent de `apartments.ts`
- **Traductions UI dans `src/i18n/{locale}.json`** — tout texte visible doit utiliser `t(locale, 'key')`
- **Props Astro (pas de state client)** — la locale est passée comme prop du serveur
- **Images via `astro:assets` `<Image>`** — jamais de `<img>` brut
- **Aucune URL Airbnb en dur** — toujours via `apartments.ts` et le composant `<AirbnbCta>`

### Couleurs — Rappel des règles d'usage par section

| Section | Fond | Couleur principale |
|---------|------|--------------------|
| HeroSection | Image + overlay sombre | Texte blanc, stats `ayaba-gold` |
| TrustBar | `ayaba-cream` | `ayaba-dark` titres, `ayaba-muted` descriptions |
| ApartmentGrid | `white` | `ayaba-terra` prix, `ayaba-dark` texte, `ayaba-success` checks |
| KwaboSection | `ayaba-cream` | `ayaba-gold` accents, `ayaba-dark` texte |
| QuartierTeaser | `white` | `ayaba-dark` texte, `ayaba-terra` CTA |
| HostSection | `ayaba-dark` | `ayaba-gold` label, `ayaba-cream` texte, `#a09080` description |
| FinalCta | `ayaba-cream` | `ayaba-dark` texte, `ayaba-terra` CTA |

### Accessibilité — Checklist page d'accueil

- [ ] Image hero : `<Image>` avec alt descriptif, `loading="eager"`
- [ ] Stats hero : `<dl><dt><dd>` sémantique
- [ ] Overlay hero : `aria-hidden="true"`
- [ ] Features cards : `<ul>` sémantique
- [ ] CTAs : focus visible (`focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra`)
- [ ] Liens externes (Airbnb) : `rel="noopener noreferrer"` + `target="_blank"`
- [ ] HTML sémantique : `<section>`, `<h1>` (unique — dans le hero), `<h2>` pour chaque section, `<h3>` pour les cartes
- [ ] Contraste 4.5:1 minimum pour tout texte
- [ ] Cibles tactiles minimum 44x44px sur mobile

### Intelligence Story 1.3 — Leçons apprises

De la story précédente :
1. **Tailwind v4 vs v3** : Continuer avec `@tailwindcss/vite` + `@theme` dans CSS. Pas de `tailwind.config.mjs`
2. **AirbnbCta.astro** : Composant existant avec props `configId`, `variant`, `size`, `label`, `locale`. Utiliser `variant="outline"` dans les cartes d'appartement
3. **StickyMobileCta** : Déjà intégré dans BaseLayout — sera visible sur la page d'accueil automatiquement
4. **Footer padding mobile** : Déjà ajusté (pb-[88px]) — pas besoin de le modifier
5. **i18n t()** : Supporte l'interpolation de paramètres `t(locale, 'key', { param: value })`
6. **Mapping configId** : `'1ch' → index 0`, `'2ch' → index 1`, `'3ch' → index 2`
7. **Label CTA** : Toujours "Réserver" / "Book" — jamais "Réserver sur Airbnb"

### Intelligence Git — Commits récents

```
d34ac8a feat: Story 1.3 — composants AirbnbCta et StickyMobileCta
1a6a9fc feat: Story 1.2 — BaseLayout, Header, Footer, navigation bilingue
9517056 feat: Story 1.1 — initialisation Astro 6, Tailwind v4, i18n bilingue
```

**Pattern de commit :** `feat: Story X.Y — description courte`

### Dépendances amont (Stories 1.1 + 1.2 + 1.3 — DONE)

Fichiers existants utilisés par cette story :
- `src/data/apartments.ts` — 3 configs avec `airbnbUrl`, `pricePerNight`, `name`, `keyAmenityKeys` ✅
- `src/data/navigation.ts` — structure du menu ✅
- `src/data/siteConfig.ts` — config site ✅
- `src/i18n/utils.ts` — `t()`, `Locale`, `getLocale()`, `getLocalizedUrl()` ✅
- `src/i18n/fr.json` / `en.json` — clés existantes ✅
- `src/layouts/BaseLayout.astro` — layout avec Header, Footer, StickyMobileCta ✅
- `src/components/ui/AirbnbCta.astro` — CTA Airbnb avec tracking GA4 ✅
- `src/components/ui/StickyMobileCta.astro` — sticky mobile (dans BaseLayout) ✅
- `src/styles/global.css` — tokens Tailwind v4 (couleurs, fonts) ✅

### Dépendances aval (Stories 2.x, 3.x)

Composants créés dans cette story et réutilisables :
- `HeroSection.astro` → réutilisable comme pattern hero sur d'autres pages
- `ApartmentCard.astro` → utilisé dans Story 2.1 (page Appartement détaillée) et Story 2.4 (page Réserver)
- `ApartmentGrid.astro` → utilisé dans Story 2.4 (page Réserver — récapitulatif)
- `TrustBar.astro` → potentiellement réutilisable sur d'autres pages
- `FinalCta.astro` → réutilisable en bas de chaque page comme dernier CTA

### Project Structure Notes

- Tous les composants de section → `src/components/sections/` (conformité architecture.md)
- Pages → `src/pages/fr/index.astro` et `src/pages/en/index.astro` (existantes, à remplacer)
- Alignement complet avec la structure définie dans `architecture.md` sous `components/sections/`
- Pas de nouveau fichier de données — tout utilise l'existant (`apartments.ts`, `siteConfig.ts`)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules] — Conventions nommage, structure, anti-patterns
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure] — Arbre projet et composants attendus
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb, i18n, SEO, images rules strictes
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#HeroSection.astro] — Props, overlay gradient, stats, responsive breakpoints
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#TrustBar.astro] — 4 items, grille, responsive
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#ApartmentCard.astro] — Props, anatomy, features list, CTA outline, hover effects
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#ApartmentGrid.astro] — Grille 3 colonnes, responsive, données depuis apartments.ts
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#KwaboSection.astro] — Ligne dorée, label gold, 3 items, fond cream
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#QuartierTeaser.astro] — Split image/texte, grid 2 colonnes, CTA outline
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#HostSection.astro] — Fond dark, texte centré, CTA outline clair
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#FinalCta.astro] — Fond cream, CTA primaire centré
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Emotional Journey Mapping] — Soulagement, confiance, surprise (Kwabo)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Design Inspiration Strategy] — Structure hero → configs → Kwabo → quartier → CTA
- [Source: _bmad-output/planning-artifacts/prd.md#Phase 1 — MVP] — Page Accueil jour 1, hero + 3 configs + CTA
- [Source: _bmad-output/implementation-artifacts/1-3-composant-airbnbcta.md] — Leçons Tailwind v4, AirbnbCta props, StickyMobileCta patterns
- [Source: src/data/apartments.ts] — 3 configs avec airbnbUrl, pricePerNight, keyAmenityKeys, capacity
- [Source: src/i18n/fr.json] — Clés existantes nav.*, buttons.*, cta.*, labels.*, amenityNames.*
- [Source: src/styles/global.css] — Tokens @theme Tailwind v4

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun probleme rencontre.

### Completion Notes List

- 8 composants de section crees dans `src/components/sections/` conformement aux specs UX
- Tous les composants supportent `image?: ImageMetadata` optionnel avec placeholder `<div>` quand pas d'image
- 50+ cles i18n ajoutees dans fr.json et en.json (section `home.*`)
- Pages FR et EN implementees avec parité complete (memes composants, memes props, locale differente)
- Structure des sections respectee : Hero -> TrustBar -> ApartmentGrid -> Kwabo -> Quartier -> Host -> FinalCta
- Alternance fonds blanc/creme/dark respectee
- Donnees ApartmentGrid proviennent de `apartments.ts` + `getAmenities()` — aucune valeur en dur
- CTAs Airbnb via composant `<AirbnbCta>` existant avec `variant="outline"`
- Accessibilite : `<dl>` stats, `aria-hidden` overlay, focus visible, `target="_blank" rel="noopener noreferrer"`, `min-h-[44px]` cibles tactiles
- Task 3 (images) : prop `image` optionnelle sur HeroSection, ApartmentCard, QuartierTeaser — transition facile quand photos reelles disponibles
- `npm run build` passe sans erreur (3 pages generees)

### Change Log

- 2026-03-14: Implementation complete Story 1.4 — page d'accueil FR & EN avec 8 composants de section, cles i18n, pages bilingues
- 2026-03-14: Code review — 7 issues corrigees (3 HIGH, 3 MEDIUM, 1 LOW) : i18n noms configs et prix, format prix localise, heading h4→h3 KwaboSection, aria-label TrustBar, capacite affichee sur ApartmentCard, placeholder localise

### File List

- src/components/sections/HeroSection.astro (new)
- src/components/sections/TrustBar.astro (new)
- src/components/sections/ApartmentCard.astro (new)
- src/components/sections/ApartmentGrid.astro (new)
- src/components/sections/KwaboSection.astro (new)
- src/components/sections/QuartierTeaser.astro (new)
- src/components/sections/HostSection.astro (new)
- src/components/sections/FinalCta.astro (new)
- src/i18n/fr.json (modified — added home.* keys)
- src/i18n/en.json (modified — added home.* keys)
- src/pages/fr/index.astro (modified — replaced placeholder with full homepage)
- src/pages/en/index.astro (modified — replaced placeholder with full homepage)
