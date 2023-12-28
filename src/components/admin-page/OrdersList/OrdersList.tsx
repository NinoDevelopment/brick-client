import React, {useState} from 'react';
import styles from "./OrdersList.module.css";
import {useGetOrders} from "@/hooks/useGetOrders";
import {Button, ButtonGroup} from "react-bootstrap";
import OrderCard from "@/components/admin-page/OrdersList/components/OrderCard/OrderCard";
import {EOrderSorts} from "@/types/order";

const OrdersList = () => {

	//list orders
	const { data, updateOrders } = useGetOrders();

	const [sort, setSort] = useState(EOrderSorts.WAIT);

	// return sorted products
	const getSortedItems = () => {
		if (!data?.orders?.length) return null;
		if (sort === EOrderSorts.ALL) return data.orders;
		if (sort === EOrderSorts.WAIT) return data.orders.filter(elem => !elem.completed);
		if (sort === EOrderSorts.COMPLETED) return data.orders.filter(elem => elem.completed);
	}

	if (!data.orders.length) return;

	return (
		<div className={styles.OrdersList}>
			<div className={styles.header}>
				<h1>Список заказов ({data.loading ? "Обновление..." : data.orders.length})</h1>

				<Button variant={"dark"} onClick={updateOrders} disabled={!!data.loading}>
					Обновить заказы
				</Button>
			</div>

			{/*SORT BUTTONS*/}
			<ButtonGroup className={styles.sortsContainer}>
				<Button disabled={sort === EOrderSorts.WAIT} onClick={() => setSort(EOrderSorts.WAIT)}>
					Незавершенные заказы
				</Button>
				<Button disabled={sort === EOrderSorts.COMPLETED} onClick={() => setSort(EOrderSorts.COMPLETED)}>
					Заверешенные заказы
				</Button>
				<Button disabled={sort === EOrderSorts.ALL} onClick={() => setSort(EOrderSorts.ALL)}>
					Все заказы
				</Button>
			</ButtonGroup>

			{/*LIST ORDERS*/}
			<div
				hidden={!getSortedItems() || !getSortedItems()?.length}
				className={styles.content}
			>
				{
					getSortedItems() && getSortedItems()?.map(elem => (
						<OrderCard key={elem._id} data={elem} />
					))
				}
			</div>

			{// смотрим не пустой ли массив в категории
				(!getSortedItems() || !getSortedItems()?.length) &&
				<h5 className={styles.noOrders}>
					Список заказов в данной категории пуст!
				</h5>
			}
		</div>
	);
};

export default OrdersList;
