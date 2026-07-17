import React from "react";
import { useGetCategories } from "@/hooks/useGetCategories";
import styles from "./CategorySelect.module.css";

const CategorySelect = () => {
  const {
    data: { categories, selected },
    selectCategory,
  } = useGetCategories();

  if (!categories.length) return null;

  return (
    <div className={styles.CategorySelect} role="group" aria-label="Тип кирпича">
      <button
        type="button"
        className={`${styles.chip} ${!selected ? styles.chipActive : ""}`}
        onClick={() => selectCategory(null)}
      >
        Все
      </button>
      {categories.map((elem) => (
        <button
          type="button"
          key={elem._id}
          className={`${styles.chip} ${selected === elem._id ? styles.chipActive : ""}`}
          onClick={() => selectCategory(elem._id)}
        >
          {elem.name}
          {elem.hasSale && <span className={styles.sale}>%</span>}
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;
