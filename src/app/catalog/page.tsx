import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { fetchCategories, fetchProducts } from "@/functions/serverFetch";
import { createPageMetadata, SEO_CATALOG, SITE_URL } from "@/constants/seo";
import { breadcrumbJsonLd, productListJsonLd } from "@/functions/jsonLd";

export const revalidate = 60;

export const metadata = createPageMetadata(
  SEO_CATALOG,
  `${SITE_URL}/catalog`,
  "Купить кирпич в Нижнем Новгороде",
);

const Page = async () => {
  const [allProducts, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);
  const products = allProducts?.filter((product) => product.show) ?? [];

  return (
    <>
      <CatalogPage initialProducts={products} categories={categories ?? []} />

      <JsonLd
        id="breadcrumbs-ld"
        data={breadcrumbJsonLd([
          { name: "Главная", item: SITE_URL },
          { name: "Каталог кирпича", item: `${SITE_URL}/catalog` },
        ])}
      />

      <JsonLd id="catalog-itemlist-ld" data={productListJsonLd(products)} />
    </>
  );
};

export default Page;
