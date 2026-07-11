import React, { useEffect, useState } from "react";
import { LINK_SHOP_CART } from "@/constants/links";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import styles from "./ShopCartLink.module.css";
import { APP_TITLE } from "@/constants/general";

const ShopCartLink = () => {
  const [mounted, setMounted] = useState(false);
  const shopCartData = useAppSelector((state) => state.shopCart.data);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPalletsCount = shopCartData.reduce(
    (count, item) => count + Math.ceil(item.quantity / item.pack),
    0,
  );

  const showCount = mounted && totalPalletsCount > 0;

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
