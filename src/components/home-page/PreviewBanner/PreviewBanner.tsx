import styles from './PreviewBanner.module.css';
import Link from 'next/link';
import { LINK_CATALOG, LINK_DELIVERY_CITY } from '@/constants/links';

const PreviewBanner = () => {
  return (
    <div className={styles.PreviewBanner}>
      <video
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        disablePictureInPicture
        className={styles.video}
        poster="/other/back-video.png"
      >
        <source src="/videos/bg-preview.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1>
          <b>Кирпич</b> с завода <br /> в Ковернино
        </h1>
        <p className={styles.lead}>
          Свой карьер и производство в Ковернинском районе. <br />
          Рядовой и облицовочный кирпич — напрямую с завода
        </p>

        <Link href={LINK_CATALOG} className="app-btn">
          Смотреть каталог
        </Link>
        <p className={styles.secondaryLink}>
          <Link href={LINK_DELIVERY_CITY("nizhny-novgorod")}>
            Доставка кирпича в Нижний Новгород
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PreviewBanner;
