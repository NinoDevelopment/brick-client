import React from 'react';
import styles from "./ProductInfo.module.css";
import {IProductId} from "@/types/products";
import {Badge} from "react-bootstrap";
import ProductCardFooter from "@/components/general/ProductCard/components/ProductCardFooter/ProductCardFooter";

interface IProductInfo {
	data: IProductId,
}

const ProductInfo: React.FC<IProductInfo> = ({ data }) => {
	return (
		<div className={styles.ProductInfo}>
			<header>
				<Badge className={styles.weights}>
					{data.weights.map(item => <p key={item.value}>{item.value}г<span>/</span></p>)}
				</Badge>
				<Badge>
					{data.available ? "В наличии" : "Предзаказ"}
				</Badge>
				<Badge hidden={!data.discount}>
					{"- " + +data.discount + "%"}
				</Badge>
				<Badge hidden={!data?.onlyBread} bg={"light"}>
					Уникально в ЭХ
				</Badge>
			</header>

			<div className={styles.content}>
				<h1>{data.name}</h1>

				<div className={styles.blockContent}>
					<label>Состав:</label>
					<p>{data.composition}</p>
				</div>

				<div className={styles.blockContent}>
					<label>Описание:</label>
					<p>{data.description}</p>
				</div>
			</div>

			<ProductCardFooter data={data} />
		</div>
	);
};

export default ProductInfo;
