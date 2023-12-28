'use client'
import React from 'react';
import styles from "./DeliveryPage.module.css";
import DeliveryInfo from "@/components/delivery-page/DeliveryInfo/DeliveryInfo";
import PayInfo from "@/components/delivery-page/PayInfo/PayInfo";
import {Container} from "react-bootstrap";

const DeliveryPage = () => {
	return (
		<Container className={styles.main}>
			<h1 className={styles.title}>Доставка и оплата</h1>

			<DeliveryInfo />
			<PayInfo />
		</Container>
	);
};

export default DeliveryPage;
