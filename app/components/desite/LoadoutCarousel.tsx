"use client";

import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function LoadoutCarousel({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="loadout-carousel" aria-label="Customer loadout photo carousel">
      <ImagePlaceholder
        label={`Loadout photo ${activeIndex + 1} of ${images.length}`}
        path={images[activeIndex]}
        tall
      />
      <div className="carousel-controls">
        <button
          aria-label="Show previous loadout photo"
          className="carousel-button"
          type="button"
          onClick={() =>
            setActiveIndex((current) => (current - 1 + images.length) % images.length)
          }
        >
          {"<"}
        </button>
        <span aria-live="polite">
          {activeIndex + 1} / {images.length}
        </span>
        <button
          aria-label="Show next loadout photo"
          className="carousel-button"
          type="button"
          onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
