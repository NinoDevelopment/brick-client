import styles from './GalleryBanner.module.css';
import Link from 'next/link';
import { APP_TITLE } from '@/constants/general';
import { LINK_GALLERY } from '@/constants/links';
import Image from "next/image";

const GalleryBanner = () => {
  return (
     <div className={styles.wrapper} itemScope itemType="https://schema.org/CollectionPage">
        <div className={styles.content}>
           <h1 itemProp="name">Ищете вдохновение?</h1>
           <h5 itemProp="description">
              Откройте для себя нашу галерею идей для строительства и дизайна с использованием кирпича. Найдите
              вдохновение для вашего следующего проекта, изучая изысканные дизайны, инновационные концепции и
              качественные решения.
           </h5>
           <Link href={LINK_GALLERY} itemProp="mainEntity" itemType="https://schema.org/ImageGallery">
              Перейти в галерею
           </Link>
        </div>

        <Image
           width={970}
           height={706}
           src={'/other/break-bg-1.png'}
           alt={APP_TITLE}
           itemProp="image"
        />
     </div>
  );
};

export default GalleryBanner;
