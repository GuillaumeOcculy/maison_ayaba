import type { Locale } from '../i18n/utils';
import { t } from '../i18n/utils';

export interface ApartmentConfig {
  name: string;
  slug: string;
  bedrooms: number;
  pricePerNight: { min: number; max: number };
  pricePerPerson?: { amount: number; guests: number };
  capacity: number;
  keyAmenityKeys: string[];
  descriptionKey: string;
  galleryImageSlugs: string[];
  airbnbUrl: string;
}

/** Équipements communs à toutes les configurations */
export const sharedAmenityKeys: string[] = [
  'amenityNames.wifi',
  'amenityNames.ethernet',
  'amenityNames.inverter',
  'amenityNames.airConditioning',
  'amenityNames.ceilingFan',
  'amenityNames.equippedKitchen',
  'amenityNames.coffeeMachine',
  'amenityNames.washingMachine',
  'amenityNames.tv',
  'amenityNames.hotWater',
  'amenityNames.linens',
  'amenityNames.hairDryer',
  'amenityNames.iron',
  'amenityNames.babyCrib',
  'amenityNames.safe',
  'amenityNames.freeParking',
  'amenityNames.beachAccess',
  'amenityNames.terrace',
  'amenityNames.outdoorDining',
  'amenityNames.cleaning',
  'amenityNames.luggageStorage',
  'amenityNames.longStays',
  'amenityNames.smokeDetector',
  'amenityNames.firstAidKit',
];

export const apartments: ApartmentConfig[] = [
  {
    name: 'Maison Ayaba — 1 Chambre',
    slug: '1-chambre',
    bedrooms: 1,
    pricePerNight: { min: 60, max: 80 },
    capacity: 2,
    keyAmenityKeys: ['amenityNames.livingRoom', 'amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.equippedKitchen'],
    descriptionKey: 'apartment.config1chDescription',
    galleryImageSlugs: ['chambre1'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-1ch',
  },
  {
    name: 'Maison Ayaba — 2 Chambres',
    slug: '2-chambres',
    bedrooms: 2,
    pricePerNight: { min: 80, max: 100 },
    pricePerPerson: { amount: 25, guests: 4 },
    capacity: 4,
    keyAmenityKeys: ['amenityNames.livingRoom', 'amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.equippedKitchen'],
    descriptionKey: 'apartment.config2chDescription',
    galleryImageSlugs: ['chambre2'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-2ch',
  },
  {
    name: 'Maison Ayaba — 3 Chambres',
    slug: '3-chambres',
    bedrooms: 3,
    pricePerNight: { min: 100, max: 140 },
    pricePerPerson: { amount: 23, guests: 6 },
    capacity: 6,
    keyAmenityKeys: ['amenityNames.livingRoom', 'amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.equippedKitchen'],
    descriptionKey: 'apartment.config3chDescription',
    galleryImageSlugs: ['chambre3'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-3ch',
  },
];

export function getAmenities(apartment: ApartmentConfig, locale: Locale): string[] {
  return apartment.keyAmenityKeys.map((key) => t(locale, key));
}

export function getSharedAmenities(locale: Locale): string[] {
  return sharedAmenityKeys.map((key) => t(locale, key));
}

const EUR_TO_FCFA = 655.957;

export function eurToFcfa(eur: number): string {
  const fcfa = Math.round(eur * EUR_TO_FCFA / 1000) * 1000;
  return fcfa.toLocaleString('fr-FR');
}
