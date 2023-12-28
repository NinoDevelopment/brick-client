import React from 'react';
import {LINK_SHOP_CART} from "@/constants/links";
import Link from "next/link";
import {useAppSelector} from "@/store/store";
import {useFetch} from "@/hooks/useFetch";
import {IShopCartAmount} from "@/types/shopCart";
import {API_ORDER_AMOUNT} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import styles from "./ShopCartLink.module.css";
import {APP_TITLE} from "@/constants/general";

const ShopCartLink = () => {

	//shop cart data from redux
	const shopCartData = useAppSelector(state => state.shopCart.data);

	//count for all products
	const productsCount = shopCartData.reduce((count, item) => count + item.quantity,0);

	//total amount
	const { data:amountData } = useFetch<IShopCartAmount>(API_ORDER_AMOUNT, REQUEST_METHODS.POST, {
		positions: shopCartData
	})

	return (
		<Link href={LINK_SHOP_CART} className={styles.ShopCartLink}>
			{
				!!productsCount ?
					<div className={styles.title}>
						<img src={"/icons/shop-cart.svg"} alt={APP_TITLE} />
						{!!productsCount && <span>{productsCount}</span>}
					</div>:
					"Корзина"
			}
			{//price
				// check amountData && productsCount
				!!(!!amountData && productsCount) &&
				<span className={styles.price}>
					{amountData.discountedAmount.toFixed() + "₽"}
				</span>
			}
		</Link>
	);
};

export default ShopCartLink;
