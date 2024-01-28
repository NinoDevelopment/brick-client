import React from 'react';
import styles from "./WeightsBtns.module.css";

interface IWeightsBtns {
	data: number,
	discount: number,
}

const WeightsBtns: React.FC<IWeightsBtns> = ({ data, discount }) => {

	return (
		<div className={styles.WeightsBtns}>
			<div className={styles.priceContainer}>
				<h3>
					{!!discount ? (data / 100 * (100 - discount))?.toFixed(1) : data}₽/палет
				</h3>
				{!!discount && <p>{data}₽/палет</p>}
			</div>
		</div>
	);
};

export default WeightsBtns;
