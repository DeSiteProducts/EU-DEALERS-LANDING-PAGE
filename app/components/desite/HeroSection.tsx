import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function HeroSection() {
  return (
    <section className="desite-hero" id="home" aria-labelledby="desite-hero-title">
      <div className="desite-container hero-layout">
        <div className="hero-copy">
          <h2 id="desite-hero-title" className="title">
            Be a Dealer
          </h2>
          <h1 id="desite-hero-title1">DeSite Mini Screeners In Europe</h1>
          <p className="hero-intro">
            DeSite manufactures mini screeners for mini equipment.
            We offer both 220 Volt Vibratory and Mini Grizzly Screeners
            Rugged and Affordable, backed with a 5 Year Structure Warranty
          </p>
           <p className="hero-introb">
             Be A Dealer for our DeSite Mini Screeners in Europe
          </p>
          <a href="#contact" className="hero-contact-button">
            Contact Us
          </a>
        </div>
        <ImagePlaceholder
          label="Hero image coming soon"
          path=""
          tall
        />
      </div>
    </section>
  );
}
