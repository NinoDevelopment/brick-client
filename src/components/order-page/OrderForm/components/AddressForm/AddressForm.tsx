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

			<FormGroup className={styles.block + " " + styles.w100}>
				<label>Адрес доставки*</label>
				<input
					required
					placeholder={"Улица, дом, корпус"}
					value={formData.address.address}
					onChange={e => setFormData({...formData, address: {...formData.address, address: e.target.value}})}
				/>
			</FormGroup>

			{/*TODO: removed item*/}
			{/*<FormGroup className={styles.block + " " + styles.w50}>*/}
			{/*	<label>Название адреса</label>*/}
			{/*	<input*/}
			{/*		placeholder={"Название адреса"}*/}
			{/*		value={formData.address.addressName}*/}
			{/*		onChange={e => setFormData({...formData, address: {...formData.address, addressName: e.target.value}})}*/}
			{/*	/>*/}
			{/*</FormGroup>*/}

			<FormGroup className={styles.block + " " + styles.w25}>
				<label>Квартира, офис</label>
				<input
					placeholder={"Квартира, офис"}
					value={formData.address.flat}
					onChange={e => setFormData({...formData, address: {...formData.address, flat: e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w25}>
				<label>Подъезд</label>
				<input
					placeholder={"Подъезд"}
					value={formData.address.entrance}
					onChange={e => setFormData({...formData, address: {...formData.address, entrance: e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w25}>
				<label>Домофон</label>
				<input
					placeholder={"Домофон"}
					value={formData.address.intercom}
					onChange={e => setFormData({...formData, address: {...formData.address, intercom: e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w25}>
				<label>Этаж</label>
				<input
					type={"number"} placeholder={"Этаж"}
					value={formData.address.floor || ""}
					onChange={e => setFormData({...formData, address: {...formData.address, floor: +e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
				<label>Комментарий к адресу</label>
				<textarea
					rows={4}
					placeholder={"Комментарий к адресу"}
					value={formData.address.commentAddress}
					onChange={e => setFormData({...formData, address: {...formData.address, commentAddress: e.target.value}})}
				/>
			</FormGroup>
		</div>
	);
};

export default AddressForm;
