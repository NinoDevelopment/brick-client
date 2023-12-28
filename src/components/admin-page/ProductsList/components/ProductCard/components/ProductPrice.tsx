import React, {useState} from 'react';
import {Button, ButtonGroup, Table} from "react-bootstrap";
import {IProductId} from "@/types/products";

interface IProductPrice {
	data: IProductId,
}

const ProductPrice: React.FC<IProductPrice> = ({ data }) => {

	const [selectedWeight, setSelectedWeight] = useState(data?.weights?.[0].value);

	return (
		<>
			<ButtonGroup size={"sm"} className={"w-100 mb-1"}>
				{
					data?.weights?.map(elem => (
						<Button
							key={elem.value}
							variant={"outline-dark"}
							active={elem.value === selectedWeight}
							onClick={() => setSelectedWeight(elem.value)}
						>
							{elem.title}
						</Button>
					))
				}
			</ButtonGroup>

			<Table bordered className={"small"}>
				<tbody>
					<tr>
						<td>Цена за {selectedWeight} грамм:</td>
						<td>{data?.prices?.find(elem => elem.weight === selectedWeight)?.price}₽/шт</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};

export default ProductPrice;
