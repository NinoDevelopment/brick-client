import React from "react";
import styles from "./ProductsList.module.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/admin-page/ProductsList/components/ProductCard/ProductCard";

const ProductsList = () => {
  const { data } = useGetProducts();

  return (
    <div className={styles.ProductsList}>
      <h2 className={styles.title}>
        Товары ({data.loading ? "Обновление..." : data.products.length})
      </h2>

      {!data.products.length ? (
        <p className={styles.empty}>Товаров пока нет</p>
      ) : (
        <div className={styles.content}>
          {data.products.map((elem) => (
            <ProductCard key={elem._id} data={elem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
