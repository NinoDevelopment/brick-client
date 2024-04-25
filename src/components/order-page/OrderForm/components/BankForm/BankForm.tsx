import React from 'react';
import {IOrderWithSchetForm} from "@/types/order";
import styles from "./BankForm.module.css";
import {FormGroup} from "react-bootstrap";

interface IBankForm {
    formData: IOrderWithSchetForm,
    setFormData: (data: IOrderWithSchetForm) => void,
}

const BankForm: React.FC<IBankForm> = ({formData, setFormData}) => {
    return (
        <div className={styles.BankForm}>
			<header>
               <h2>Реквизиты компании</h2>
            </header>
            <FormGroup className={styles.block + " " + styles.w100}>
                <input
                    required
                    placeholder={'Компания*'}
                    value={formData.schetInfo?.bankName}
                    onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, companyName: e.target.value}})}
                />
			</FormGroup>

            <FormGroup className={styles.block + " " + styles.w100}>
                <input
                    required
                    placeholder={'Юр адрес компании*'}
                    value={formData.schetInfo?.bankName}
                    onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, companyAddress: e.target.value}})}
                />
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
            	<input
               		required
               		placeholder={'ИНН*'}
               		value={formData.schetInfo?.inn}
               		onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, inn: e.target.value}})}
				/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
            	<input
               		required
               		placeholder={'КПП*'}
               		value={formData.schetInfo?.kpp}
               		onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, kpp: e.target.value}})}
            	/>
            </FormGroup>

            <FormGroup className={styles.block + " " + styles.w100}>
                <input
                    placeholder={'Полное наименование банка'}
                    value={formData.schetInfo?.bankName}
                    onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, bankName: e.target.value}})}
                />
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
            	<input
			   		placeholder={'БИК'}
               		value={formData.schetInfo?.bic}
               		onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, bic: e.target.value}})}
            	/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
            	<input
			   		placeholder={'Корреспондентский счёт'}
               		value={formData.schetInfo?.correspondentAccount}
               		onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, correspondentAccount: e.target.value}})}
            	/>
			</FormGroup>

			<FormGroup className={styles.block + " " + styles.w100}>
            	<input
               		placeholder={'Номер счёта получателя'}
               		value={formData.schetInfo?.receiverAccount}
               		onChange={e => setFormData({...formData, schetInfo: {...formData.schetInfo, receiverAccount: e.target.value}})}
            	/>
			</FormGroup>
        </div>
    );
};

export default BankForm;