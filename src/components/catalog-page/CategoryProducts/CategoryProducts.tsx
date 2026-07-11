import React from "react";
import CategoryProductsList from "@/components/catalog-page/CategoryProducts/components/CategoryProductsList/CategoryProductsList";
import styles from "./CategoryProducts.module.css";
import { IProductId } from "@/types/products";

interface ICategoryProducts {
  initialProducts?: IProductId[];
}

const CategoryProducts = ({ initialProducts }: ICategoryProducts) => {
  return (
    <div className={styles.wrapper}>
      <CategoryProductsList initialProducts={initialProducts} />
    </div>
  );
};

export default CategoryProducts;
