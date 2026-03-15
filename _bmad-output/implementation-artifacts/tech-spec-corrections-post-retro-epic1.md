---
title: 'Corrections post-rétro Epic 1 — Homepage Option A, images, URLs, social'
slug: 'corrections-post-retro-epic1'
created: '2026-03-14'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['Astro 6.0.4', 'Tailwind CSS 4.2.1', 'TypeScript strict', '@astrojs/vercel 10.0.0']
files_to_modify: ['src/pages/fr/index.astro', 'src/pages/en/index.astro', 'src/data/apartments.ts', 'src/components/common/Footer.astro', 'src/layouts/BaseLayout.astro', 'src/components/sections/ApartmentGrid.astro', 'vercel.json', 'src/pages/index.astro', 'src/i18n/fr.json', 'src/i18n/en.json']
files_to_create: ['src/components/ui/WhatsAppButton.astro']
code_patterns: ['Composants .astro uniquement', 'i18n via t(locale, key)', 'Images via astro:assets <Image>', 'Tailwind v4 @theme tokens', 'Props interface TypeScript', 'Données centralisées src/data/']
test_patterns: ['npm run build sans erreur', 'Vérification HTML output']
---

# Tech-Spec: Corrections post-rétro Epic 1 — Homepage Option A, images, URLs, social

**Created:** 2026-03-14

## Overview

### Problem Statement

La homepage actuelle est trop chargée (8 sections hybride Immersif-Corporate), utilise des placeholders (divs colorés) au lieu des vraies images disponibles dans `/images/`, a des URLs Airbnb factices, pas de liens sociaux (Instagram/WhatsApp), et la redirection racine `/` ne fonctionne pas correctement sur Vercel (le visiteur doit cliquer pour arriver sur la homepage).

### Solution

Simplifier la homepage en Option A immersive (Hero + ApartmentGrid + FinalCta + Footer), intégrer les vrais assets et liens Airbnb, ajouter les liens sociaux Instagram et WhatsApp (footer + bouton flottant), et configurer la redirection intelligente `/` → `/fr/` ou `/en/` selon la langue du navigateur via `vercel.json`.

### Scope

**In Scope:**
- Simplifier `src/pages/fr/index.astro` et `src/pages/en/index.astro` → Hero + ApartmentGrid + FinalCta (simplifié) + Footer
- Déplacer les images de `/images/` vers `src/assets/images/` et les utiliser via `<Image>` d'Astro
- Mettre à jour les 3 URLs Airbnb dans `src/data/apartments.ts`
- Ajouter Instagram (`@maisonayaba`) + WhatsApp (`+33618666612`) dans le footer
- Créer un composant WhatsApp flottant avec message prédéfini FR/EN
- Configurer la redirection `/` → `/fr/` ou `/en/` selon `Accept-Language` dans `vercel.json`

**Out of Scope:**
- Pas de modification des composants retirés (TrustBar, KwaboSection, QuartierTeaser, HostSection) — ils restent dans le code pour l'Epic 2
- Pas de nouvelles pages
- Pas de GA4 / SEO
- Pas de suppression de fichiers de composants existants

## Context for Development

### Codebase Patterns

- Composants `.astro` uniquement — zero framework JS client
- Données centralisées dans `src/data/` — jamais de valeurs en dur
- Traductions UI dans `src/i18n/{locale}.json` — tout texte visible doit utiliser `t(locale, 'key')`
- Images via `astro:assets` `<Image>` — jamais de `<img>` brut
- Tailwind CSS v4 via `@tailwindcss/vite` — tokens dans `src/styles/global.css` via `@theme`
- CTA Airbnb toujours via composant `<AirbnbCta>` avec tracking GA4 conditionnel
- Footer a `pb-[88px] md:pb-8` pour compenser le StickyMobileCta
- HeroSection et ApartmentCard supportent `image?: ImageMetadata` optionnel — passer la vraie image suffit
- ApartmentGrid importe `apartments` et `getAmenities` depuis `src/data/apartments.ts` et utilise des clés i18n
- BaseLayout inclut Header + Footer + StickyMobileCta — le WhatsAppButton sera ajouté ici aussi
- StickyMobileCta est `fixed bottom-0 z-50 md:hidden`

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/pages/fr/index.astro` | Homepage FR — retirer 4 imports/composants, ajouter import image hero |
| `src/pages/en/index.astro` | Homepage EN — mêmes modifications que FR |
| `src/data/apartments.ts` | Remplacer 3 URLs Airbnb placeholder par les vrais liens |
| `src/components/common/Footer.astro` | Ajouter section liens sociaux (Instagram + WhatsApp) |
| `src/layouts/BaseLayout.astro` | Ajouter import WhatsAppButton après StickyMobileCta |
| `src/components/sections/ApartmentGrid.astro` | Ajouter import images chambre1/2/3, les passer aux ApartmentCard |
| `vercel.json` | Ajouter condition `has` Accept-Language pour redirect intelligent |
| `src/pages/index.astro` | Garder meta-refresh comme fallback |
| `src/i18n/fr.json` | Ajouter clés WhatsApp + social |
| `src/i18n/en.json` | Ajouter clés WhatsApp + social |

### Technical Decisions

- Homepage Option A choisie lors de la rétro Epic 1
- WhatsApp message prédéfini FR : "Bonjour, je suis intéressé(e) pour reserver une chambre Maison Ayaba"
- WhatsApp message prédéfini EN : "Hello, I'm interested in booking a room at Maison Ayaba"
- Redirection : FR par défaut si la langue du navigateur n'est ni FR ni EN
- Instagram : `https://instagram.com/maisonayaba`
- WhatsApp : `https://wa.me/33618666612`
- WhatsAppButton : `fixed bottom-6 right-6 z-40` sur desktop, `bottom-[100px] right-4 z-40` sur mobile (au-dessus du StickyMobileCta)

## Implementation Plan

### Tasks

- [x] Task 1: Déplacer les images vers `src/assets/images/`
  - File: `images/salon.png` → `src/assets/images/hero/salon.png`
  - File: `images/chambre1.png` → `src/assets/images/apartments/chambre1.png`
  - File: `images/chambre2.png` → `src/assets/images/apartments/chambre2.png`
  - File: `images/chambre3.png` → `src/assets/images/apartments/chambre3.png`
  - File: `images/logo.png` → `src/assets/images/logo.png`
  - Action: `mv` (déplacer, pas copier) chaque fichier. Supprimer les `.gitkeep` des dossiers destination qui contiennent maintenant des fichiers.
  - Notes: Les fichiers font ~7MB chacun (PNG). Astro les optimisera automatiquement en WebP/AVIF au build.

- [x] Task 2: Mettre à jour les URLs Airbnb dans `apartments.ts`
  - File: `src/data/apartments.ts`
  - Action: Remplacer les 3 URLs placeholder par les vrais liens :
    - `'https://airbnb.com/rooms/placeholder-1'` → `'https://airbnb.fr/h/wabi-sabi-cotonou-1ch'`
    - `'https://airbnb.com/rooms/placeholder-2'` → `'https://airbnb.fr/h/wabi-sabi-cotonou-2ch'`
    - `'https://airbnb.com/rooms/placeholder-3'` → `'https://airbnb.fr/h/wabi-sabi-cotonou-3ch'`
  - Action: Supprimer les 3 commentaires `// TODO: remplacer par le vrai lien Airbnb`

- [x] Task 3: Ajouter les clés i18n pour social et WhatsApp
  - File: `src/i18n/fr.json`
  - Action: Ajouter les clés suivantes :
    ```json
    "social": {
      "instagram": "Suivez-nous sur Instagram",
      "whatsapp": "Contactez-nous sur WhatsApp",
      "whatsappMessage": "Bonjour, je suis intéressé(e) pour reserver une chambre Maison Ayaba"
    }
    ```
  - File: `src/i18n/en.json`
  - Action: Ajouter les clés suivantes :
    ```json
    "social": {
      "instagram": "Follow us on Instagram",
      "whatsapp": "Contact us on WhatsApp",
      "whatsappMessage": "Hello, I'm interested in booking a room at Maison Ayaba"
    }
    ```

- [x] Task 4: Ajouter les images au HeroSection dans les pages FR/EN
  - File: `src/pages/fr/index.astro`
  - Action: Ajouter l'import de l'image hero dans le frontmatter :
    ```typescript
    import heroImage from '../../assets/images/hero/salon.png';
    ```
  - Action: Passer la prop `image` au HeroSection :
    ```astro
    <HeroSection image={heroImage} ... />
    ```
  - File: `src/pages/en/index.astro`
  - Action: Même import et prop `image={heroImage}`

- [x] Task 5: Ajouter les images aux ApartmentCard via ApartmentGrid
  - File: `src/components/sections/ApartmentGrid.astro`
  - Action: Ajouter les imports des 3 images dans le frontmatter :
    ```typescript
    import chambre1Img from '../../assets/images/apartments/chambre1.png';
    import chambre2Img from '../../assets/images/apartments/chambre2.png';
    import chambre3Img from '../../assets/images/apartments/chambre3.png';
    ```
  - Action: Créer un tableau d'images et passer la prop `image` à chaque ApartmentCard :
    ```typescript
    const images = [chambre1Img, chambre2Img, chambre3Img];
    ```
    Dans le map : `image={images[i]}`

- [x] Task 6: Simplifier les pages homepage FR et EN
  - File: `src/pages/fr/index.astro`
  - Action: Retirer les imports de `TrustBar`, `KwaboSection`, `QuartierTeaser`, `HostSection`
  - Action: Retirer les blocs JSX correspondants (`<TrustBar ... />`, `<KwaboSection ... />`, `<QuartierTeaser ... />`, `<HostSection ... />`)
  - Action: Garder : `HeroSection`, `ApartmentGrid`, `FinalCta`
  - File: `src/pages/en/index.astro`
  - Action: Mêmes suppressions que la page FR

- [x] Task 7: Ajouter liens sociaux au Footer
  - File: `src/components/common/Footer.astro`
  - Action: Ajouter l'import de `t` (déjà importé)
  - Action: Ajouter une section liens sociaux entre la nav et le copyright, avec des icônes SVG inline pour Instagram et WhatsApp :
    ```astro
    <div class="flex gap-4">
      <a href="https://instagram.com/maisonayaba" target="_blank" rel="noopener noreferrer"
         aria-label={t(locale, 'social.instagram')}
         class="text-ayaba-cream hover:text-ayaba-gold transition-colors min-h-[44px] flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra">
        <!-- SVG Instagram icon 24x24 -->
      </a>
      <a href={`https://wa.me/33618666612?text=${encodeURIComponent(t(locale, 'social.whatsappMessage'))}`}
         target="_blank" rel="noopener noreferrer"
         aria-label={t(locale, 'social.whatsapp')}
         class="text-ayaba-cream hover:text-ayaba-gold transition-colors min-h-[44px] flex items-center focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra">
        <!-- SVG WhatsApp icon 24x24 -->
      </a>
    </div>
    ```
  - Notes: Utiliser des SVG inline (pas de bibliothèque d'icônes externe). Les SVG Instagram et WhatsApp sont des formes simples et standard.

- [x] Task 8: Créer le composant WhatsAppButton flottant
  - File: `src/components/ui/WhatsAppButton.astro` (nouveau)
  - Action: Créer un composant avec :
    - Props : `locale: Locale`
    - Lien vers `https://wa.me/33618666612?text={message_encodé}` avec message localisé via `t(locale, 'social.whatsappMessage')`
    - Style : bouton rond vert (#25D366) de 56x56px, icône WhatsApp SVG blanche 28px
    - Position : `fixed bottom-[100px] right-4 z-40 md:bottom-6 md:right-6` (mobile: au-dessus du StickyMobileCta, desktop: coin bas droite)
    - Ombre : `shadow-lg hover:shadow-xl`
    - Transition : `hover:scale-110 transition-transform`
    - Attributs : `target="_blank"`, `rel="noopener noreferrer"`, `aria-label={t(locale, 'social.whatsapp')}`
    - Accessibilité : `focus:outline-2 focus:outline-offset-2 focus:outline-ayaba-terra`, `min-h-[44px] min-w-[44px]`

- [x] Task 9: Intégrer WhatsAppButton dans BaseLayout
  - File: `src/layouts/BaseLayout.astro`
  - Action: Ajouter l'import de WhatsAppButton :
    ```typescript
    import WhatsAppButton from '../components/ui/WhatsAppButton.astro';
    ```
  - Action: Ajouter `<WhatsAppButton locale={locale} />` après `<StickyMobileCta locale={locale} />` (avant `</body>`)

- [x] Task 10: Configurer la redirection intelligente dans vercel.json
  - File: `vercel.json`
  - Action: Remplacer les redirects existants par une version avec détection de langue :
    ```json
    "redirects": [
      {
        "source": "/",
        "has": [{ "type": "header", "key": "accept-language", "value": "en.*" }],
        "destination": "/en/",
        "permanent": false
      },
      {
        "source": "/",
        "destination": "/fr/",
        "permanent": false
      },
      {
        "source": "/index.html",
        "has": [{ "type": "header", "key": "accept-language", "value": "en.*" }],
        "destination": "/en/",
        "permanent": false
      },
      {
        "source": "/index.html",
        "destination": "/fr/",
        "permanent": false
      }
    ]
    ```
  - Notes: L'ordre est important — la règle avec condition `has` doit être AVANT la règle par défaut. Vercel évalue les redirects dans l'ordre et prend la première qui match. FR est le fallback pour toutes les autres langues.

- [x] Task 11: Vérifier le build et tester
  - Action: Exécuter `npm run build` et vérifier 0 erreurs
  - Action: Exécuter `npm run preview` et vérifier :
    - Homepage FR : Hero avec image salon.png, 3 cartes avec vraies photos, FinalCta, Footer avec liens sociaux
    - Homepage EN : même structure, textes EN
    - WhatsApp flottant visible sur toutes les pages
    - Liens Airbnb pointent vers les vrais liens
    - Pas de sections TrustBar, Kwabo, Quartier, Host sur la homepage

### Acceptance Criteria

- [x] AC 1: Given la homepage FR `/fr/` , when la page se charge, then elle affiche uniquement 3 sections de contenu (HeroSection + ApartmentGrid + FinalCta) et le footer — pas de TrustBar, KwaboSection, QuartierTeaser, ni HostSection
- [x] AC 2: Given la homepage EN `/en/`, when la page se charge, then elle affiche la même structure que la version FR avec les textes en anglais
- [x] AC 3: Given le HeroSection, when la page se charge, then l'image `salon.png` est affichée en plein écran (pas un placeholder div coloré) via le composant `<Image>` d'Astro
- [x] AC 4: Given les 3 ApartmentCard, when la page se charge, then chaque carte affiche sa vraie photo (`chambre1.png`, `chambre2.png`, `chambre3.png`) via `<Image>` d'Astro
- [x] AC 5: Given un visiteur clique sur le CTA Airbnb de la config 1 chambre, when le lien s'ouvre, then il est redirigé vers `https://airbnb.fr/h/wabi-sabi-cotonou-1ch` dans un nouvel onglet
- [x] AC 6: Given un visiteur clique sur le CTA Airbnb de la config 2 chambres, when le lien s'ouvre, then il est redirigé vers `https://airbnb.fr/h/wabi-sabi-cotonou-2ch` dans un nouvel onglet
- [x] AC 7: Given un visiteur clique sur le CTA Airbnb de la config 3 chambres, when le lien s'ouvre, then il est redirigé vers `https://airbnb.fr/h/wabi-sabi-cotonou-3ch` dans un nouvel onglet
- [x] AC 8: Given le footer, when le visiteur le regarde, then il voit des icônes Instagram et WhatsApp cliquables avec les bons liens (`instagram.com/maisonayaba` et `wa.me/33618666612`)
- [x] AC 9: Given le bouton WhatsApp flottant, when le visiteur le voit sur desktop, then il est positionné en bas à droite (fixe) avec un style vert (#25D366) et une icône WhatsApp blanche
- [x] AC 10: Given le bouton WhatsApp flottant sur mobile, when le StickyMobileCta est aussi visible, then le bouton WhatsApp est positionné AU-DESSUS du sticky bar (pas de chevauchement)
- [x] AC 11: Given un visiteur clique sur le bouton WhatsApp flottant en FR, when WhatsApp s'ouvre, then le message prédéfini est "Bonjour, je suis intéressé(e) pour reserver une chambre Maison Ayaba"
- [x] AC 12: Given un visiteur clique sur le bouton WhatsApp flottant en EN, when WhatsApp s'ouvre, then le message prédéfini est "Hello, I'm interested in booking a room at Maison Ayaba"
- [x] AC 13: Given un visiteur avec navigateur en anglais accède à `/`, when Vercel traite la requête, then il est redirigé vers `/en/` (pas `/fr/`)
- [x] AC 14: Given un visiteur avec navigateur en français (ou autre langue) accède à `/`, when Vercel traite la requête, then il est redirigé vers `/fr/`
- [x] AC 15: Given le projet, when on exécute `npm run build`, then le build se termine sans erreur

## Additional Context

### Dependencies

- Aucune nouvelle dépendance npm — tout se fait avec les outils existants (Astro, Tailwind, vercel.json)
- Les images `/images/*.png` doivent exister (vérifié : elles sont présentes)
- La redirection intelligente ne fonctionnera qu'en production Vercel (pas en `npm run preview` local)

### Testing Strategy

- **Build** : `npm run build` doit passer sans erreur
- **Preview local** : `npm run preview` pour vérifier le rendu visuel (hero, cartes, footer, WhatsApp button)
- **Vérification HTML** : inspecter le HTML généré pour confirmer que les sections retirées ne sont plus présentes
- **Test Vercel** : après push, vérifier la redirection `/` et les liens Airbnb sur `https://maison-ayaba.vercel.app`
- **Test mobile** : vérifier le positionnement du WhatsAppButton par rapport au StickyMobileCta

### Notes

- Les composants retirés de la homepage (TrustBar, KwaboSection, QuartierTeaser, HostSection) restent dans `src/components/sections/` pour réutilisation dans l'Epic 2
- Les clés i18n `home.trustBar*`, `home.kwabo*`, `home.quartier*`, `home.host*` restent dans les fichiers JSON — elles seront réutilisées dans les pages dédiées de l'Epic 2
- La redirection `Accept-Language` dans vercel.json ne fonctionne que sur le CDN Vercel. En local (`npm run preview`), le meta-refresh dans `src/pages/index.astro` sert de fallback et redirige toujours vers `/fr/`
- Les images font ~7MB chacun (PNG). Astro les optimisera en WebP/AVIF au build, réduisant significativement la taille

## Review Notes

- Revue adversariale complétée
- Findings : 4 total, 3 corrigés, 1 ignoré (noise)
- Résolution : auto-fix
- F1 (typo "reserver" → "réserver") : corrigé
- F2 (mapping images par index → par slug) : corrigé
- F3 (index.astro meta-refresh → Astro.redirect) : corrigé
- F4 (URLs airbnb.fr pour visiteurs EN) : ignoré — Airbnb redirige automatiquement
