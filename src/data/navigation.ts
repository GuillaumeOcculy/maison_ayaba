import { t, type Locale } from '../i18n/utils';

export interface NavItem {
  label: string;
  href: string;
}

interface NavRoute {
  i18nKey: string;
  href: Record<Locale, string>;
}

const NAV_ROUTES: NavRoute[] = [
  { i18nKey: 'nav.home', href: { fr: '/', en: '/en/' } },
  { i18nKey: 'nav.apartment', href: { fr: '/fr/appartement/', en: '/en/apartment/' } },
  { i18nKey: 'nav.neighborhood', href: { fr: '/fr/fidjrosse-cotonou/', en: '/en/fidjrosse-cotonou/' } },
  { i18nKey: 'nav.host', href: { fr: '/fr/votre-hote/', en: '/en/your-host/' } },
  { i18nKey: 'nav.book', href: { fr: '/fr/reserver/', en: '/en/book/' } },
  { i18nKey: 'nav.blog', href: { fr: '/fr/blog/', en: '/en/blog/' } },
];

export function getNavigation(locale: Locale): NavItem[] {
  return NAV_ROUTES.map((route) => ({
    label: t(locale, route.i18nKey),
    href: route.href[locale],
  }));
}

/**
 * Get the alternate URL for hreflang tags.
 * Uses NAV_ROUTES mapping to correctly translate page slugs between locales.
 */
export function getAlternateUrl(currentPath: string, targetLocale: Locale): string {
  for (const route of NAV_ROUTES) {
    for (const loc of Object.keys(route.href) as Locale[]) {
      if (route.href[loc] === currentPath) {
        return route.href[targetLocale];
      }
    }
  }
  // Fallback: replace locale prefix (first segment) with target locale
  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length >= 2 && (segments[0] === 'fr' || segments[0] === 'en')) {
    segments[0] = targetLocale;
    return '/' + segments.join('/') + '/';
  }
  // No locale prefix or root path — prepend target locale
  return `/${targetLocale}/`;
}
