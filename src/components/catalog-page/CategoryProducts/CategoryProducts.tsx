import React from 'react';
import CategoryProductsList from "@/components/catalog-page/CategoryProducts/components/CategoryProductsList/CategoryProductsList";
import styles from "./CategoryProducts.module.css";

const CategoryProducts = () => {

	return (
		<div className={styles.wrapper}>
			<CategoryProductsList />
		</div>
	);
};

export default CategoryProducts;
