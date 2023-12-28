import React from 'react';
import styles from "./CategorySort.module.css";
import {Form} from "react-bootstrap";
import {ESort} from "@/types/general";
import {IProductId} from "@/types/products";
import CategorySelect from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect";

interface ICategorySort {
	data: IProductId[],
	sort: ESort,
	setSort: (value: ESort) => void,
}

const CategorySort: React.FC<ICategorySort> = ({ data, sort, setSort }) => {
	return (
		<div hidden={!data.length} className={styles.CategorySort}>
			<CategorySelect />
			<div className={styles.right}>
				<Form.Check // sale switch
					className={styles.check}
					checked={sort === ESort.DEFAULT}
					onChange={() => setSort(ESort.DEFAULT)}
					label={"Без сортировки"}
				/>
				<Form.Check // sale switch
					className={styles.check}
					checked={sort === ESort.NOT_AVAILABLE}
					onChange={() => setSort(sort === ESort.NOT_AVAILABLE ? ESort.DEFAULT : ESort.NOT_AVAILABLE)}
					label={"Предзаказ"}
				/>
				<Form.Check // available switch
					className={styles.check}
					checked={sort === ESort.AVAILABLE}
					onChange={() => setSort(sort === ESort.AVAILABLE ? ESort.DEFAULT : ESort.AVAILABLE)}
					label={"В наличии"}
				/>
			</div>
		</div>
	);
};

export default CategorySort;
