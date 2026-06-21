/**
 * Cœur du tracking Meta : pixel navigateur + Conversions API (CAPI), dédupliqués.
 *
 * Chaque event part sur DEUX canaux avec le même event_id :
 *   1. Pixel navigateur (4e argument {eventID} → active la déduplication Meta)
 *   2. Conversions API côté serveur (/api/track/) avec le même eventID
 * Meta déduplique sur (event_name + event_id), donc aucun double comptage.
 * Résilient : si la CAPI échoue, le pixel a déjà fait son travail.
 */

export const FB_PIXEL_ID = '1277691234446313';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Identifiant partagé pixel ↔ CAPI. Meta déduplique sur (event_name + event_id). */
function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Déclenche fbq de façon fiable. Si fbq n'est pas encore chargé (race au premier
 * rendu d'un accès direct), on réessaie jusqu'à ce qu'il le soit, puis on abandonne.
 */
function fbqSafe(...args: unknown[]): void {
  if (typeof window === 'undefined') return;

  if (typeof window.fbq === 'function') {
    window.fbq(...args);
    return;
  }

  let tries = 0;
  const id = window.setInterval(() => {
    tries += 1;
    if (typeof window.fbq === 'function') {
      window.clearInterval(id);
      window.fbq(...args);
    } else if (tries > 50) {
      window.clearInterval(id); // abandon après ~10s
    }
  }, 200);
}

/**
 * Envoie un event Meta sur les deux canaux avec le même event_id.
 * `command` : 'track' pour un event standard (Lead, ViewContent…),
 *             'trackCustom' pour un event personnalisé.
 */
export function sendMeta(
  command: 'track' | 'trackCustom',
  name: string,
  customData: Record<string, unknown> = {},
): void {
  const eventId = newEventId();

  // 1) Pixel navigateur (avec eventID pour la déduplication).
  fbqSafe(command, name, customData, { eventID: eventId });

  // 2) Conversions API (serveur). Fire-and-forget, keepalive pour survivre à la
  //    navigation / fermeture d'onglet.
  if (typeof window === 'undefined') return;
  try {
    fetch('/api/track/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name,
        eventId,
        customData,
        url: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // on ignore : le pixel navigateur reste la source de secours
  }
}
