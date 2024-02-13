import React from 'react';
import {useGetCategories} from "@/hooks/useGetCategories";
import styles from "./CategorySelect.module.css";
import {Dropdown} from "react-bootstrap";

const CategorySelect = () => {

	const { data: {categories, selected}, selectCategory } = useGetCategories();

	if (!categories.length) return;

	return (
		<Dropdown className={styles.CategorySelect}>
			<Dropdown.Toggle className={styles.toggle} id="dropdown-autoclose-true">
				Тип кирпича: {categories.find(elem => elem._id === selected)?.name || 'Все'}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{
					categories
					.filter(elem => elem._id !== selected)
					.map(elem => (
						<Dropdown.Item
							key={elem._id}
							onClick={() => selectCategory(elem._id)}
							className={styles.dropItem}
						>
							{elem.name}
							{elem.hasSale && <span>(Скидки!)</span>}
						</Dropdown.Item>
					))
				}
				{
					selected &&
					<Dropdown.Item onClick={() => selectCategory(null)} className={styles.dropItem}>
						Показать все
					</Dropdown.Item>
				}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default CategorySelect;
