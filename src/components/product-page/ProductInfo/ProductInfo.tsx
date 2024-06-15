import React from "react";
import styles from "./ProductInfo.module.css";
import { IProductId } from "@/types/products";
import { Badge } from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";

interface IProductInfo {
  data: IProductId;
}

const ProductInfo: React.FC<IProductInfo> = ({ data }) => {
  return (
    <div className={styles.ProductInfo}>
      <header>
        <Badge>{data.available ? "В наличии" : "Предзаказ"}</Badge>
        <Badge hidden={!data.discount}>{"- " + +data.discount + "%"}</Badge>
      </header>

      <div className={styles.content}>
        <h1>{data.name}</h1>

        <div className={styles.blockContent}>
          <label>Описание:</label>
          <p>{data.description}</p>
        </div>
      </div>

      <ProductCardFooter data={data} />
    </div>
  );
};

export default ProductInfo;
