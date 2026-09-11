import React from "react";
import styles from "./CategoriesList.module.css";
import CategoryCard from "@/components/admin-page/CategoriesList/components/CategoryCard/CategoryCard";
import { useGetCategories } from "@/hooks/useGetCategories";

const CategoriesList = () => {
  const { data } = useGetCategories();

  return (
    <div className={styles.CategoriesList}>
      <h2 className={styles.title}>
        Категории (
        {data.loading ? "Обновление..." : data.categories.length})
      </h2>

      {!data.categories.length ? (
        <p className={styles.empty}>Категорий пока нет</p>
      ) : (
        <div className={styles.content}>
          {data.categories.map((elem) => (
            <CategoryCard key={elem._id} data={elem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
