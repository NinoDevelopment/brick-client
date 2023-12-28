import React from 'react';
import {useFetch} from "@/hooks/useFetch";
import {IShopCartAmount, IShopCartItem} from "@/types/shopCart";
import {API_ORDER_AMOUNT} from "@/constants/api";
import {EDelivery, IOrderForm} from "@/types/order";
import {REQUEST_METHODS} from "@/types/general";
import {MIN_ORDER_PRICE} from "@/constants/general";
import styles from "./OrderAmount.module.css";

interface IOrderAmount {
	shopCartData: IShopCartItem[],
	formData: IOrderForm,
}

const OrderAmount: React.FC<IOrderAmount> = ({ shopCartData, formData }) => {

	//count for all products
	const productsCount = shopCartData.reduce((count, item) => count + item.quantity,0);

	//amount data
	const { data:amountData } = useFetch<IShopCartAmount>(API_ORDER_AMOUNT, REQUEST_METHODS.POST, {
		positions: shopCartData
	}, false);

	if (amountData && amountData.amountWithDelivery) {
		return (
			<div className={styles.OrderAmount}>
				<div className={styles.block}>
					<p>{productsCount} товар(ов,a)</p>
					<b>{(amountData?.discountedAmount).toFixed(1)}₽</b>
				</div>

				{
					formData.deliveryType === EDelivery.COURIER &&
					<>
						<div className={styles.block}>
							<p>Доставка курьером</p>
							<b>{amountData.amountWithDelivery - amountData.discountedAmount}₽</b>
						</div>

						<div hidden={!(MIN_ORDER_PRICE > amountData.amount)} className={styles.alertDelivery}>
							<h5><span>Бесплатная</span> доставка при заказе от {MIN_ORDER_PRICE}₽</h5>
							<p className={"small"}>
								Добавьте товаров на {MIN_ORDER_PRICE - amountData.amount + "₽"},
								чтобы воспользоваться акцией
							</p>
						</div>
					</>
				}

				<div className={styles.block + " " + styles.border}>
					<p>Скидка</p>
					<b>{(amountData.amount - amountData.discountedAmount)?.toFixed(1)}₽</b>
				</div>

				<div className={styles.block + " " + styles.itog}>
					<h5>Итого к оплате:</h5>
					<h5>
						{
							formData.deliveryType === EDelivery.COURIER ?
								amountData?.amountWithDelivery?.toFixed(1):
								amountData?.discountedAmount?.toFixed(1)
						}₽
					</h5>
				</div>
			</div>
		)
	}
};

export default OrderAmount;
