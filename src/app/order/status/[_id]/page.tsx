'use client'
import React, {useEffect, useState} from 'react';
import {redirect, useParams} from "next/navigation";
import {useFetch} from "@/hooks/useFetch";
import {API_ORDER_ID} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {LINK_ERROR, LINK_HOME} from "@/constants/links";
import {EPayment, IOrderFormId} from "@/types/order";
import {Container, Spinner} from "react-bootstrap";
import OrderStatusData from "@/components/order-status-page/OrderStatusData/OrderStatusData";
import BackLink from "@/ui/BackLink/BackLink";
import styles from "./page.module.css";
import PhoneEmailLinks from "@/ui/PhoneEmailLinks/PhoneEmailLinks";

const page = () => {

	const params = useParams();
	const [interval, setInterval] = useState<false | number>(false);
	const { data, error, load } = useFetch<IOrderFormId>(API_ORDER_ID(params._id as string), REQUEST_METHODS.GET, {}, interval);

	useEffect(() => {
		//если онлайн оплата не завершена то обновляем статус каждые 3 секунды
		if (data?.paymentType === EPayment.ONLINE && !data?.paid) {
			setInterval(3000);
		} else {
			setInterval(false);
		}
	}, [data?.paymentType, data?.paid])

	if (load && !interval) return <Spinner />;
	if (error) redirect(LINK_ERROR);

	if (data)
	return (
		<Container className={styles.main}>
			<BackLink link={LINK_HOME} text={"На главную"} />
			<OrderStatusData data={data} />
			<PhoneEmailLinks />
		</Container>
	);
};

export default page;
