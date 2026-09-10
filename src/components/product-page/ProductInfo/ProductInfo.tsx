import React from "react";
import styles from "./ProductInfo.module.css";
import { IProductId } from "@/types/products";
import { Badge } from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import ProductSpecs from "@/components/product-page/ProductSpecs/ProductSpecs";
import Link from "next/link";
import {
  LINK_CATALOG_CATEGORY,
  LINK_DELIVERY,
} from "@/constants/links";

interface IProductInfo {
  data: IProductId;
  categoryName?: string;
  categorySlug?: string;
}

const ProductInfo: React.FC<IProductInfo> = ({
  data,
  categoryName,
  categorySlug,
}) => {
  return (
    <div className={styles.ProductInfo}>
      <header>
        <Badge>{data.available ? "В наличии" : "Предзаказ"}</Badge>
        <Badge hidden={!data.discount}>{"- " + +data.discount + "%"}</Badge>
      </header>

      <div className={styles.content}>
        <h1>{data.name}</h1>

        <ProductSpecs description={data.description} />

        <p className={styles.seoText}>
          Купить {data.name.toLowerCase()} в Нижнем Новгороде с доставкой от
          завода Ковернино.
          {categoryName && categorySlug ? (
            <>
              {" "}
              Это{" "}
              <Link href={LINK_CATALOG_CATEGORY(categorySlug)}>
                {categoryName.toLowerCase()} кирпич
              </Link>
              : цена за штуку, отгрузка паллетами,{" "}
              <Link href={LINK_DELIVERY}>доставка по городу и области</Link>.
            </>
          ) : (
            <>
              {" "}
              Цена от производителя, отгрузка паллетами,{" "}
              <Link href={LINK_DELIVERY}>доставка по городу и области</Link>.
            </>
          )}
        </p>
      </div>

      <ProductCardFooter data={data} />
    </div>
  );
};

export default ProductInfo;
