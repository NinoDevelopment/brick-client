import React, {FormEvent, useState} from 'react';
import styles from "./ProductAdd.module.css";
import {Button, Form, Spinner} from "react-bootstrap";
import {ITEM_INITIAL} from "@/constants/products";
import {IProductWithImg} from "@/types/products";
import ProductFormWeightPrice
	from "@/components/admin-page/ProductAdd/components/ProductFormWeightPrice/ProductFormWeightPrice";
import ProductFormImages from "@/components/admin-page/ProductAdd/components/ProductFormImages/ProductFormImages";
import {API_PRODUCT} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import ProductFormCategorySelect
	from "@/components/admin-page/ProductAdd/components/ProductFormCategorySelect/ProductFormCategorySelect";
import {useGetProducts} from "@/hooks/useGetProducts";
import ProductFormInputs from "@/components/admin-page/ProductAdd/components/ProductFormInputs/ProductFormInputs";
import {REQUEST_METHODS} from "@/types/general";

const ProductAdd = () => {

	const { updateProducts } = useGetProducts();
	const [formData, setFormData] = useState<IProductWithImg>(ITEM_INITIAL);
	const [load, setLoad] = useState<boolean>(false);

	const handleSend = (e:FormEvent) => {
		e.preventDefault();

		if (!formData?.images?.length) {
			TOAST_ERROR("Загрузите изображения товара!");
			return;
		}

		if (!formData.weights.length) {
			TOAST_ERROR("Выберите вес товара!");
			return;
		}

		if (formData.weights.length > 2) {
			TOAST_ERROR("Вы можете выбрать максимум 2 разновидности веса для товара!");
			return;
		}

		if (!formData.categoryId) {
			TOAST_ERROR("Выберите категорию товара!");
			return;
		}

		setLoad(true);
		handleRequest(REQUEST_METHODS.POST, API_PRODUCT, formData)
			.then(() => {
				TOAST_SUCCESS('Товар успешно добавлен');
				updateProducts();
			})
			.catch(() => TOAST_ERROR('Ошибка добавления товара'))
			.finally(() => {
				setFormData(ITEM_INITIAL)
				setLoad(false)
			})
	}

	return (
		<div className={styles.ProductAdd}>
			<h1 className={styles.title}>Добавить товар</h1>

			<Form onSubmit={handleSend}>
				<ProductFormCategorySelect formData={formData} setFormData={setFormData} />

				<ProductFormInputs formData={formData} setFormData={setFormData} />

				<ProductFormImages formData={formData} setFormData={setFormData} />

				<ProductFormWeightPrice formData={formData} setFormData={setFormData} />

				<Button disabled={load} size={"sm"} variant={"dark"} className={"w-100"} type={"submit"}>
					{load ? <Spinner size={"sm"} /> : 'Отправить'}
				</Button>
			</Form>
		</div>
	);
};

export default ProductAdd;
