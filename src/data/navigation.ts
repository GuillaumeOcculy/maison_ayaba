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
  { i18nKey: 'nav.home', href: { fr: '/fr/', en: '/en/' } },
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
