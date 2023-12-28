import React from 'react';
import CategoryProductsList from "@/components/catalog-page/CategoryProducts/components/CategoryProductsList/CategoryProductsList";
import {useGetCategories} from "@/hooks/useGetCategories";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import styles from "./CategoryProducts.module.css";

const CategoryProducts = () => {

	const { data:{selected} } = useGetCategories();

	if (!selected) {
		return (
			<div className={styles.loadContainer}>
				<SpinnerPrimary />
			</div>
		)
	}

	return (
		<div className={"CategoryProductsList"}>
			<CategoryProductsList selected={selected} />
		</div>
	);
};

export default CategoryProducts;
