import frTranslations from './fr.json';
import enTranslations from './en.json';

export type Locale = 'fr' | 'en';

export const DEFAULT_LOCALE: Locale = 'fr';
export const LOCALES: Locale[] = ['fr', 'en'];

const translations: Record<Locale, Record<string, unknown>> = {
  fr: frTranslations,
  en: enTranslations,
};

export function getLocale(url: URL): Locale {
  const segment = url.pathname.split('/')[1];
  if (LOCALES.includes(segment as Locale)) {
    return segment as Locale;
  }
  return DEFAULT_LOCALE;
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function getLocalizedUrl(url: URL, targetLocale: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return '/' + segments.join('/');
}
