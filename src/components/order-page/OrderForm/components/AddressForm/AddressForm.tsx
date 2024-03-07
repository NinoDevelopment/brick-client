import React from 'react';
import {IOrderForm} from "@/types/order";
import styles from "./AddressForm.module.css";
import {FormGroup} from "react-bootstrap";

interface IAddressForm {
	formData: IOrderForm,
	setFormData: (data:IOrderForm) => void,
}

const AddressForm: React.FC<IAddressForm> = ({ formData, setFormData }) => {
	return (
		<div className={styles.AddressForm}>
			<header>
               <h2>Адрес доставки</h2>
            </header>
			<FormGroup className={styles.block + " " + styles.w100}>
				<input
					required
					placeholder={"Область, город*"}
					value={formData.address.address}
					onChange={e => setFormData({...formData, address: {...formData.address, address: e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
				<input
					required
					placeholder={"Адрес*"}
					value={formData.address.commentAddress}
					onChange={e => setFormData({...formData, address: {...formData.address, commentAddress: e.target.value}})}
				/>
			</FormGroup>
		</div>
	);
};

export default AddressForm;
