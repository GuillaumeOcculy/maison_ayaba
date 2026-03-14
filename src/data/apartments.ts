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
    // TODO: remplacer par le vrai lien Airbnb
    airbnbUrl: 'https://airbnb.com/rooms/placeholder-1',
  },
  {
    name: 'Maison Ayaba — 2 Chambres',
    slug: '2-chambres',
    bedrooms: 2,
    pricePerNight: { min: 80, max: 100 },
    capacity: 4,
    keyAmenityKeys: ['amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.equippedKitchen', 'amenityNames.livingRoom'],
    // TODO: remplacer par le vrai lien Airbnb
    airbnbUrl: 'https://airbnb.com/rooms/placeholder-2',
  },
  {
    name: 'Maison Ayaba — 3 Chambres',
    slug: '3-chambres',
    bedrooms: 3,
    pricePerNight: { min: 100, max: 140 },
    capacity: 6,
    keyAmenityKeys: ['amenityNames.wifi', 'amenityNames.inverter', 'amenityNames.airConditioning', 'amenityNames.babyCrib', 'amenityNames.washingMachine', 'amenityNames.terrace'],
    // TODO: remplacer par le vrai lien Airbnb
    airbnbUrl: 'https://airbnb.com/rooms/placeholder-3',
  },
];

export function getAmenities(apartment: ApartmentConfig, locale: Locale): string[] {
  return apartment.keyAmenityKeys.map((key) => t(locale, key));
}
