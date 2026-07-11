import ContactsPage from "@/pagesList/ContactsPage/ContactsPage";
import Script from "next/script";
import { createPageMetadata, SEO_CONTACTS, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CONTACTS,
  `${SITE_URL}/contacts`,
);

const page = () => {
  return (
    <>
      <ContactsPage />

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
                name: "Контакты",
                item: `${SITE_URL}/contacts`,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default page;
