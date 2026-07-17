import React, { useMemo } from "react";
import styles from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect.module.css";
import { IProductId } from "@/types/products";

interface IProps {
  color: string | null;
  setColor: (value: string | null) => void;
  products: IProductId[];
}

const CategoryColorSelect = ({ color, setColor, products }: IProps) => {
  const colorsData = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((elem) => elem.color)
            .filter((value): value is string => Boolean(value)),
        ),
      ),
    [products],
  );

  if (!colorsData.length) return null;

  return (
    <div className={styles.CategorySelect} role="group" aria-label="Цвет кирпича">
      <button
        type="button"
        className={`${styles.chip} ${!color ? styles.chipActive : ""}`}
        onClick={() => setColor(null)}
      >
        Все
      </button>
      {colorsData.map((elem) => (
        <button
          type="button"
          key={elem}
          className={`${styles.chip} ${color === elem ? styles.chipActive : ""}`}
          onClick={() => setColor(elem)}
        >
          {elem}
        </button>
      ))}
    </div>
  );
};

export default CategoryColorSelect;
