import React from 'react';
import styles from "./CategoriesList.module.css";
import CategoryCard from "@/components/admin-page/CategoriesList/components/CategoryCard/CategoryCard";
import {useGetCategories} from "@/hooks/useGetCategories";

const CategoriesList = () => {

	const { data } = useGetCategories();

	if (!data.categories.length) return;

	return (
		<div className={styles.CategoriesList}>
			<h1 className={styles.title}>
				Список категорий ({data.loading ? "Обновление..." : data.categories.length})
			</h1>

			<div className={styles.content}>
				{
					data.categories?.map(elem => (
						<CategoryCard key={elem._id} data={elem} />
					))
				}
			</div>
		</div>
	);
};

export default CategoriesList;
