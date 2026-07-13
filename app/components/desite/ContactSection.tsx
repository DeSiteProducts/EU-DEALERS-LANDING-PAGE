import { PrimaryButton, SecondaryButton } from "./Buttons";
import { SectionContainer } from "./SectionContainer";

export function ContactSection() {
  return (
    <SectionContainer className="contact-section" id="contact">
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="section-kicker">Contact DeSite Products</p>
          <h2>Contact DeSite Products</h2>
          <p>
            Contact Brad for product questions, media resources, dealer
            information, or help choosing the right screener.
          </p>
          <div className="contact-list">
            <p>
              <strong>Media Contact</strong>
              Brad Hilmoe
            </p>
            <p>
              <strong>Phone / WhatsApp</strong>
              XXX-XXX-XXXX
            </p>
            <p>
              <strong>Email</strong>
              XXX
            </p>
            <p>
              <strong>Website</strong>
              XXX
            </p>
          </div>
          <div className="contact-actions">
            <PrimaryButton href="#desite-contact-form">Contact Brad</PrimaryButton>
            <SecondaryButton href="https://wa.me/1XXXXXXXXXX">
              Message on WhatsApp
            </SecondaryButton>
          </div>
        </div>
        <form className="desite-form" id="desite-contact-form" aria-label="Contact DeSite form">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" autoComplete="organization" />
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us what product, asset, or information you need."
            />
          </div>
          <button className="desite-button desite-button-primary form-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </SectionContainer>
  );
}
