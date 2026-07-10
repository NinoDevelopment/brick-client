import GalleryPage from "@/pagesList/GalleryPage/GalleryPage";
import { createPageMetadata, SEO_GALLERY } from "@/constants/seo";

export const metadata = createPageMetadata(
  SEO_GALLERY,
  `${process.env.NEXT_PUBLIC_PROD_URL}/gallery`,
);

const page = () => <GalleryPage />;

export default page;
