import React, {FormEvent, useState} from 'react';
import styles from "./VacancyAdd.module.css";
import VacancyFormInputs from "@/components/admin-page/VacancyAdd/components/VacancyFormInputs/VacancyFormInputs";
import {VACANCY_INITIAL} from "@/constants/vacancies";
import {Button, Form, Spinner} from "react-bootstrap";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_VACANCY} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {IVacancy} from "@/types/vacancies";
import {useGetVacancies} from "@/hooks/useGetVacancies";

const VacancyAdd = () => {

	const { updateVacancies } = useGetVacancies();
	const [formData, setFormData] = useState<IVacancy>(VACANCY_INITIAL);
	const [load, setLoad] = useState<boolean>(false);

	const handleSend = (e:FormEvent) => {
		e.preventDefault();

		setLoad(true);
		handleRequest(REQUEST_METHODS.POST, API_VACANCY, formData)
			.then(() => {
				TOAST_SUCCESS('Вакансия успешно добавлена');
				updateVacancies();
			})
			.catch(() => () => TOAST_ERROR('Ошибка добавления вакансии!'))
			.finally(() => {
				setFormData(VACANCY_INITIAL);
				setLoad(false);
			})
	}

	return (
		<div className={styles.VacancyAdd}>
			<h1 className={styles.title}>Добавить вакансию</h1>

			<Form onSubmit={handleSend}>
				<VacancyFormInputs
					formData={formData}
					setFormData={setFormData}
				/>

				<Button
					className={"w-100"}
					type={"submit"}
					variant={"dark"}
					size={"sm"}
					disabled={load}
				>
					{load ? <Spinner size={"sm"} /> : 'Отправить'}
				</Button>
			</Form>
		</div>
	);
};

export default VacancyAdd;
