import AboutPage from "@/pagesList/AboutPage/AboutPage";
import Script from "next/script";
import { createPageMetadata, SEO_ABOUT } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_ABOUT,
  `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
);

const page = () => {
   return (
      <>
         <AboutPage />

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
                        name: 'О нас',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/about`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default page;
