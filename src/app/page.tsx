import PreviewBanner from "@/components/home-page/PreviewBanner/PreviewBanner";
import AboutCompany from "@/components/home-page/AboutCompany/AboutCompany";
import CalcBanner from "@/components/home-page/CalcBanner/CalcBanner";
import ProductTypes from "@/components/home-page/ProductTypes/ProductTypes";
import GalleryBanner from "@/components/home-page/GalleryBanner/GalleryBanner";
import { createPageMetadata, SEO_HOME, SITE_URL } from "@/constants/seo";

export const metadata = createPageMetadata(SEO_HOME, SITE_URL);

const Home = () => {
  return (
    <main>
      <PreviewBanner />
      <AboutCompany />
      <CalcBanner />
      <ProductTypes />
      <GalleryBanner />
    </main>
  );
};

export default Home;
