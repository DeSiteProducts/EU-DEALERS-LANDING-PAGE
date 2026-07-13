import { products } from "../../lib/desiteData";
import { ProductCard } from "./ProductCard";
import { SectionContainer } from "./SectionContainer";

export function ProductsSection() {
  return (
    <SectionContainer className="products-section" id="products">
      
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
}
