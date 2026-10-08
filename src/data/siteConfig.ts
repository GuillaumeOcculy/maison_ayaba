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

// Note globale Airbnb (profil hôte, toutes annonces confondues). À mettre à jour à la main.
// Updated 2026-10-08 : 4,83/5 sur 24 avis, statut Superhôte.
export const airbnbRating = { value: 4.83, count: 24 };

/** Profil hôte public : rend la note et le statut Superhôte vérifiables. */
export const airbnbProfileUrl = 'https://www.airbnb.fr/users/profile/1608165028400821748';

/** « 4,83/5 » en FR, « 4.83/5 » en EN. */
export const ratingLabel = (locale: Locale) =>
  `${airbnbRating.value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: 2 })}/5`;
