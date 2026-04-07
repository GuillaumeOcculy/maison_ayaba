export interface NeighborhoodItem {
  nameKey: string;
  detailKey: string;
  url?: string;
}

export interface NeighborhoodSection {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  items: NeighborhoodItem[];
  icon?: string;
  columns?: 1 | 2;
}

export interface TransportMode {
  nameKey: string;
  descriptionKey: string;
  priceKey: string;
  tipKey?: string;
}

export const neighborhoodSections: NeighborhoodSection[] = [
  {
    id: 'restaurants',
    titleKey: 'neighborhood.sectionRestaurantsTitle',
    descriptionKey: 'neighborhood.sectionRestaurantsDesc',
    icon: '🍽️',
    columns: 2,
    items: [
      { nameKey: 'neighborhood.restaurant1Name', detailKey: 'neighborhood.restaurant1Detail' },
      { nameKey: 'neighborhood.restaurant2Name', detailKey: 'neighborhood.restaurant2Detail', url: 'https://maps.app.goo.gl/NEekDYqzNskutXQV7' },
      { nameKey: 'neighborhood.restaurant3Name', detailKey: 'neighborhood.restaurant3Detail', url: 'https://maps.app.goo.gl/WQFVMFeM5YU2121XA' },
      { nameKey: 'neighborhood.restaurant4Name', detailKey: 'neighborhood.restaurant4Detail', url: 'https://maps.app.goo.gl/E2wFYsHoYPLLnsQn8' },
      { nameKey: 'neighborhood.restaurant5Name', detailKey: 'neighborhood.restaurant5Detail', url: 'https://maps.app.goo.gl/5YY1NKkFN7auM4ff7' },
      { nameKey: 'neighborhood.restaurant6Name', detailKey: 'neighborhood.restaurant6Detail', url: 'https://maps.app.goo.gl/gGse9c5cxQ3KRRNk7' },
    ],
  },
  {
    id: 'commerces',
    titleKey: 'neighborhood.sectionCommercesTitle',
    descriptionKey: 'neighborhood.sectionCommercesDesc',
    icon: '🛒',
    columns: 2,
    items: [
      { nameKey: 'neighborhood.commerce1Name', detailKey: 'neighborhood.commerce1Detail', url: 'https://maps.app.goo.gl/W1vhD2Vfg1hvRr6a8' },
      { nameKey: 'neighborhood.commerce2Name', detailKey: 'neighborhood.commerce2Detail' },
      { nameKey: 'neighborhood.commerce3Name', detailKey: 'neighborhood.commerce3Detail', url: 'https://maps.app.goo.gl/rGTMEwdcMqBwvMLWA' },
      { nameKey: 'neighborhood.commerce4Name', detailKey: 'neighborhood.commerce4Detail' },
      { nameKey: 'neighborhood.commerce5Name', detailKey: 'neighborhood.commerce5Detail' },
      { nameKey: 'neighborhood.commerce6Name', detailKey: 'neighborhood.commerce6Detail' },
    ],
  },
  {
    id: 'plage',
    titleKey: 'neighborhood.sectionPlageTitle',
    descriptionKey: 'neighborhood.sectionPlageDesc',
    icon: '🏖️',
    items: [
      { nameKey: 'neighborhood.plage1Name', detailKey: 'neighborhood.plage1Detail' },
      { nameKey: 'neighborhood.plage2Name', detailKey: 'neighborhood.plage2Detail' },
      { nameKey: 'neighborhood.plage3Name', detailKey: 'neighborhood.plage3Detail' },
    ],
  },
  {
    id: 'pointsInteret',
    titleKey: 'neighborhood.sectionPointsInteretTitle',
    descriptionKey: 'neighborhood.sectionPointsInteretDesc',
    icon: '📍',
    columns: 2,
    items: [
      { nameKey: 'neighborhood.poi1Name', detailKey: 'neighborhood.poi1Detail', url: 'https://maps.app.goo.gl/ELP1xqUQpeteBvjz9' },
      { nameKey: 'neighborhood.poi2Name', detailKey: 'neighborhood.poi2Detail', url: 'https://maps.app.goo.gl/QtbE9UPhMRrQZWgW6' },
      { nameKey: 'neighborhood.poi3Name', detailKey: 'neighborhood.poi3Detail', url: 'https://maps.app.goo.gl/JEYwh4mYJFq9h16H9' },
      { nameKey: 'neighborhood.poi4Name', detailKey: 'neighborhood.poi4Detail', url: 'https://www.fondation-zinsou.org/' },
    ],
  },
];

export const transportModes: TransportMode[] = [
  {
    nameKey: 'neighborhood.transportZemName',
    descriptionKey: 'neighborhood.transportZemDesc',
    priceKey: 'neighborhood.transportZemPrice',
    tipKey: 'neighborhood.transportZemTip',
  },
  {
    nameKey: 'neighborhood.transportGozemName',
    descriptionKey: 'neighborhood.transportGozemDesc',
    priceKey: 'neighborhood.transportGozemPrice',
    tipKey: 'neighborhood.transportGozemTip',
  },
  {
    nameKey: 'neighborhood.transportChauffeurName',
    descriptionKey: 'neighborhood.transportChauffeurDesc',
    priceKey: 'neighborhood.transportChauffeurPrice',
    tipKey: 'neighborhood.transportChauffeurTip',
  },
  {
    nameKey: 'neighborhood.transportAeroportName',
    descriptionKey: 'neighborhood.transportAeroportDesc',
    priceKey: 'neighborhood.transportAeroportPrice',
  },
];
