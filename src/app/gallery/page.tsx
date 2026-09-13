import GalleryPage from "@/pagesList/GalleryPage/GalleryPage";
import JsonLd from "@/components/general/JsonLd/JsonLd";
import { fetchGallery } from "@/functions/serverFetch";
import { createPageMetadata, SEO_GALLERY, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_GALLERY,
  `${SITE_URL}/gallery`,
);

const page = async () => {
  const categories =
    (await fetchGallery())?.filter((item) => item.show) ?? [];

  return (
    <>
      <GalleryPage initialCategories={categories} />

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
              name: "Галерея объектов",
              item: `${SITE_URL}/gallery`,
            },
          ],
        }}
      />
    </>
  );
};

export default page;
