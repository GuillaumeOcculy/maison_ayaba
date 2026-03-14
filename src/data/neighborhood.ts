export interface NeighborhoodItem {
  nameKey: string;
  detailKey: string;
}

export interface NeighborhoodSection {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  items: NeighborhoodItem[];
  icon?: string;
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
    items: [
      { nameKey: 'neighborhood.restaurant1Name', detailKey: 'neighborhood.restaurant1Detail' },
      { nameKey: 'neighborhood.restaurant2Name', detailKey: 'neighborhood.restaurant2Detail' },
      { nameKey: 'neighborhood.restaurant3Name', detailKey: 'neighborhood.restaurant3Detail' },
      { nameKey: 'neighborhood.restaurant4Name', detailKey: 'neighborhood.restaurant4Detail' },
    ],
  },
  {
    id: 'commerces',
    titleKey: 'neighborhood.sectionCommercesTitle',
    descriptionKey: 'neighborhood.sectionCommercesDesc',
    icon: '🛒',
    items: [
      { nameKey: 'neighborhood.commerce1Name', detailKey: 'neighborhood.commerce1Detail' },
      { nameKey: 'neighborhood.commerce2Name', detailKey: 'neighborhood.commerce2Detail' },
      { nameKey: 'neighborhood.commerce3Name', detailKey: 'neighborhood.commerce3Detail' },
      { nameKey: 'neighborhood.commerce4Name', detailKey: 'neighborhood.commerce4Detail' },
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
    items: [
      { nameKey: 'neighborhood.poi1Name', detailKey: 'neighborhood.poi1Detail' },
      { nameKey: 'neighborhood.poi2Name', detailKey: 'neighborhood.poi2Detail' },
      { nameKey: 'neighborhood.poi3Name', detailKey: 'neighborhood.poi3Detail' },
      { nameKey: 'neighborhood.poi4Name', detailKey: 'neighborhood.poi4Detail' },
      { nameKey: 'neighborhood.poi5Name', detailKey: 'neighborhood.poi5Detail' },
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
