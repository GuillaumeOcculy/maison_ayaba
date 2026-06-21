import type { APIRoute } from 'astro';

// Conversions API (CAPI) : on envoie l'event à Meta côté serveur, en direct.
// Le pixel navigateur envoie le même event avec le même event_id en parallèle ;
// Meta déduplique sur (event_name + event_id). Aucun double comptage.

// Endpoint dynamique : jamais prérendu, jamais mis en cache.
export const prerender = false;

const FALLBACK_PIXEL_ID = '1277691234446313';

type TrackBody = {
  name?: string;
  eventId?: string;
  customData?: Record<string, unknown> | null;
  url?: string;
};

export const POST: APIRoute = async ({ request, clientAddress, cookies }) => {
  // Secrets lus au runtime : process.env sur Vercel, import.meta.env en dev (.env).
  const token = process.env.META_CAPI_ACCESS_TOKEN || import.meta.env.META_CAPI_ACCESS_TOKEN;
  const pixelId =
    process.env.META_PIXEL_ID || import.meta.env.META_PIXEL_ID || FALLBACK_PIXEL_ID;
  const graphVersion =
    process.env.META_GRAPH_VERSION || import.meta.env.META_GRAPH_VERSION || 'v21.0';

  // Pas de token configuré : on ne casse rien côté client, le pixel navigateur
  // continue de fonctionner seul.
  if (!token) {
    return Response.json({ ok: false, reason: 'no-token' });
  }

  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return Response.json({ ok: false, reason: 'bad-json' }, { status: 400 });
  }

  const { name, eventId, customData, url } = body;
  if (!name || !eventId) {
    return Response.json({ ok: false, reason: 'missing-fields' }, { status: 400 });
  }

  // Données d'appariement (match quality). IP et user-agent sont envoyés bruts
  // (Meta les hashe). _fbp / _fbc viennent des cookies posés par le pixel.
  const fbp = cookies.get('_fbp')?.value;
  const fbc = cookies.get('_fbc')?.value;
  const ip =
    clientAddress ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    undefined;
  const ua = request.headers.get('user-agent') || undefined;

  const userData: Record<string, unknown> = {};
  if (ip) userData.client_ip_address = ip;
  if (ua) userData.client_user_agent = ua;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;
  // Note : si un jour on capture email/téléphone (ex. soumission Tally), il faut
  // les ajouter ici hashés en SHA-256 (em / ph) pour booster le match quality.

  const event: Record<string, unknown> = {
    event_name: name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    user_data: userData,
  };
  if (url) event.event_source_url = url;
  if (customData) event.custom_data = customData;

  const payload: Record<string, unknown> = { data: [event] };
  // Code de test (Events Manager > Test events) pour valider l'intégration.
  const testCode = process.env.META_TEST_EVENT_CODE || import.meta.env.META_TEST_EVENT_CODE;
  if (testCode) {
    payload.test_event_code = testCode;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${graphVersion}/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      console.error('[CAPI] Meta a rejeté l’event', res.status, JSON.stringify(detail));
      return Response.json({ ok: false, status: res.status }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error('[CAPI] Erreur réseau vers Meta', e);
    return Response.json({ ok: false }, { status: 502 });
  }
};
