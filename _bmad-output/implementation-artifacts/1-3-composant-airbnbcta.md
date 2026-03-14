# Story 1.3 : Composant AirbnbCta

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visiteur,
I want voir des boutons "Réserver sur Airbnb" clairs et dédiés à chaque configuration,
So that je peux réserver l'appartement qui me convient en un clic.

## Acceptance Criteria

1. **Given** le composant `AirbnbCta.astro` est utilisé sur une page **When** le visiteur voit le bouton **Then** il affiche le texte "Réserver" (ou "Book" en EN) — jamais "Réserver sur Airbnb" **And** le bouton utilise le style primaire (fond `ayaba-terra`, texte blanc, hover `ayaba-terra/90`) **And** le lien pointe vers l'URL Airbnb de la configuration, tirée de `apartments.ts` **And** le lien a `target="_blank"` et `rel="noopener noreferrer"`

2. **Given** le visiteur est sur mobile (<768px) **When** il scrolle sur une page avec du contenu appartement **Then** un CTA sticky flottant (`StickyMobileCta.astro`) reste visible en bas de l'écran **And** le CTA affiche le prix "À partir de 60€/nuit" et un bouton "Réserver" **And** le CTA est facilement accessible au pouce (cible tactile minimum 44x44px)

3. **Given** le composant est intégré **When** on inspecte le code **Then** aucune URL Airbnb n'est codée en dur — toutes proviennent de `src/data/apartments.ts`

4. **Given** le composant `AirbnbCta` est cliqué **When** l'événement de clic se déclenche **Then** un événement GA4 `airbnb_click` est prêt à être déclenché avec le `configId` (le tracking GA4 sera activé dans la Story 3.3, mais le code de tracking doit être présent et conditionné à l'existence de `gtag`)

5. **Given** le composant `AirbnbCta` supporte la variante `outline` **When** il est affiché en mode `outline` **Then** il affiche un border 2px `ayaba-terra`, texte `ayaba-terra`, border-radius 50px **And** au hover, le fond devient `ayaba-terra` et le texte blanc

6. **Given** le `StickyMobileCta` est visible sur mobile **When** on vérifie le layout **Then** le footer a un padding-bottom supplémentaire de 88px sur mobile pour ne pas être masqué par le sticky CTA

## Tasks / Subtasks

- [x] Task 1 — Créer AirbnbCta.astro (AC: #1, #3, #4, #5)
  - [x] 1.1 Créer `src/components/ui/AirbnbCta.astro`
  - [x] 1.2 Props : `configId: '1ch' | '2ch' | '3ch'`, `variant: 'primary' | 'outline'` (défaut: `'primary'`), `size: 'default' | 'large'` (défaut: `'default'`), `label?: string`, `locale: Locale`
  - [x] 1.3 Résoudre l'URL Airbnb depuis `apartments.ts` via le `configId` — mapper '1ch' → index 0, '2ch' → index 1, '3ch' → index 2
  - [x] 1.4 Résoudre le label par défaut via `t(locale, 'nav.book')` ("Réserver" / "Book") — PAS "Réserver sur Airbnb" (feedback UX Onizuka)
  - [x] 1.5 Rendu : `<a>` avec `href={airbnbUrl}`, `target="_blank"`, `rel="noopener noreferrer"`
  - [x] 1.6 Style variante `primary` : `bg-ayaba-terra text-white hover:bg-ayaba-terra/90 rounded-md px-4 py-2 font-body font-semibold text-sm transition-colors`
  - [x] 1.7 Style variante `outline` : `border-2 border-ayaba-terra text-ayaba-terra hover:bg-ayaba-terra hover:text-white rounded-full px-4 py-2 font-body font-semibold text-sm transition-colors`
  - [x] 1.8 Style size `large` : `px-6 py-3 text-base`
  - [x] 1.9 Accessibilité : `focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra`, `min-h-[44px] flex items-center justify-center`
  - [x] 1.10 Tracking GA4 : ajouter un `<script>` inline qui déclenche `gtag('event', 'airbnb_click', { config: configId, page: window.location.pathname })` au clic, avec vérification `typeof gtag !== 'undefined'`

- [x] Task 2 — Créer StickyMobileCta.astro (AC: #2)
  - [x] 2.1 Créer `src/components/ui/StickyMobileCta.astro`
  - [x] 2.2 Props : `locale: Locale`
  - [x] 2.3 Anatomy : section gauche avec prix "À partir de 60€" (valeur `text-ayaba-terra font-bold text-xl`) + "/nuit" (unité `text-ayaba-muted text-sm`) | section droite avec bouton "Réserver" pointant vers la page réserver (`/fr/reserver/` ou `/en/book/`)
  - [x] 2.4 Le prix "À partir de 60€" provient du minimum de `apartments[0].pricePerNight.min` (ne PAS coder en dur)
  - [x] 2.5 Style : `fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] px-4 py-3 md:hidden`
  - [x] 2.6 Layout interne : `flex items-center justify-between`
  - [x] 2.7 Bouton "Réserver" : style primaire `bg-ayaba-terra text-white rounded-lg px-7 py-3.5 font-body font-semibold text-sm`, cible tactile minimum 44x44px
  - [x] 2.8 Le bouton du StickyMobileCta pointe vers la page réserver (PAS directement vers Airbnb) — cohérent avec le CTA du header

- [x] Task 3 — Ajouter les clés i18n nécessaires (AC: #1, #2)
  - [x] 3.1 Ajouter dans `fr.json` et `en.json` les clés : `"cta.fromPrice": "À partir de {price}€" / "From {price}€"`, `"cta.bookNow": "Réserver" / "Book"`, `"labels.pricePerNight": "/nuit" / "/night"`
  - [x] 3.2 Vérifier que les clés existantes `nav.book` et `buttons.bookOnAirbnb` sont toujours cohérentes

- [x] Task 4 — Mettre à jour Footer.astro pour le padding mobile (AC: #6)
  - [x] 4.1 Ajouter `pb-[88px] md:pb-0` au footer sur mobile pour compenser le StickyMobileCta
  - [x] 4.2 Vérifier que le contenu du footer reste visible et accessible sur mobile

- [x] Task 5 — Intégrer StickyMobileCta dans BaseLayout (AC: #2)
  - [x] 5.1 Importer `StickyMobileCta` dans `BaseLayout.astro`
  - [x] 5.2 Placer le composant après `<Footer />` et avant la fermeture de `</body>`
  - [x] 5.3 Vérifier que le z-index du sticky CTA (z-50) est au-dessus du footer mais en dessous du header (z-40) — ajuster si nécessaire (le sticky CTA doit être au-dessus, utiliser z-50 ou supérieur)

- [x] Task 6 — Validation et tests (AC: #1-6)
  - [x] 6.1 Vérifier `npm run build` sans erreur
  - [x] 6.2 Vérifier le rendu du sticky CTA sur mobile (<768px) : prix lisible, bouton accessible
  - [x] 6.3 Vérifier que le sticky CTA est masqué sur desktop (≥768px)
  - [x] 6.4 Vérifier les deux variantes du composant AirbnbCta (primary et outline) visuellement
  - [x] 6.5 Vérifier que le lien Airbnb ouvre dans un nouvel onglet avec les bons attributs
  - [x] 6.6 Vérifier la navigation clavier et le focus visible sur tous les CTAs
  - [x] 6.7 Vérifier que le footer n'est pas masqué par le sticky CTA sur mobile

## Dev Notes

### ALERTE CRITIQUE — Tailwind v4 (pas v3)

Le projet utilise **Tailwind CSS v4** avec `@tailwindcss/vite`. Les tokens sont définis dans `src/styles/global.css` via `@theme { }`, PAS dans un fichier `tailwind.config.mjs`.

**Classes Tailwind disponibles :**
- Couleurs : `text-ayaba-terra`, `bg-ayaba-terra`, `bg-ayaba-dark`, `text-ayaba-cream`, `bg-ayaba-cream`, `text-ayaba-muted`, `text-ayaba-success`, `bg-ayaba-gold`, `border-ayaba-terra`
- Fonts : `font-heading` (Playfair Display), `font-body` (Inter)

### Architecture du composant AirbnbCta

**Pattern central — RÈGLE STRICTE :**
- Toujours utiliser le composant `<AirbnbCta>` (jamais de lien Airbnb en dur)
- URLs Airbnb centralisées dans `src/data/apartments.ts`
- `rel="noopener noreferrer"` + `target="_blank"` systématique

**Mapping configId → apartment :**
```typescript
const configMap: Record<string, number> = { '1ch': 0, '2ch': 1, '3ch': 2 };
const apartment = apartments[configMap[configId]];
const airbnbUrl = apartment.airbnbUrl;
```

**Label du CTA — Feedback UX (Onizuka) :**
- Le texte du CTA principal est toujours **"Réserver"** / **"Book"** — jamais "Réserver sur Airbnb", "Book now", "Cliquez ici"
- Utiliser la clé i18n `nav.book` comme label par défaut
- La prop `label` permet de surcharger (ex: pour ajouter le nom de config "Réserver — 1 Chambre")

### StickyMobileCta — Design Direction

**UX Spec référence :**
```
[Prix "À partir de 60€" + "/nuit"] | [Bouton "Réserver"]
```

- **Desktop (≥ 768px) :** `display: none` via `md:hidden`
- **Mobile (< 768px) :** `position: fixed`, bottom 0, z-index 50+
- Fond blanc, border-top subtile, ombre vers le haut
- Prix : `ayaba-terra` 20px bold (valeur), `ayaba-muted` 13px (unité "/nuit")
- Bouton : fond `ayaba-terra`, blanc, padding 14px 28px, border-radius 8px

**Impact layout :** Le footer DOIT avoir un padding-bottom supplémentaire de 88px sur mobile pour ne pas être masqué par le sticky CTA.

**Attention :** Le bouton du StickyMobileCta pointe vers la **page réserver** (`/fr/reserver/` ou `/en/book/`), PAS directement vers une URL Airbnb. C'est la page récapitulatif qui contient les vrais CTAs Airbnb par configuration. Cohérent avec le CTA "Réserver" du header.

### Tracking GA4 — Préparation

GA4 sera implémenté dans la Story 3.3. Cependant, le composant `AirbnbCta` DOIT déjà contenir le code de tracking conditionnel :

```javascript
// Dans un <script> inline du composant
document.querySelectorAll('[data-airbnb-cta]').forEach(cta => {
  cta.addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'airbnb_click', {
        config: cta.dataset.configId,
        page: window.location.pathname,
      });
    }
  });
});
```

Le `<a>` doit avoir les attributs `data-airbnb-cta` et `data-config-id={configId}` pour le ciblage.

### Patterns architecturaux stricts (rappel)

- **Composants `.astro` uniquement** — zero framework JS client
- **Données centralisées dans `src/data/`** — les URLs Airbnb viennent de `apartments.ts`
- **Traductions UI dans `src/i18n/{locale}.json`** — tout texte visible doit être traduit
- **Props Astro (pas de state client)** — la locale est passée comme prop du serveur
- **Images via `astro:assets`** — jamais de `<img>` brut (pas d'images dans cette story)

### Couleurs — Rappel des règles d'usage CTA

| Token | Hex | Rôle dans cette story |
|-------|-----|----------------------|
| `ayaba-terra` #A0522D | Fond bouton primary, border outline, texte outline, prix sticky |
| `ayaba-gold` #C8A45C | NON utilisé pour les CTAs — réservé aux éléments décoratifs |
| `ayaba-dark` #2C1810 | Texte body (pas dans les CTAs) |
| `ayaba-cream` #FAF7F2 | PAS utilisé dans cette story |
| `ayaba-muted` #6B5E57 | Texte secondaire (unité "/nuit" dans sticky CTA) |

### Accessibilité — Checklist composants

- [ ] `<a>` avec `rel="noopener noreferrer"` sur tous les liens Airbnb externes
- [ ] Focus visible : `focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra`
- [ ] Cibles tactiles minimum `min-h-[44px]` sur mobile
- [ ] Texte accessible : le lien doit être compréhensible hors contexte (pas juste "Réserver" — inclure le nom de la config dans un `aria-label` ou dans le texte visible)
- [ ] Le sticky CTA ne doit pas masquer de contenu interactif du footer

### Dépendances amont (Stories 1.1 + 1.2 — DONE)

Fichiers existants utilisés par cette story :
- `src/data/apartments.ts` — 3 configs avec `airbnbUrl`, `pricePerNight`, `name` ✅
- `src/i18n/utils.ts` — `t()`, `Locale`, `getLocale()` ✅
- `src/i18n/fr.json` / `en.json` — clés existantes `nav.book`, `buttons.bookOnAirbnb`, `labels.perNight` ✅
- `src/layouts/BaseLayout.astro` — intégrera le `StickyMobileCta` ✅
- `src/components/common/Footer.astro` — sera modifié pour le padding mobile ✅
- `src/styles/global.css` — tokens Tailwind v4 (couleurs, fonts) ✅

### Dépendances aval (Stories 1.4, 2.1, 2.4, 3.3)

Composants créés dans cette story et utilisés par les stories suivantes :
- `AirbnbCta.astro` → utilisé dans les pages Accueil (1.4), Appartement (2.1), Réserver (2.4), et partout où un CTA Airbnb est nécessaire
- `StickyMobileCta.astro` → inclus dans BaseLayout, visible sur TOUTES les pages sur mobile

**Story 1.4 (Page d'Accueil)** utilisera `<AirbnbCta configId="1ch" locale={locale} />` dans les cartes de configuration.

**Story 3.3 (GA4)** activera le tracking : le script `gtag.js` sera ajouté au BaseLayout, et les événements `airbnb_click` déjà codés dans AirbnbCta commenceront à être envoyés.

### Intelligence Story 1.2 — Leçons apprises

De la story précédente :
1. **Tailwind v4 vs v3** : Continuer avec `@tailwindcss/vite` + `@theme` dans CSS. Pas de `tailwind.config.mjs`.
2. **CSS `:has()` pour toggle** : Pattern fonctionnel pour le hamburger menu — peut être réutilisé pour d'autres interactions CSS-only
3. **Navigation.ts** : `getNavigation(locale).slice(0, 4)` dans le header — le Blog est exclu du menu principal
4. **CTA "Réserver"** dans la nav : pointe vers la page `/fr/reserver/` ou `/en/book/` — PAS vers Airbnb directement. Le StickyMobileCta doit suivre le même pattern
5. **Code review feedback** : Les classes `focus:` doivent avoir le préfixe `focus:` explicite (corrigé en Story 1.2)
6. **Footer padding-bottom** : Le footer actuel N'A PAS de padding-bottom mobile pour le sticky CTA — c'est cette story qui l'ajoute

### Project Structure Notes

- `AirbnbCta.astro` → `src/components/ui/AirbnbCta.astro`
- `StickyMobileCta.astro` → `src/components/ui/StickyMobileCta.astro`
- Alignement complet avec la structure définie dans `architecture.md` sous `components/ui/`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3] — Acceptance criteria et user story
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules] — Conventions : composants PascalCase dans components/ui/, AirbnbCta comme pattern obligatoire
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns] — CTA Airbnb règle stricte : toujours via composant, URLs depuis apartments.ts, tracking GA4
- [Source: _bmad-output/planning-artifacts/architecture.md#Complete Project Directory Structure] — AirbnbCta.astro dans components/ui/
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#AirbnbCta.astro] — Props, variantes primary/outline, comportement tracking
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#StickyMobileCta.astro] — Anatomy prix+bouton, visibilité mobile, impact footer padding
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Button Hierarchy] — "Réserver" partout, jamais "Réserver sur Airbnb" (feedback Onizuka)
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Breakpoints] — Sticky CTA visible <768px, masqué ≥768px
- [Source: _bmad-output/implementation-artifacts/1-2-baselayout-header-footer-navigation.md] — Patterns établis, leçons Tailwind v4, CTA nav, footer existant
- [Source: src/data/apartments.ts] — 3 configs avec airbnbUrl, pricePerNight.min, name
- [Source: src/i18n/fr.json] — Clés existantes nav.book, buttons.bookOnAirbnb, labels.perNight

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (1M context)

### Debug Log References

Aucun problème rencontré. Build passé du premier coup.

### Completion Notes List

- Task 1 : Créé `AirbnbCta.astro` avec props `configId`, `variant`, `size`, `label`, `locale`. URLs résolues depuis `apartments.ts` via mapping `configMap`. Label par défaut "Réserver"/"Book" via `t(locale, 'nav.book')`. Variantes primary (rounded-md) et outline (rounded-full, border-2). Tracking GA4 conditionnel via `data-airbnb-cta` + script inline avec vérification `typeof gtag !== 'undefined'`.
- Task 2 : Créé `StickyMobileCta.astro` — sticky bottom, `md:hidden`, prix dynamique depuis `apartments[0].pricePerNight.min`, bouton "Réserver" pointant vers `/fr/reserver/` ou `/en/book/` (pas Airbnb directement).
- Task 3 : Ajouté clés i18n `cta.fromPrice`, `cta.bookNow`, `labels.pricePerNight` dans `fr.json` et `en.json`. Clés existantes `nav.book` et `buttons.bookOnAirbnb` inchangées et cohérentes.
- Task 4 : Footer padding mobile `pb-[88px] md:pb-8` pour compenser le sticky CTA.
- Task 5 : StickyMobileCta intégré dans BaseLayout après Footer, avant `</body>`. z-50 au-dessus du footer, header z-40 est en sticky top donc pas de conflit.
- Task 6 : Build Astro réussi (3 pages, 0 erreur). HTML vérifié : sticky CTA présent avec bon texte FR/EN, footer avec padding mobile, attributs `target="_blank"` et `rel="noopener noreferrer"` corrects.

### Change Log

- 2026-03-14 : Implémentation complète Story 1.3 — composants AirbnbCta et StickyMobileCta, clés i18n, intégration BaseLayout, footer padding mobile.
- 2026-03-14 : Code review — 5 fixes appliqués (H1 aria-label AirbnbCta, H2 semantic aside StickyMobileCta, M1 clé i18n cohérente nav.book, M2 interpolation centralisée t() avec params, M3 Math.min pour prix dynamique).

### File List

- `src/components/ui/AirbnbCta.astro` (nouveau, review: ajout aria-label)
- `src/components/ui/StickyMobileCta.astro` (nouveau, review: aside sémantique, nav.book, Math.min prix)
- `src/i18n/fr.json` (modifié — ajout clés cta.*, labels.pricePerNight)
- `src/i18n/en.json` (modifié — ajout clés cta.*, labels.pricePerNight)
- `src/i18n/utils.ts` (modifié — review: t() supporte params d'interpolation)
- `src/components/common/Footer.astro` (modifié — padding mobile pb-[88px])
- `src/layouts/BaseLayout.astro` (modifié — import et intégration StickyMobileCta)
