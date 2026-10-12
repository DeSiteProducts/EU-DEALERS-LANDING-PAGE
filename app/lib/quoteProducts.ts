import { products } from "./desiteData";
import { recommendModels, type ModelSlug } from "./qualify";

const names: Record<ModelSlug, string> = {
  "slg-56": "SLG 56 Mini",
  "slg-78": "SLG 78 With Riser Box",
  "slg-108": "SLG 108 Grizzly",
  "pro-68": "68V Vibratory Mini Screener",
  "pro-78": "78 Vibratory Screener",
  "pro-108": "108 Vibratory Screener",
};

export function quoteProducts(answers: Record<string, string>) {
  return recommendModels(answers).flatMap((slug) =>
    products.filter((product) => product.name === names[slug]),
  );
}

export function euroPrice(price?: string) {
  return price ? `${price} EUR` : "Price on request";
}
