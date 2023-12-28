import React, {useState} from 'react';
import styles from "./SelectMany.module.css";
import {Badge, Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import {ISelectManyItem} from "@/types/products";

interface ISelectMany {
	title: string,
	data: ISelectManyItem[],
	selectedItems: ISelectManyItem[],
	handleSelect: (item:ISelectManyItem) => void,
}

const SelectMany: React.FC<ISelectMany> = ({ title, data, selectedItems, handleSelect }) => {

	const [show, setShow] = useState(false);

	const getActive = (elem:ISelectManyItem) => !!selectedItems.find(item => elem.value === item.value);

	return (
		<div className={styles.SelectMany}>
			<Button
				className={"w-100"} variant={"outline-dark"} size={"sm"}
				onClick={() => setShow(!show)}
			>
				{title} ({show ? "закрыть" : "открыть"})
			</Button>

			<div hidden={!selectedItems.length} className={styles.selectedList}>
				<Badge bg={"dark"} className={"w-100 mb-1 text-center"}>
					Выбранные варианты веса:
				</Badge>
				{
					selectedItems?.map(elem => (
						<Badge className={styles.selectedItem} key={elem.title} bg={"dark"}>
							{elem.title}
						</Badge>
					))
				}
			</div>

			<div hidden={!show} className={styles.dropdown}>
				{
					data.map(elem => (
						<Button
							size={"sm"}
							variant={getActive(elem) ? "outline-primary" : "light"}
							onClick={() => handleSelect(elem)}
							className={styles.item}
							key={elem.title}
						>
							<p>{elem.title}</p>
							<Form.Check
								type={'checkbox'}
								checked={getActive(elem)}
								onChange={() => handleSelect(elem)}
							/>
						</Button>
					))
				}
			</div>
		</div>
	);
};

export default SelectMany;
