"use client";

type ProductVideo = {
  id: string;
  title: string;
};

export function ProductVideoCarousel({
  videos,
  label,
}: {
  videos: ProductVideo[];
  label: string;
}) {
  if (!videos.length) {
    return null;
  }

  const firstVideo = videos[0];

  return (
    <div
      className="product-carousel product-video-carousel"
      aria-label={`${label} video`}
    >
      <div className="video-carousel-stage">
        <iframe
          src={`https://player.vimeo.com/video/${firstVideo.id}`}
          title={firstVideo.title || `${label} video`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}