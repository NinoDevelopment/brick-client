import React from 'react';
import styles from './GalleryBanner.module.css';
import Link from "next/link";
import {APP_TITLE} from "@/constants/general";
import {LINK_GALLERY} from "@/constants/links";

const GalleryBanner = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.content}>
            <h1>Ищете вдохновение?</h1>
            <h5>
               Выбирайте удлиненные линейные кирпичи, а если длинный формат не подходит
               для вашего проекта, выберите из множества эффектных черных, красных,
               кремовых и белых кирпичей стандартной длины.
            </h5>
            <Link href={LINK_GALLERY}>Перейти в галерею</Link>
         </div>

         <img src={'/other/break-bg-1.png'} alt={APP_TITLE} />
      </div>
   );
};

export default GalleryBanner;