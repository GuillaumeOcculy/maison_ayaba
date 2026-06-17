/**
 * Helpers de tracking analytics (Meta Pixel + GA4).
 * Tout est défensif : si fbq / gtag ne sont pas chargés, on ne fait rien.
 */

declare const fbq: ((...args: unknown[]) => void) | undefined;
declare const gtag: ((...args: unknown[]) => void) | undefined;

const eventByConfig: Record<string, string> = {
  '1ch': 'Choix1Chambre',
  '2ch': 'Choix2Chambres',
  '3ch': 'Choix3Chambres',
};

/** Envoie un événement personnalisé Meta Pixel + GA4 (no-op si non chargés). */
export function track(metaEvent: string, gaEvent: string, params: Record<string, unknown> = {}): void {
  if (typeof fbq !== 'undefined') fbq('trackCustom', metaEvent, params);
  if (typeof gtag !== 'undefined') gtag('event', gaEvent, params);
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
