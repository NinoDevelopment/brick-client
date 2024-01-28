import React from 'react';
import {useGetCategories} from "@/hooks/useGetCategories";
import styles from "./CategorySelect.module.css";
import {Button, Dropdown} from "react-bootstrap";

const CategorySelect = () => {

	const { data:{categories, selected}, selectCategory } = useGetCategories();

	if (!categories.length || !selected) return;

	if (categories.length === 1) {
		return (
			<Button className={styles.toggle}>
				{categories?.[0]?.name || 'Весь каталог'}
			</Button>
		)
	}

	return (
		<Dropdown className={styles.CategorySelect}>
			<Dropdown.Toggle className={styles.toggle} id="dropdown-autoclose-true">
				{categories.find(elem => elem._id === selected)?.name}
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
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default CategorySelect;
