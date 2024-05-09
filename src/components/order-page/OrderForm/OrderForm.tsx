import React, {FormEvent, useState} from 'react';
import styles from "./OrderForm.module.css";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {ORDER_FORM_INITIAL} from "@/constants/order";
import UserForm from "@/components/order-page/OrderForm/components/UserForm/UserForm";
import {EDelivery, EPayment, IOrderForm, IOrderWithSchetForm} from "@/types/order";
import {Form, Spinner} from "react-bootstrap";
import DeliverySelect from "@/components/order-page/OrderForm/components/DeliverySelect/DeliverySelect";
import AddressForm from "@/components/order-page/OrderForm/components/AddressForm/AddressForm";
import BankForm from "@/components/order-page/OrderForm/components/BankForm/BankForm";
import ShopAddress from "@/components/order-page/OrderForm/components/ShopAddress/ShopAddress";
import PaySelect from "@/components/order-page/OrderForm/components/PaySelect/PaySelect";
import OrderAmount from "@/components/order-page/OrderForm/components/OrderAmount/OrderAmount";
import {TOAST_ERROR} from "@/constants/toasts";
import {handleRequest} from "@/functions/handleRequest";
import {API_ORDER, API_ORDER_PLATI} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {LINK_ISSUING_PAYMENT, LINK_ORDER_ID} from "@/constants/links";
import {clearShopCart} from "@/store/slices/shopCartSlice";
import Link from "next/link";
import {Dispatch} from 'redux';

const OrderForm = () => {

	const dispatch: Dispatch<any> = useAppDispatch();
	const shopCartData = useAppSelector(state => state.shopCart.data);
	const [formData, setFormData] = useState<IOrderForm | IOrderWithSchetForm>(
		ORDER_FORM_INITIAL(shopCartData, EPayment.SCHET)
	  );
	const [load, setLoad] = useState<boolean>(false);
	const [promocode, setPromocode] = useState<string>('')

	//отправляем заказ
	const handleSend = (e:FormEvent) => {
		e.preventDefault();

		//check items length
		if (!formData.positions || !formData?.positions?.length) {
			TOAST_ERROR("Товары для заказа не выбраны!")
			return;
		}

		//check selected shop if delivery type === self
		if (formData.deliveryType === EDelivery.SELF && !formData.shopAddress) {
			TOAST_ERROR("Выберите откуда будет совершен самовывоз!")
			return;
		}

		//check phone number
		if (!formData.phoneNumber.match(/^\+?[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/)) {
			TOAST_ERROR("Введите телефон в формате +7(XXX)XXX-XX-XX!")
			return;
		}

		setLoad(true)
		handleRequest(REQUEST_METHODS.POST, API_ORDER, formData)
			.then(res => {
				if (res.data.paymentType === EPayment.ONLINE) {
					handleRequest(REQUEST_METHODS.POST, API_ORDER_PLATI(res.data._id), {})
						.then(resInner => {
							dispatch(clearShopCart()); //чистим корзину
							globalThis.open(resInner.data.confirmationURL, '_blank'); //редиректим на оплату
							globalThis.location.replace(LINK_ORDER_ID(res.data._id)); //редиректим на статус
						})
						.catch(() => TOAST_ERROR("Ошибка оформления заказа, пожалуйста попробуйте позже!"))
				}else {
					dispatch(clearShopCart()); //чистим корзину
					globalThis.location.replace(LINK_ORDER_ID(res.data._id)); //редиректим на статус
				}
			})
			.catch(() => TOAST_ERROR("Ошибка оформления заказа, пожалуйста попробуйте позже!"))
			.finally(() => setLoad(false))
	}

	return (
		<Form className={styles.OrderForm} onSubmit={handleSend}>
			<div className={styles.orderFormData}>
				<UserForm formData={formData} setFormData={setFormData} />
				{formData.paymentType === EPayment.SCHET && <BankForm formData={formData as IOrderWithSchetForm} setFormData={setFormData} />}
        		<DeliverySelect formData={formData} setFormData={setFormData} />
        		{formData.deliveryType === EDelivery.COURIER && <AddressForm formData={formData} setFormData={setFormData} />}
        		{formData.deliveryType === EDelivery.SELF && <ShopAddress formData={formData} setFormData={setFormData} />}
			</div>

			<div className={styles.payment}>
				<h3>Оплата</h3>
				<PaySelect formData={formData} setFormData={setFormData}/>

				<div className={styles.promocodeContainer}>
					<input
						placeholder={'Промокод'}
						value={promocode}
						onChange={e => setPromocode(e.target.value)}
					/>
					<button
						onClick={() => {
							setFormData({ ...formData, promocode })
							setPromocode('')
						}}
						type={'button'}
					>
						Применить
					</button>
				</div>

				<OrderAmount shopCartData={shopCartData} formData={formData}/>

				<button disabled={load} type={"submit"} className={styles.submitOrder}>
					{load ? <Spinner size={"sm"}/> : "Оформить заказ"}
				</button>
			</div>
		</Form>
	);
};

export default OrderForm;
