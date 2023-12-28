'use client'
import React from 'react';
import styles from "./page.module.css";
import {Container} from "react-bootstrap";

const page = () => {
	return (
		<Container className={styles.main}>
			<h1 className={styles.title}>
				ЮРИДИЧЕСКАЯ ИНФОРМАЦИЯ И РЕКВИЗИТЫ
			</h1>

			<h5 className={styles.info}>
				Общество с ограниченной ответственностью «Предприятие ПАБ» <br/>
				ФИО: <b>Слизова Татьяна Валерьевна</b> <br/>
				Почтовый адрес: <b>606044 Дзержинск Желнино ул. Пролетарская 64</b> <br/>
				Почта: <b><a href="mailto:casparusnn@mail.ru">casparusnn@mail.ru</a></b> <br/>
				Номер телефона: <b><a href="tel:+79030425999">+7 903 042-59-99</a></b> <br/>
				Расчётный счёт: <b>40702810742160001592</b> <br/>
				Банк: <b>ВОЛГО-ВЯТСКИЙ БАНК ПАО СБЕРБАНК</b> <br/>
				ИНН: <b>524907027706</b> <br/>
				КПП: <b>524901001</b> <br/>
				ОГРНИП: <b>323527500075282</b> <br/>
			</h5>
		</Container>
	);
};

export default page;
