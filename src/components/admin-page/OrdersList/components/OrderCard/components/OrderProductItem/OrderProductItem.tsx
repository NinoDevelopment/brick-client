import React from 'react';
import {IShopCartItem} from "@/types/shopCart";
import {useFetch} from "@/hooks/useFetch";
import {API_PRODUCT_ID} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {IProductId} from "@/types/products";
import Link from "next/link";
import {LINK_PRODUCT} from "@/constants/links";
import {Table} from "react-bootstrap";

interface IOrderProductItem {
	data: IShopCartItem,
}

const OrderProductItem: React.FC<IOrderProductItem> = ({ data }) => {

	const { data:itemData } = useFetch<IProductId>(API_PRODUCT_ID(data.itemId), REQUEST_METHODS.GET, {}, false);

	if (!itemData) return;

	return (
		<Table bordered className={"mb-2 small"}>
			<tbody>
			<tr>
				<td>Товар:</td>
				<td className={"fw-bold"}>
					<Link href={LINK_PRODUCT(itemData._id)}>
						{itemData.name}
					</Link>
				</td>
			</tr>
			<tr>
				<td>Вес:</td>
				<td>{data.weight} грамм</td>
			</tr>
			<tr>
				<td>Кол-во:</td>
				<td>{data.quantity} шт.</td>
			</tr>
			<tr>
				<td>Состав:</td>
				<td>{itemData.composition}</td>
			</tr>
			<tr hidden={itemData.available}>
				<td>Предзаказ:</td>
				<td>Да</td>
			</tr>
			</tbody>
		</Table>
	);
};

export default OrderProductItem;
