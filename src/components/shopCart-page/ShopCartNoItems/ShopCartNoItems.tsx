import React from 'react';
import styles from "./ShopCartNoItems.module.css";
import BackLink from "@/ui/BackLink/BackLink";
import {LINK_CATALOG} from "@/constants/links";
import {Container} from "react-bootstrap";

const ShopCartNoItems = () => {
	return (
		<Container className={styles.ShopCartNoItems}>

			<div className={styles.linkBack}>
				<BackLink link={LINK_CATALOG} text={"В каталог"} />
			</div>

			<div className={styles.content}>
				<img src="/icons/shop-cart-lg.svg" alt="no items"/>
				<h2>Корзина пуста</h2>
				<p>Добавьте товары в корзину и повторите попытку</p>
			</div>
		</Container>
	);
};

export default ShopCartNoItems;
