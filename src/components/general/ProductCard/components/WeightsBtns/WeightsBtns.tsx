import React from 'react';
import styles from "./WeightsBtns.module.css";
import {IProductPrice} from "@/types/products";

interface IWeightsBtns {
	data: IProductPrice[],
	selected: IProductPrice,
	discount: number,
	setSelected: (elem:IProductPrice) => void,
}

const WeightsBtns: React.FC<IWeightsBtns> = ({ data, selected, setSelected, discount }) => {

	return (
		<div className={styles.WeightsBtns}>
			{
				data.length === 1 &&
				<div className={styles.priceContainer}>
					<h3>
						{
							!!discount ?
								(data[0].price / 100 * (100 - discount))?.toFixed(1):
								data[0].price
						}₽
					</h3>
					{
						!!discount &&
						<p>{data[0].price}₽</p>
					}
				</div>
			}

			{
				data.length > 1 && data.map(elem => (
					<button
						key={elem.weight}
						disabled={elem === selected}
						onClick={() => setSelected(elem)}
					>
						<h5>{elem.price}₽</h5>
						<p className="small">{elem.weight}г</p>
					</button>
				))
			}
		</div>
	);
};

export default WeightsBtns;
