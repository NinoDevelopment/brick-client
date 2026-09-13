import React, { useEffect } from "react";
import styles from "./ProductCard.module.css";
import { IShopCartItem } from "@/types/shopCart";
import { useFetch } from "@/hooks/useFetch";
import { API_PRODUCT_ID } from "@/constants/api";
import { IProductId } from "@/types/products";
import ShopCartBtn from "@/components/general/ProductCard/components/ShopCartBtn/ShopCartBtn";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import { useAppDispatch } from "@/store/store";
import { clearItem } from "@/store/slices/shopCartSlice";
import { REQUEST_METHODS } from "@/types/general";
import Link from "next/link";
import { LINK_PRODUCT } from "@/constants/links";
import AvailableTooltip from "@/components/shopCart-page/ProductCard/components/AvailableTooltip/AvailableTooltip";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { useProductImages } from "@/hooks/useProductImages";

interface IProductCard {
  data: IShopCartItem;
  shopCartData: IShopCartItem[];
}

const ProductCard: React.FC<IProductCard> = ({ data, shopCartData }) => {
  const dispatch = useAppDispatch();
  const {
    data: productData,
    error,
    load,
  } = useFetch<IProductId>(
    API_PRODUCT_ID(data.itemId),
    REQUEST_METHODS.GET,
    {},
    false,
  );
  const images = useProductImages(
    data.itemId,
    productData,
    Boolean(productData),
  );
  const thisItem = shopCartData.find(
    (item) => item.itemId === productData?._id,
  );

  const handleClearItem = () => {
    dispatch(clearItem(data));
  };

  useEffect(() => {
    if (!error) return;
    dispatch(clearItem(data));
  }, [error, data, dispatch]);

  if (error) return null;

  if (load) {
    return (
      <div className={styles.ProductCardLoad}>
        <SpinnerPrimary />
      </div>
    );
  }

  if (!productData) return null;

  return (
    <div className={styles.ProductCard}>
      <div className={styles.swiperContainer}>
        <SwiperNavigation images={images} name={productData.name} />
      </div>

      <div className={styles.content}>
        <div className={styles.innerTop}>
          <AvailableTooltip available={productData.available} />
          <h5>
            <Link href={LINK_PRODUCT(productData)}>{productData.name}</Link>
          </h5>
          <p>Паллет {productData.pack}шт</p>
        </div>

        <ShopCartBtn shopCartData={shopCartData} product={productData} />
      </div>

      <footer className={styles.footer}>
        <img
          src={"/icons/close-primary.svg"}
          alt={"Удалить"}
          onClick={handleClearItem}
        />

        <p>
          {productData?.price}₽/шт{" "}
          {thisItem?.quantity && `* ${thisItem?.quantity}шт`}
          {!!productData.discount && <span>- {productData.discount}%</span>}
        </p>
      </footer>
    </div>
  );
};

export default ProductCard;
