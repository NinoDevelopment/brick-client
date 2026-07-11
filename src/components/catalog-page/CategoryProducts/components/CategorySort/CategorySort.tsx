import React from "react";
import styles from "./CategorySort.module.css";
import { Dropdown, Form } from "react-bootstrap";
import { IProductId } from "@/types/products";
import CategorySelect from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect";
import CategoryColorSelect from "@/components/catalog-page/CategoryProducts/components/CategoryColorSelect/CategoryColorSelect";
import stylesDropdown from "../CategorySelect/CategorySelect.module.css";

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
}) => {
  return (
    <div hidden={!data} className={styles.CategorySort}>
      <div className={styles.left}>
        <CategorySelect />
        <CategoryColorSelect
          color={color}
          setColor={setColor}
          products={data}
        />
      </div>
      <div className={styles.right}>
        <Form.Check
          className={styles.check}
          checked={discountOnly}
          onChange={() => setDiscountOnly(!discountOnly)}
          label={"Со скидкой"}
        />
        <Form.Check
          className={styles.check}
          checked={availableOnly}
          onChange={() => setAvailableOnly(!availableOnly)}
          label={"В наличии"}
        />
        <Dropdown className={stylesDropdown.CategorySelect}>
          <Dropdown.Toggle
            className={stylesDropdown.toggle}
            id="dropdown-autoclose-true"
          >
            {priceSort
              ? priceSort === -1
                ? "По убыванию"
                : "По возрастанию"
              : "Сортировка по цене"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => setPriceSort(1)}
              className={styles.dropItem}
            >
              По возрастанию
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setPriceSort(-1)}
              className={styles.dropItem}
            >
              По убыванию
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setPriceSort(null)}
              className={styles.dropItem}
            >
              Сбросить
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default CategorySort;
