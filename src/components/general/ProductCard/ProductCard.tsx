import React from 'react';
import {IProductId, IProductImg} from "@/types/products";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import styles from "./ProductCard.module.css";
import {Badge} from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import Link from "next/link";
import {LINK_PRODUCT} from "@/constants/links";
import {useFetch} from "@/hooks/useFetch";
import {API_PRODUCT_IMG} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";

interface IProductCard {
	data: IProductId,
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

	const { data:images } = useFetch<IProductImg>(API_PRODUCT_IMG(data._id), REQUEST_METHODS.GET, {});

	if (!data.show) return;

	return (
		<div className={styles.ProductCard}>
			{/*link with absolute position*/}
			<Link href={LINK_PRODUCT(data._id)} className={styles.link} />

			{/*top badges*/}
			<header>
				<Badge className={styles.weights} bg={"light"}>
					{data.weights.map(elem => (<p key={elem.value}>{elem.value}г<i>/</i></p>))}
				</Badge>

				<Badge hidden={!data.discount} bg={"light"}>
					{"- " + +data.discount + "%"}
				</Badge>

				<Badge bg={"light"}>
					{!data.available ? "Предзаказ" : "В наличии"}
				</Badge>

				<Badge hidden={!data?.onlyBread} bg={"light"}>
					Уникально в ЭХ
				</Badge>
			</header>

			{/*swiper*/}
			<div className={styles.swiperContainer}>
				<SwiperNavigation images={images?.images} />
			</div>

			{/*content*/}
			<div className={styles.content}>
				<h4 className={styles.name}>{data.name}</h4>
				<hr/>
				<p className={styles.composition}>{data.composition}</p>

				{/*shop cart buttons*/}
				<ProductCardFooter data={data} />
			</div>
		</div>
	);
};

export default ProductCard;
