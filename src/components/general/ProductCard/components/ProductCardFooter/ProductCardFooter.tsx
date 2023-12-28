import React, {useState} from 'react';
import styles from "./ProductCardFooter.module.css";
import {IProductId, IProductPrice} from "@/types/products";
import WeightsBtns from "@/components/general/ProductCard/components/WeightsBtns/WeightsBtns";
import ShopCartBtn from "@/components/general/ProductCard/components/ShopCartBtn/ShopCartBtn";
import {useAppSelector} from "@/store/store";

interface IProductCardFooter {
	data: IProductId,
}

const ProductCardFooter: React.FC<IProductCardFooter> = ({ data }) => {

	const [selected, setSelected] = useState<IProductPrice>(data.prices[0]);

	//redux data shop cart
	const shopCartData = useAppSelector(state => state.shopCart.data);

	return (
		<footer className={styles.ProductCardFooter}>
			<WeightsBtns
				data={data.prices}
				discount={data.discount}
				selected={selected}
				setSelected={setSelected}
			/>

			<ShopCartBtn
				shopCartData={shopCartData}
				product={data}
				selected={selected}
			/>
		</footer>
	);
};

export default ProductCardFooter;
