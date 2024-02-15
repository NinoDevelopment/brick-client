import React from 'react';
import {LINK_SHOP_CART} from "@/constants/links";
import Link from "next/link";
import {useAppSelector} from "@/store/store";
import styles from "./ShopCartLink.module.css";
import {APP_TITLE, BRICK_PACK} from "@/constants/general";

const ShopCartLink = () => {

	//shop cart data from redux
	const shopCartData = useAppSelector(state => state.shopCart.data);

	//count for all products
	const productsCount = shopCartData.reduce((count, item) => count + item.quantity, 0);

	return (
		<Link href={LINK_SHOP_CART} className={styles.ShopCartLink}>
			{
				!!productsCount ?
					<div className={styles.title}>
						<img src={"/icons/shop-cart.svg"} alt={APP_TITLE} />
						{!!productsCount && <span>{(productsCount / BRICK_PACK)?.toFixed()}</span>}
					</div>:
					<img src={"/icons/shop-cart.svg"} alt={APP_TITLE} />
			}
		</Link>
	);
};

export default ShopCartLink;
