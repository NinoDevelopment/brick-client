"use client";
import { useMemo, useState } from "react";

import styles from "./CategoryProductsList.module.css";
import { useFetch } from "@/hooks/useFetch";
import { API_CATEGORY_ITEMS, API_PRODUCT } from "@/constants/api";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import { ESort, REQUEST_METHODS } from "@/types/general";
import CategorySort from "@/components/catalog-page/CategoryProducts/components/CategorySort/CategorySort";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { useGetCategories } from "@/hooks/useGetCategories";

interface ICategoryProductsList {
  initialProducts?: IProductId[];
}

const CategoryProductsList = ({ initialProducts }: ICategoryProductsList) => {
  const [sort, setSort] = useState<ESort>(ESort.DEFAULT);
  const [color, setColor] = useState<null | string>(null);
  const [priceSort, setPriceSort] = useState<null | 1 | -1>(null);

  const {
    data: { selected },
  } = useGetCategories();

  const shouldFetch = Boolean(selected) || !initialProducts?.length;

  const { data: fetchedData, load } = useFetch<IProductId[]>(
    selected ? API_CATEGORY_ITEMS(selected) : API_PRODUCT,
    REQUEST_METHODS.GET,
    {},
    false,
    shouldFetch,
  );

  const data = fetchedData ?? initialProducts ?? null;

  const getNotAvailableItems = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => !elem?.available);

  const getAvailableItems = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => elem?.available);

  const getItemsWithDiscount = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => +elem?.discount);

  const getSortPriceItems = (dataInner: IProductId[]) => {
    if (!priceSort) return dataInner;
    if (priceSort === -1) {
      return [...dataInner].sort(
        (a: IProductId, b: IProductId) => b.price - a.price,
      );
    }
    if (priceSort === 1) {
      return [...dataInner].sort(
        (a: IProductId, b: IProductId) => a.price - b.price,
      );
    }
    return dataInner;
  };

  const sortedData = useMemo(() => {
    if (!data) return null;

    const colorData = color
      ? data.filter((elem) => elem?.color === color)
      : data;
    const priceData = priceSort
      ? getSortPriceItems(colorData)
      : colorData;

    if (sort === ESort.DEFAULT) return priceData;
    if (sort === ESort.NOT_AVAILABLE) return getNotAvailableItems(priceData);
    if (sort === ESort.AVAILABLE) return getAvailableItems(priceData);
    if (sort === ESort.DISCOUNT) return getItemsWithDiscount(priceData);

    return priceData;
  }, [data, sort, color, priceSort]);

  if ((load && !data) || !data || !sortedData) {
    return (
      <div className={styles.loadContainer}>
        <SpinnerPrimary />
      </div>
    );
  }

  const products = data;

  return (
    <div className={styles.CategoryProductsList}>
      <CategorySort
        sort={sort}
        setSort={setSort}
        color={color}
        setColor={setColor}
        data={products}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
      />

      {!!sortedData.length && (
        <div className={styles.itemsContainer}>
          {sortedData.map((elem: IProductId) => (
            <ProductCard key={elem._id} data={elem} />
          ))}
        </div>
      )}

      {!sortedData.length && (
        <p className={styles.noItems}>
          Список товаров для данной категории пуст
        </p>
      )}
    </div>
  );
};

export default CategoryProductsList;
