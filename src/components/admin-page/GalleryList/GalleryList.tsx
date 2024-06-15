import React from "react";
import styles from "./GalleryList.module.css";
import { useGetGallery } from "@/hooks/useGetGallery";
import GalleryCard from "@/components/admin-page/GalleryList/blocks/GalleryCard/GalleryCard";

const GalleryList = () => {
  const { data } = useGetGallery();

  if (!data?.categories) {
    return <h5 className={styles.noItems}>Загрузка галлереи...</h5>;
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>
          Галлерея ({data.loading ? "Обновление..." : data.categories.length})
        </h1>
      </header>

      {!data?.categories?.length && (
        <h5 className={styles.noItems}>Список пуст!</h5>
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
