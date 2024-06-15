import React from "react";
import styles from "./GalleryBanner.module.css";
import Link from "next/link";
import { APP_TITLE } from "@/constants/general";
import { LINK_GALLERY } from "@/constants/links";

const GalleryBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Ищете вдохновение?</h1>
        <h5>
          Погрузитесь в нашу галерею, чтобы найти вдохновение для вашего
          будущего проекта. Изысканные дизайны, инновационные концепции и
          качественные решения - все это ждет вас в нашей коллекции изображений.
        </h5>
        <Link href={LINK_GALLERY}>Перейти в галерею</Link>
      </div>

      <img src={"/other/break-bg-1.png"} alt={APP_TITLE} />
    </div>
  );
};

export default GalleryBanner;
