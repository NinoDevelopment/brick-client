"use client";

import React from "react";
import { IProductId } from "@/types/products";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import styles from "./ProductCard.module.css";
import { Badge } from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import Link from "next/link";
import { LINK_PRODUCT } from "@/constants/links";
import { useProductImages } from "@/hooks/useProductImages";

interface IProductCard {
  data: IProductId;
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const images = useProductImages(data._id, data);

  if (!data.show) return;

  return (
    <div className={styles.ProductCard}>
      <Link
        href={LINK_PRODUCT(data)}
        className={styles.link}
        aria-label={data.name}
      />

      {/*top badges*/}
      <header>
        <Badge hidden={!data.discount} bg={"light"}>
          {"- " + +data.discount + "%"}
        </Badge>

        <Badge bg={"light"}>
          {!data.available ? "Предзаказ" : "В наличии"}
        </Badge>
      </header>

      {/*swiper*/}
      <div className={styles.swiperContainer}>
        <SwiperNavigation images={images} name={data.name} />
      </div>

      {/*content*/}
      <div className={styles.content}>
        <h3 className={styles.name}>
          <Link href={LINK_PRODUCT(data)} className={styles.nameLink}>
            {data.name}
          </Link>
        </h3>
        <hr />
        <p className={styles.composition}>
          {data.description || "Без описания."}
        </p>

        {/*shop cart buttons*/}
        <ProductCardFooter data={data} />
      </div>
    </div>
  );
};

export default ProductCard;
