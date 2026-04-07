---
title: 'Refonte UX — 3 logements privatifs'
slug: 'refonte-ux-3-logements-privatifs'
created: '2026-03-30'
updated: '2026-04-07'
status: 'implementation-complete'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['astro', 'tailwindcss', 'typescript', 'i18n-json']
files_created:
  - 'src/components/sections/LogementCards.astro'
  - 'src/components/sections/ReviewsSection.astro'
  - 'src/components/sections/ShowcaseSection.astro'
  - 'src/components/ui/PhotoLightbox.astro'
  - 'src/components/ui/ApartmentFloorPlan.astro'
files_modified:
  - 'src/i18n/fr.json'
  - 'src/i18n/en.json'
  - 'src/components/ui/GuestSelector.astro'
  - 'src/components/sections/ApartmentGrid.astro'
  - 'src/components/sections/HeroSection.astro'
  - 'src/components/ui/ImageGallery.astro'
  - 'src/pages/index.astro'
  - 'src/pages/en/index.astro'
  - 'src/pages/fr/appartement.astro'
  - 'src/pages/en/apartment.astro'
  - 'src/pages/fr/fidjrosse-cotonou.astro'
  - 'src/pages/en/fidjrosse-cotonou.astro'
  - 'src/pages/fr/votre-hote.astro'
  - 'src/pages/en/your-host.astro'
  - 'src/pages/fr/faq.astro'
  - 'src/pages/en/faq.astro'
  - 'src/pages/fr/blog/index.astro'
  - 'src/pages/en/blog/index.astro'
  - 'src/layouts/BlogLayout.astro'
  - 'src/data/navigation.ts'
code_patterns:
  - 'Composants Astro avec props typées (interface Props)'
  - 'i18n via t(locale, key) — fr.json/en.json — clés imbriquées par objet'
  - 'Images importées statiquement dans chaque page'
  - 'Tailwind CSS utilitaire, palette ayaba-* (terra, dark, muted, cream, gold, success)'
  - 'Lightbox réutilisable via data-lightbox-group + JS vanilla'
  - 'GTags tracking via gtag() sur clics Airbnb'
test_patterns: ['Manuel — pas de framework de test en place']
---

# Tech-Spec: Refonte UX — 3 logements privatifs

**Created:** 2026-03-30
**Updated:** 2026-04-07

## Overview

### Problem Statement

Les visiteurs confondaient les 3 formules (1 chambre, 2 chambres, 3 chambres) avec des chambres chez l'habitant ou un logement partagé. En réalité, quelle que soit la formule, le voyageur a l'appartement entier pour lui seul — seul le nombre de chambres déverrouillées change. Cette confusion a été confirmée par plusieurs retours utilisateurs (diaspora, habitudes Airbnb "chambre chez l'habitant").

### Solution — Évolution en 2 phases

**Phase 1 (2026-03-30) — "1 appartement + sélecteur voyageurs"**
Première tentative : supprimer la présentation en 3 formules, présenter un seul appartement avec un sélecteur "Combien de voyageurs ?" qui détermine le lien Airbnb. Prix unique "À partir de 60€/nuit".

**Phase 2 (2026-04-01 → 2026-04-07) — Pivot "3 logements privatifs"**
Après prototypage et itération (4 prototypes HTML testés), pivot vers une approche plus claire : présenter 3 logements distincts (Duo, Famille, Tribu), chacun explicitement décrit comme un **appartement entier et privatif**. Le message clé est martelé partout : "Vous ne partagez jamais." Chaque logement a son prix, sa surface et sa capacité affichés clairement, avec un CTA direct vers l'annonce Airbnb correspondante.

Ce pivot résout mieux le problème car il conserve le choix (3 options) tout en éliminant l'ambiguïté : chaque carte dit explicitement "Appartement entier — 100% privatif".

### Scope final

**Pages modifiées :**
- Homepage FR + EN : refonte complète (hero, showcase, cartes logements, avis, lightbox)
- Page Appartement FR + EN : galeries par chambre, plan schématique, GuestSelector, LogementCards
- Page Fidjrossè FR + EN : ajout encart offre 3 logements, CTA intermédiaires, enrichissement commerces
- Page Hôte FR + EN : alignement messaging "3 logements privatifs"
- Page FAQ FR + EN : reformulation questions/réponses sans "formules"
- Blog index FR + EN + BlogLayout : alignement CTA et messaging
- Navigation : suppression doublon "Réserver"

**Composants créés :**
- `LogementCards.astro` — 3 cartes Duo/Famille/Tribu avec prix, surface, capacité, CTA Airbnb
- `ShowcaseSection.astro` — Grille photos espaces communs (5 images, 2x2 + large) + 6 features
- `ReviewsSection.astro` — 2 témoignages avec étoiles
- `PhotoLightbox.astro` — Lightbox fullscreen réutilisable (clic, clavier, swipe)
- `ApartmentFloorPlan.astro` — Plan SVG de l'appartement avec légende

**Composants modifiés :**
- `GuestSelector.astro` — Adapté avec prix dynamique par sélection
- `HeroSection.astro` — Badge "Logements privatifs à Cotonou", nouvelles stats
- `ImageGallery.astro` — Support lightbox

**Composants supprimés :**
- `ApartmentCard.astro`
- `ApartmentDetailSection.astro`
- `CompareTable.astro`

## Résultat final

### Homepage

1. **HeroSection** — Badge "Logements privatifs à Cotonou", image salon, stats (60€, 122-167m², 1-6 voyageurs, 10min plage), CTA "Choisir mon logement" + "Voir les photos"
2. **ShowcaseSection** — Grille 5 photos (salon, cuisine, terrasse) + 6 bullet features
3. **LogementCards** — 3 cartes : Logement Duo (1ch, 60€, 122m²), Logement Famille (2ch, 80€, 145m², "le + populaire"), Logement Tribu (3ch, 100€, 167m², "meilleur rapport")
4. **ReviewsSection** — 2 avis (Sefou, Olutayo)
5. **FaqSection** — FAQ accordéon
6. **FinalCta** — "Prêt pour Cotonou ?"
7. **PhotoLightbox** — Lightbox pour toutes les galeries

### Page Appartement

- Hero + section "Comment ça marche" (message privatif)
- Galerie espaces de vie (salon, cuisine, terrasse)
- Galeries par chambre (Chambre 1, 2, 3 avec SDB)
- Plan schématique SVG
- LogementCards + GuestSelector
- CTA final

### Page Fidjrossè

- Sections existantes enrichies (Commerces & services)
- Nouvel encart offre : 3 cartes logements avec photos salons et prix
- 2 CTA légers intermédiaires ajoutés

### Messaging i18n

Le message privatif est renforcé sur toutes les pages via les clés i18n :
- `home.heroBadge` : "Logements privatifs à Cotonou"
- `home.heroSubtitle` : "Appartement entier et privatif — vous ne partagez jamais."
- `home.cardPrivateLabel` : "Appartement entier — 100% privatif"
- `home.cardsSubtitle` : "3 logements, 3 tailles. Chacun est un appartement privé avec salon, cuisine et terrasse."
- `apartment.faq1A` : "Non, jamais. L'appartement est entièrement privatif — personne d'autre n'y séjourne pendant votre réservation."

## Chronologie des commits

### Phase 1 — Sélecteur voyageurs (2026-03-30)

| Commit | Description |
| ------ | ----------- |
| `144f44b` | Refonte UX initiale — 1 appartement + sélecteur voyageurs |
| `f69e28e` | Ajout photos 3 chambres sur homepage |
| `f52fa61` | Prix dynamique dans le sélecteur selon le choix |
| `0af639a` | Clarifier que l'appartement est entier et privatif (REV-001) |
| `a275bbe` | Ajout plan schématique sur homepage |

### Phase 2 — Prototypage (2026-04-01)

| Commit | Description |
| ------ | ----------- |
| `daf158d` | Prototypes UX — 3 logements (4 variantes HTML testées) |
| `91145bf` | Amélioration prototype 3 logements |
| `c114f2d` | Ajout FAQ accordéon au prototype |
| `ef9b4a3` | Renforcement message privatif sur prototype |

### Phase 3 — Implémentation "3 logements privatifs" (2026-04-02 → 2026-04-07)

| Commit | Description |
| ------ | ----------- |
| `e6a44b4` | Renforcer message privatif sur homepage (hero, showcase, FAQ) |
| `cab7057` | Refondre homepage — 3 logements, lightbox, avis |
| `89c766b` | Aligner pages Appartement, FAQ et Hôte avec concept 3 logements |
| `e6d2a82` | Lightbox réutilisable pour toutes les galeries |
| `a2f0e49` | Aligner page Appartement avec concept 3 logements |
| `25a44de` | Enrichir Commerces & services sur page Fidjrossè |
| `9e07ebd` | Clarifier offre Maison Ayaba sur page Fidjrossè |
| `98b7981` | Photos 3 salons dans encart offre Fidjrossè |
| `d01cd17` | 2 CTA légers intermédiaires sur page Fidjrossè |
| `8b63e72` | Aligner page Hôte avec concept 3 logements privatifs |
| `9034d3c` | Aligner blog avec concept 3 logements privatifs |
| `00f1b2e` | Supprimer doublon Réserver dans nav + aligner CTA FAQ |

## Notes

- **Retour utilisateur clé** : le format "3 cartes = 3 produits" de l'ancien site créait la confusion "chambre chez l'habitant". La solution finale conserve 3 cartes mais chacune dit explicitement "Appartement entier — 100% privatif".
- **Prototypes** : 4 fichiers HTML statiques (`test-3/4/5/6-logements.html`) ont été testés avant l'implémentation Astro. Ils restent dans le repo comme référence.
- **BlogLayout** : utilise désormais un CTA vers la page appartement (plus de `AirbnbCta configId` en dur).
- **Clés i18n obsolètes** : les anciennes clés (formules, compare, etc.) restent dans les JSON pour faciliter un rollback via `git revert`.
- **CurrencyToggle.astro** : composant de test local (EUR/FCFA), non inclus dans le site — ne pas commiter.
- **Rollback** : pas de feature flag. Si besoin → `git revert` des commits. Les composants supprimés sont récupérables via git.
