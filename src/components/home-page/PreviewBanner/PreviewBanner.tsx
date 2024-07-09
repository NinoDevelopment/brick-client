import React from 'react';
import styles from './PreviewBanner.module.css';
import Link from 'next/link';
import { LINK_CATALOG } from '@/constants/links';

const PreviewBanner = () => {
  return (
    <div className={styles.PreviewBanner}>
      <video
        playsInline
        autoPlay
        muted
        loop
        disablePictureInPicture
        className={styles.video}
        poster='/other/back-video.png'
      >
        <source src='/videos/bg-preview.mp4' type='video/mp4' />
      </video>

      <div className={styles.content}>
        <h1>
          <b>Ведущий</b> поставщик <br /> кирпича в Нижнем Новгороде
        </h1>
        <h4>
          Мы производим наши кирпичи из высококачественной <br />
          глины собственного карьера.
        </h4>

        <Link href={LINK_CATALOG}>Купить кирпич</Link>
      </div>
    </div>
  );
};

export default PreviewBanner;
