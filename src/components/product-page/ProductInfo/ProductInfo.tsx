import React from "react";
import styles from "./ProductInfo.module.css";
import { IProductId } from "@/types/products";
import { Badge } from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import ProductSpecs from "@/components/product-page/ProductSpecs/ProductSpecs";
import Link from "next/link";
import {
  LINK_CATALOG_CATEGORY,
  LINK_DELIVERY_CITY,
} from "@/constants/links";
import { getCatalogCategory } from "@/constants/catalogCategories";
import { getProductCopy } from "@/functions/productSeo";

interface IProductInfo {
  data: IProductId;
  categoryName?: string;
  categorySlug?: string;
  heading?: string;
}

const ProductInfo: React.FC<IProductInfo> = ({
  data,
  categoryName,
  categorySlug,
  heading,
}) => {
  const copy = getProductCopy(data, categoryName);
  const category = categorySlug
    ? getCatalogCategory(categorySlug)
    : undefined;

  return (
    <div className={styles.ProductInfo}>
      <header>
        <Badge>{data.available ? "В наличии" : "Предзаказ"}</Badge>
        <Badge hidden={!data.discount}>{"- " + +data.discount + "%"}</Badge>
      </header>

      <div className={styles.content}>
        <h1>{heading || data.name}</h1>

        <ProductSpecs description={data.description} />

        <p className={styles.seoText}>{copy.intro}</p>
        {copy.facts ? <p className={styles.seoText}>{copy.facts}</p> : null}
        <p className={styles.seoText}>
          {copy.offer ? `${copy.offer} ` : null}
          {categoryName && categorySlug ? (
            <>
              Смотрите другие позиции{" "}
              <Link href={LINK_CATALOG_CATEGORY(categorySlug)}>
                {category?.nameGenitive ??
                  `${categoryName.toLowerCase()} кирпича`}
              </Link>
              {". "}
            </>
          ) : null}
          <Link href={LINK_DELIVERY_CITY("nizhny-novgorod")}>
            Доставка в Нижний Новгород
          </Link>{" "}
          и по области — своим транспортом завода.
        </p>
      </div>

      <ProductCardFooter data={data} />
    </div>
  );
};

export default ProductInfo;
