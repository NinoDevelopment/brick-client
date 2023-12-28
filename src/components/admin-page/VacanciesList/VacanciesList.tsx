import React from 'react';
import {useGetVacancies} from "@/hooks/useGetVacancies";
import styles from "./VacanciesList.module.css";
import VacancyCard from "@/components/admin-page/VacanciesList/components/VacancyCard/VacancyCard";

const VacanciesList = () => {

	const { data: { vacancies, loading } } = useGetVacancies();

	if (!vacancies.length) return;

	return (
		<div className={styles.VacanciesList}>
			<h1 className={styles.title}>
				Список вакансий ({loading ? "Обновление..." : vacancies.length})
			</h1>

			<div className={styles.content}>
				{
					vacancies.map(elem => (
						<VacancyCard data={elem} key={elem._id} />
					))
				}
			</div>
		</div>
	);
};

export default VacanciesList;
