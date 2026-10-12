import { PrimaryButton, SecondaryButton } from "./Buttons";
import { SectionContainer } from "./SectionContainer";
import { QuoteForm } from "./QuoteForm";

export function ContactSection({
  showError = false,
}: {
  showError?: boolean;
}) {
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
              +1(509)264-1129
            </p>
            <p>
              <strong>Email</strong>
              bhidm@outlook.com
            </p>
            
          </div>
          <div className="contact-actions">
            <PrimaryButton href="#desite-contact-form">Contact Brad</PrimaryButton>
            <SecondaryButton href="https://wa.me/15092641129">
              Message on WhatsApp
            </SecondaryButton>
          </div>
        </div>
        <div className="contact-form-wrapper">
          

          <QuoteForm />
          {showError && (
            <div className="form-error" role="alert">
              Sorry, there was a problem sending your message.
              Please try again.
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
