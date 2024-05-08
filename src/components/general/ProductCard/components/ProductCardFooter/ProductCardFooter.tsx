import React from 'react';
import styles from "./ProductCardFooter.module.css";
import {IProductId} from "@/types/products";
import WeightsBtns from "@/components/general/ProductCard/components/WeightsBtns/WeightsBtns";
import ShopCartBtn from "@/components/general/ProductCard/components/ShopCartBtn/ShopCartBtn";
import {useAppSelector} from "@/store/store";

interface IProductCardFooter {
	data: IProductId,
}

const ProductCardFooter: React.FC<IProductCardFooter> = ({ data }) => {

	//redux data shop cart
	const shopCartData = useAppSelector(state => state.shopCart.data);

	return (
		<footer className={styles.ProductCardFooter}>
			<WeightsBtns
				data={data.price}
				discount={data.discount}
				pack={data.pack}
			/>

			<ShopCartBtn
				shopCartData={shopCartData}
				product={data}
			/>
		</footer>
	);
};

export default ProductCardFooter;
