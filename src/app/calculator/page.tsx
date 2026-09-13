import CalculatorPage from "@/pagesList/CalculatorPage/CalculatorPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { createPageMetadata, SEO_CALCULATOR, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_CALCULATOR,
  `${SITE_URL}/calculator`,
);

const Page = () => {
  return (
    <>
      <CalculatorPage />

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
              name: "Калькулятор кирпича",
              item: `${SITE_URL}/calculator`,
            },
          ],
        }}
      />
    </>
  );
};

export default Page;
