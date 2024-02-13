import React from 'react';
import styles from "./CategorySort.module.css";
import {Dropdown, Form} from "react-bootstrap";
import {ESort} from "@/types/general";
import {IProductId} from "@/types/products";
import CategorySelect from "@/components/catalog-page/CategoryProducts/components/CategorySelect/CategorySelect";
import CategoryColorSelect
	from "@/components/catalog-page/CategoryProducts/components/CategoryColorSelect/CategoryColorSelect";
import stylesDropdown from '../CategorySelect/CategorySelect.module.css'

interface ICategorySort {
	data: IProductId[],
	sort: ESort,
	setSort: (value: ESort) => void,
	color: string | null,
	setColor: (value: string | null) => void,
	priceSort: null | 1 | -1,
	setPriceSort: (value: null | 1 | -1) => void,
}

const CategorySort: React.FC<ICategorySort> = ({ data, sort, setSort, color, setColor, setPriceSort, priceSort }) => {
	return (
		<div hidden={!data} className={styles.CategorySort}>
			<div className={styles.left}>
				<CategorySelect />
				<CategoryColorSelect color={color} setColor={setColor} />
			</div>
			<div className={styles.right}>
				<Form.Check // discount switch
					className={styles.check}
					checked={sort === ESort.DISCOUNT}
					onChange={() => setSort(sort === ESort.DISCOUNT ? ESort.DEFAULT : ESort.DISCOUNT)}
					label={"Со скидкой"}
				/>
				<Form.Check // available switch
					className={styles.check}
					checked={sort === ESort.AVAILABLE}
					onChange={() => setSort(sort === ESort.AVAILABLE ? ESort.DEFAULT : ESort.AVAILABLE)}
					label={"В наличии"}
				/>
				<Dropdown className={stylesDropdown.CategorySelect}>
					<Dropdown.Toggle className={stylesDropdown.toggle} id="dropdown-autoclose-true">
						{priceSort ? priceSort === -1 ? 'По убыванию' : 'По возрастанию' : 'Сортировка по цене'}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => setPriceSort(1)} className={styles.dropItem}>
							По возрастанию
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setPriceSort(-1)} className={styles.dropItem}>
							По убыванию
						</Dropdown.Item>
						<Dropdown.Item onClick={() => setPriceSort(null)} className={styles.dropItem}>
							Сбросить
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</div>
	);
};

export default CategorySort;
