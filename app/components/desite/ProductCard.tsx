import type { DesiteProduct } from "../../lib/desiteData";
import { ProductImageCarousel } from "./ProductImageCarousel";

export function ProductCard({
  product,
}: {
  product: DesiteProduct;
}) {
  return <ProScreenProductCard product={product} />;
}

function ProScreenProductCard({ product }: { product: DesiteProduct }) {
  const isSixtyEightProScreen =
    product.name.includes("68V") ||
    Boolean(product.imageAlt?.includes("68 ProScreen"));
  const modelName = getModelName(product, isSixtyEightProScreen);
  const detailVariantLabel = getDetailVariantLabel(product.detailVariant);
  const hasVideos = Boolean(product.videos?.length);

  return (
    <article className="product-card proscreen-card">
      <div className="proscreen-top">
        <ProductImageCarousel
          caption={isSixtyEightProScreen ? "220 Volt Single Phase (3600rpm)" : undefined}
          captionImageNumber={isSixtyEightProScreen ? 5 : undefined}
          imageAlt={product.imageAlt}
          images={product.images}
          label={product.name}
        />
        <div className="proscreen-summary">
          <div className="proscreen-header">
            {detailVariantLabel ? <h3>{detailVariantLabel}</h3> : null}
            <p className="proscreen-model-name">
              <span className="proscreen-model-main">{modelName.main}</span>
              {modelName.sub ? (
                <span className="proscreen-model-sub">{modelName.sub}</span>
              ) : null}
            </p>
          </div>

          <div className="proscreen-intro">
            <section
              className="proscreen-inline-specs"
              aria-label={`${product.name} specifications`}
            >
              <ProductHighlights highlights={product.proscreenHighlights ?? []} />
            </section>
            {product.SuggestedRetailPrice && (
              <>
              <p className="price-label">
                <strong>Suggested Retail Price</strong> 
              </p>
              <span className="price price-retail">{product.SuggestedRetailPrice} <small>Euros</small></span>
              </>
            )}
            {product.CostforStockingDealers && (
               <>
              <p className="price-label">
                <strong>Cost for Stocking Dealers</strong> 
              </p>
              <span className="price price-dealer">{product.CostforStockingDealers} <small>Euros</small></span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="proscreen-expanded">
        <div className="proscreen-list-grid">
          <ProductFeatureList
            title="Screen and Recycle"
            items={product.materials ?? []}
          />
          <ProductFeatureList
            title="Screener Features"
            items={product.features ?? []}
          />
        </div>

        {hasVideos ? (
          <section className="proscreen-videos" aria-label={`${product.name} videos`}>
            <h4>Videos</h4>
            <div className="proscreen-video-grid">
              {product.videos?.map((video) => (
                <div className="proscreen-video-frame" key={video.id}>
                  <iframe
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://player.vimeo.com/video/${video.id}`}
                    title={video.title}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function getDetailVariantLabel(detailVariant?: string) {
  return detailVariant?.replace(/\s*grizzly\s*/i, " ").trim() ?? "";
}

function getModelName(
  product: DesiteProduct,
  isSixtyEightProScreen: boolean,
) {
  if (isSixtyEightProScreen) {
    return {
      main: "68V Vibratory",
      sub: "Mini Screener",
    };
  }

  if (product.name.endsWith(" Mini")) {
    return {
      main: product.name.replace(" Mini", ""),
      sub: "Mini",
    };
  }

  if (product.name.endsWith(" Grizzly RB")) {
    return {
      main: product.name.replace(" Grizzly RB", ""),
      sub: "Grizzly RB",
    };
  }

  return {
    main: product.name,
    sub: "",
  };
}

function ProductHighlights({
  highlights,
}: {
  highlights: NonNullable<DesiteProduct["proscreenHighlights"]>;
}) {
  return (
    <dl className="proscreen-highlights">
      {highlights.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductFeatureList({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  const sectionClassName =
    title === "Screen and Recycle"
      ? "proscreen-feature-section proscreen-feature-section-materials"
      : title === "Screener Features"
        ? "proscreen-feature-section proscreen-feature-section-features"
        : "proscreen-feature-section";

  return (
    <section className={sectionClassName}>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
