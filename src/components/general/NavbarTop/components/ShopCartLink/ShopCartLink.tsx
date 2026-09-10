import React, { useEffect, useState } from "react";
import { LINK_SHOP_CART } from "@/constants/links";
import Link from "next/link";
import { persistedStore, useAppSelector } from "@/store/store";
import styles from "./ShopCartLink.module.css";
import { APP_TITLE } from "@/constants/general";

const ShopCartLink = () => {
  const [rehydrated, setRehydrated] = useState(false);
  const shopCartData = useAppSelector((state) => state.shopCart.data);

  useEffect(() => {
    if (persistedStore.getState().bootstrapped) {
      setRehydrated(true);
      return;
    }

    const unsubscribe = persistedStore.subscribe(() => {
      if (persistedStore.getState().bootstrapped) {
        setRehydrated(true);
      }
    });

    return unsubscribe;
  }, []);

  const totalPalletsCount = shopCartData.reduce(
    (count, item) => count + Math.ceil(item.quantity / item.pack),
    0,
  );

  const showCount = rehydrated && totalPalletsCount > 0;

  return (
    <Link href={LINK_SHOP_CART} className={styles.ShopCartLink}>
      <span className={styles.title}>
        <img src={"/icons/shop-cart.svg"} alt={APP_TITLE} />
        {showCount && <span>{totalPalletsCount.toFixed()}</span>}
      </span>
    </Link>
  );
};

export default ShopCartLink;
