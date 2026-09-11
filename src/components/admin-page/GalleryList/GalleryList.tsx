import React from "react";
import styles from "./GalleryList.module.css";
import { useGetGallery } from "@/hooks/useGetGallery";
import GalleryCard from "@/components/admin-page/GalleryList/blocks/GalleryCard/GalleryCard";

const GalleryList = () => {
  const { data } = useGetGallery();

  if (!data?.categories) {
    return <p className={styles.noItems}>Загрузка галереи...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h2>
          Альбомы ({data.loading ? "Обновление..." : data.categories.length})
        </h2>
      </header>

      {!data.categories.length && (
        <p className={styles.noItems}>Альбомов пока нет</p>
      )}

      <div className={styles.content}>
        {!!data?.categories?.length &&
          data.categories.map((elem) => (
            <GalleryCard key={elem.categoryId} data={elem} />
          ))}
      </div>
    </div>
  );
};

export default GalleryList;
