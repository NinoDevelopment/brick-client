import React from "react";
import CategoryProductsList from "@/components/catalog-page/CategoryProducts/components/CategoryProductsList/CategoryProductsList";
import styles from "./CategoryProducts.module.css";

const CategoryProducts = () => {
  return (
    <div itemScope itemType="http://schema.org/ItemList" className={styles.wrapper}>
      <CategoryProductsList />
    </div>
  );
};

export default CategoryProducts;
