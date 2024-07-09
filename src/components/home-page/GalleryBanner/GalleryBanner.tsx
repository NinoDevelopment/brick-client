import React from 'react';
import styles from './GalleryBanner.module.css';
import Link from 'next/link';
import { APP_TITLE } from '@/constants/general';
import { LINK_GALLERY } from '@/constants/links';

const GalleryBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Ищете вдохновение?</h1>
        <h5>
          Откройте для себя нашу галерею идей для строительства и дизайна с
          использованием кирпича. Найдите вдохновение для вашего следующего
          проекта, изучая изысканные дизайны, инновационные концепции и
          качественные решения.
        </h5>
        <Link href={LINK_GALLERY}>Перейти в галерею</Link>
      </div>

      <img src={'/other/break-bg-1.png'} alt={APP_TITLE} />
    </div>
  );
};

export default GalleryBanner;
