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
	const [color, setColor] = useState<null | string>(null);

	const { data, load } = useFetch<IProductId[]>(API_CATEGORY_ITEMS(selected),REQUEST_METHODS.GET, {});

	// @ts-ignore sort sale item
	const getNotAvailableItems = (dataInner: Maybe<IProductId[]>) => dataInner.filter(elem => !elem.available);
	// @ts-ignore sort sale item
	const getAvailableItems = (dataInner: Maybe<IProductId[]>) => dataInner.filter(elem => elem.available);
	// @ts-ignore sort sale item
	const getItemsWithDiscount = (dataInner: Maybe<IProductId[]>) => dataInner.filter(elem => +elem.discount);

	const getSortedData = () => {
		const colorData = color ? data?.filter(elem => elem?.color === color) : data;
		if (sort === ESort.DEFAULT) return colorData;
		if (sort === ESort.NOT_AVAILABLE) return getNotAvailableItems(colorData);
		if (sort === ESort.AVAILABLE) return getAvailableItems(colorData);
		if (sort === ESort.DISCOUNT) return getItemsWithDiscount(colorData);
	};

	if (load || !getSortedData() || !data) {
		return (
			<div className={styles.loadContainer}>
				<SpinnerPrimary />
			</div>
		);
	}

	return (
		<div className={styles.CategoryProductsList}>

			{/*sort component*/}
			<CategorySort sort={sort} setSort={setSort} color={color} setColor={setColor} data={data} />

			{// products map
				!!(getSortedData() && getSortedData()?.length) &&
				<div className={styles.itemsContainer}>
					{getSortedData()?.map((elem: IProductId) => <ProductCard key={elem._id} data={elem} />)}
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
