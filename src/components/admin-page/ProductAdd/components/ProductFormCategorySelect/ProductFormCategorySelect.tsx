import React from 'react';
import {Button, FloatingLabel, FormSelect, Spinner} from "react-bootstrap";
import {IProductIdWithImg, IProductWithImg} from "@/types/products";
import {useGetCategories} from "@/hooks/useGetCategories";

interface ProductFormCategorySelect {
	formData: IProductIdWithImg | IProductWithImg,
	setFormData: (formData: IProductIdWithImg | IProductWithImg) => void,
}

const ProductFormCategorySelect: React.FC<ProductFormCategorySelect> = ({ formData, setFormData }) => {

	const { data } = useGetCategories();

	if (data.error) {
		return (
			<Button disabled className={"w-100"} variant={"danger"}>
				Ошибка загрузки категорий!
			</Button>
		)
	}

	if (data.loading) {
		return (
			<Button disabled className={"w-100"} variant={"dark"}>
				Загрузка категорий
				<Spinner size={"sm"} className={"mx-2"} />
			</Button>
		)
	}

	return (
		<FloatingLabel label="Категория товара">
			<FormSelect
				onChange={e => setFormData({...formData, categoryId: e.target.value})}
				value={data?.categories?.find(elem => elem._id === formData.categoryId)?._id}
			>
				<option hidden>Выберите категорию для товара</option>
				{
					data.categories?.map(elem => (
						<option key={elem._id} value={elem._id}>
							{elem.name}
						</option>
					))
				}
			</FormSelect>
		</FloatingLabel>
	);
};

export default ProductFormCategorySelect;
