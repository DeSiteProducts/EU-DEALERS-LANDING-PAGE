import { MetaLeadEvent } from "../components/MetaLeadEvent";
import Link from "next/link";

export default function ContactThankYouPage() {
  return (
    <main className="contact-thank-you">
      <MetaLeadEvent />
      <section className="contact-thank-you-content">
        <p className="section-kicker">
          Contact DeSite Products
        </p>

        <h1>Thank You!</h1>

        <p>
          Thank you for contacting DeSite Products.
          We have received your message and will get back
          to you as soon as possible.
        </p>

        <Link
          href="/#contact"
          className="desite-button desite-button-primary"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
