import { createHash, randomUUID } from "node:crypto";
import { META_PIXEL_ID } from "./metaPixel";
import { buildLeadCustomData, normalizeUserData, type LeadContact } from "./metaLead";

/**
 * Meta Conversions API: the server-side copy of the Lead.
 *
 * Why both this and the Pixel: the browser event is lost whenever an ad blocker
 * or Safari's tracking protection stops the Pixel, and the server can add
 * signals the browser cannot — the visitor's IP address and user agent. Both
 * carry the same event_id, so Meta keeps one and discards the other.
 *
 * Configuration, all server-side and never in client code:
 *   META_CAPI_ACCESS_TOKEN  required. Events Manager → the pixel → Settings →
 *                           Conversions API → Generate access token.
 *   META_TEST_EVENT_CODE    optional. From Events Manager → Test events; set it
 *                           while testing, remove it for production.
 *   META_GRAPH_VERSION      optional. Defaults to v25.0.
 *
 * Without the token this does nothing and the Pixel alone reports the Lead.
 */

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v25.0";

export type MetaLeadInput = {
  eventId?: string;
  contact: LeadContact;
  modelName?: string;
  answers?: Record<string, string>;
  attribution?: {
    source?: string;
    channel?: string;
    campaign?: string;
    clickId?: string;
    capturedAt?: string;
  } | null;
  currency?: string;
  /** Read from the request before the response is sent. */
  requestInfo: {
    ip?: string | null;
    userAgent?: string | null;
    cookie?: string | null;
    pageUrl?: string | null;
  };
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function readCookie(header: string | null | undefined, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

/**
 * The Pixel writes `_fbc` when a visitor lands from a Facebook click. If the
 * cookie never got written — Pixel blocked, cookies refused — the click id we
 * captured on arrival rebuilds it in Meta's own format.
 */
function fbcFromClickId(clickId?: string, capturedAt?: string): string | undefined {
  if (!clickId?.startsWith("fbclid=")) return undefined;
  const fbclid = clickId.slice("fbclid=".length);
  const clickedAt = Date.parse(capturedAt ?? "") || Date.now();
  return fbclid ? `fb.1.${clickedAt}.${fbclid}` : undefined;
}

export async function sendMetaLead(input: MetaLeadInput): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token || !META_PIXEL_ID) {
    console.info("[meta] META_CAPI_ACCESS_TOKEN is not set; server-side Lead skipped.");
    return;
  }

  const userData: Record<string, string> = {};
  for (const [key, value] of Object.entries(normalizeUserData(input.contact))) {
    if (value) userData[key] = sha256(value);
  }

  // Meta takes these four unhashed.
  const { ip, userAgent, cookie, pageUrl } = input.requestInfo;
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  const fbp = readCookie(cookie, "_fbp");
  if (fbp) userData.fbp = fbp;
  const fbc =
    readCookie(cookie, "_fbc") ??
    fbcFromClickId(input.attribution?.clickId, input.attribution?.capturedAt);
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId || randomUUID(),
        action_source: "website",
        event_source_url: pageUrl || process.env.NEXT_PUBLIC_SITE_URL,
        user_data: userData,
        custom_data: buildLeadCustomData({
          modelName: input.modelName,
          answers: input.answers,
          attribution: input.attribution,
          currency: input.currency,
        }),
      },
    ],
    access_token: token,
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      }
    );

    // Meta's reply carries counts and a trace id, never the user data.
    const reply = await response.text();
    if (!response.ok) {
      console.error("[meta] Conversions API rejected the Lead", response.status, reply);
      return;
    }
    console.info("[meta] Conversions API accepted the Lead", reply);
  } catch (error) {
    console.error("[meta] Conversions API request failed", error);
  }
}
