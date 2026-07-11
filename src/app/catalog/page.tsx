import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import Script from "next/script";
import { fetchProducts } from "@/functions/serverFetch";
import { createPageMetadata, SEO_CATALOG, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CATALOG,
  `${SITE_URL}/catalog`,
  "Купить кирпич в Нижнем Новгороде",
);

const Page = async () => {
  const products =
    (await fetchProducts())?.filter((product) => product.show) ?? [];

  return (
    <>
      <CatalogPage initialProducts={products} />

      <Script
        id="breadcrumbs-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Главная",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Каталог кирпича",
                item: `${SITE_URL}/catalog`,
              },
            ],
          }),
        }}
      />

      <Script
        id="catalog-itemlist-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: products.map((elem, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Product",
                name: elem.name,
                description: elem.description,
                url: `${SITE_URL}/product/${elem._id}`,
                offers: {
                  "@type": "Offer",
                  price: elem.price,
                  priceCurrency: "RUB",
                  availability: elem.available
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                },
              },
            })),
          }),
        }}
      />
    </>
  );
};

export default Page;
