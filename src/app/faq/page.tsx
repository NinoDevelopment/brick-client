import FaqPage from "@/pagesList/FaqPage/FaqPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { createPageMetadata, SEO_FAQ, SITE_URL } from "@/constants/seo";
import { FAQ_ITEMS } from "@/constants/faq";

export const metadata = createPageMetadata(SEO_FAQ, `${SITE_URL}/faq`);

const Page = () => {
  return (
    <>
      <FaqPage />

      <JsonLd
        id="faq-ld"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <JsonLd
        id="breadcrumbs-ld"
        data={{
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
              name: "Частые вопросы",
              item: `${SITE_URL}/faq`,
            },
          ],
        }}
      />
    </>
  );
};

export default Page;
