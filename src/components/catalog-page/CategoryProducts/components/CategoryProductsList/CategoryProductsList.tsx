"use client";
import {useEffect, useState} from "react";

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

  // sort sale item
  const getNotAvailableItems = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => !elem?.available);
  // sort sale item
  const getAvailableItems = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => elem?.available);
  // sort sale item
  const getItemsWithDiscount = (dataInner: IProductId[]) =>
    dataInner.filter((elem: IProductId) => +elem?.discount);
  // filter price
  const getSortPriceItems = (dataInner: IProductId[]) => {
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
    const priceData = priceSort
      ? getSortPriceItems(colorData as IProductId[])
      : colorData;
    if (sort === ESort.DEFAULT) return priceData;
    if (sort === ESort.NOT_AVAILABLE)
      return getNotAvailableItems(priceData as IProductId[]);
    if (sort === ESort.AVAILABLE)
      return getAvailableItems(priceData as IProductId[]);
    if (sort === ESort.DISCOUNT)
      return getItemsWithDiscount(priceData as IProductId[]);
  };

  useEffect(() => {
    // Динамически добавляем микроразметку
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "http://schema.org",
      "@type": "ItemList",
      "itemListElement": getSortedData()?.map((elem: IProductId, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": elem.name,
          "description": elem.description,
          "offers": {
            "@type": "Offer",
            "price": elem.price,
            "priceCurrency": "RUB",
            "availability": elem.available ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
          },
        },
      })),
    });
    document.head.appendChild(script);

    // Очистка при размонтировании
    return () => {
      document.head.removeChild(script);
    };
  }, [data, sort, color, priceSort]);

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
