import React from 'react';
import {Table} from "react-bootstrap";
import {IProductId} from "@/types/products";

interface IProductPrice {
	data: IProductId,
}

const ProductPrice: React.FC<IProductPrice> = ({ data }) => {

	return (
		<>
			<Table bordered className={"small"}>
				<tbody>
					<tr>
						<td>Цена:</td>
						<td>{data.price}₽/шт</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default ProductPrice;
