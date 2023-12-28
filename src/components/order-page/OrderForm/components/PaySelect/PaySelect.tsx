import React, {useEffect} from 'react';
import {EDelivery, EPayment, IOrderForm} from "@/types/order";
import styles from "./PaySelect.module.css";
import {EShopsIds} from "@/types/general";
import {SHOPS_ADDRESSES} from "@/constants/general";

interface IPaySelect {
	formData: IOrderForm,
	setFormData: (data:IOrderForm) => void,
}

const PaySelect: React.FC<IPaySelect> = ({ formData, setFormData }) => {

	//получаем объект для заведения ЭХ
	const itsBreadShop = SHOPS_ADDRESSES.find(elem => elem.id === EShopsIds.ITS_BREAD);

	// скрываем оплату картой или нет
	const hiddenCardPayment = () => {
		if (formData.deliveryType !== EDelivery.SELF) return false;
		return formData.shopAddress !== itsBreadShop?.address;
	}

	useEffect(() => {
		//для автоматического выбора способа оплаты при смене заведения
		if (formData.shopAddress !== itsBreadShop?.address){
			setFormData({...formData, paymentType: EPayment.ONLINE})
		}
	}, [formData.shopAddress])

	return (
		<div className={styles.PaySelect}>
			<button
				disabled={formData.paymentType === EPayment.ONLINE}
				onClick={() => setFormData({...formData, paymentType: EPayment.ONLINE})}
			>
				<div className={styles.left}>
					<div className={styles.circle} />
					<p>Картой онлайн</p>
				</div>
				<img src="/icons/bank-card.svg" alt="online"/>
			</button>

			<button
				hidden={hiddenCardPayment()}
				disabled={formData.paymentType === EPayment.CASH}
				onClick={() => setFormData({...formData, paymentType: EPayment.CASH})}
			>
				<div className={styles.left}>
					<div className={styles.circle} />
					<p>При получении</p>
				</div>
				<img src="/icons/cash.svg" alt="cash"/>
			</button>

			{/*предупреждение когда магазин для получения товара не выбран или оплата картой в заведении недоступна*/}
			<p hidden={!hiddenCardPayment()} className={styles.payWarning}>
				{
					formData.shopAddress ?
						"При самовывозе из данного заведения, оплата при получении недоступна":
						"Выберите заведение для получения вашего заказа"
				}
			</p>
		</div>
	);
};

export default PaySelect;
