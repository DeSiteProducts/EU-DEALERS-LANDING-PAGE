import type { MetaUserFields } from "./metaLead";

/**
 * Meta (Facebook) Pixel.
 *
 * The Lead event is fired on /thank-you, not inside the form's submit handler,
 * and only once per real submission. The form leaves a one-time handoff in
 * sessionStorage; the thank-you page fires Lead against it and marks it spent.
 * That keeps three things out of the lead count: a refresh of the thank-you
 * page, someone opening /thank-you directly, and a crawler following the URL.
 *
 * The same lead is also sent server-side through the Conversions API
 * (app/lib/metaCapi.server.ts) with the same event id, so Meta counts it once
 * and still receives it when an ad blocker stops the Pixel.
 */

const configuredPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const META_PIXEL_ID = /^\d+$/.test(configuredPixelId) ? configuredPixelId : "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const HANDOFF_KEY = "desite-lead-handoff";

export type LeadHandoff = {
  /** Shared with the Conversions API send, which is how Meta dedupes the two. */
  eventId: string;
  /** Slug of the recommended model, or null when the answers did not decide. */
  model: string | null;
  /** Both model families suggested by the current questionnaire. */
  models?: string[];
  source: string | null;
  channel: string | null;
  currency: string;
  /** Customer information for Advanced Matching, already SHA-256 hashed. */
  userData?: MetaUserFields;
  /** Event parameters. See buildLeadCustomData. */
  customData?: Record<string, string>;
  firedAt?: string;
};

export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * SHA-256 in the browser. Returns nothing rather than plaintext when the page
 * is not in a secure context and SubtleCrypto is unavailable.
 */
export async function hashForMeta(fields: MetaUserFields): Promise<MetaUserFields> {
  if (typeof crypto === "undefined" || !crypto.subtle) return {};

  const hashed: MetaUserFields = {};
  for (const [key, value] of Object.entries(fields) as [keyof MetaUserFields, string][]) {
    if (!value) continue;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    hashed[key] = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return hashed;
}

export function saveLeadHandoff(handoff: Omit<LeadHandoff, "firedAt">): void {
  try {
    window.sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
  } catch {
    // Storage blocked: the thank-you page still renders, just without the Lead.
  }
}

export function readLeadHandoff(): LeadHandoff | null {
  try {
    const raw = window.sessionStorage.getItem(HANDOFF_KEY);
    return raw ? (JSON.parse(raw) as LeadHandoff) : null;
  } catch {
    return null;
  }
}

/** Marks the Lead as sent and drops the hashed contact data, which is done with. */
export function markLeadFired(handoff: LeadHandoff): void {
  try {
    const rest = { ...handoff };
    delete rest.userData;
    window.sessionStorage.setItem(
      HANDOFF_KEY,
      JSON.stringify({ ...rest, firedAt: new Date().toISOString() })
    );
  } catch {
    // Nothing to do.
  }
}

/**
 * The base code loads after hydration, so a fast submit can reach the thank-you
 * page before `fbq` exists. Waits for it rather than dropping the event; gives
 * up quietly when an ad blocker means it will never arrive.
 */
export function whenPixelReady(timeoutMs = 4000): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window.fbq === "function") return resolve(true);
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (typeof window.fbq === "function") {
        window.clearInterval(timer);
        resolve(true);
      } else if (Date.now() - started > timeoutMs) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}
