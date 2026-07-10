import ContactsPage from "@/pagesList/ContactsPage/ContactsPage";
import Script from "next/script";
import { createPageMetadata, SEO_CONTACTS } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CONTACTS,
  `${process.env.NEXT_PUBLIC_PROD_URL}/contacts`,
);

const page = () => {
   return (
      <>
         <ContactsPage />

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
                        name: 'Контакты',
                        item: `${process.env.NEXT_PUBLIC_PROD_URL}/contacts`,
                     },
                  ],
               }),
            }}
         />
      </>
   )
};

export default page;
