import React, {Dispatch, SetStateAction} from 'react';
import {EPayment, IOrderForm, IOrderWithSchetForm} from "@/types/order";
import styles from "./UserForm.module.css";
import {FormGroup} from "react-bootstrap";

interface IUserForm {
	formData: IOrderForm | IOrderWithSchetForm,
	setFormData: Dispatch<SetStateAction<IOrderWithSchetForm | IOrderForm>> ,
}

const UserForm: React.FC<IUserForm> = ({ formData, setFormData }) => {
	return (
		<div className={styles.UserForm}>
			<FormGroup className={styles.w100}>
				<header>
    				<h2>Личная информация</h2>
				</header>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w50}>
				<input
					required
					placeholder={"Имя и фамилия*"}
					value={formData.fullName}
					onChange={e => setFormData({...formData, fullName: e.target.value})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w50}>
				<input
					required
					placeholder={"Номер телефона*"}
					value={formData.phoneNumber}
					onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
				<input
					required={formData.paymentType === EPayment.SCHET}
					value={formData.email}
					onChange={e => setFormData({...formData, email: e.target.value})}
					placeholder={`Email${formData.paymentType === EPayment.SCHET ? '*' : ''}`}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
				<textarea
					rows={4}
					placeholder={"Комментарий к заказу"}
					value={formData.comment}
					onChange={e => setFormData({...formData, comment: e.target.value})}
				/>
			</FormGroup>
		</div>
	);
};

export default UserForm;
