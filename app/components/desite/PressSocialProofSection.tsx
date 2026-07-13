import {
  featuredTestimonials,
  loadoutImages,
  socialProof,
} from "../../lib/desiteData";
import { DealerMapSection } from "./DealerMapSection";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { LoadoutCarousel } from "./LoadoutCarousel";
import { SectionContainer } from "./SectionContainer";

export function PressSocialProofSection() {
  return (
    <SectionContainer className="social-section">
      <div className="section-heading">
        <p className="section-kicker">Press & Social Proof</p>
        <h2>Press & Social Proof</h2>
        <p>
          Visual proof points for media kits, dealers, and customers evaluating
          DeSite products.
        </p>
      </div>

      <div className="social-grid">
        {socialProof.map((item) => (
          <article className="social-card" key={item.title}>
            <ImagePlaceholder label={item.title} path={item.path} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <DealerMapSection />

      <div className="featured-testimonials">
        {featuredTestimonials.map((testimonial) => (
          <blockquote key={testimonial}>{testimonial}</blockquote>
        ))}
      </div>

      <div className="loadout-panel">
        <div>
          <h3>Customer Photos and Loadouts</h3>
          <p>
            Placeholder carousel for semis, deliveries, loadouts, and machines
            on the way to customers.
          </p>
        </div>
        <LoadoutCarousel images={loadoutImages} />
      </div>
    </SectionContainer>
  );
}
