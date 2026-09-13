import AboutPage from "@/pagesList/AboutPage/AboutPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { createPageMetadata, SEO_ABOUT, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(SEO_ABOUT, `${SITE_URL}/about`);

const page = () => {
  return (
    <>
      <AboutPage />

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
              name: "О нас",
              item: `${SITE_URL}/about`,
            },
          ],
        }}
      />
    </>
  );
};

export default page;
