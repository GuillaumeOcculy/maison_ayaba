---
title: 'Homepage immersive — header masque'
slug: 'homepage-immersive-header-masque'
created: '2026-03-15'
status: 'completed'
stepsCompleted: [1, 2, 3, 4]
tech_stack: [Astro 6, Tailwind CSS v4]
files_to_modify: [src/layouts/BaseLayout.astro, src/components/common/Footer.astro, src/pages/index.astro, src/pages/en/index.astro, src/data/siteConfig.ts]
code_patterns: [conditional rendering via props, data-driven components]
test_patterns: [npm run build, visual inspection]
---

# Tech-Spec: Homepage immersive — header masque

**Created:** 2026-03-15

## Overview

### Problem Statement

La homepage a un header sticky qui casse l'effet immersif du hero plein ecran. Le visiteur devrait etre happe par l'image et l'accroche des l'arrivee, sans barre de navigation visible. De plus, le numero WhatsApp doit etre mis a jour.

### Solution

Ajouter une prop `hideHeader?: boolean` a BaseLayout pour masquer conditionnellement le header. Les homepages FR et EN passent `hideHeader={true}`. Le LanguageSwitcher est ajoute dans le Footer de toutes les pages pour garantir l'acces au changement de langue. Le numero WhatsApp est corrige dans siteConfig.ts.

### Scope

**In Scope:**
- Prop `hideHeader` sur BaseLayout
- Homepage FR (`index.astro`) et EN (`en/index.astro`) avec `hideHeader={true}`
- LanguageSwitcher ajoute dans le Footer (toutes les pages)
- StickyMobileCta conserve sur la homepage
- Correction numero WhatsApp : `33618666612` → `33666419693`

**Out of Scope:**
- Header qui reapparait au scroll
- Modification du HeroSection
- Modification des autres pages (hors footer)

## Context for Development

### Codebase Patterns

- BaseLayout gere la structure HTML complete : Header, main, Footer, StickyMobileCta, WhatsAppButton
- Le Header est rendu inconditionnellement ligne 54 de BaseLayout.astro
- Le Footer n'a pas de LanguageSwitcher actuellement
- Le LanguageSwitcher utilise `getAlternateUrl()` depuis navigation.ts (corrige dans cette session)
- `whatsappNumber` est centralise dans `siteConfig.ts` et importe partout
- `Astro.url` est disponible dans tous les composants .astro en SSG

### Files to Reference

| File | Purpose |
| ---- | ------- |
| src/layouts/BaseLayout.astro | Layout principal — ajouter prop hideHeader, conditionner Header et skip-to-content |
| src/components/common/Footer.astro | Footer — ajouter LanguageSwitcher entre icones sociales et copyright |
| src/components/common/LanguageSwitcher.astro | Composant existant, pas de modification |
| src/pages/index.astro | Homepage FR — passer hideHeader={true} |
| src/pages/en/index.astro | Homepage EN — passer hideHeader={true} |
| src/data/siteConfig.ts | whatsappNumber a corriger |

### Technical Decisions

- Approche prop conditionnelle plutot que layout separe (plus simple, moins de duplication)
- LanguageSwitcher dans le footer de TOUTES les pages (pas seulement la homepage)
- Le Footer utilise `Astro.url` directement — pas besoin de passer en prop
- Le skip-to-content link dans BaseLayout doit aussi etre conditionne quand le header est masque

## Implementation Plan

### Tasks

- [x] Task 1: Corriger le numero WhatsApp
  - File: `src/data/siteConfig.ts`
  - Action: Changer `whatsappNumber` de `'33618666612'` a `'33666419693'`
  - Notes: Centralise — un seul fichier, propage a Footer, WhatsAppButton, pages Reserver

- [x] Task 2: Ajouter la prop `hideHeader` a BaseLayout
  - File: `src/layouts/BaseLayout.astro`
  - Action: Ajouter `hideHeader?: boolean` a l'interface Props. Conditionner le rendu du Header et du skip-to-content link avec `{!hideHeader && (<Header ... />)}` et `{!hideHeader && (<a href="#main-content" ...>...</a>)}`
  - Notes: Le skip-to-content pointe vers `#main-content` qui est dans le Header — sans header, le lien n'a pas de sens

- [x] Task 3: Ajouter le LanguageSwitcher dans le Footer
  - File: `src/components/common/Footer.astro`
  - Action: Importer `LanguageSwitcher` depuis `./LanguageSwitcher.astro`. Ajouter le composant entre les icones sociales et le bloc copyright/location. Passer `locale={locale}` et `currentUrl={Astro.url}`.
  - Notes: Styler le LanguageSwitcher pour le fond sombre du footer (texte cream au lieu de dark)

- [x] Task 4: Passer `hideHeader={true}` sur les homepages
  - File: `src/pages/index.astro`
  - Action: Ajouter `hideHeader={true}` au composant `<BaseLayout>`
  - File: `src/pages/en/index.astro`
  - Action: Idem — ajouter `hideHeader={true}`

- [x] Task 5: Build et validation
  - Action: `npm run build` — 11 pages, 0 erreur
  - Action: Verifier visuellement que la homepage n'a pas de header
  - Action: Verifier que les autres pages ont toujours le header
  - Action: Verifier que le LanguageSwitcher fonctionne dans le footer

### Acceptance Criteria

- [x] AC 1: Given la homepage FR (`/`), when la page se charge, then le header n'est PAS visible et le hero occupe tout l'ecran
- [x] AC 2: Given la homepage EN (`/en/`), when la page se charge, then le header n'est PAS visible et le hero occupe tout l'ecran
- [x] AC 3: Given n'importe quelle autre page (ex: `/fr/appartement/`), when la page se charge, then le header sticky est present comme avant
- [x] AC 4: Given n'importe quelle page, when le visiteur scrolle jusqu'au footer, then le LanguageSwitcher FR/EN est visible et fonctionnel
- [x] AC 5: Given le footer sur la page `/fr/votre-hote/`, when le visiteur clique sur EN, then il est redirige vers `/en/your-host/` (pas de 404)
- [x] AC 6: Given n'importe quelle page, when on clique sur l'icone WhatsApp, then le lien utilise le numero `+33666419693`
- [x] AC 7: Given le site est builde, when on verifie le build, then 11 pages generees sans erreur

## Additional Context

### Dependencies

- Aucune dependance externe
- Le LanguageSwitcher utilise `getAlternateUrl()` de `navigation.ts` (corrige dans cette session)

### Testing Strategy

- `npm run build` : 11 pages, 0 erreur
- Inspection visuelle : homepage sans header, autres pages avec header
- Verification des liens : LanguageSwitcher dans le footer pointe vers les bonnes URLs
- Verification WhatsApp : numero correct dans le lien `wa.me/`

### Notes

- Le StickyMobileCta reste visible sur la homepage — le visiteur peut toujours reserver
- La detection automatique de langue via `Accept-Language` dans `vercel.json` est deja en place — le visiteur arrive sur la bonne langue sans avoir besoin du switcher
- Le LanguageSwitcher dans le footer sur fond sombre necessite un ajustement de couleur (texte cream au lieu de dark) — a gerer soit via props du composant, soit via classes Tailwind wrappantes dans le footer

## Review Notes
- Adversarial review completed
- Findings: 5 total, 3 fixed, 2 skipped (F4 latent/no-fix-needed, F5 undecided/no-fix-needed)
- Resolution approach: auto-fix
- F1 (High): skip-to-content rendu inconditionnellement — corrige
- F2 (Medium): CSS specificity forcee via `!important` sur les overrides footer — corrige
- F3 (Medium): commentaire audit trail ajoute sur whatsappNumber — corrige
