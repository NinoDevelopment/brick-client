import React, {FormEvent, useState} from 'react';
import {Alert, Button, FloatingLabel, Form, FormControl, Spinner} from "react-bootstrap";
import styles from "./CategoriesAdd.module.css";
import {convertToBase64} from "@/functions/convertToBase64";
import {CATEGORY_INITIAL} from "@/constants/categories";
import {ICategory} from "@/types/categories";
import {API_CATEGORY} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetCategories} from "@/hooks/useGetCategories";
import {REQUEST_METHODS} from "@/types/general";

const CategoriesAdd = () => {

	const [formData, setFormData] = useState<ICategory>(CATEGORY_INITIAL);
	const [load, setLoad] = useState<boolean>(false);
	const { updateCategories } = useGetCategories();

	const handleFileUpload = async (file:Blob | undefined) => {
		if (!file) return;
		convertToBase64(file)
			// @ts-ignore
			.then(res => setFormData({...formData, image: res}))
			.catch(() => TOAST_ERROR("Ошибка конвертации, выберите другое изображение."))
	};

	const handleSend = (e:FormEvent) => {
		e.preventDefault();

		if (!formData.image) {
			TOAST_ERROR("Загрузите изображение для категории!")
			return;
		}

		setLoad(true);
		handleRequest(REQUEST_METHODS.POST, API_CATEGORY, formData)
			.then(() => {
				TOAST_SUCCESS('Категория успешно добавлена');
				updateCategories();
			})
			.catch(() => TOAST_ERROR('Ошибка добавления категории'))
			.finally(() => {
				setFormData(CATEGORY_INITIAL)
				setLoad(false)
			})
	}

	return (
		<div className={styles.CategoriesAdd}>
			<h1>Добавить категорию</h1>

			<Form onSubmit={handleSend}>
				<FloatingLabel label={"Название"}>
					<FormControl
						required
						value={formData.name}
						onChange={e => setFormData({...formData, name: e.target.value})}
					/>
				</FloatingLabel>

				<FloatingLabel label={"Описание"}>
					<FormControl
						as={"textarea"}
						value={formData.description}
						onChange={e => setFormData({...formData, description: e.target.value})}
					/>
				</FloatingLabel>

				<FloatingLabel label={"Загрузите фото категории"}>
					<FormControl
						type={"file"} multiple={false}
						//@ts-ignore
						onChange={e => handleFileUpload(e.target.files[0])}
					/>
				</FloatingLabel>

				<Alert hidden={!formData.image} className={styles.alertPhoto}>
					Изображение успешно загружено!
				</Alert>

				<Form.Check // prettier-ignore
					className={"my-2"}
					type="switch"
					label="Распродажа в категории"
					checked={formData.hasSale}
					onChange={() => setFormData({...formData, hasSale: !formData.hasSale})}
				/>

				<Button disabled={load} type={"submit"} size={"sm"} className={"w-100"} variant={"dark"}>
					{load ? <Spinner size={"sm"} /> : 'Отправить'}
				</Button>
			</Form>
		</div>
	);
};

export default CategoriesAdd;
