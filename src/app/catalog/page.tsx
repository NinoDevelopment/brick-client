import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import Script from "next/script";
import { fetchProducts } from "@/functions/serverFetch";
import { createPageMetadata, SEO_CATALOG } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CATALOG,
  `${process.env.NEXT_PUBLIC_PROD_URL}/catalog`,
  "Купить кирпич в Нижнем Новгороде",
);

const Page = async () => {
   const products = (await fetchProducts())?.filter((product) => product.show) ?? [];

   return (
      <>
         <CatalogPage initialProducts={products} />

         <Script
            id="breadcrumbs-ld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                     {
                        '@type': 'ListItem',
                        position: 1,
                        name: 'Главная',
                        item: process.env.NEXT_PUBLIC_PROD_URL,
                     },
                     {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Каталог кирпича',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/catalog`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default Page;
