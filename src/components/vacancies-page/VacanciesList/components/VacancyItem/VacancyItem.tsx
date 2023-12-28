import React, {useState} from 'react';
import styles from "./VacancyItem.module.css";
import {IVacancyId} from "@/types/vacancies";
import {VACANCY_PHONE} from "@/constants/vacancies";

interface IVacancyItem {
	data: IVacancyId;
}

const VacancyItem: React.FC<IVacancyItem> = ({ data }) => {

	const [show, setShow] = useState<boolean>(false);

	return (
		<div className={styles.VacancyItem}>
			<div
				className={styles.title + ' ' + `${show ? styles.active : ''}`}
				onClick={() => setShow(prev => !prev)}
			>
				<h2>{data.name}</h2>
				<img className={styles.arrow} src="/icons/red-arrow-right.svg" alt=">"/>
			</div>

			<div className={styles.info + ' ' + `${show ? styles.active : ''}`}>
				<div className={styles.inner}>
					<h3>Описание</h3>
					<h5>{data.description}</h5>
				</div>

				<div hidden={!data?.additionalInfo} className={styles.inner}>
					<h3>Дополнительно</h3>
					<h5>{data?.additionalInfo || ''}</h5>
				</div>

				<div className={styles.inner}>
					<h3>Заработная плата</h3>
					<h5>{data.salary.toLocaleString("RU")}₽/мес</h5>
				</div>

				<div className={styles.inner}>
					<h3>Узнать подробности</h3>
					<a href={`tel:${VACANCY_PHONE.value}`}>{VACANCY_PHONE.title}</a>
				</div>
			</div>
		</div>
	);
};

export default VacancyItem;
