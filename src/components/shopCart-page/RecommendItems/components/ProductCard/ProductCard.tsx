import React from 'react';
import styles from "./ProductCard.module.css";
import SwiperNavigation from "@/ui/SwiperNavigation/SwiperNavigation";
import {IProductId, IProductImg} from "@/types/products";
import {useFetch} from "@/hooks/useFetch";
import {API_PRODUCT_IMG} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";
import {Badge} from "react-bootstrap";
import Link from "next/link";
import {LINK_PRODUCT} from "@/constants/links";

interface IProductCard {
	data: IProductId,
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

	const { data:images } = useFetch<IProductImg>(API_PRODUCT_IMG(data._id), REQUEST_METHODS.GET, {});

	return (
		<div className={styles.ProductCard}>
			<div className={styles.sliderContainer}>
				<div className={styles.badges}>
					<Badge className={styles.badge} bg={"light"}>
						{data.weights.map(elem => (<p key={elem.value}>{elem.value}г<i>/</i></p>))}
					</Badge>

					<Badge className={styles.badge} hidden={!data.discount} bg={"light"}>
						{"- " + +data.discount + "%"}
					</Badge>

					<Badge className={styles.badge} bg={"light"}>
						{!data.available ? "Предзаказ" : "В наличии"}
					</Badge>

					<Badge hidden={!data?.onlyBread} className={styles.badge} bg={"light"}>
						Уникально в ЭХ
					</Badge>
				</div>

				<SwiperNavigation images={images?.images} />
			</div>

			<div className={styles.content}>
				<div className={styles.topContainer}>
					<Link href={LINK_PRODUCT(data._id)}>
						<h4>{data.name}</h4>
					</Link>
					<hr/>
					<p>{data.composition}</p>
				</div>

				<div className={styles.btnContainer}>
					{/*shop cart buttons*/}
					<ProductCardFooter data={data} />
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
