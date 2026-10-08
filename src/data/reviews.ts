import type { Locale } from '../i18n/utils';

// Avis réels, recopiés depuis les 3 annonces Airbnb (relevé du 2026-10-08).
// Textes fidèles aux originaux : seules les fautes de frappe et les emojis ont été retirés.
// Ordre = ordre d'affichage. `featured` = repris aussi sur la landing Meta.

export interface Review {
  author: string;
  origin?: Record<Locale, string>;
  bedrooms: 1 | 2 | 3;
  date: string; // AAAA-MM
  featured?: boolean;
  text: Record<Locale, string>;
}

export const reviews: Review[] = [
  {
    author: 'Ore',
    origin: { fr: 'Lagos, Nigeria', en: 'Lagos, Nigeria' },
    bedrooms: 3,
    date: '2026-06',
    featured: true,
    text: {
      fr: "Ma famille et moi avons apprécié notre séjour dans l'appartement. Il était super propre et il était clair que les gestionnaires avaient beaucoup réfléchi au confort des voyageurs : batteries externes dans les chambres, parapluies, tapis d'exercice, instructions d'utilisation des appareils, etc. L'appartement est également à deux pas de la plage, ce qui est vraiment la cerise sur le gâteau. Vivement recommandé.",
      en: "My family and I enjoyed our stay in the apartment. It was super clean and it was clear the managers had put a lot of thought into guests' comfort: power banks in the bedrooms, umbrellas, exercise mats, appliance instructions, etc. The apartment is also a stone's throw from the beach, which is really the icing on the cake. Highly recommended.",
    },
  },
  {
    author: 'Frantz',
    origin: { fr: 'Paris, France', en: 'Paris, France' },
    bedrooms: 3,
    date: '2026-06',
    featured: true,
    text: {
      fr: "Logement extrêmement bien situé (10 min max de l'aéroport en voiture, toutes les commodités à moins de 10 min à pied), impeccable, avec une décoration épurée et des meubles valorisant le savoir-faire béninois. L'appartement est très très bien équipé (machine à laver, fer + table à repasser, machine à café…) : on se sent comme à la maison. Cet appartement dépasse très largement le niveau global des appartements proposés à Cotonou.",
      en: 'Exceptionally well located (10 min max from the airport by car, every amenity within a 10-minute walk), spotless, with understated decor and furniture that showcases Beninese craftsmanship. The apartment is very, very well equipped (washing machine, iron + board, coffee machine…): you feel right at home. This apartment is well above the general standard of apartments offered in Cotonou.',
    },
  },
  {
    author: 'Benjamin',
    bedrooms: 2,
    date: '2026-06',
    featured: true,
    text: {
      fr: "Si vous voyez que cet appartement est disponible, vous devriez absolument le réserver. Non seulement le rapport qualité-prix est excellent, mais l'appartement est spacieux et beau. Il dispose d'équipements incroyables qui nous ont donné envie de ne plus jamais partir. Cet appartement est l'un des meilleurs Airbnb dans lesquels j'ai jamais séjourné. Emplacement idéal pour les restaurants, les bars et la plage. Nos hôtes ont été incroyablement serviables pour organiser les choses pour nous au Bénin et ont rendu notre voyage fluide et sans accroc. Nous reviendrons !",
      en: "If you see this apartment is available, you should absolutely book it. Not only is it excellent value for money, the apartment is spacious and beautiful. It has incredible amenities that made us never want to leave. This apartment is one of the best Airbnbs I have ever stayed in. Ideal location for restaurants, bars and the beach. Our hosts were incredibly helpful in arranging things for us in Benin and made our trip smooth and seamless. We'll be back!",
    },
  },
  {
    author: 'Omilade',
    origin: { fr: 'Chester, Virginie', en: 'Chester, Virginia' },
    bedrooms: 3,
    date: '2026-07',
    featured: true,
    text: {
      fr: "J'ai adoré mon séjour. L'appartement était parfaitement équipé, avec tout ce dont nous avions besoin. Ils ont vraiment pensé à tout, et ces petites attentions (comme un parapluie laissé dans la chambre au cas où) font toute la différence. Olivia est un ange ! Tellement gentille et serviable. Le quartier se fait très bien à pied, et il est aussi très calme et paisible. J'espère vraiment revenir !",
      en: "I loved it there. The apartment was well-stocked with everything we needed. They really thought of everything, and the little touches (like leaving an umbrella in your room in case you need it) make a big difference. The host Olivia is an angel! She was so kind and so helpful. The area is very walkable and it's also very quiet and peaceful. I definitely hope to come back and stay there again!",
    },
  },
  {
    author: 'Sandrine',
    bedrooms: 2,
    date: '2026-09',
    featured: true,
    text: {
      fr: "Ce logement est spacieux et moderne. Il convient parfaitement pour une famille, surtout qu'il est sécurisé. Nous avons été accueillis à l'aéroport et avons passé 15 jours merveilleux à Cotonou. Le logement est équipé de la clim et de ventilateurs, de moustiquaires aux fenêtres. Merci Olivia pour cet accueil fabuleux.",
      en: 'This apartment is spacious and modern. It is perfect for a family, especially since it is secure. We were met at the airport and spent 15 wonderful days in Cotonou. The apartment has air conditioning and fans, and mosquito screens on the windows. Thank you Olivia for such a fabulous welcome.',
    },
  },
  {
    author: 'Eric',
    origin: { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Côte d'Ivoire" },
    bedrooms: 3,
    date: '2026-08',
    featured: true,
    text: {
      fr: "Excellent séjour ! Le logement était très propre, confortable et parfaitement conforme à nos attentes. Le quartier est calme, ce qui permet vraiment de se poser et de profiter tranquillement du séjour. Un grand merci à Olivia et à son collaborateur Toussaint, qui ont été disponibles, accueillants et très agréables tout au long de notre passage. Une très bonne adresse à Cotonou que nous recommandons sans hésiter. Nous reviendrons avec plaisir !",
      en: 'An excellent stay! The apartment was very clean, comfortable and fully lived up to our expectations. The neighborhood is quiet, which really lets you unwind and enjoy your stay in peace. Many thanks to Olivia and her colleague Toussaint, who were available, welcoming and very pleasant throughout. A great address in Cotonou that we recommend without hesitation. We will gladly be back!',
    },
  },
  {
    author: 'Jose-Carlos',
    origin: { fr: 'Silver Spring, Maryland', en: 'Silver Spring, Maryland' },
    bedrooms: 3,
    date: '2026-09',
    text: {
      fr: "Ma famille a séjourné ici 5 nuits et a passé un excellent moment. L'appartement était propre, confortable et bien équipé, exactement comme sur les photos. Il est aussi idéalement situé, pas très loin de la plage. Olivia a été très réactive, serviable et facile à joindre tout au long de notre séjour. Nous recommandons vivement cet endroit !",
      en: 'My family stayed here for 5 nights and had a great experience. The apartment was clean, cozy, and well equipped, exactly as shown in the pictures. It’s also conveniently located, not too far from the beach. Olivia was very responsive, helpful, and easy to communicate with throughout our stay. We really enjoyed our time here and would definitely recommend this place!',
    },
  },
  {
    author: 'Darianne',
    origin: { fr: 'Rennes, France', en: 'Rennes, France' },
    bedrooms: 1,
    date: '2026-07',
    text: {
      fr: "Un séjour absolument parfait ! L'appartement Wabi-Sabi est un véritable havre de paix, propre, très bien décoré et équipé avec tout le nécessaire pour se sentir comme chez soi. L'emplacement à Fidjrossè est idéal et pratique. Un grand merci à Guillaume et Olivia pour leur excellente communication et leur réactivité tout au long du séjour. Je recommande vivement !",
      en: 'An absolutely perfect stay! The Wabi-Sabi apartment is a true haven of peace: clean, beautifully decorated and equipped with everything you need to feel at home. The location in Fidjrossè is ideal and convenient. Many thanks to Guillaume and Olivia for their excellent communication and responsiveness throughout the stay. Highly recommended!',
    },
  },
  {
    author: 'Estelle',
    bedrooms: 2,
    date: '2026-07',
    text: {
      fr: "J'ai passé un excellent séjour dans ce logement. Propre, fonctionnel, très bien décoré, avec tout le nécessaire. Merci au chauffeur qui est venu nous chercher à l'aéroport, et l'hôte était vraiment disponible, réactif et à l'écoute. Le logement est très bien situé et permet de visiter Cotonou sans souci. Je recommande vivement.",
      en: 'I had an excellent stay here. Clean, practical, beautifully decorated, with everything you need. Thanks to the driver who picked us up at the airport, and the host was truly available, responsive and attentive. The apartment is very well located and makes it easy to explore Cotonou. Highly recommended.',
    },
  },
  {
    author: 'Sefou',
    origin: { fr: 'Bruxelles, Belgique', en: 'Brussels, Belgium' },
    bedrooms: 1,
    date: '2026-03',
    text: {
      fr: "Honnêtement, j'ai été agréablement surpris de la qualité du service, du logement, mais plus encore de la réactivité d'Olivia chaque fois que j'ai eu besoin d'une information. Et la localisation du logement le rend encore plus unique. La propreté, le rangement, le cadre, tout était parfait. Je le recommanderais à tous mes proches.",
      en: "Honestly, I was pleasantly surprised by the quality of the service and the apartment, and even more by Olivia's responsiveness whenever I needed information. The location makes it even more unique. Cleanliness, tidiness, setting: everything was perfect. I would recommend it to all my loved ones.",
    },
  },
  {
    author: 'Otsemaye',
    origin: { fr: 'Royaume-Uni', en: 'United Kingdom' },
    bedrooms: 3,
    date: '2026-07',
    text: {
      fr: "Ma famille et moi avons vraiment apprécié notre séjour, Olivia a été très serviable et attentionnée. Les adaptateurs de chargeur dans chaque chambre et le fer à vapeur étaient une belle attention. Elle a également eu la gentillesse de nous trouver une voiture pour nous emmener à notre prochaine destination. Je reviendrai assurément !",
      en: 'My family and I really enjoyed our stay; Olivia was very helpful and thoughtful. The charger adapters in every room and the steam iron were a nice touch. She was also kind enough to find us a car to take us to our next destination. I will definitely be back!',
    },
  },
  {
    author: 'Laurette',
    origin: { fr: 'France', en: 'France' },
    bedrooms: 3,
    date: '2026-05',
    text: {
      fr: "Séjour parfait du début à la fin ! Tout s'est extrêmement bien passé, le logement était impeccable, confortable et conforme à la description. L'accueil, la disponibilité et l'attention portée aux détails ont vraiment fait la différence. Je recommande ce lieu à 100 %, tout était parfait. Merci encore pour cette belle expérience !",
      en: 'A perfect stay from start to finish! Everything went extremely smoothly, the apartment was spotless, comfortable and exactly as described. The welcome, the availability and the attention to detail really made the difference. I recommend this place 100% — everything was perfect. Thank you again for this wonderful experience!',
    },
  },
];

const bedroomLabel: Record<Locale, (n: number) => string> = {
  fr: (n) => `Appartement ${n} chambre${n > 1 ? 's' : ''}`,
  en: (n) => `${n}-bedroom apartment`,
};

/** « Sefou · Bruxelles, Belgique · Appartement 1 chambre » */
export const reviewMeta = (r: Review, locale: Locale) =>
  [r.origin?.[locale], bedroomLabel[locale](r.bedrooms)].filter(Boolean).join(' · ');
