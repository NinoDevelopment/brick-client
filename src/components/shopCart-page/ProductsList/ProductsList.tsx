import React from 'react';
import styles from "./ProductsList.module.css";
import ProductCard from "@/components/shopCart-page/ProductCard/ProductCard";
import {IShopCartItem} from "@/types/shopCart";

interface IProductCard {
	shopCartData: IShopCartItem[]
}

const ProductsList: React.FC<IProductCard> = ({ shopCartData }) => {

	return (
		<div className={styles.ProductsList}>
			<h2 className={styles.title}>Корзина</h2>

			<div className={styles.content}>
				{
					[...shopCartData]
						.sort((a, b) => a.price - b.price)
						.map(elem => (
						<ProductCard
							key={elem.weight + elem.itemId}
							data={elem}
							shopCartData={shopCartData}
						/>
					))
				}
			</div>
		</div>
	);
};

export default ProductsList;
