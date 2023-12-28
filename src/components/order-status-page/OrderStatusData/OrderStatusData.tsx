import React from 'react';
import {EDelivery, EPayment, IOrderFormId} from "@/types/order";
import styles from "./OrderStatusData.module.css";
import {convertDateTime} from "@/functions/convertDateTime";

interface IOrderStatusData {
	data: IOrderFormId,
}

const OrderStatusData: React.FC<IOrderStatusData> = ({ data }) => {

	//count for all products
	const productsCount = data.positions.reduce((count, item) => count + item.quantity,0);

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
								"Заказ отправлен!"
							}
							{// если оплата онлайн и заказ еще не оплачен то "Заказ ожидает оплаты ..."
								(data.paymentType === EPayment.ONLINE && !data.paid) &&
								"Заказ ожидает оплаты ..."
							}
						</h3>
						<p className={styles.date}>{convertDateTime(data.createdAt)}</p>
					</header>

					{/*скрываем этот блок если оплата онлайн и она еще не проведена*/}
					<h5 hidden={data.paymentType === EPayment.ONLINE && !data.paid}>
						Спасибо за заказ!
						{
							data.deliveryType === EDelivery.SELF ?
								" Он будет ждать вас в пекарне.":
								" Курьер скоро к вам приедет."
						}
					</h5>

					<p className={styles.address}>
						Адрес {data.deliveryType === EDelivery.SELF ? "пекарни" : "доставки"}:
						{data.deliveryType === EDelivery.SELF ? " " + data.shopAddress : " " + data.address.address}
						<br/>
						Наш администратор свяжется с вами в ближайшее время
					</p>
				</div>

				<div className={styles.center}>
					<h3>{data.amount + "₽"}</h3>
					<p>{productsCount} товар(ов,a)</p>
				</div>

				<div className={styles.right}>
					<h4>
						{data.paymentType === EPayment.CASH && "Оплата при получении"}
						{data.paymentType === EPayment.ONLINE && data.paid && "Оплата картой онлайн"}
						{data.paymentType === EPayment.ONLINE && !data.paid && "Ожидание оплаты картой онлайн"}
					</h4>
				</div>
			</div>
		</div>
	);
};

export default OrderStatusData;
