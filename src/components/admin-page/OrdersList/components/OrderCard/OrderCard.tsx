import React, {useState} from 'react';
import styles from "./OrderCard.module.css";
import {IOrderFormId} from "@/types/order";
import {Button, Card} from "react-bootstrap";
import OrderInfo from "@/components/admin-page/OrdersList/components/OrderCard/components/OrderInfo/OrderInfo";
import OrderProductItem
	from "@/components/admin-page/OrdersList/components/OrderCard/components/OrderProductItem/OrderProductItem";
import ModalConfirm from "@/ui/ModalConfirm/ModalConfirm";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_ORDER_COMPLETE_ID} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetOrders} from "@/hooks/useGetOrders";

interface IOrderCard {
	data: IOrderFormId,
}

const OrderCard: React.FC<IOrderCard> = ({ data }) => {

	const { updateOrders } = useGetOrders();

	// show products
	const [showItems, setShowItems] = useState<boolean>(false);

	// show modal confirm
	const [showModalConfirm, setShowModalConfirm] = useState(false);
	const [loadConfirm, setLoadConfirm] = useState(false);

	const handleConfirm = () => {
		setLoadConfirm(true);
		handleRequest(REQUEST_METHODS.PUT, API_ORDER_COMPLETE_ID(data._id), {})
			.then(() => {
				TOAST_SUCCESS("Статус заказа успешно изменен!");
				updateOrders();
			})
			.catch(() => TOAST_ERROR("Ошибка при редактировании статуса заказа!"))
			.finally(() => {
				setLoadConfirm(false);
				setShowModalConfirm(false);
			})
	}

	return (
		<Card className={styles.OrderCard}>
			{/*ORDER INFO*/}
			<OrderInfo data={data} />

			{/*ORDER PRODUCTS BUTTON SHOW*/}
			<Button
				variant={"success"} size={"sm"} className={"my-1"}
				hidden={data.completed}
				onClick={() => setShowModalConfirm(true)}
			>
				Отметить выполненным
			</Button>

			{/*ORDER PRODUCTS BUTTON SHOW*/}
			<Button
				variant={"dark"} size={"sm"} className={"my-1"}
				onClick={() => setShowItems(!showItems)}
			>
				{showItems ? "Скрыть" : "Показать"} товары заказа
			</Button>

			{/*ORDER PRODUCTS LIST*/}
			<div hidden={!showItems} className={styles.itemsContainer}>
				{
					data.positions.map(elem => (
						<OrderProductItem key={elem.itemId + elem.weight} data={elem} />
					))
				}
			</div>

			{/*MODAL CONFIRM*/}
			<ModalConfirm
				show={showModalConfirm}
				title={"Выполнение заказа"}
				handleClose={() => setShowModalConfirm(false)}
				handleConfirm={handleConfirm}
				load={loadConfirm}
			/>
		</Card>
	);
};

export default OrderCard;
