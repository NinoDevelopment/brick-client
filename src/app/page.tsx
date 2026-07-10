import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";
import Script from "next/script";
import { createPageMetadata, SEO_HOME } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_HOME,
  process.env.NEXT_PUBLIC_PROD_URL,
);

const Home = () => {
  return (
    <main>
      <PreviewBanner />
      <AboutCompany />
      <CalcBanner />
      <ProductTypes />
      <GalleryBanner />

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
                ],
             }),
          }}
       />
    </main>
  );
};

export default Home;
