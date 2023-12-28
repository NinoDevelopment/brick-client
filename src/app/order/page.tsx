'use client'
import React from 'react';
import OrderForm from "@/components/order-page/OrderForm/OrderForm";
import styles from './page.module.css';
import {Container} from "react-bootstrap";
import BackLink from "@/ui/BackLink/BackLink";
import {LINK_SHOP_CART} from "@/constants/links";

const page = () => {
	return (
		<Container className={styles.main}>
			<BackLink link={LINK_SHOP_CART} text={"В корзину"} />

			<OrderForm />
		</Container>
	);
};

export default page;
