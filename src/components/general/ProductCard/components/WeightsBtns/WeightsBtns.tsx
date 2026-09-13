import React from "react";
import styles from "./WeightsBtns.module.css";
import {
  formatProductPrice,
  getProductUnitPrice,
} from "@/functions/productSeo";

interface IWeightsBtns {
  data: number;
  discount: number;
  pack: number;
}

const WeightsBtns: React.FC<IWeightsBtns> = ({ data, discount, pack }) => {
  const unitPrice = getProductUnitPrice({ price: data, discount });

  return (
    <div className={styles.WeightsBtns}>
      <div className={styles.priceContainer}>
        <h6>
          Паллет из <span>{pack}</span>шт
        </h6>
        <h3>
          {unitPrice !== undefined ? formatProductPrice(unitPrice) : data}
          ₽/шт
        </h3>
        {!!discount && <p>{data}₽/шт</p>}
      </div>
    </div>
  );
};

export default WeightsBtns;
