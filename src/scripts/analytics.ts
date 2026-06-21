/**
 * Helpers de tracking analytics (Meta Pixel + GA4).
 * Tout est défensif : si fbq / gtag ne sont pas chargés, on ne fait rien.
 */

import { sendMeta } from './meta-capi';

declare const gtag: ((...args: unknown[]) => void) | undefined;

const eventByConfig: Record<string, string> = {
  '1ch': 'Choix1Chambre',
  '2ch': 'Choix2Chambres',
  '3ch': 'Choix3Chambres',
};

/**
 * Envoie un événement Meta (pixel + Conversions API, dédupliqués via event_id)
 * et GA4. `command` distingue event standard ('track') et custom ('trackCustom').
 */
function emit(
  command: 'track' | 'trackCustom',
  metaEvent: string,
  gaEvent: string,
  params: Record<string, unknown>,
): void {
  sendMeta(command, metaEvent, params);
  if (typeof gtag !== 'undefined') gtag('event', gaEvent, params);
}

/** Événement Meta personnalisé (+ CAPI) + GA4. */
export function track(metaEvent: string, gaEvent: string, params: Record<string, unknown> = {}): void {
  emit('trackCustom', metaEvent, gaEvent, params);
}

/** Événement Meta standard — Lead, ViewContent… (+ CAPI) + GA4. */
export function trackStandard(metaEvent: string, gaEvent: string, params: Record<string, unknown> = {}): void {
  emit('track', metaEvent, gaEvent, params);
}

/**
 * Branche le tracking de clic sur tous les CTA Airbnb de la page.
 * Idempotent : un élément déjà branché (data-tracked) est ignoré.
 */
export function bindAirbnbCtas(): void {
  document.querySelectorAll<HTMLElement>('[data-airbnb-cta]').forEach((cta) => {
    if (cta.dataset.tracked) return;
    cta.dataset.tracked = '1';

    cta.addEventListener('click', () => {
      const config = cta.dataset.configId ?? '';
      const page = window.location.pathname;

      // Événement global du funnel (conservé).
      track('GoAirbnb', 'airbnb_click', { config, page });

      // Événement dédié par format pour comparer les 3 dans Meta.
      const metaEvent = eventByConfig[config];
      if (metaEvent) track(metaEvent, 'select_apartment', { config, page });
    });
  });
}

/** Déclenche un événement une seule fois par chargement de page. */
export function trackOnce(key: string, metaEvent: string, gaEvent: string, params: Record<string, unknown> = {}): void {
  const w = window as unknown as { __ayabaFired?: Record<string, boolean> };
  w.__ayabaFired ??= {};
  if (w.__ayabaFired[key]) return;
  w.__ayabaFired[key] = true;
  track(metaEvent, gaEvent, { ...params, page: window.location.pathname });
}
