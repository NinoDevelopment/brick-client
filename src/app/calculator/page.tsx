import CalculatorPage from "@/pagesList/CalculatorPage/CalculatorPage";
import Script from "next/script";
import { createPageMetadata, SEO_CALCULATOR } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CALCULATOR,
  `${process.env.NEXT_PUBLIC_PROD_URL}/calculator`,
);

const Page = () => {
   return (
      <>
         <CalculatorPage />

         {/* JSON-LD: BreadcrumbList */}
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
                        name: 'Калькулятор кирпича',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/calculator`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default Page;
