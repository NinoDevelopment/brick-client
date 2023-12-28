import React from 'react';
import styles from './ShopCartBtn.module.css';
import {IProductId, IProductPrice} from "@/types/products";
import {useDispatch} from "react-redux";
import {IShopCartItem} from "@/types/shopCart";
import {addItem, removeItem} from "@/store/slices/shopCartSlice";

interface IShopCartBtn {
	selected: IProductPrice,
	shopCartData: IShopCartItem[],
	product: IProductId,
}

const ShopCartBtn: React.FC<IShopCartBtn> = ({ selected, shopCartData, product }) => {

	const dispatch = useDispatch();

	const thisItem = shopCartData.find(item => item.itemId === product._id && item.weight === selected.weight);

	const shopCartObject:IShopCartItem = {
		itemId: product._id,
		quantity: thisItem?.quantity || 1,
		price: selected.price,
		weight: selected.weight,
	};

	const handleAdd = () => {
		// console.log(shopCartObject)
		dispatch(addItem(shopCartObject))
	}

	const handleRemove = () => {
		// console.log(shopCartObject)
		dispatch(removeItem(shopCartObject))
	}

	if (thisItem) {
		return (
			<div className={styles.ShopCartBtnActive}>
				<button type="button" onClick={handleRemove}>
					-
				</button>

				<button disabled>{thisItem.quantity}</button>

				<button type="button" onClick={handleAdd}>
					+
				</button>
			</div>
		)
	}

	return (
		<button className={styles.ShopCartBtn} type="button" onClick={handleAdd}>
			В корзину
		</button>
	);
};

export default ShopCartBtn;
