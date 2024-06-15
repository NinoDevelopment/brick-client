import React, { useState } from "react";
import styles from "./CategoryProductsList.module.css";
import { useFetch } from "@/hooks/useFetch";
import { API_CATEGORY_ITEMS, API_PRODUCT } from "@/constants/api";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import { ESort, REQUEST_METHODS } from "@/types/general";
import CategorySort from "@/components/catalog-page/CategoryProducts/components/CategorySort/CategorySort";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { useGetCategories } from "@/hooks/useGetCategories";

const CategoryProductsList = () => {
  //sort type
  const [sort, setSort] = useState<ESort>(ESort.DEFAULT);
  const [color, setColor] = useState<null | string>(null);
  const [priceSort, setPriceSort] = useState<null | 1 | -1>(null);

  const {
    data: { selected },
  } = useGetCategories();
  const { data, load } = useFetch<IProductId[]>(
    selected ? API_CATEGORY_ITEMS(selected) : API_PRODUCT,
    REQUEST_METHODS.GET,
    {},
  );

  // @ts-ignore sort sale item
  const getNotAvailableItems = (dataInner: Maybe<IProductId[]>) =>
    dataInner.filter((elem) => !elem.available);
  // @ts-ignore sort sale item
  const getAvailableItems = (dataInner: Maybe<IProductId[]>) =>
    dataInner.filter((elem) => elem.available);
  // @ts-ignore sort sale item
  const getItemsWithDiscount = (dataInner: Maybe<IProductId[]>) =>
    dataInner.filter((elem) => +elem.discount);
  // @ts-ignore filter price
  const getSortPriceItems = (dataInner: Maybe<IProductId[]>) => {
    if (!priceSort) return dataInner;
    if (priceSort === -1) {
      return dataInner.sort(
        (a: IProductId, b: IProductId) => b.price - a.price,
      );
    }
    if (priceSort === 1) {
      return dataInner.sort(
        (a: IProductId, b: IProductId) => a.price - b.price,
      );
    }
  };

  const getSortedData = () => {
    const colorData = color
      ? data?.filter((elem) => elem?.color === color)
      : data;
    const priceData = priceSort ? getSortPriceItems(colorData) : colorData;
    if (sort === ESort.DEFAULT) return priceData;
    if (sort === ESort.NOT_AVAILABLE) return getNotAvailableItems(priceData);
    if (sort === ESort.AVAILABLE) return getAvailableItems(priceData);
    if (sort === ESort.DISCOUNT) return getItemsWithDiscount(priceData);
  };

  if (load || !getSortedData() || !data) {
    return (
      <div className={styles.loadContainer}>
        <SpinnerPrimary />
      </div>
    );
  }

  return (
    <div className={styles.CategoryProductsList}>
      {/*sort component*/}
      <CategorySort
        sort={sort}
        setSort={setSort}
        color={color}
        setColor={setColor}
        data={data}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
      />

      {
        // products map
        !!(getSortedData() && getSortedData()?.length) && (
          <div className={styles.itemsContainer}>
            {getSortedData()?.map((elem: IProductId) => (
              <ProductCard key={elem._id} data={elem} />
            ))}
          </div>
        )
      }

      {
        // check products length
        !getSortedData()?.length && (
          <p className={styles.noItems}>
            Список товаров для данной категории пуст
          </p>
        )
      }
    </div>
  );
};

export default CategoryProductsList;
