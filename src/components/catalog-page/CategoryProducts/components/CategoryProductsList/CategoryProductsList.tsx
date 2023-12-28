import React, {useState} from 'react';
import styles from "./CategoryProductsList.module.css";
import {useFetch} from "@/hooks/useFetch";
import {API_CATEGORY_ITEMS} from "@/constants/api";
import {IProductId} from "@/types/products";
import ProductCard from "@/components/general/ProductCard/ProductCard";
import {ESort, REQUEST_METHODS} from "@/types/general"
import CategorySort from "@/components/catalog-page/CategoryProducts/components/CategorySort/CategorySort";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";

const CategoryProductsList = ({selected} : {selected:string}) => {

	//sort type
	const [sort, setSort] = useState<ESort>(ESort.DEFAULT);

	const { data, load } = useFetch<IProductId[]>(API_CATEGORY_ITEMS(selected),REQUEST_METHODS.GET, {});

	// @ts-ignore sort sale item
	const getNotAvailableItems = () => data.filter(elem => !elem.available);
	// @ts-ignore sort sale item
	const getAvailableItems = () => data.filter(elem => elem.available);

	const getSortedData = () => {
		if (sort === ESort.DEFAULT) return data;
		if (sort === ESort.NOT_AVAILABLE) return getNotAvailableItems();
		if (sort === ESort.AVAILABLE) return getAvailableItems();
	};

	if (load || !data) {
		return (
			<div className={styles.loadContainer}>
				<SpinnerPrimary />
			</div>
		);
	}

	return (
		<div className={styles.CategoryProductsList}>

			{/*sort component*/}
			<CategorySort
				sort={sort}
				setSort={setSort}
				data={data}
			/>

			{// products map
				!!(getSortedData() && getSortedData()?.length) &&
				<div className={styles.itemsContainer}>
					{getSortedData()?.map(elem => <ProductCard key={elem._id} data={elem} />)}
				</div>
			}

			{// check products length
				!getSortedData()?.length &&
				<p className={styles.noItems}>Список товаров для данной категории пуст</p>
			}
		</div>
	);
};

export default CategoryProductsList;
