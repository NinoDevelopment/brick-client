import React from 'react';
import styles from "./WeightsBtns.module.css";

interface IWeightsBtns {
	data: number,
	discount: number,
	pack: number,
}

const WeightsBtns: React.FC<IWeightsBtns> = ({ data, discount, pack }) => {

	return (
		<div className={styles.WeightsBtns}>
			<div className={styles.priceContainer}>
				<h6>Паллет <span>{pack}</span>шт</h6>
				<h3>
					{!!discount ? (data / 100 * (100 - discount))?.toFixed(1) : data}₽/шт
				</h3>
				{!!discount && <p>{data}₽/шт</p>}
			</div>
		</div>
	);
};

export default WeightsBtns;
