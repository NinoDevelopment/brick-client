import React, {FormEvent, useState} from 'react';
import styles from "./VacancyRedact.module.css";
import {IVacancyId} from "@/types/vacancies";
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useGetVacancies} from "@/hooks/useGetVacancies";
import VacancyFormInputs from "@/components/admin-page/VacancyAdd/components/VacancyFormInputs/VacancyFormInputs";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_VACANCY} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";

interface IVacancyRedact {
	data: IVacancyId,
	show: boolean,
	handleClose: () => void,
}

const VacancyRedact: React.FC<IVacancyRedact> = ({ data, show, handleClose }) => {

	const [formData, setFormData] = useState<IVacancyId>(data);
	const { updateVacancies } = useGetVacancies();
	const [load, setLoad] = useState<boolean>(false);

	const handleRedact = (e:FormEvent) => {
		e.preventDefault();

		setLoad(true);
		handleRequest(REQUEST_METHODS.PUT, API_VACANCY, formData)
			.then(() => {
				TOAST_SUCCESS("Вакансия успешно изменена");
				updateVacancies();
			})
			.catch(() => TOAST_ERROR("Ошибка изменения вакансии"))
			.finally(() => {
				setLoad(false);
				handleClose();
			})
	}

	return (
		<Modal className={styles.ProductRedact} show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование вакансии</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleRedact}>
					{/*@ts-ignore*/}
					<VacancyFormInputs formData={formData} setFormData={setFormData}/>

					<Button
						disabled={load}
						type={"submit"}
						size={"sm"}
						className={"w-100"}
						variant={"outline-primary"}
					>
						{load ? <Spinner size={"sm"} /> : 'Отправить'}
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default VacancyRedact;
