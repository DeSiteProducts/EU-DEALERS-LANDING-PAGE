import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function HeroSection() {
  return (
    <section className="desite-hero" id="home" aria-labelledby="desite-hero-title">
      <div className="desite-container hero-layout">
        <div className="hero-copy">
          <h2 id="desite-hero-title" className="title">
            DeSite
          </h2>
          <h1 id="desite-hero-title">Mini Screeners</h1>
          <p className="hero-intro">
            DeSite designs and manufactures the 68 ProScreen Vibratory Sifter and SLG Spring Suspension Grizzly's. Purpose built for mini equipment DeSite’s sifter screeners are Efficient and Affordable for your customers that own mini loaders. DeSite screeners are rugged and come backed with a 5 Year Structure Warranty.
          </p>
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
