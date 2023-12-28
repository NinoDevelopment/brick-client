import React, {useState} from 'react';
import styles from "./VacancyCard.module.css";
import {Button, ButtonGroup, Card, FormControl, Table} from "react-bootstrap";
import {IVacancyId} from "@/types/vacancies";
import ModalConfirm from "@/ui/ModalConfirm/ModalConfirm";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_VACANCY} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetVacancies} from "@/hooks/useGetVacancies";
import VacancyRedact from "@/components/admin-page/VacancyRedact/VacancyRedact";

interface IVacancyCard {
	data: IVacancyId
}

const VacancyCard: React.FC<IVacancyCard> = ({ data }) => {

	const { updateVacancies } = useGetVacancies();
	const [showDelete, setShowDelete] = useState<boolean>(false);
	const [showRedact, setShowRedact] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);

	const handleDelete = () => {
		setLoad(true);
		handleRequest(REQUEST_METHODS.DELETE, API_VACANCY, {vacanciesIds: [data._id]})
			.then(() => {
				TOAST_SUCCESS("Вакансия успешно удалена");
				updateVacancies();
			})
			.catch(() => TOAST_ERROR("Ошибка удаления вакансии"))
			.finally(() => {
				setLoad(false);
				setShowDelete(false);
			})
	}

	return (
		<Card className={styles.VacancyCard}>
			<Card.Body>
				<h3>{data.name}</h3>

				<Table bordered className={"small"}>
					<tbody>
						<tr>
							<td>Описание:</td>
							<td>
								<FormControl
									size={"sm"} as={"textarea"} rows={5}
									disabled
									defaultValue={data.description}
								/>
							</td>
						</tr>
						<tr>
							<td>Доп. информация:</td>
							<td>
								<FormControl
									size={"sm"} as={"textarea"} rows={5}
									disabled
									defaultValue={data.additionalInfo}
								/>
							</td>
						</tr>
						<tr>
							<td>Актуально:</td>
							<td>{data.show ? "Да" : "Нет"}</td>
						</tr>
						<tr>
							<td>Зарплата:</td>
							<td><b>{data.salary.toLocaleString("RU")}₽/мес</b></td>
						</tr>
					</tbody>
				</Table>
			</Card.Body>

			<Card.Footer>
				<ButtonGroup className={"w-100"}>
					{/*не можем изменять если фотки не загрузились*/}
					<Button
						variant="light" size={"sm"}
						onClick={() => setShowRedact(true)}
					>
						Изменить
					</Button>

					<Button variant="dark" size={"sm"} onClick={() => setShowDelete(true)}>
						Удалить
					</Button>
				</ButtonGroup>
			</Card.Footer>

			{/*delete confirm*/}
			<ModalConfirm
				show={showDelete}
				title={`Удаление вакансии "${data.name}"`}
				handleClose={() => setShowDelete(false)}
				handleConfirm={handleDelete}
				load={load}
			/>

			{/*redact*/}
			<VacancyRedact
				data={data}
				show={showRedact}
				handleClose={() => setShowRedact(false)}
			/>
		</Card>
	);
};

export default VacancyCard;
