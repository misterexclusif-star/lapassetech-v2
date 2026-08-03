/**
 * POST /api/subscribe
 * Ajoute un abonné MailerLite au bon groupe selon le type de formulaire.
 * Cet endpoint tourne côté serveur (Vercel Function) — la clé API n'est jamais exposée.
 *
 * Body JSON : { email: string, type: "newsletter" | "lm-cpf" | "guide" }
 * Réponse   : { ok: true } | { ok: false, error: string }
 */
export const prerender = false;

import type { APIRoute } from "astro";

// IDs des groupes MailerLite (récupérés via API).
// Liste blanche : tout type absent de cette table renvoie un 400, jamais de fallback.
const GROUPS: Record<string, string> = {
  newsletter: "181397749489469390",
  "lm-cpf":   "193915705970656499",
  guide:      "182053505660355972",
};

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  // Vérification de la clé API
  const ML_KEY = import.meta.env.MAILERLITE_API_KEY;
  if (!ML_KEY) {
    return new Response(
      JSON.stringify({ ok: false, error: "Server configuration error" }),
      { status: 500, headers }
    );
  }

  // Parsing du body
  let email: string | undefined;
  let type: string | undefined;
  try {
    const body = await request.json();
    email = body.email?.trim().toLowerCase();
    type  = body.type;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Invalid JSON body" }),
      { status: 400, headers }
    );
  }

  // Validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Adresse email invalide." }),
      { status: 400, headers }
    );
  }
  const groupId = GROUPS[type ?? ""];
  if (!groupId) {
    return new Response(
      JSON.stringify({ ok: false, error: "Type de formulaire inconnu." }),
      { status: 400, headers }
    );
  }

  // Appel MailerLite API v3
  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ML_KEY}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        status: "active",
      }),
    });

    // 200 = mise à jour, 201 = création — les deux sont OK
    if (mlRes.ok || mlRes.status === 200 || mlRes.status === 201) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }

    const err = await mlRes.json().catch(() => ({}));
    const msg = (err as any)?.message ?? `MailerLite error ${mlRes.status}`;
    return new Response(
      JSON.stringify({ ok: false, error: msg }),
      { status: mlRes.status, headers }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: "Erreur réseau, réessaie dans un instant." }),
      { status: 502, headers }
    );
  }
};
