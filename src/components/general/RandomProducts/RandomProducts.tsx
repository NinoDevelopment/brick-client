"use client";

import React from "react";
import styles from "./RandomProducts.module.css";
import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCTS_SAMPLE } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import Link from "next/link";
import { LINK_CATALOG } from "@/constants/links";

interface IRandomProducts {
  title?: string;
  quantity?: number;
  initialProducts?: IProductId[];
}

const RandomProducts: React.FC<IRandomProducts> = ({
  title,
  quantity,
  initialProducts,
}) => {
  const hasInitial = Boolean(initialProducts?.length);
  const { data: fetched, load } = useFetch<IProductId[]>(
    API_PRODUCTS_SAMPLE(quantity || 6),
    REQUEST_METHODS.GET,
    {},
    false,
    !hasInitial,
  );

  const data = fetched ?? initialProducts;

  if (!hasInitial && load) {
    return (
      <div className={styles.spinnerContainer}>
        <SpinnerPrimary />
      </div>
    );
  }
  if (!data?.length) return null;

  return (
    <div className={styles.RandomProducts}>
      <h2>{title || "Вам может понравиться"}</h2>

      <div className={styles.productsContainer}>
        {data.map((elem) => (
          <ProductCard key={elem._id} data={elem} />
        ))}
      </div>

      <div className={styles.btnContainer}>
        <Link href={LINK_CATALOG}>Смотреть каталог</Link>
      </div>
    </div>
  );
};

export default RandomProducts;
