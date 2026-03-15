import { DEFAULT_LOCALE, LOCALES, type Locale } from '../i18n/utils';

export const siteName = 'Maison Ayaba';

export const siteDescription: Record<Locale, string> = {
  fr: "Votre appartement d'exception à Fidjrossè, Cotonou — 3 configurations, protocole Kwabo, réservation Airbnb",
  en: 'Your exceptional apartment in Fidjrossè, Cotonou — 3 configurations, Kwabo protocol, Airbnb booking',
};

export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;

export const baseUrl = import.meta.env.SITE || 'https://maison-ayaba.com';

// Updated 2026-03-15: changed from 33618666612 to new business line
export const whatsappNumber = '33666419693';
