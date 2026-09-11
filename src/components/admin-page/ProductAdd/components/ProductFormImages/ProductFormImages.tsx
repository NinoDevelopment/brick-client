import React from "react";
import { Button, FloatingLabel, FormControl } from "react-bootstrap";
import styles from "./ProductFormImages.module.css";

interface IProductFormImages {
  images: string[];
  name?: string;
  onAddFiles: (files: FileList | null) => void;
  onRemove: (image: string) => void;
}

const ProductFormImages: React.FC<IProductFormImages> = ({
  images,
  name,
  onAddFiles,
  onRemove,
}) => {
  return (
    <div className={styles.ProductFormImages}>
      <FloatingLabel label={"Загрузите фото товара"}>
        <FormControl
          type={"file"}
          multiple={true}
          accept="image/*"
          onChange={(e) =>
            onAddFiles((e.target as HTMLInputElement).files)
          }
        />
      </FloatingLabel>

      <div hidden={!images.length} className={styles.imagesContainer}>
        {images.map((elem) => (
          <div className={styles.imgBlock} key={elem}>
            <img src={elem} alt={name || "Фото товара"} />
            <Button size={"sm"} variant={"danger"} onClick={() => onRemove(elem)}>
              Удалить
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFormImages;
