'use client'
import React from 'react';
import {useParams} from "next/navigation";
import {useFetch} from "@/hooks/useFetch";
import {API_PRODUCT_ID, API_PRODUCT_IMG} from "@/constants/api";
import {Container} from "react-bootstrap";
import {LINK_CATALOG, LINK_ERROR} from "@/constants/links";
import { redirect } from 'next/navigation';
import {IProductId, IProductImg} from "@/types/products";
import SwiperPhoto from "@/components/product-page/SwiperPhoto/SwiperPhoto";
import ProductInfo from "@/components/product-page/ProductInfo/ProductInfo";
import styles from "./ProductPage.module.css";
import {REQUEST_METHODS} from "@/types/general";
import BackLink from "@/ui/BackLink/BackLink";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import RandomProducts from "@/components/general/RandomProducts/RandomProducts";

const ProductPage = () => {

	const params = useParams();
	const {data, error, load} = useFetch<IProductId>(API_PRODUCT_ID(params._id as string), REQUEST_METHODS.GET, {}, false);
	const { data:images } = useFetch<IProductImg>(API_PRODUCT_IMG(params._id as string), REQUEST_METHODS.GET, {});

	if (load) {
		return (
			<Container className={styles.spinnerContainer}>
				<SpinnerPrimary />
			</Container>
		)
	}
	if (error) redirect(LINK_ERROR);

	if (data) {
		return (
			<Container className={styles.main}>
				<BackLink link={LINK_CATALOG} text={"В каталог"} />

				<div className={styles.productData}>
					<div className={styles.sliderContainer}>
						<SwiperPhoto images={images?.images} />
					</div>

					<div className={styles.dataContainer}>
						<ProductInfo data={data} />
					</div>
				</div>

				<RandomProducts quantity={3} />
			</Container>
		);
	}
};

export default ProductPage;
