import React from 'react';
import styles from "./PayInfo.module.css";

const PayInfo = () => {
	return (
		<div className={styles.PayInfo}>
			<div className={styles.listsContainer}>
				<div className={styles.listBlock}>
					<h3>Тарифы доставки</h3>

					<ul>
						<li>Бесплатная доставка - при сумме заказа <b>от 600₽</b></li>
						<li>Доставка при меньше сумме – <b>300₽</b></li>
					</ul>
				</div>

				<div className={styles.listBlock}>
					<h3>Порядок оплаты</h3>

					<ul>
						<li>Оплата осуществляется на сайте с помощью банковской карты</li>
						<li>После получения товара Вам на электронную почту будет отправлен расчетный фискальный чек</li>
					</ul>
				</div>
			</div>

			<div className={styles.alertInfo}>
				<p>
					Индивидуальные условия и детали предварительного заказа
					Вы можете обсудить с оператором по телефону
				</p>
			</div>
		</div>
	);
};

export default PayInfo;
