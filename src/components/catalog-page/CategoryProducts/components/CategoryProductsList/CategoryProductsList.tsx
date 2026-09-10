"use client";
import { useEffect, useMemo, useState } from "react";

import styles from "./CategoryProductsList.module.css";
import { IProductId } from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import CategorySort from "@/components/catalog-page/CategoryProducts/components/CategorySort/CategorySort";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { CatalogCategoryRef } from "@/functions/serverFetch";

interface ICategoryProductsList {
  initialProducts?: IProductId[];
  categorySlug?: string | null;
  categories?: CatalogCategoryRef[];
}

const CategoryProductsList = ({
  initialProducts,
  categorySlug = null,
  categories,
}: ICategoryProductsList) => {
  const [discountOnly, setDiscountOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [color, setColor] = useState<null | string>(null);
  const [priceSort, setPriceSort] = useState<null | 1 | -1>(null);

  useEffect(() => {
    setColor(null);
    setDiscountOnly(false);
    setAvailableOnly(false);
    setPriceSort(null);
  }, [categorySlug]);

  const data = useMemo(() => {
    if (!initialProducts) return null;
    return initialProducts.filter((product) => product.show);
  }, [initialProducts]);

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

  if (!filteredData) {
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
          categorySlug={categorySlug}
          categories={categories}
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
