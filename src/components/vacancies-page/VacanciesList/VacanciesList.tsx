import React from 'react';
import styles from "./VacanciesList.module.css";
import {Container} from "react-bootstrap";
import VacancyItem from "@/components/vacancies-page/VacanciesList/components/VacancyItem/VacancyItem";
import {useGetVacancies} from "@/hooks/useGetVacancies";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";

const VacanciesList = () => {

	const { data: { vacancies, loading } } = useGetVacancies();

	return (
		<Container className={styles.VacanciesList}>
			<h1 className={styles.title}>Вакансии</h1>

			<div hidden={!loading} className={styles.loadContainer}>
				<SpinnerPrimary />
			</div>

			<h5 hidden={!!vacancies.length} className={styles.noItems}>
				Список вакансий пуст. Посетите эту страницу позже, возможно,
				у нас появится потребность именно в вашей кандидатуре!
				<br/>
				Спасибо за понимание!
			</h5>

			<div hidden={!vacancies?.length} className={styles.content}>
				{
					!!vacancies.length && vacancies.map(elem => (
						<VacancyItem key={elem._id} data={elem} />
					))
				}
			</div>
		</Container>
	);
};

export default VacanciesList;
