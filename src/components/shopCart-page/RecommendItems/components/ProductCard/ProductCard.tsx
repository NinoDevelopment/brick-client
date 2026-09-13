import React from "react";
import styles from "./ProductCard.module.css";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import { IProductId } from "@/types/products";
import { useProductImages } from "@/hooks/useProductImages";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import { Badge } from "react-bootstrap";
import Link from "next/link";
import { LINK_PRODUCT } from "@/constants/links";

interface IProductCard {
  data: IProductId;
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const images = useProductImages(data._id, data);

  return (
    <div className={styles.ProductCard}>
      <div className={styles.sliderContainer}>
        <div className={styles.badges}>
          <Badge className={styles.badge} hidden={!data.discount} bg={"light"}>
            {"- " + +data.discount + "%"}
          </Badge>

          <Badge className={styles.badge} bg={"light"}>
            {!data.available ? "Предзаказ" : "В наличии"}
          </Badge>
        </div>

        <SwiperNavigation images={images} name={data.name} />
      </div>

      <div className={styles.content}>
        <div className={styles.topContainer}>
          <h4>
            <Link href={LINK_PRODUCT(data)}>{data.name}</Link>
          </h4>
          <hr />
          <p>{data.description || "Без описания"}</p>
        </div>

        <div className={styles.btnContainer}>
          {/*shop cart buttons*/}
          <ProductCardFooter data={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
