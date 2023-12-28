import React from 'react';
import {IOrderForm} from "@/types/order";
import {SHOPS_ADDRESSES} from "@/constants/general";
import styles from "./ShopAddress.module.css";

interface IShopAddress {
	formData: IOrderForm,
	setFormData: (data:IOrderForm) => void,
}

const ShopAddress: React.FC<IShopAddress> = ({ formData, setFormData }) => {
	return (
		<div className={styles.ShopAddress}>
			{
				SHOPS_ADDRESSES.map(elem => (
					<button
						disabled={elem.address === formData.shopAddress}
						key={elem.address}
						onClick={() => setFormData({...formData, shopAddress: elem.address})}
					>
						<h4>{elem.address}</h4>
						<p>{elem.city}</p>

						<footer>
							<b>{elem.workTime}</b>
							<span hidden={elem.address !== formData.shopAddress}>
								Выбрано
							</span>
						</footer>
					</button>
				))
			}
		</div>
	);
};

export default ShopAddress;
