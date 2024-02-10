import React, {FormEvent} from 'react';
import BackLink from "@/ui/BackLink/BackLink";
import {LINK_ORDER} from "@/constants/links";
import styles from './PaymentForm.module.css';
import {Form} from "react-bootstrap";

const PaymentForm = () => {

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
   }

   return (
      <div className={styles.wrapper}>
         <BackLink link={LINK_ORDER} text={'В корзину'} />
         <h1 className={styles.title}>Выставление счёта на оплату</h1>

         <Form onSubmit={onSubmit} className={styles.form}>
            <label>Название банка</label>
            <input placeholder={'Введите полное наименование банка'}/>

            <label>БИК</label>
            <input placeholder={'XXXXXXXXXX'}/>

            <label>Корреспондентский счёт</label>
            <input placeholder={'XXXXXXXXXXXXXXXXXXXX'}/>

            <label>Номер счёта получателя</label>
            <input placeholder={'Введите номер счёта получателя'}/>

            <label>ИНН</label>
            <input placeholder={'XXXXXXXXXX'}/>

            <label>КПП</label>
            <input placeholder={'XXXXXXXXX'}/>

            <button type={'submit'}>Выставить счёт</button>
         </Form>
      </div>
   );
};

export default PaymentForm;