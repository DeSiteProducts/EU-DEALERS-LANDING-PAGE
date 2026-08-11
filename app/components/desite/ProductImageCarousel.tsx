"use client";

import { useState } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function ProductImageCarousel({
  caption,
  captionImageNumber,
  imageAlt,
  images,
  label
}: {
  caption?: string;
  captionImageNumber?: number;
  imageAlt?: string;
  images: string[];
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  if (!images.length) {
    return null;
  }

  const hasMultipleImages = images.length > 1;

 
  const visibleImages = Array.from(
    { length: Math.min(4, images.length) },
    (_, index) => {
      const actualIndex =
        (activeIndex + index) % images.length;

      return {
        image: images[actualIndex],
        index: actualIndex,
      };
    }
  );

  function goToNext() {
    if (!hasMultipleImages) {
      return;
    }

    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  function goToPrevious() {
    if (!hasMultipleImages) {
      return;
    }

    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function openZoom(image: string) {
    setZoomedImage(image);
  }

  function closeZoom() {
    setZoomedImage(null);
  }

  function getImageLabel(image: string) {
    return image && /action/i.test(image)
      ? `${label.replace(
          " Screener",
          ""
        )} screener in action`
      : (imageAlt ?? `${label} product photo`);
  }

  return (
    <>
      
      <div
        className="product-carousel product-image-carousel proscreen-videos-title"
        aria-label={`${label} photo carousel`}
        
        
      ><h4 className="proscreen-videos-title">Image Gallery</h4>
        <div className="product-image-carousel-row">

          {/* =========================
              PREVIOUS BUTTON
              ========================= */}

          {hasMultipleImages && (
            <button
              type="button"
              className="carousel-button product-gallery-arrow"
              onClick={goToPrevious}
              aria-label={`Show previous ${label} photo`}
            >
              <span aria-hidden="true">{"<"}</span>
            </button>
          )}

          {/* =========================
              DESKTOP / TABLET
              ========================= */}

          <div className="product-image-grid product-image-grid-desktop">
            {visibleImages.map(({ image, index }, position) => {
              const activeImageLabel =
                getImageLabel(image);

              const shouldShowCaption =
                Boolean(caption) &&
                (captionImageNumber === undefined ||
                  index + 1 === captionImageNumber);

              return (
                <div
                  key={`${image}-${index}-${position}`}
                  className="product-image-item"
                >
                  <button
                    type="button"
                    className="product-image-button"
                    onClick={() => openZoom(image)}
                    aria-label={`Zoom ${activeImageLabel}`}
                  >
                    <ImagePlaceholder
                      label={activeImageLabel}
                      path={image}
                      tall
                    />
                  </button>

                  {shouldShowCaption ? (
                    <p className="carousel-caption">
                      {caption}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* =========================
              MOBILE
              ========================= */}

          <div className="product-image-mobile">
            {(() => {
              const image = images[activeIndex];

              const activeImageLabel =
                getImageLabel(image);

              const shouldShowCaption =
                Boolean(caption) &&
                (captionImageNumber === undefined ||
                  activeIndex + 1 === captionImageNumber);

              return (
                <div className="product-image-item">
                  <button
                    type="button"
                    className="product-image-button"
                    onClick={() => openZoom(image)}
                    aria-label={`Zoom ${activeImageLabel}`}
                  >
                    <ImagePlaceholder
                      label={activeImageLabel}
                      path={image}
                      tall
                    />
                  </button>

                  {shouldShowCaption ? (
                    <p className="carousel-caption">
                      {caption}
                    </p>
                  ) : null}
                </div>
              );
            })()}
          </div>

          {/* =========================
              NEXT BUTTON
              ========================= */}

          {hasMultipleImages && (
            <button
              type="button"
              className="carousel-button product-gallery-arrow"
              onClick={goToNext}
              aria-label={`Show next ${label} photo`}
            >
              <span aria-hidden="true">{">"}</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================
          FULLSCREEN ZOOM
          ========================= */}

      {zoomedImage ? (
        <div
          className="image-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${label} image`}
          onClick={closeZoom}
        >
          {/* X */}
          <button
            type="button"
            className="image-zoom-close"
            onClick={(event) => {
              event.stopPropagation();
              closeZoom();
            }}
            aria-label="Close image zoom"
          >
            ×
          </button>

          {/* Image */}
          <div
            className="image-zoom-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={zoomedImage}
              alt={
                imageAlt ??
                `${label} product photo`
              }
            />
          </div>
        </div>
      ) : null}
    </>
  );
}