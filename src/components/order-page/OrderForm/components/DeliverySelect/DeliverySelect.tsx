import React from 'react';
import {EDelivery, IOrderForm} from "@/types/order";
import styles from "./DeliverySelect.module.css";

interface IDeliverySelect {
	formData: IOrderForm,
	setFormData: (data:IOrderForm) => void,
}

const DeliverySelect: React.FC<IDeliverySelect> = ({ formData, setFormData }) => {
	return (
		<div className={styles.DeliverySelect}>
			<button
				disabled={formData.deliveryType === EDelivery.SELF}
				onClick={() => setFormData({...formData, deliveryType: EDelivery.SELF})}
			>
				Самовывоз
			</button>

			<button
				disabled={formData.deliveryType === EDelivery.COURIER}
				onClick={() => setFormData({...formData, deliveryType: EDelivery.COURIER})}
			>
				Доставка
			</button>
		</div>
	);
};

export default DeliverySelect;
