import React from 'react';
import {EDelivery, EPayment, IOrderFormId} from "@/types/order";
import styles from "./OrderStatusData.module.css";
import {convertDateTime} from "@/functions/convertDateTime";

interface IOrderStatusData {
	data: IOrderFormId,
}

const OrderStatusData: React.FC<IOrderStatusData> = ({ data }) => {

	//count for all products
	const totalPalletsCount = data.positions.reduce((count, item) => count + Math.ceil(item.quantity / item.pack), 0);

	const getTheme = () => { // цвет для текста зависит от статуса оплаты заказа
		if (data.paymentType === EPayment.ONLINE && !data.paid) return "pending";
		return "success";
	}

	return (
		<div className={styles[getTheme()]}>
			<div className={styles.OrderStatusData}>
				<div className={styles.left}>
					<header>
						<h3>
							{// если оплата при получении или заказ оплачен то "Заказ отправлен!"
								(data.paymentType === EPayment.CASH ||
									(data.paymentType === EPayment.ONLINE && data.paid)) &&
								"Спасибо за заказ!"
							}
							{// если оплата онлайн и заказ еще не оплачен то "Заказ ожидает оплаты ..."
								(data.paymentType === EPayment.ONLINE && !data.paid) &&
								"Заказ ожидает оплаты ..."
							}
							{
								data.paymentType === EPayment.SCHET &&
								"Счет на оплату отправлен"
							}
						</h3>
					</header>

					{/*скрываем этот блок если оплата онлайн и она еще не проведена*/}
					<h5 hidden={data.paymentType === EPayment.ONLINE && !data.paid}>
						{
							data.deliveryType === EDelivery.SELF ?
								" Он будет ждать вас":
								" Мы скоро свяжемся с вами"
						}
					</h5>

					<p className={styles.address}>
						{data.deliveryType === EDelivery.SELF ? "Пункт выдачи" : "Адрес Доставки"}:
						{data.deliveryType === EDelivery.SELF ? " " + data.shopAddress : " " + data.address.city + ", " + data.address.address}
						<br/>
					</p>
				</div>

				<div className={styles.center}>
					<h3>{data.amount + "₽"}</h3>
					<p>{totalPalletsCount?.toFixed()} паллет(а)</p>
				</div>

				<div className={styles.right}>
					<h4>
						{data.paymentType === EPayment.CASH && "Оплата при получении"}
						{data.paymentType === EPayment.ONLINE && data.paid && "Заказ оплачен"}
						{data.paymentType === EPayment.ONLINE && !data.paid && "Ожидание оплаты картой"}
						{data.paymentType === EPayment.SCHET && "Ожидание оплаты счета"}
					</h4>
				</div>
			</div>
		</div>
	);
};

export default OrderStatusData;
