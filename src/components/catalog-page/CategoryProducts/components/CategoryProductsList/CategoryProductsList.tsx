"use client";
import { useEffect, useMemo, useState } from "react";

import styles from "./CategoryProductsList.module.css";
import { useFetch } from "@/hooks/useFetch";
import { API_CATEGORY_ITEMS, API_PRODUCT } from "@/constants/api";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import { REQUEST_METHODS } from "@/types/general";
import CategorySort from "@/components/catalog-page/CategoryProducts/components/CategorySort/CategorySort";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { useGetCategories } from "@/hooks/useGetCategories";

interface ICategoryProductsList {
  initialProducts?: IProductId[];
}

const CategoryProductsList = ({ initialProducts }: ICategoryProductsList) => {
  const [discountOnly, setDiscountOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [color, setColor] = useState<null | string>(null);
  const [priceSort, setPriceSort] = useState<null | 1 | -1>(null);

  const {
    data: { selected },
  } = useGetCategories();

  const shouldFetch = true;

  const { data: fetchedData, load } = useFetch<IProductId[]>(
    selected ? API_CATEGORY_ITEMS(selected) : API_PRODUCT,
    REQUEST_METHODS.GET,
    {},
    false,
    shouldFetch,
  );

  useEffect(() => {
    setColor(null);
  }, [selected]);

  const data = useMemo(() => {
    const raw = selected
      ? fetchedData
      : fetchedData ?? initialProducts;

    if (!raw) return null;
    return raw.filter((product) => product.show);
  }, [selected, fetchedData, initialProducts]);

  const filteredData = useMemo(() => {
    if (!data) return null;

    let result = [...data];

    if (color) {
      result = result.filter((elem) => elem.color === color);
    }
    if (discountOnly) {
      result = result.filter((elem) => +elem.discount > 0);
    }
    if (availableOnly) {
      result = result.filter((elem) => elem.available);
    }
    if (priceSort === -1) {
      result.sort((a, b) => b.price - a.price);
    }
    if (priceSort === 1) {
      result.sort((a, b) => a.price - b.price);
    }

    return result;
  }, [data, color, discountOnly, availableOnly, priceSort]);

  const isLoading = load && !data;

  if (isLoading || !filteredData) {
    return (
      <div className={styles.loadContainer}>
        <SpinnerPrimary />
      </div>
    );
  }

  return (
    <div className={styles.CategoryProductsList}>
      <aside className={styles.sidebar}>
        <CategorySort
          discountOnly={discountOnly}
          setDiscountOnly={setDiscountOnly}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          color={color}
          setColor={setColor}
          data={data ?? []}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
        />
      </aside>

      <div className={styles.content}>
        {!!filteredData.length && (
          <div className={styles.itemsContainer}>
            {filteredData.map((elem: IProductId) => (
              <ProductCard key={elem._id} data={elem} />
            ))}
          </div>
        )}

        {!filteredData.length && (
          <p className={styles.noItems}>
            Список товаров для данной категории пуст
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsList;
