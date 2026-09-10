"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategorySort.module.css";
import { IProductId } from "@/types/products";
import CategorySelect from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect";
import CategoryColorSelect from "@/components/catalog-page/CategoryProducts/components/CategoryColorSelect/CategoryColorSelect";
import { CATALOG_CATEGORIES } from "@/constants/catalogCategories";
import { LINK_CATALOG } from "@/constants/links";
import { CatalogCategoryRef } from "@/functions/serverFetch";

interface ICategorySort {
  data: IProductId[];
  discountOnly: boolean;
  setDiscountOnly: (value: boolean) => void;
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
  color: string | null;
  setColor: (value: string | null) => void;
  priceSort: null | 1 | -1;
  setPriceSort: (value: null | 1 | -1) => void;
  categorySlug?: string | null;
  categories?: CatalogCategoryRef[];
}

const CategorySort: React.FC<ICategorySort> = ({
  data,
  discountOnly,
  setDiscountOnly,
  availableOnly,
  setAvailableOnly,
  color,
  setColor,
  setPriceSort,
  priceSort,
  categorySlug = null,
  categories,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const hasColors = useMemo(
    () => data.some((elem) => Boolean(elem.color)),
    [data],
  );

  const selectedCategoryName = CATALOG_CATEGORIES.find(
    (elem) => elem.slug === categorySlug,
  )?.name;

  const activeFilters = useMemo(() => {
    const items: { key: string; label: string; clear: () => void }[] = [];

    if (selectedCategoryName) {
      items.push({
        key: "category",
        label: selectedCategoryName,
        clear: () => router.push(LINK_CATALOG),
      });
    }
    if (color) {
      items.push({
        key: "color",
        label: color,
        clear: () => setColor(null),
      });
    }
    if (discountOnly) {
      items.push({
        key: "discount",
        label: "Со скидкой",
        clear: () => setDiscountOnly(false),
      });
    }
    if (availableOnly) {
      items.push({
        key: "available",
        label: "В наличии",
        clear: () => setAvailableOnly(false),
      });
    }
    if (priceSort === 1) {
      items.push({
        key: "price-asc",
        label: "Цена ↑",
        clear: () => setPriceSort(null),
      });
    }
    if (priceSort === -1) {
      items.push({
        key: "price-desc",
        label: "Цена ↓",
        clear: () => setPriceSort(null),
      });
    }

    return items;
  }, [
    selectedCategoryName,
    color,
    discountOnly,
    availableOnly,
    priceSort,
    router,
    setColor,
    setDiscountOnly,
    setAvailableOnly,
    setPriceSort,
  ]);

  const resetAll = () => {
    setColor(null);
    setDiscountOnly(false);
    setAvailableOnly(false);
    setPriceSort(null);
    if (categorySlug) {
      router.push(LINK_CATALOG);
    }
  };

  const activeCount = activeFilters.length;

  return (
    <div hidden={!data} className={styles.CategorySort}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.toggleTitle}>
          Фильтры
          {activeCount > 0 && (
            <span className={styles.toggleBadge}>{activeCount}</span>
          )}
        </span>
        <span
          className={`${styles.toggleChevron} ${open ? styles.toggleChevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      <h3 className={styles.title}>Фильтры</h3>

      {!!activeFilters.length && (
        <div className={styles.activeBar}>
          <span className={styles.activeLabel}>Выбрано</span>
          <div className={styles.activeList}>
            {activeFilters.map((item) => (
              <button
                type="button"
                key={item.key}
                className={styles.activeChip}
                onClick={item.clear}
              >
                {item.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          <button type="button" className={styles.reset} onClick={resetAll}>
            Сбросить всё
          </button>
        </div>
      )}

      <div className={`${styles.body} ${open ? styles.bodyOpen : ""}`}>
        <div className={styles.row}>
          <p className={styles.label}>Тип</p>
          <div className={styles.chips}>
            <CategorySelect
              categorySlug={categorySlug}
              categories={categories}
            />
          </div>
        </div>

        {hasColors && (
          <div className={styles.row}>
            <p className={styles.label}>Цвет</p>
            <div className={styles.chips}>
              <CategoryColorSelect
                color={color}
                setColor={setColor}
                products={data}
              />
            </div>
          </div>
        )}

        <div className={styles.row}>
          <p className={styles.label}>Ещё</p>
          <div className={styles.chips}>
            <button
              type="button"
              className={`${styles.chip} ${discountOnly ? styles.chipActive : ""}`}
              onClick={() => setDiscountOnly(!discountOnly)}
            >
              Со скидкой
            </button>
            <button
              type="button"
              className={`${styles.chip} ${availableOnly ? styles.chipActive : ""}`}
              onClick={() => setAvailableOnly(!availableOnly)}
            >
              В наличии
            </button>
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>Цена</p>
          <div className={styles.chips}>
            <button
              type="button"
              className={`${styles.chip} ${priceSort === null ? styles.chipActive : ""}`}
              onClick={() => setPriceSort(null)}
            >
              Без сортировки
            </button>
            <button
              type="button"
              className={`${styles.chip} ${priceSort === 1 ? styles.chipActive : ""}`}
              onClick={() => setPriceSort(1)}
            >
              По возрастанию
            </button>
            <button
              type="button"
              className={`${styles.chip} ${priceSort === -1 ? styles.chipActive : ""}`}
              onClick={() => setPriceSort(-1)}
            >
              По убыванию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySort;
