import type { Locale } from '../i18n/utils';
import { t } from '../i18n/utils';

export interface ApartmentConfig {
  name: string;
  slug: string;
  bedrooms: number;
  pricePerNight: { min: number; max: number };
  capacity: number;
  keyAmenityKeys: string[];
  airbnbUrl: string;
}

export const apartments: ApartmentConfig[] = [
  {
    name: 'Maison Ayaba — 1 Chambre',
    slug: '1-chambre',
    bedrooms: 1,
    pricePerNight: { min: 60, max: 80 },
    capacity: 2,
    keyAmenityKeys: ['amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.office'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-1ch',
  },
  {
    name: 'Maison Ayaba — 2 Chambres',
    slug: '2-chambres',
    bedrooms: 2,
    pricePerNight: { min: 80, max: 100 },
    capacity: 4,
    keyAmenityKeys: ['amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.equippedKitchen', 'amenityNames.livingRoom'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-2ch',
  },
  {
    name: 'Maison Ayaba — 3 Chambres',
    slug: '3-chambres',
    bedrooms: 3,
    pricePerNight: { min: 100, max: 140 },
    capacity: 6,
    keyAmenityKeys: ['amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.babyCrib', 'amenityNames.washingMachine', 'amenityNames.terrace'],
    airbnbUrl: 'https://airbnb.fr/h/wabi-sabi-cotonou-3ch',
  },
];

export function getAmenities(apartment: ApartmentConfig, locale: Locale): string[] {
  return apartment.keyAmenityKeys.map((key) => t(locale, key));
}
