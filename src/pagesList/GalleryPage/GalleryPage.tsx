import styles from "./GalleryPage.module.css";
import PreviewBanner from "@/components/gallery-page/PreviewBanner/PreviewBanner";
import GalleryProjects from "@/components/gallery-page/GalleryProjects/GalleryProjects";
import { IGalleryItem } from "@/types/gallery";

interface IGalleryPage {
  initialCategories?: IGalleryItem[];
}

const GalleryPage = ({ initialCategories }: IGalleryPage) => {
  return (
    <div className={styles.main}>
      <PreviewBanner />
      <GalleryProjects initialCategories={initialCategories} />
    </div>
  );
};

export default GalleryPage;
