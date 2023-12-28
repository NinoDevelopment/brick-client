import React from 'react';
import {Button, FloatingLabel, FormControl} from "react-bootstrap";
import {IProductIdWithImg, IProductWithImg} from "@/types/products";
import {convertToBase64} from "@/functions/convertToBase64";
import styles from "./ProductFormImages.module.css";

interface IProductFormImages {
	formData: IProductWithImg | IProductIdWithImg,
	setFormData: (formData: IProductWithImg | IProductIdWithImg) => void,
}

const ProductFormImages: React.FC<IProductFormImages> = ({ formData, setFormData }) => {

	const handleUploadFiles = async (images:Blob[]) => {
		const imagesInner:string[] = [];
		for (let elem of images) {
			const res = await handleSetFile(elem);
			imagesInner.push(String(res))
		}
		setFormData({...formData, images: imagesInner})
	}

	const handleDelete = (image:string) => {
	    const filteredImages = formData?.images?.filter(elem => elem !== image);
		setFormData({...formData, images: filteredImages})
	}

	const handleSetFile = async (file:Blob | undefined) => {
		if (!file) return;
		return convertToBase64(file)
	};

	return (
		<div className={styles.ProductFormImages}>
			<FloatingLabel label={"Загрузите фото товара"}>
				<FormControl
					type={"file"} multiple={true}
					//@ts-ignore
					onChange={e => handleUploadFiles(e.target.files)}
				/>
			</FloatingLabel>

			<div hidden={!formData?.images?.length} className={styles.imagesContainer}>
				{
					formData?.images?.map(elem => (
						<div className={styles.imgBlock} key={elem}>
							<img src={elem} alt={formData.name} />
							<Button size={"sm"} variant={"danger"} onClick={() => handleDelete(elem)}>
								Удалить
							</Button>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default ProductFormImages;
