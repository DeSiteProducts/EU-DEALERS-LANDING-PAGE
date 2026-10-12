/**
 * What a lead tells Meta, shared by the browser Pixel and the server-side
 * Conversions API so both describe the same person the same way.
 *
 * Meta matches a conversion to an ad click by comparing hashes of these fields
 * against its own users. A hash only matches if the input was normalised
 * exactly the way Meta normalises on its side — "Dana@Example.com " and
 * "dana@example.com" produce different hashes — so the rules below follow
 * Meta's customer-information parameter spec, and this module is the only
 * place they live. No hashing here: the browser and Node each hash with their
 * own crypto.
 *
 * Street address is deliberately absent. Meta has no parameter for it.
 */

export type LeadContact = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  /** ISO 3166-1 alpha-2, from the proxy's IP lookup. */
  country?: string;
};

/** Meta's customer-information keys, normalised but not yet hashed. */
export type MetaUserFields = Partial<
  Record<"em" | "ph" | "fn" | "ln" | "ct" | "st" | "zp" | "country" | "external_id", string>
>;

/** Lowercase a-z only: accents folded, spaces and punctuation dropped. */
function letters(value?: string): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

/** Full state and province names to the two-letter codes Meta expects. */
const REGION_CODES: Record<string, string> = {
  alabama: "al", alaska: "ak", arizona: "az", arkansas: "ar", california: "ca",
  colorado: "co", connecticut: "ct", delaware: "de", districtofcolumbia: "dc",
  florida: "fl", georgia: "ga", hawaii: "hi", idaho: "id", illinois: "il",
  indiana: "in", iowa: "ia", kansas: "ks", kentucky: "ky", louisiana: "la",
  maine: "me", maryland: "md", massachusetts: "ma", michigan: "mi", minnesota: "mn",
  mississippi: "ms", missouri: "mo", montana: "mt", nebraska: "ne", nevada: "nv",
  newhampshire: "nh", newjersey: "nj", newmexico: "nm", newyork: "ny",
  northcarolina: "nc", northdakota: "nd", ohio: "oh", oklahoma: "ok", oregon: "or",
  pennsylvania: "pa", rhodeisland: "ri", southcarolina: "sc", southdakota: "sd",
  tennessee: "tn", texas: "tx", utah: "ut", vermont: "vt", virginia: "va",
  washington: "wa", westvirginia: "wv", wisconsin: "wi", wyoming: "wy", puertorico: "pr",
  alberta: "ab", britishcolumbia: "bc", manitoba: "mb", newbrunswick: "nb",
  newfoundlandandlabrador: "nl", newfoundland: "nl", novascotia: "ns", ontario: "on",
  princeedwardisland: "pe", quebec: "qc", saskatchewan: "sk",
  northwestterritories: "nt", nunavut: "nu", yukon: "yt",
};

function region(value?: string): string {
  const clean = letters(value);
  if (!clean) return "";
  return REGION_CODES[clean] ?? clean;
}

/** Digits with the country code: 1(800) 509 3915 becomes 18005093915. */
function phone(value?: string): string {
  const digits = (value ?? "").replace(/\D/g, "");
  // Only match international numbers; never assume a US country code.
  const international = value?.trim().startsWith("+") || value?.trim().startsWith("00");
  const normalized = value?.trim().startsWith("00") ? digits.slice(2) : digits;
  return international && normalized.length >= 7 && normalized.length <= 15 ? normalized : "";
}

/** US ZIPs keep five digits; Canadian postal codes lose the space. */
function postal(value: string | undefined, country: string): string {
  const raw = (value ?? "").toLowerCase().replace(/[\s-]/g, "");
  if (!raw) return "";
  const us = /^\d{5}/.exec(raw);
  if (us && country === "us") return us[0];
  return raw;
}

export function normalizeUserData(contact: LeadContact): MetaUserFields {
  const country = /^[a-z]{2}$/i.test(contact.country ?? "") ? contact.country!.toLowerCase() : "";
  const email = (contact.email ?? "").trim().toLowerCase();
  const [first = "", ...rest] = (contact.name ?? "").trim().split(/\s+/);

  const fields: MetaUserFields = {
    em: email.includes("@") ? email : "",
    ph: phone(contact.phone),
    fn: letters(first),
    ln: letters(rest.join("")),
    ct: letters(contact.city),
    st: region(contact.state),
    zp: postal(contact.zip, country),
    country,
    // A stable id of our own for the same person across leads.
    external_id: email.includes("@") ? email : "",
  };

  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v)) as MetaUserFields;
}

/**
 * Event parameters. Nothing personal: the qualification answers and the lead
 * source, which is what makes custom conversions like "Lead where timeline is
 * Immediately" possible to optimise for.
 */
export function buildLeadCustomData(input: {
  modelName?: string | null;
  answers?: Record<string, string>;
  attribution?: { source?: string; channel?: string; campaign?: string } | null;
  currency?: string;
}): Record<string, string> {
  const answers = input.answers ?? {};
  const named = input.modelName && input.modelName !== "To be recommended";

  const data: Record<string, string | undefined> = {
    content_name: named ? `DeSite ${input.modelName}` : "To be recommended",
    content_category: "DeSite screener",
    equipment: answers.equipment,
    material: answers.material,
    volume: answers.volume,
    timeline: answers.timeline,
    lead_source: input.attribution?.source,
    lead_channel: input.attribution?.channel,
    lead_campaign: input.attribution?.campaign,
    // Not "currency": Meta reads that as money attached to the event and then
    // flags the missing value.
    quote_currency: input.currency,
  };

  return Object.fromEntries(Object.entries(data).filter(([, v]) => v)) as Record<string, string>;
}
