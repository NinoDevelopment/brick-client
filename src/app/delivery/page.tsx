import DeliveryPage from "@/pagesList/DeliveryPage/DeliveryPage";
import Script from "next/script";
import { createPageMetadata, SEO_DELIVERY, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_DELIVERY,
  `${SITE_URL}/delivery`,
);

const Page = () => {
  return (
    <>
      <DeliveryPage />

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
                name: "Оплата и доставка",
                item: `${SITE_URL}/delivery`,
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default Page;
