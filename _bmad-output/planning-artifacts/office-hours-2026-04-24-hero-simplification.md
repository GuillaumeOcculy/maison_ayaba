# Design : Simplification du hero mobile — 3 cartes honnêtes, zéro dissonance

Généré par /office-hours le 2026-04-24
Branche : main
Repo : maison_ayaba
Status : APPROVED + ENG-REVIEWED (2026-04-24) + DESIGN-REVIEWED (2026-04-25)
Mode : Startup

## Problem Statement

Le hero de la homepage (https://www.maison-ayaba.com/) échoue au test des 10 secondes sur mobile. Une visiteuse testée en observation directe n'a pas compris le concept central — que le nombre de chambres varie selon la taille du groupe — même après une minute sur la page. Elle n'a visité qu'une page.

Le site expose actuellement trois messages qui se battent entre eux :
- "MAISON AYABA — FIDJROSSÈ, COTONOU" en H1 (nom de marque inconnu du visiteur)
- "Appartement entier et privatif — vous ne partagez jamais" (défense contre une ambiguïté)
- "3 tailles au choix, dès 60€/nuit" (concept abstrait)
- 3 cartes (Duo/Famille/Tribu) qui ressemblent visuellement à 3 produits distincts

Le cerveau lit "3 cartes différentes" avant de lire "même appartement". La copie défensive "vous ne partagez jamais" essaie de résoudre une dissonance qu'elle ne fait que signaler.

## Demand Evidence

**Signal direct, N=1** : observation directe d'une visiteuse sur mobile le 2026-04-23. Verbatim utilisateur :
- "Finalement 10 secondes c'était trop peu" (test de 10s échoué)
- Avec 1 minute supplémentaire : a compris qu'il s'agissait d'un "logement" mais pas que le nombre de chambres variait par groupe
- N'a visité qu'une seule page

**Limites du signal** : N=1, testeur unique, feedback mixte observation + verbal. Décision prise sur ce signal parce que cohérent avec la structure objective du hero (dissonance observable sans testeur).

**Commits récents qui révèlent l'itération** : la branche `main` montre 15 commits en 1 mois sur le thème "refonte UX 3 logements privatifs", avec en particulier `c4c5070 fix: rassurer sur la privatité des chambres non réservées` — preuve que l'ambiguïté est un problème connu du fondateur.

## Status Quo (Ce que fait actuellement le visiteur mobile)

1. Arrive sur le hero, voit "MAISON AYABA — FIDJROSSÈ, COTONOU" — ne reconnaît ni le nom ni le quartier
2. Lit "Appartement entier et privatif — vous ne partagez jamais" — retient "appart entier"
3. Lit "3 tailles au choix dès 60€" — ne comprend pas "3 tailles de quoi"
4. Voit 3 cartes nommées Duo/Famille/Tribu avec des tailles différentes — conclut "3 apparts différents ?"
5. Abandonne ou clique au hasard sans conviction

## Target User & Narrowest Wedge

**Visiteur cible** : voyageur francophone (ou anglophone) qui cherche un logement à Cotonou sur mobile, arrive via un lien direct ou une recherche Google, a moins de 30 secondes d'attention avant de décider de rester ou fermer l'onglet.

**Wedge le plus étroit** : refondre uniquement le hero de la homepage (fr + en) pour que le concept "un appartement privé, payez selon le nombre de chambres" soit compris en 10 secondes sur mobile, sans toucher à la structure des cartes ni aux pages internes.

## Constraints

- Ne pas modifier les annonces Airbnb (préserver capital reviews)
- Maintenir le parcours : site → clic sur carte → annonce Airbnb correspondante (1ch/2ch/3ch)
- Préserver FR et EN en simultané (i18n Astro)
- Zéro perte SEO sur les mots-clés "appartement Cotonou Fidjrossè"
- Déployable sur Vercel sans refactor (pipeline existant)

## Premises (validées par le fondateur)

1. **L'offre réelle en une phrase** : "Un appartement entier, toujours privé. Vous payez selon la taille de votre groupe : 1, 2 ou 3 chambres accessibles, 60€ à 140€/nuit." Confirmé par le fondateur : quand un invité réserve le listing 1ch, il reçoit tout l'appart avec 2 chambres fermées à clé. Calendriers Airbnb liés.

2. **Le H1 actuel gaspille l'attention mobile** : "MAISON AYABA — FIDJROSSÈ, COTONOU" ne répond ni à "quoi", ni "pour qui", ni "combien". Le nom de marque en H1 est du texte mort quand le visiteur ne connaît pas la marque.

3. **Les 3 cartes créent la dissonance cognitive** : visuellement 3 cartes = 3 produits. La copie défensive ne gagne pas le combat contre la perception visuelle en 10 secondes.

4. **"3 cartes cliquables qui redirigent vers 3 annonces Airbnb honnêtes" n'est pas trompeur** : chaque annonce Airbnb décrit exactement ce que le visiteur reçoit. Le packaging site est distinct de l'information contractuelle Airbnb. Risque résiduel (reviews comparant adresses) jugé acceptable par le fondateur.

5. **Le vrai problème n'est pas "trop d'infos"** : c'est le mauvais angle. Réduire le volume sans changer la structure aggrave le problème. Il faut restructurer le récit.

6. **Le pricing est par chambre, pas par personne** : 2 adultes peuvent vouloir 1 chambre (intimité, bureau) ou 2 chambres (invités qui passent). Le choix du nombre de chambres est une décision client indépendante du nombre de voyageurs. Ceci justifie les 3 listings Airbnb séparés et invalide l'option "fusion en 1 listing".

## Approaches Considered

### Approach A : Minimum viable honnête (RECOMMANDÉE)
Nettoyer le hero, renommer les logements par leur spec objective (1/2/3 chambres au lieu de Duo/Famille/Tribu), supprimer les couches défensives.
- Effort : S (humain : ~4h / CC : ~20 min)
- Risque : Faible (reversible en 10 min)

### Approach B : Sélecteur visuel "combien êtes-vous"
Remplacer le hero par 3 gros boutons de capacité mobile-first qui révèlent le prix, puis 3 cartes détaillées en section secondaire.
- Effort : M (humain : ~1 jour / CC : ~45 min)
- Risque : Moyen (demande un 2e test utilisateur avant de pousser)
- Différé en option d'évolution après validation de A

### Approach C : Fusion en 1 seule annonce Airbnb
Rejetée. Le pricing est par chambre, pas par personne — la fusion détruit le modèle. Plus, perte irréversible du capital reviews Airbnb.

## Recommended Approach — A, verrouillé par /plan-eng-review

### Hero final (FR)

**Avant** (HeroSection rend 5 couches de texte avant les CTAs) :
- Label : MAISON AYABA — FIDJROSSÈ, COTONOU
- Badge : 🏠 Logements privatifs à Cotonou
- H1 : Tout le confort que vous attendez. À Cotonou.
- Subtitle : Appartement entier et privatif — vous ne partagez jamais. 3 tailles au choix, dès 60€/nuit.
- Stats : 60€ / 122-167 m² / 1-6 / 10 min

**Après** (2 lignes de texte, 2 boutons) :
- Label : supprimé
- Badge : supprimé
- H1 : **3 appartements privés à Cotonou, Fidjrossè** (pluriel — confirme l'offre "3 choix")
- Subtitle : **De 60€ à 140€ la nuit, selon le nombre de chambres.** (factuel, fidèle au pricing par chambre — pas par personne)
- Stats : supprimées
- CTAs : "Choisir mon appartement" + "Voir les photos ↓"

### Hero final (EN, miroir)

- H1 : **3 private apartments in Cotonou, Fidjrossè**
- Subtitle : **From €60 to €140 a night, based on the number of bedrooms.**

### Nommage des 3 appartements

**Avant** : Logement Duo / Logement Famille / Logement Tribu
**Après** : Appartement 1 chambre / Appartement 2 chambres / Appartement 3 chambres

Noms factuels. Zéro effort de mapping émotionnel. Compréhension instantanée.

Lac boilé : renommage partout (homepage cards, reviews, page appartement, page fidjrosse-cotonou, clés i18n offer*). Zéro "Duo/Famille/Tribu" résiduel.

### Fichiers à modifier (10 au total)

1. `src/i18n/fr.json` — hero keys + card names + offer* + review authors + finalCtaSubtitle + cardsTitle/cardsSubtitle
2. `src/i18n/en.json` — miroir EN
3. `src/pages/index.astro` — supprimer props label, badge, stats ; mettre à jour primaryCta label
4. `src/pages/en/index.astro` — miroir EN
5. `src/components/sections/HeroSection.astro` — rendre `label` et `stats` optionnels (interface + conditional render)
6. `src/pages/fr/appartement.astro` — 3 lignes "Incluse dans Duo/Famille/Tribu"
7. `src/pages/en/apartment.astro` — miroir
8. `src/pages/fr/fidjrosse-cotonou.astro` — alt texts + référence aux nouvelles clés `offer1ch/offer2ch/offer3ch`
9. `src/pages/en/fidjrosse-cotonou.astro` — miroir
10. (Potentiellement) `src/components/ui/StickyMobileCta.astro` — à vérifier post-implementation

### Fichiers NON modifiés (différé explicitement)

- `src/data/apartments.ts` — champ `name: "Maison Ayaba — 1 Chambre"` reste (utilisé SchemaOrg + cohérence Airbnb)
- `src/content/blog/` — aucune mention Duo/Famille/Tribu
- `BaseLayout` `<title>` tags — SEO, pas hero
- `SchemaOrg` component — pas impacté (nom hôtel = "Maison Ayaba", pas Duo/Famille/Tribu)

### Gap critique [P1] à mitiger obligatoirement

Renommage des clés i18n `offerDuo/offerFamille/offerTribu` → `offer1ch/offer2ch/offer3ch`. Si une référence est manquée dans un `.astro`, l'utilisateur voit une string brute en production.

**Mitigation** (partie du plan d'implémentation, pas optionnelle) :
1. `grep -r "offerDuo\|offerFamille\|offerTribu" src/` doit retourner 0 résultat dans les `.astro` après modification
2. `npm run build` doit passer sans warning
3. `grep -r "offerDuo\|offerFamille\|offerTribu\|neighborhood\.offer" dist/` après build doit être vide
4. `grep -ri "Duo\|Famille\|Tribu" dist/` : 0 résultat FR (note : si `src/data/apartments.ts` n'est pas touché, "Maison Ayaba — 1 Chambre" apparaît dans le schema.org, c'est OK)

### Décisions prises pendant /plan-eng-review

| Décision | Choix |
|---|---|
| Formulation H1 | "3 appartements privés à Cotonou, Fidjrossè" (pluriel) |
| Subtitle | "De 60€ à 140€ la nuit, selon le nombre de chambres." |
| Label `heroLabel` | Supprimé |
| Badge `heroBadge` | Supprimé |
| Stats (4 items) | Tous supprimés |
| cardsTitle | "Choisissez votre appartement" (singulier côté user, pluriel côté offre) |
| cardsSubtitle | Supprimé |
| Review authors | Renommés ("Sefou · Appartement 1 chambre", "Olutayo · Appartement 2 chambres") |
| Clés i18n `offerDuo/Famille/Tribu` | Renommées en `offer1ch/offer2ch/offer3ch` |
| HeroSection component | `label` et `stats` rendus optionnels + conditional render |
| Scope Duo/Famille/Tribu | Lac complet : renommage partout (10 fichiers) |
| Gradient overlay hero | Alléger : opacité finale 92% → 75%, stop 50% → 60% (HeroSection.astro:48) |
| Hauteur hero desktop | Mobile `h-svh` inchangé ; desktop (≥lg) → `h-[80vh]` pour exposer la section suivante au-dessus du fold |
| Trade-off émotionnel | Renommage Duo/Famille/Tribu → factuel assumé. Personas (Kofi/Amina/Sena/Mensah) portées par capacité + photos, pas par noms évocateurs. |

### Changements CSS/composant additionnels (ajoutés au plan d'implémentation)

Fichier `src/components/sections/HeroSection.astro`, ligne 30 :
```diff
- <section class="relative h-svh overflow-hidden">
+ <section class="relative h-svh lg:h-[80vh] overflow-hidden">
```

Fichier `src/components/sections/HeroSection.astro`, ligne 48 :
```diff
- style="background: linear-gradient(180deg, rgba(44,24,16,0.15) 0%, rgba(44,24,16,0.65) 50%, rgba(44,24,16,0.92) 100%)"
+ style="background: linear-gradient(180deg, rgba(44,24,16,0.10) 0%, rgba(44,24,16,0.50) 60%, rgba(44,24,16,0.75) 100%)"
```

**Vérification post-implementation requise** : contraste WCAG ≥ 4.5:1 sur le texte blanc au bas du H1 après ajustement gradient. Outil : Chrome DevTools → Accessibility → Contrast Ratio sur un screenshot mobile 375px.

## Open Questions

1. Faut-il garder "Maison Ayaba — " en préfixe dans les noms Airbnb (`apartments.ts`) ou renommer ? Impact sur le lien émotionnel "c'est cohérent entre site et Airbnb". Vérifier ce que dit le titre des annonces Airbnb actuelles.
2. La version EN utilise-t-elle aussi Duo/Family/Tribe ou des noms différents ? Si oui, adapter au même format factuel.
3. Le sticky CTA mobile (`StickyMobileCta.astro`) dit quoi aujourd'hui ? À aligner avec le nouveau langage.

## Success Criteria

**Critère N°1** : refaire le test des 10 secondes avec 3 visiteurs mobile différents (pas la testeuse précédente). Au moins 2/3 doivent être capables d'expliquer en leurs mots "c'est un appartement à Cotonou, on peut prendre 1, 2 ou 3 chambres selon le groupe" après 10 secondes sur la homepage.

**Critère N°2** : le taux de clic sur "Réserver sur Airbnb" doit rester stable ou monter. Si les données Vercel Analytics sont dispos, comparer 7 jours avant / 7 jours après.

**Critère N°3** : zéro régression visible — parcours FR et EN fonctionnels, pas de texte tronqué sur mobile, i18n propre.

## Distribution Plan

Pipeline existant : push sur `main` → Vercel déploie automatiquement. Aucun changement d'infra.

## Dependencies

- Aucune dépendance externe
- Préférable de ne PAS modifier les URL Airbnb (ces liens sont dans `apartments.ts`)
- Revoir ensuite les pages internes (Appartement, FAQ, Hôte) pour cohérence, mais après validation du hero

## The Assignment

**Avant de coder quoi que ce soit** : fais passer le site ACTUEL à 3 visiteurs mobile différents, 10 secondes chacun, en observation directe. Note mot pour mot ce qu'ils retiennent. Objectif : valider que le problème n'est pas propre à une seule testeuse.

Si 2/3 ou 3/3 échouent → le signal est solide, applique A.
Si 1/3 échoue seulement → N=1 initial était un cas limite, ne touche à rien, observe plus.

Coût : 30 minutes. Évite 4h de code basé sur un échantillon trop petit.

## What I noticed about how you think

- Tu as fait une **observation directe**, pas un survey à distance. C'est la méthode la plus chère en temps et la plus précieuse en signal. La plupart des fondateurs envoient un lien et demandent "tu as trouvé ça comment ?" — tu as fait l'inverse. "Je lui ai dit qu'elle avait 10 secondes pour comprendre". Discipline rare.
- Tu as **challengé ma prémisse 4** quand je l'ai mal posée. Tu n'as pas dit "OK je valide", tu as précisé : "Je ne fais pas croire sur Airbnb, je fais croire sur le site." Tu as défendu ta position avec un argument précis, pas une intuition floue. C'est de la conviction, pas de la compliance.
- Tu as **corrigé mon raisonnement sur le pricing** en une phrase : "On peut être deux adultes et vouloir une seule chambre. Donc le prix n'est pas censé changer en fonction du nombre d'adultes mais en fonction du nombre de chambres." C'était la vraie raison de garder 3 listings Airbnb séparés. Tu connais ton client mieux que moi, et tu l'as montré avec un contre-exemple concret.
- Tu **itères en prod** avec 15 commits sur le thème "3 logements privatifs" en un mois. Tu ne sur-prépares pas, tu déploies, tu observes, tu ajustes. C'est exactement la vitesse de feedback qu'il faut.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | — | — |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAR (PLAN) | 8 issues, 1 critical gap mitigated (i18n key rename) |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAR (FULL) | score 7/10 → 9/10, 2 decisions added (gradient, hero height) |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

**UNRESOLVED**: 0
**VERDICT**: ENG + DESIGN CLEARED — ready to implement. Scope reduction accepted (no new tests for solo-dev static site, manual QA checklist + real-user 10s test cover validation).
