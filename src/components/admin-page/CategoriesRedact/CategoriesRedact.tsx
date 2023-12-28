import React, {FormEvent, useState} from 'react';
import {ICategoryId} from "@/types/categories";
import {Button, Form, FormControl, Modal, Spinner} from "react-bootstrap";
import {handleRequest} from "@/functions/handleRequest";
import {API_CATEGORY} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetCategories} from "@/hooks/useGetCategories";
import styles from "./CategoriesRedact.module.css";
import {REQUEST_METHODS} from "@/types/general";

interface ICategoriesRedact {
	data: ICategoryId,
	show: boolean,
	handleClose: () => void,
}

const CategoriesRedact: React.FC<ICategoriesRedact> = ({ data, show, handleClose }) => {

	const { updateCategories } = useGetCategories();
	const [formData, setFormData] = useState<ICategoryId>(data);
	const [load, setLoad] = useState<boolean>(false);

	const handleRedact = (e:FormEvent) => {
		e.preventDefault();

		setLoad(true);
		handleRequest(REQUEST_METHODS.PUT, API_CATEGORY, formData)
			.then(() => {
				TOAST_SUCCESS("Категория успешно изменена");
				updateCategories();
			})
			.catch(() => TOAST_ERROR("Ошибка изменения категории"))
			.finally(() => {
				setLoad(false);
				handleClose();
			})

	}

	return (
		<Modal className={styles.CategoriesRedact} show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>
					Редактирование категории
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleRedact}>
					<FormControl
						required
						placeholder={"Название"}
						value={formData.name}
						onChange={e => setFormData({...formData, name: e.target.value})}
					/>

					<FormControl
						as={"textarea"} rows={3}
						placeholder={"Описание"}
						value={formData.description}
						onChange={e => setFormData({...formData, description: e.target.value})}
					/>

					<Form.Check // prettier-ignore
						className={"my-2"}
						type="switch"
						label="Распродажа в категории"
						checked={formData.hasSale}
						onChange={() => setFormData({...formData, hasSale: !formData.hasSale})}
					/>

					<Button disabled={load} type={"submit"} size={"sm"} className={"w-100"} variant={"outline-primary"}>
						{load ? <Spinner size={"sm"} /> : 'Отправить'}
					</Button>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button size={"sm"} variant={"secondary"} onClick={handleClose}>Отмена</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CategoriesRedact;
