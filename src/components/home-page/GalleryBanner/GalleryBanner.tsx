import styles from './GalleryBanner.module.css';
import Link from 'next/link';
import { APP_TITLE } from '@/constants/general';
import { LINK_GALLERY } from '@/constants/links';
import Image from "next/image";

const GalleryBanner = () => {
  return (
     <div className={styles.wrapper}>
        <div className={styles.content}>
           <h2>Галерея</h2>
           <h5>
              Посмотрите, как выглядит наш кирпич на готовых объектах.
              Реальные фасады и кладка — проще понять, что подойдёт вашему проекту.
           </h5>
           <Link href={LINK_GALLERY}>
              Смотреть фото
           </Link>
        </div>

        <Image
           width={970}
           height={706}
           src="/other/break-bg-1.png"
           alt={APP_TITLE}
        />
     </div>
  );
};

export default GalleryBanner;
