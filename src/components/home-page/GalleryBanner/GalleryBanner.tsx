import styles from './GalleryBanner.module.css';
import Link from 'next/link';
import { APP_TITLE } from '@/constants/general';
import { LINK_GALLERY } from '@/constants/links';
import Image from "next/image";

const GalleryBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/CollectionPage">
        <div className={styles.content}>
           <h2 itemProp="name">Галерея</h2>
           <h5 itemProp="description">
              Посмотрите, как выглядит наш кирпич на готовых объектах.
              Реальные фасады и кладка — проще понять, что подойдёт вашему проекту.
           </h5>
           <Link href={LINK_GALLERY} itemProp="mainEntity" itemType="https://schema.org/ImageGallery">
              Смотреть фото
           </Link>
        </div>

        <Image
           width={970}
           height={706}
           src="/other/break-bg-1.png"
           alt={APP_TITLE}
           itemProp="image"
        />
     </div>
  );
};

export default GalleryBanner;
