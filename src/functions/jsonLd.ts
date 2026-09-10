import { SITE_URL } from "@/constants/seo";
import { getProductSlug } from "@/functions/productSlug";
import { IProductId } from "@/types/products";

type Crumb = { name: string; item: string };

export const breadcrumbJsonLd = (items: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.item,
  })),
});

export const productListJsonLd = (products: IProductId[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      url: `${SITE_URL}/product/${getProductSlug(product)}`,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "RUB",
        availability: product.available
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    },
  })),
});
