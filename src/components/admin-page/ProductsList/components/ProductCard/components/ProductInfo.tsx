import React from 'react';
import {IProductId} from "@/types/products";
import {Table} from "react-bootstrap";
import {handleCutStr} from "@/functions/handleCutStr";
import {useGetCategories} from "@/hooks/useGetCategories";

interface IProductInfo {
	data: IProductId,
}

const ProductInfo: React.FC<IProductInfo> = ({ data }) => {

	const { data: {categories} } = useGetCategories();

	return (
		<Table bordered className={"small"}>
			<tbody>
			<tr>
				<td>Описание:</td>
				<td>{handleCutStr(data?.description, 60) || "Без описания"}</td>
			</tr>
			<tr>
				<td>Состав:</td>
				<td>{handleCutStr(data?.composition, 60) || "Без состава"}</td>
			</tr>
			<tr hidden={!categories?.length}>
				<td>Категория:</td>
				<td>{categories?.find(elem => elem._id === data.categoryId)?.name}</td>
			</tr>
			<tr>
				<td>Скидка:</td>
				<td>{data?.discount}%</td>
			</tr>
			<tr>
				<td>Наличие:</td>
				<td>{!!data?.available ? "Да" : "Нет"}</td>
			</tr>
			<tr>
				<td>Рекомендация:</td>
				<td>{!!data?.isRecommendation ? "Да" : "Нет"}</td>
			</tr>
			<tr>
				<td>Показывать:</td>
				<td>{!!data?.show ? "Да" : "Нет"}</td>
			</tr>
			<tr>
				<td>Только в "Это хлеб":</td>
				<td>{!!data?.onlyBread ? "Да" : "Нет"}</td>
			</tr>
			</tbody>
		</Table>
	);
};

export default ProductInfo;
