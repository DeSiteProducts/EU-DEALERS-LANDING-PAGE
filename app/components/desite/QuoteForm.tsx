"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../../lib/qualify";
import { euroPrice, quoteProducts } from "../../lib/quoteProducts";
import { CURRENCIES, DEFAULT_CURRENCY } from "../../lib/currency";
import { captureAttribution, type Attribution } from "../../lib/attribution";
import { hashForMeta, newEventId, saveLeadHandoff, META_PIXEL_ID } from "../../lib/metaPixel";
import { buildLeadCustomData, normalizeUserData } from "../../lib/metaLead";
import { recommendModels } from "../../lib/qualify";

const fields = [
  ["name", "Full name", "name", "text"],
  ["phone", "Phone", "tel", "tel"],
  ["email", "Email", "email", "email"],
  ["company", "Company (optional)", "organization", "text"],
  ["address", "Street address", "street-address", "text"],
  ["city", "City", "address-level2", "text"],
  ["state", "County", "address-level1", "text"],
  ["zip", "Postal code", "postal-code", "text"],
  ["country", "Country", "country-name", "text"],
] as const;

export function QuoteForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const submitting = useRef(false);
  const attribution = useRef<Attribution | null>(null);
  const router = useRouter();
  const question = questions[step];
  const models = quoteProducts(answers);

  useEffect(() => { attribution.current = captureAttribution(); }, []);

  useEffect(() => {
    if (step > 0) heading.current?.focus();
  }, [step]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError("");
    submitting.current = true;
    setSending(true);
    const metaEventId = newEventId();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, consent, answers, currency: DEFAULT_CURRENCY, attribution: attribution.current, metaEventId }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your request. Please try again.");
      if (result.delivered === true && META_PIXEL_ID) {
        // Analytics must never turn a successfully delivered quote into an error.
        try {
          const recommended = recommendModels(answers);
          const userData = await hashForMeta(normalizeUserData({ ...contact, country: result.country ?? "" }));
          saveLeadHandoff({
            eventId: result.metaEventId,
            model: recommended[0] ?? null,
            models: recommended,
            currency: DEFAULT_CURRENCY,
            source: attribution.current?.source ?? null,
            channel: attribution.current?.channel ?? null,
            userData,
            customData: buildLeadCustomData({ modelName: models.map(model => model.name).join(" / "), answers, attribution: attribution.current, currency: DEFAULT_CURRENCY }),
          });
        } catch { /* The quote has already been delivered. */ }
      }
      router.push("/thank-you?success=1");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No connection to the server. Please try again.");
      setSending(false);
      submitting.current = false;
    }
  }

  return (
    <div className="desite-form quote-form" id="desite-contact-form">
      <div className="quote-progress-heading">
        <p className="section-kicker">{question ? `Question ${step + 1} of ${questions.length}` : "Last step"}</p>
        <span className="quote-step-count">{step + 1} / {questions.length + 1}</span>
      </div>
      <progress aria-label="Quote progress" value={step + 1} max={questions.length + 1} />
      <h3 ref={heading} tabIndex={-1}>{question?.question ?? "Where Do We Send The Quote?"}</h3>
      {question ? (
        <fieldset className="quote-options" key={question.id}>
          <legend className="quote-sr-only">{question.question}</legend>
          {question.help && <p>{question.help}</p>}
          {question.options.map((option) => (
            <label key={option.value} className={answers[question.id] === option.value ? "quote-option is-selected" : "quote-option"}>
              <input type="radio" name={question.id} value={option.value} checked={answers[question.id] === option.value} onChange={() => setAnswers({ ...answers, [question.id]: option.value })} />
              <span>{option.value}{option.hint && <small>{option.hint}</small>}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <form onSubmit={submit} aria-label="Request a quote" aria-busy={sending}>
          {models.length > 0 && <div className="quote-recommendations">
            <p>Based on your equipment and production needs, consider:</p>
            <ul>{models.map((model) => <li key={model.name}><strong>{model.name}</strong><span>{euroPrice(model.SuggestedRetailPrice)}</span></li>)}</ul>
            <p>We will confirm the best fit for your material before quoting.</p>
          </div>}
          <div className="form-grid">
            {fields.map(([name, label, autoComplete, type]) => (
              <div className={`form-field${name === "email" || name === "address" ? " quote-field-wide" : ""}`} key={name}>
                <label htmlFor={`quote-${name}`}>{label}{name !== "company" && name !== "state" ? " *" : ""}</label>
                <input id={`quote-${name}`} name={name} type={type} autoComplete={autoComplete} required={name !== "company" && name !== "state"} maxLength={name === "phone" ? 40 : 200} value={contact[name] ?? ""} onChange={(event) => setContact({ ...contact, [name]: event.target.value })} />
              </div>
            ))}
          </div>
          <div className="form-field"><label htmlFor="quote-message">Message (optional)</label><textarea id="quote-message" name="message" maxLength={5000} value={contact.message ?? ""} onChange={(event) => setContact({ ...contact, message: event.target.value })} /></div>
          <label className="quote-consent"><input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>I agree to be contacted about this request. My details will only be used to answer my enquiry and prepare my quote.</span></label>
          <div className="quote-honeypot" aria-hidden="true"><label htmlFor="quote-website">Leave this empty</label><input id="quote-website" tabIndex={-1} autoComplete="off" value={contact.website ?? ""} onChange={(event) => setContact({ ...contact, website: event.target.value })} /></div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="quote-actions"><button type="button" className="desite-button" disabled={sending} onClick={() => setStep(step - 1)}>Back</button><button type="submit" className="desite-button desite-button-primary" disabled={sending}>{sending ? "Sending…" : "Send My Answers"}</button></div>
          <p className="quote-note">We will quote in {CURRENCIES[DEFAULT_CURRENCY].label}. No mailing lists.</p>
        </form>
      )}
      {question && <div className="quote-actions">
        {step > 0 && <button type="button" className="desite-button" onClick={() => setStep(step - 1)}>Back</button>}
        <button type="button" className="desite-button desite-button-primary" disabled={!answers[question.id]} onClick={() => setStep(step + 1)}>Continue →</button>
      </div>}
    </div>
  );
}
