import React, { useMemo } from "react";
import { Dropdown } from "react-bootstrap";
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
    <Dropdown className={styles.CategorySelect}>
      <Dropdown.Toggle className={styles.toggle} id="dropdown-autoclose-true">
        Цвет кирпича: {color || "Все"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {colorsData
          .filter((elem) => elem !== color)
          .map((elem) => (
            <Dropdown.Item
              key={elem}
              onClick={() => setColor(elem)}
              className={styles.dropItem}
            >
              {elem}
            </Dropdown.Item>
          ))}
        {color && (
          <Dropdown.Item
            onClick={() => setColor(null)}
            className={styles.dropItem}
          >
            Показать все
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryColorSelect;
