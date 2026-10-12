/**
 * Where the lead came from.
 *
 * Three signals, in order of how much they can be trusted:
 *
 *   1. Click IDs the ad platforms stamp on the URL themselves (`gclid`,
 *      `fbclid`, `msclkid`…). Machine-set, so they cannot be mistyped.
 *   2. UTM parameters, which say what whoever built the link intended.
 *   3. `document.referrer`, the only thing available for traffic nobody
 *      tagged — organic search, an AI assistant, a forum post.
 *
 * WHAT THIS CANNOT SEE, and it matters when reading the reports:
 *   - The search term. Google stripped keywords from the referrer in 2011.
 *   - Anything at all when the visitor typed the address, opened it from a
 *     PDF or a desktop mail client, or when the referring site sends
 *     `Referrer-Policy: no-referrer`. That lands as "Direct".
 *   - `fbclid` appears on organic Facebook links too, not only ads, so it is
 *     never treated as paid on its own.
 *
 * The referrer only exists on the request that brought the visitor in, so it
 * is captured on first load and kept for the session. Read at submit time it
 * would already be gone after a reload.
 */

export type Channel =
  | "paid"
  | "organic"
  | "ai"
  | "social"
  | "referral"
  | "email"
  | "direct";

export type Attribution = {
  /** Readable origin for the lead email: "Google Ads", "ChatGPT", "Direct"… */
  source: string;
  channel: Channel;
  referrer: string;
  landingPage: string;
  campaign?: string;
  medium?: string;
  term?: string;
  content?: string;
  /** The platform's own click identifier, when there was one. */
  clickId?: string;
  capturedAt: string;
};

const STORAGE_KEY = "desite-attribution";

/** Click identifiers, in the order we would rather report them. */
const CLICK_IDS: { param: string; source: string; channel: Channel }[] = [
  { param: "gclid", source: "Google Ads", channel: "paid" },
  { param: "gbraid", source: "Google Ads", channel: "paid" },
  { param: "wbraid", source: "Google Ads", channel: "paid" },
  { param: "msclkid", source: "Microsoft Ads", channel: "paid" },
  { param: "ttclid", source: "TikTok", channel: "social" },
  { param: "li_fat_id", source: "LinkedIn", channel: "social" },
  // Facebook stamps this on organic posts as well, so it is not "paid".
  { param: "fbclid", source: "Facebook", channel: "social" },
];

/** Referring hosts we can name. Matched on the host or any parent domain. */
const HOSTS: { match: string[]; source: string; channel: Channel }[] = [
  { match: ["chatgpt.com", "chat.openai.com", "openai.com"], source: "ChatGPT", channel: "ai" },
  { match: ["perplexity.ai"], source: "Perplexity", channel: "ai" },
  { match: ["claude.ai"], source: "Claude", channel: "ai" },
  { match: ["gemini.google.com", "bard.google.com"], source: "Gemini", channel: "ai" },
  { match: ["copilot.microsoft.com"], source: "Microsoft Copilot", channel: "ai" },
  { match: ["facebook.com", "l.facebook.com", "m.facebook.com", "lm.facebook.com"], source: "Facebook", channel: "social" },
  { match: ["instagram.com", "l.instagram.com"], source: "Instagram", channel: "social" },
  { match: ["youtube.com", "youtu.be"], source: "YouTube", channel: "social" },
  { match: ["linkedin.com", "lnkd.in"], source: "LinkedIn", channel: "social" },
  { match: ["t.co", "twitter.com", "x.com"], source: "X / Twitter", channel: "social" },
  { match: ["reddit.com", "out.reddit.com"], source: "Reddit", channel: "social" },
  { match: ["tiktok.com"], source: "TikTok", channel: "social" },
  { match: ["pinterest.com"], source: "Pinterest", channel: "social" },
  { match: ["bing.com"], source: "Bing", channel: "organic" },
  { match: ["duckduckgo.com"], source: "DuckDuckGo", channel: "organic" },
  { match: ["search.yahoo.com", "yahoo.com"], source: "Yahoo", channel: "organic" },
  { match: ["ecosia.org"], source: "Ecosia", channel: "organic" },
  { match: ["search.brave.com"], source: "Brave Search", channel: "organic" },
  { match: ["google"], source: "Google", channel: "organic" },
];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Finds a known origin from a host or from a bare `utm_source`. ChatGPT tags
 * its own links with `utm_source=chatgpt.com`, so the same table has to answer
 * for both or that traffic reads as a nameless referral.
 */
function matchSource(value: string) {
  if (!value) return undefined;
  const v = value.toLowerCase().replace(/^www\./, "");
  return HOSTS.find((h) => h.match.some((m) => v === m || v.endsWith(`.${m}`) || v.includes(m)));
}

/** Pure, so it can be unit-checked without a browser. */
export function classify(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const params = url.searchParams;
  const get = (k: string) => params.get(k)?.trim() || undefined;

  const utmSource = get("utm_source");
  const utmMedium = get("utm_medium");
  const click = CLICK_IDS.find((c) => params.get(c.param));

  const refHost = hostOf(referrer);
  const sameSite = refHost && refHost === hostOf(href);
  const known = sameSite ? undefined : matchSource(refHost);
  // A `utm_source` can itself name a known origin.
  const namedByUtm = utmSource ? matchSource(utmSource) : undefined;

  let source: string;
  let channel: Channel;

  if (utmSource) {
    // Whoever built the link said what it was; that wins.
    source = namedByUtm?.source ?? titleCase(utmSource);
    channel =
      utmMedium && /cpc|ppc|paid|ads?$/i.test(utmMedium)
        ? "paid"
        : utmMedium && /email|newsletter/i.test(utmMedium)
          ? "email"
          : utmMedium && /social/i.test(utmMedium)
            ? "social"
            : (known?.channel ?? namedByUtm?.channel ?? "referral");
    if (channel === "paid" && click) source = click.source;
  } else if (click) {
    source = click.source;
    channel = click.channel;
  } else if (known) {
    source = known.source;
    channel = known.channel;
  } else if (refHost && !sameSite) {
    source = `Referral: ${refHost}`;
    channel = "referral";
  } else {
    source = "Direct";
    channel = "direct";
  }

  return {
    source,
    channel,
    referrer: sameSite ? "" : referrer,
    landingPage: url.pathname + url.search,
    campaign: get("utm_campaign"),
    medium: utmMedium,
    term: get("utm_term"),
    content: get("utm_content"),
    clickId: click ? `${click.param}=${params.get(click.param)}` : undefined,
    capturedAt: new Date().toISOString(),
  };
}

/**
 * First touch of this session. Later navigation inside the site must not
 * overwrite it, or every lead would read as "Direct".
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    // Private window, or storage blocked. Fall through and classify live.
  }

  const attribution = classify(window.location.href, document.referrer);

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Nothing to do; the lead still carries what we worked out just now.
  }

  return attribution;
}
