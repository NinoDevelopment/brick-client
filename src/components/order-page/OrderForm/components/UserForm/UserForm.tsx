import React from 'react';
import {IOrderForm} from "@/types/order";
import styles from "./UserForm.module.css";

interface IUserForm {
	formData: IOrderForm,
	setFormData: (data:IOrderForm) => void,
}

const UserForm: React.FC<IUserForm> = ({ formData, setFormData }) => {
	return (
		<div className={styles.UserForm}>
			<input
				required
				value={formData.fullName}
				onChange={e => setFormData({...formData, fullName: e.target.value})}
				placeholder={"Имя и фамилия*"}
			/>

			<input
				type={"tel"}
				required
				value={formData.phoneNumber}
				onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
				placeholder={"Номер телефона*"}
			/>

			<textarea
				rows={4}
				className={"w-100"}
				value={formData.comment}
				onChange={e => setFormData({...formData, comment: e.target.value})}
				placeholder={"Комментарий к заказу"}
			/>
		</div>
	);
};

export default UserForm;
