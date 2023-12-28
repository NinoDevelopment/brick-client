import React from 'react';
import styles from "./PhoneEmailLinks.module.css";
import {CONTACTS} from "@/constants/general";

const PhoneEmailLinks = () => {
	return (
		<div className={styles.PhoneEmailLinks}>
			<div className={styles.block}>
				<h3>Позвонить</h3>
				<a href={`tel:${CONTACTS.phone.value}`}>
					{CONTACTS.phone.title}
				</a>
			</div>

			<div className={styles.block}>
				<h3>Написать</h3>
				<a href={`mailto:${CONTACTS.email.value}`}>
					{CONTACTS.email.title}
				</a>
			</div>
		</div>
	);
};

export default PhoneEmailLinks;
