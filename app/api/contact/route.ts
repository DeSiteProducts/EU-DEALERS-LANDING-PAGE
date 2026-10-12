import { NextResponse, after } from "next/server";
import { randomUUID } from "node:crypto";
import { sendMetaLead } from "../../lib/metaCapi.server";
import { DEFAULT_CURRENCY } from "../../lib/currency";
export const runtime = "nodejs";
import { questions } from "../../lib/qualify";
import { euroPrice, quoteProducts } from "../../lib/quoteProducts";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const json = request.headers.get("content-type")?.includes("application/json");
  function reply(error?: string, status = 400) {
    if (json) return NextResponse.json(error ? { error } : { success: true }, { status: error ? status : 200 });
    const url = new URL(error ? "/?error=1#contact" : "/thank-you?success=1", process.env.NEXT_PUBLIC_SITE_URL ?? request.url);
    return NextResponse.redirect(url, { status: 303 });
  }
  try {
    let data: unknown;
    try {
      data = json ? await request.json() : Object.fromEntries(await request.formData());
    } catch {
      return reply("Invalid request.");
    }
    if (!isRecord(data)) return reply("Invalid request.");
    const fields = data;
    const value = (key: string) => typeof fields[key] === "string" ? fields[key].trim() : "";
    if (value("website")) return reply();
    const name = value("name");
    const email = value("email");
    const phone = value("phone");
    const company = value("company");
    const address = value("address");
    const city = value("city");
    // QuoteForm labels this field County and submits it as state.
    const county = value("state");
    const zip = value("zip");
    const country = value("country");
    const metaEventId = /^[a-zA-Z0-9-]{8,100}$/.test(value("metaEventId")) ? value("metaEventId") : randomUUID();
    const attribution: Record<string, string> = {};
    if (isRecord(data.attribution)) {
      for (const key of ["source", "channel", "campaign", "medium", "term", "content", "clickId", "referrer", "landingPage", "capturedAt"]) {
        const entry = data.attribution[key];
        if (typeof entry === "string") attribution[key] = entry.replace(/[\r\n]/g, " ").slice(0, 1000);
      }
    }
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply("Please enter your name and a valid email address.");
    for (const key of ["name", "email", "phone", "company", "address", "city", "state", "zip", "country"]) {
      if (value(key).length > 200) return reply("Please shorten your contact details.");
    }
    if (value("message").length > 5000) return reply("Please keep your message under 5,000 characters.");
    const answers: Record<string, string> = {};
    if (json) {
      const required = { address: "street address", city: "city", zip: "postal code", country: "country" };
      for (const [key, label] of Object.entries(required)) {
        if (!value(key)) return reply(`Please enter your ${label}.`);
      }
      const digits = phone.replace(/\D/g, "").length;
      if (phone.length > 40 || !/^[+\d\s().-]+$/.test(phone) || digits < 7 || digits > 15) return reply("Please enter a valid phone number.");
      if (data.consent !== true) return reply("Please agree to be contacted about your request.");
      if (!isRecord(data.answers)) return reply("Please answer all four questions.");
      for (const question of questions) {
        const answer = data.answers[question.id];
        if (typeof answer !== "string" || !question.options.some((option) => option.value === answer)) return reply("Please answer all four questions.");
        answers[question.id] = answer;
      }
    }
    // Resolve prices from the catalogue, never from client-supplied amounts.
    const models = quoteProducts(answers);
    const message = json ? [
      "Quote request — EUR",
      "",
      "Recommended models and catalogue prices:",
      `Models: ${models.length ? models.map((model) => `${model.name}: ${euroPrice(model.SuggestedRetailPrice)}`).join(" / ") : "To be recommended"}`,
      "",
      "Screening requirements:",
      ...questions.map((question) => `${question.question} ${answers[question.id]}`),
      "",
      `Street address: ${address}`,
      `City: ${city}`,
      `County: ${county || "Not provided"}`,
      `Postal code: ${zip}`,
      `Country: ${country}`,
      "Consent to contact: Yes",
      ...Object.entries(attribution).map(([key, entry]) => `Attribution ${key}: ${entry}`),
      "",
      `Additional message: ${value("message") || "Not provided"}`,
    ].join("\n") : value("message");
    const response = await fetch("https://0gc19khxz3.execute-api.us-east-1.amazonaws.com/default/sendEuDealersemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, company, phone, email, message,
        ...(json ? {
          formVersion: 2,
          address, city, state: county, zip, country,
          consent: true,
          currency: DEFAULT_CURRENCY,
          models: models.map(model => ({ name: model.name, price: model.SuggestedRetailPrice ?? null })),
          qualification: questions.map(question => ({ question: question.question, answer: answers[question.id] })),
          attribution,
          customerMessage: value("message"),
        } : {}),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return reply("We could not send your request. Please try again.", 502);
    if (json) {
      // The form accepts country names. Only an ISO code is suitable for Meta.
      const metaCountry = /^[a-z]{2}$/i.test(country) ? country.toLowerCase() : "";
      const requestInfo = {
        ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() || null,
        userAgent: request.headers.get("user-agent"),
        cookie: request.headers.get("cookie"),
        pageUrl: request.headers.get("referer"),
      };
      try {
        after(async () => {
          try {
            await sendMetaLead({
              eventId: metaEventId,
              contact: { name, email, phone, city, state: county, zip, country: metaCountry },
              modelName: models.map(model => model.name).join(" / "),
              answers, attribution, currency: DEFAULT_CURRENCY, requestInfo,
            });
          } catch { console.warn("[meta] Lead tracking unavailable."); }
        });
      } catch { console.warn("[meta] Lead tracking could not be scheduled."); }
      return NextResponse.json({ success: true, delivered: true, country: metaCountry, metaEventId });
    }
    return reply();
  } catch {
    return reply("We could not process your request. Please try again.", 500);
  }
}
