import styles from './PreviewBanner.module.css';
import Link from 'next/link';
import { LINK_CATALOG } from '@/constants/links';

const PreviewBanner = () => {
  return (
     <div className={styles.PreviewBanner} itemScope itemType="https://schema.org/VideoObject">
        <video
           playsInline
           autoPlay
           muted
           loop
           disablePictureInPicture
           className={styles.video}
           poster='/other/back-video.png'
           itemProp="video"
        >
           <source src='/videos/bg-preview.mp4' type='video/mp4'/>
        </video>

        <div className={styles.content}>
           <h1 itemProp="name">
              <b>Ведущий</b> поставщик <br/> кирпича в Нижнем Новгороде
           </h1>
           <h4 itemProp="description">
              Мы производим наши кирпичи из высококачественной <br/>
              глины собственного карьера.
           </h4>

           <Link href={LINK_CATALOG} itemProp="potentialAction">
              Купить кирпич
           </Link>
        </div>

        <meta itemProp="thumbnailUrl" content={`${process.env.NEXT_PUBLIC_PROD_URL}/other/back-video.png`}/>
        <meta itemProp="uploadDate" content="2025-03-22"/>
        <meta itemProp="duration" content="PT30S"/>
     </div>
  );
};

export default PreviewBanner;
