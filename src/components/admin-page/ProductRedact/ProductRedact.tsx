import React, {FormEvent, useState} from 'react';
import {IProductIdWithImg} from "@/types/products";
import {Button, Form, Modal, Spinner} from "react-bootstrap";
import {useGetProducts} from "@/hooks/useGetProducts";
import {handleRequest} from "@/functions/handleRequest";
import {API_PRODUCT} from "@/constants/api";
import styles from "./ProductRedact.module.css";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import ProductFormCategorySelect
	from "@/components/admin-page/ProductAdd/components/ProductFormCategorySelect/ProductFormCategorySelect";
import ProductFormImages from "@/components/admin-page/ProductAdd/components/ProductFormImages/ProductFormImages";
import ProductFormWeightPrice
	from "@/components/admin-page/ProductAdd/components/ProductFormWeightPrice/ProductFormWeightPrice";
import ProductFormInputs from "@/components/admin-page/ProductAdd/components/ProductFormInputs/ProductFormInputs";
import {REQUEST_METHODS} from "@/types/general";

interface IProductRedact {
	data: IProductIdWithImg,
	show: boolean,
	handleClose: () => void,
}

const ProductRedact: React.FC<IProductRedact> = ({ data, show, handleClose }) => {

	const [formData, setFormData] = useState<IProductIdWithImg>(data);
	const { updateProducts } = useGetProducts();
	const [load, setLoad] = useState<boolean>(false);

	const handleRedact = (e:FormEvent) => {
		e.preventDefault();

		if (!formData.weights.length) {
			TOAST_ERROR("Выберите вес товара!");
			return;
		}

		if (formData.weights.length > 2) {
			TOAST_ERROR("Вы можете выбрать максимум 2 разновидности веса для товара!");
			return;
		}

		if (!formData?.images?.length) {
			TOAST_ERROR("Загрузите изображения товара!");
			return;
		}

		setLoad(true);
		handleRequest(REQUEST_METHODS.PUT, API_PRODUCT, formData)
			.then(() => {
				TOAST_SUCCESS("Товар успешно изменен");
				updateProducts();
			})
			.catch(() => TOAST_ERROR("Ошибка изменения товара"))
			.finally(() => {
				setLoad(false);
				handleClose();
			})
	}

	return (
		<Modal className={styles.ProductRedact} show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование товара</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={handleRedact}>
					{/*@ts-ignore*/}
					<ProductFormCategorySelect formData={formData} setFormData={setFormData} />

					{/*@ts-ignore*/}
					<ProductFormInputs formData={formData} setFormData={setFormData} />

					{/*@ts-ignore*/}
					<ProductFormImages formData={formData} setFormData={setFormData} />

					{/*@ts-ignore*/}
					<ProductFormWeightPrice formData={formData} setFormData={setFormData} />

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

export default ProductRedact;
