# Maison Ayaba — Source de vérité

## Architecture de marque
- **Maison Ayaba** = la marque-hôte / la collection (porte la confiance et la qualité).
- Chaque bien a son propre nom, toujours présenté en **endossement** :
  `Nom du bien — un appartement Maison Ayaba`.
- Bien n°1 : **Wabi-Sabi** (Fidjrossè), proposé en 3 formats liés sur Airbnb (1/2/3 chambres, même appartement physique).
- Bien n°2 : à venir (~1 mois) — choisir un nom dans une convention cohérente (idéalement ancrée culture béninoise/ouest-africaine, en phase avec « Ayaba », yoruba-fon pour « reine »).
- Positionnement : « Royauté africaine, confort contemporain ».

## Design system
> Source canonique : https://api.anthropic.com/v1/design/h/WujO63HPpCXnzJVhiOE-0g (Claude Design).
> Tenter de récupérer au build ; sinon utiliser les tokens ci-dessous.

- Couleurs : terracotta `#BE4A2F` (primaire), or `#C99A3B` (accent), crème `#F7F1E6` (fond), espresso `#2C1810` (texte/foncé).
- Typo : Playfair Display (serif, titres) + Inter (sans, corps).
- Marque : crown + arch gateway (SVG vectoriel).
- **Zéro emoji.** Icônes ligne terracotta ou numéros Playfair à la place.

## Règles de copie
- Jamais « appartement privé / privatif » (redondant pour une location entière).
- Voyageurs : « 1 à 6 », jamais « 2 à 6 ».
- Registre « vous ». Signature des comms invités : « Maison Ayaba » (pas le prénom).
- Transfert aéroport = **courtoisie offerte**, jamais présenté comme une obligation contractuelle (« offert / organisé », pas « garanti »).
- Aucune preuve sociale inventée : uniquement des chiffres/avis vérifiables.
- « vos réunions », pas « votre call ».
- Réassurance anti-partage : « Rien que pour vous » / « Yours alone ».

## Stack
- Astro v6, bilingue FR/EN (routes /fr/ et /en/).
- Landing Meta : /fr/reserver-cotonou/ (+ variantes /aeroport/ /wifi/), sans nav, Meta Pixel.
