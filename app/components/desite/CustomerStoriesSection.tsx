import { customerStories } from "../../lib/desiteData";
import { SectionContainer } from "./SectionContainer";
import { TestimonialCard } from "./TestimonialCard";

export function CustomerStoriesSection() {
  return (
    <SectionContainer className="stories-section" id="stories">
      <div className="section-heading">
        <p className="section-kicker">Customer Stories</p>
        <h2>Customer Stories</h2>
        <p>
          Space for real testimonials, customer photos, and jobsite stories from
          DeSite owners.
        </p>
      </div>
      <div className="stories-scroller" aria-label="Customer story cards">
        {customerStories.map((story) => (
          <TestimonialCard key={story.name} story={story} />
        ))}
        <article className="testimonial-card other-customers">
          <h3>Other Customers</h3>
          <p>
            Add more short customer stories here as real reviews and photos are
            collected.
          </p>
        </article>
      </div>
    </SectionContainer>
  );
}
