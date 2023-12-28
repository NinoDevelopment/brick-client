import React from 'react';
import styles from "./ProductCard.module.css";
import {IShopCartItem} from "@/types/shopCart";
import {useFetch} from "@/hooks/useFetch";
import {API_PRODUCT_ID, API_PRODUCT_IMG} from "@/constants/api";
import {IProductId, IProductImg} from "@/types/products";
import ShopCartBtn from "@/components/general/ProductCard/components/ShopCartBtn/ShopCartBtn";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import {useAppDispatch} from "@/store/store";
import {clearItem} from "@/store/slices/shopCartSlice";
import {REQUEST_METHODS} from "@/types/general";
import Link from "next/link";
import {LINK_PRODUCT} from "@/constants/links";
import AvailableTooltip from "@/components/shopCart-page/ProductCard/components/AvailableTooltip/AvailableTooltip";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";


interface IProductCard {
	data: IShopCartItem,
	shopCartData: IShopCartItem[],
}

const ProductCard: React.FC<IProductCard> = ({ data, shopCartData }) => {

	const dispatch = useAppDispatch();
	const { data:productData, error, load } = useFetch<IProductId>(API_PRODUCT_ID(data.itemId), REQUEST_METHODS.GET, {}, false);
	const { data:images } = useFetch<IProductImg>(API_PRODUCT_IMG(data.itemId), REQUEST_METHODS.GET, {});

	//delete item from shop cart
	const handleClearItem = () => {
		dispatch(clearItem(data))
	}

	//если при получении товара вылетает ошибка то удаляем его из корзины
	if (error) {
		handleClearItem();
		return;
	}

	if (load) {
		return (
			<div className={styles.ProductCardLoad}>
				<SpinnerPrimary />
			</div>
		)
	}

	if (!productData) return;

	return (
		<div className={styles.ProductCard}>
			<div className={styles.swiperContainer}>
				<SwiperNavigation images={images?.images} />
			</div>

			<div className={styles.content}>
				<div className={styles.innerTop}>
					<AvailableTooltip available={productData.available} />
					<Link href={LINK_PRODUCT(productData._id)}>
						<h5>{productData.name}</h5>
					</Link>
					<p className={styles.weight}>{data.weight} грамм</p>
				</div>

				<ShopCartBtn
					selected={{weight: data.weight, price: data.price}}
					shopCartData={shopCartData}
					product={productData}
				/>
			</div>

			<footer className={styles.footer}>
				<img
					src={"/icons/close-primary.svg"}
					alt={"Удалить"}
					onClick={handleClearItem}
				/>

				<p>
					{productData.prices.find(elem => elem.weight === data.weight)?.price}₽
					{!!productData.discount && <span>- {productData.discount}%</span>}
				</p>
			</footer>
		</div>
	);
};

export default ProductCard;
