import { ImagePlaceholder } from "./ImagePlaceholder";

export function TestimonialCard({
  story,
}: {
  story: {
    name: string;
    location: string;
    machine: string;
    photo: string;
    jobsite: string;
    quote: string;
    video?: string;
  };
}) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-media">
        <ImagePlaceholder label={`${story.name} customer photo`} path={story.photo} />
        <ImagePlaceholder label={`${story.name} jobsite photo`} path={story.jobsite} />
      </div>
      <blockquote>{story.quote}</blockquote>
      <div className="testimonial-meta">
        <strong>{story.name}</strong>
        <span>{story.location}</span>
        <span>{story.machine}</span>
      </div>
      {story.video ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/12 bg-black">
                    <div className="aspect-video">
                      <iframe
                        src={story.video}
                        title={`${story.name} review video`}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : null}
    </article>
  );
}
