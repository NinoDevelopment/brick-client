import { SITE_NAME, SITE_URL } from "@/constants/seo";
import { parseProductSpecs } from "@/functions/parseProductSpecs";
import { getProductSeo, getProductUnitPrice } from "@/functions/productSeo";
import { getProductSlug } from "@/functions/productSlug";
import { getSchemaImages } from "@/functions/schemaImage";
import { IProductId } from "@/types/products";

const nextYear = () => `${new Date().getFullYear() + 1}-12-31`;

export const productJsonLd = (
  product: IProductId,
  images?: string[] | null,
  categoryName?: string,
) => {
  const specs = parseProductSpecs(product.description);
  const productUrl = `${SITE_URL}/product/${getProductSlug(product)}`;
  const seo = getProductSeo(product, categoryName);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seo.description,
    image: getSchemaImages(images),
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    additionalProperty: specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    offers: {
      "@type": "Offer",
      price: getProductUnitPrice(product) ?? product.price,
      priceCurrency: "RUB",
      priceValidUntil: nextYear(),
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
};
