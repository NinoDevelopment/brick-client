import React from 'react';
import styles from "./TotalAmount.module.css";
import {IShopCartAmount, IShopCartItem} from "@/types/shopCart";
import {useFetch} from "@/hooks/useFetch";
import {API_ORDER_AMOUNT} from "@/constants/api";
import Link from "next/link";
import {LINK_ORDER} from "@/constants/links";
import {REQUEST_METHODS} from "@/types/general";

interface ITotalAmount {
	shopCartData: IShopCartItem[],
}

const TotalAmount: React.FC<ITotalAmount> = ({ shopCartData }) => {

	//total amount
	const { data } = useFetch<IShopCartAmount>(API_ORDER_AMOUNT, REQUEST_METHODS.POST, {
		positions: shopCartData
	}, false)

	//count for all products
	const productsCount = shopCartData.reduce((count, item) => count + item.quantity,0);

	//check data
	if (data)
	return (
		<div className={styles.TotalAmount}>
			<div className={styles.content}>
				<div className={styles.block}>
					<span>{productsCount} товар(ов,a):</span>
					<b>{data?.amount}₽</b>
				</div>
				<div className={styles.block}>
					<span>Скидка:</span>
					<b>{(data?.amount - data?.discountedAmount)?.toFixed(1)}₽</b>
				</div>
				<div className={styles.block}>
					<h4>Итого:</h4>
					<h4>{data?.discountedAmount?.toFixed(1)}₽</h4>
				</div>
			</div>

			<Link href={LINK_ORDER} className={styles.btnNext}>
				Перейти к оформлению
			</Link>
		</div>
	);
};

export default TotalAmount;
