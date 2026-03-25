import { DEFAULT_LOCALE, LOCALES, type Locale } from '../i18n/utils';

export const siteName = 'Maison Ayaba';

export const siteDescription: Record<Locale, string> = {
  fr: "Appartement entier à Fidjrossè, Cotonou — 1, 2 ou 3 chambres, protocole Kwabo, réservation Airbnb",
  en: 'Entire apartment in Fidjrossè, Cotonou — 1, 2 or 3 bedrooms, Kwabo protocol, Airbnb booking',
};

export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;

export const baseUrl = import.meta.env.SITE || 'https://maison-ayaba.com';

// Updated 2026-03-15: changed from 33618666612 to new business line
export const whatsappNumber = '33666419693';
