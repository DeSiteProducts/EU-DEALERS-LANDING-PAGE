"use client";

import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function ProductImageCarousel({
  caption,
  captionImageNumber,
  imageAlt,
  images,
  label,
}: {
  caption?: string;
  captionImageNumber?: number;
  imageAlt?: string;
  images: string[];
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePath = images[activeIndex] ?? "";
  const hasMultipleImages = images.length > 1;
  const activeImageLabel =
    activePath && /action/i.test(activePath)
      ? `${label.replace(" Screener", "")} screener in action`
      : (imageAlt ?? `${label} product photo`);
  const shouldShowCaption =
    Boolean(caption) &&
    (captionImageNumber === undefined ||
      activeIndex + 1 === captionImageNumber);

  function goToNext() {
    if (!hasMultipleImages) {
      return;
    }

    setActiveIndex((current) => (current + 1) % images.length);
  }

  function goToPrevious() {
    if (!hasMultipleImages) {
      return;
    }

    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  return (
    <div className="product-carousel" aria-label={`${label} photo carousel`}>
      <ImagePlaceholder
        label={
          activePath
            ? `${activeImageLabel} ${activeIndex + 1} of ${images.length}`
            : "Product photos coming soon"
        }
        path={activePath}
        tall
      />
      {shouldShowCaption ? <p className="carousel-caption">{caption}</p> : null}
      {hasMultipleImages ? (
        <div className="carousel-controls">
          <button
            aria-label={`Show previous ${label} photo`}
            className="carousel-button"
            type="button"
            onClick={goToPrevious}
          >
            <span aria-hidden="true">{"<"}</span>
          </button>
          <span aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            aria-label={`Show next ${label} photo`}
            className="carousel-button"
            type="button"
            onClick={goToNext}
          >
            <span aria-hidden="true">{">"}</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
