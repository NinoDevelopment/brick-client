import DeliveryPage from "@/pagesList/DeliveryPage/DeliveryPage";
import Script from "next/script";
import { createPageMetadata, SEO_DELIVERY } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_DELIVERY,
  `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
);

const Page = () => {
   return (
      <>
         <DeliveryPage />

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
                        name: 'Доставка и оплата',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/delivery`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default Page;
