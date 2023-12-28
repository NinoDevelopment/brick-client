import React from 'react';
import SelectMany from "@/ui/SelectMany/SelectMany";
import {ITEM_WEIGHTS} from "@/constants/products";
import {Badge, FloatingLabel, FormControl} from "react-bootstrap";
import {IProductIdWithImg, IProductPrice, IProductWithImg, ISelectManyItem} from "@/types/products";

interface IProductFormWeightPrice {
	formData: IProductWithImg | IProductIdWithImg,
	setFormData: (formData: IProductWithImg | IProductIdWithImg) => void,
}

const ProductFormWeightPrice: React.FC<IProductFormWeightPrice> = ({ formData, setFormData }) => {

	const handleSelectWeight = (item:ISelectManyItem) => {
		if (formData.weights.find(elem => elem.value === item.value)){
			setFormData({
				...formData,
				weights: formData.weights.filter(elem => elem.value !== item.value),
				prices: formData.prices.filter(elem => elem.weight !== item.value),
			})
		}else {
			setFormData({
				...formData,
				weights: [...formData.weights, item],
				prices: [...formData.prices, {weight: +item.value, price: 0}],
			})
		}
	}

	const handleSetPrice = (newElem:IProductPrice) => {
		setFormData({
			...formData,
			prices: [...formData.prices.filter(elem => elem.weight !== newElem.weight), newElem]
		})
	}

	return (
		<>
			<SelectMany
				title={"Варианты веса"}
				data={ITEM_WEIGHTS}
				selectedItems={formData.weights}
				handleSelect={handleSelectWeight}
			/>

			<Badge hidden={!!formData.weights.length} className={"w-100 mb-1"} bg={"danger"}>
				Выберите вес товара для того, чтобы указать цену
			</Badge>

			{
				[...formData.prices]
					.sort((a,b) => a.weight - b.weight)
					.map(elem => (
						<FloatingLabel key={elem.weight} label={`Цена за ${elem.weight} грамм (Рубли)`}>
							<FormControl
								required
								type={"number"}
								value={elem.price || ''}
								onChange={e => handleSetPrice({weight: elem.weight, price: +e.target.value})}
							/>
						</FloatingLabel>
				))
			}
		</>
	);
};

export default ProductFormWeightPrice;
