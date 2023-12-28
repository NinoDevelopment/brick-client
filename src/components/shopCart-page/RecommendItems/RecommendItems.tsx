import React from 'react';
import styles from './RecommendItems.module.css'
import {useFetch} from "@/hooks/useFetch";
import {API_ITEM_RECOMMEND} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {IProductId} from "@/types/products";
import ProductCard from "@/components/shopCart-page/RecommendItems/components/ProductCard/ProductCard";

const RecommendItems = () => {

	// recommended items list
	const { data } = useFetch<IProductId[]>(API_ITEM_RECOMMEND(3), REQUEST_METHODS.GET, {}, false);

	if (!data?.length) return;

	return (
		<div className={styles.RecommendItems}>
			<h2 className={styles.title}>Попробуйте ещё</h2>

			<div className={styles.content}>
				{
					data.map(item => (
						<ProductCard key={item._id} data={item} />
					))
				}
			</div>
		</div>
	);
};

export default RecommendItems;
