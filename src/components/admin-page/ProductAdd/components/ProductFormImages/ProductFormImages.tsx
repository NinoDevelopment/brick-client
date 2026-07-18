import React from "react";
import { Button, FloatingLabel, FormControl } from "react-bootstrap";
import { IProductIdWithImg, IProductWithImg } from "@/types/products";
import { compressImageToBase64 } from "@/functions/compressImageToBase64";
import { TOAST_ERROR } from "@/constants/toasts";
import styles from "./ProductFormImages.module.css";

interface IProductFormImages {
  formData: IProductWithImg | IProductIdWithImg;
  setFormData: (formData: IProductWithImg | IProductIdWithImg) => void;
}

const ProductFormImages: React.FC<IProductFormImages> = ({
  formData,
  setFormData,
}) => {
  const handleUploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;

    try {
      const imagesInner: string[] = [];
      for (const file of Array.from(files)) {
        imagesInner.push(await compressImageToBase64(file));
      }
      setFormData({ ...formData, images: imagesInner });
    } catch {
      TOAST_ERROR("Не удалось обработать фото. Попробуйте другой файл.");
    }
  };

  const handleDelete = (image: string) => {
    const filteredImages = formData?.images?.filter((elem) => elem !== image);
    setFormData({ ...formData, images: filteredImages });
  };

  return (
    <div className={styles.ProductFormImages}>
      <FloatingLabel label={"Загрузите фото товара"}>
        <FormControl
          type={"file"}
          multiple={true}
          accept="image/*"
          onChange={(e) =>
            handleUploadFiles((e.target as HTMLInputElement).files)
          }
        />
      </FloatingLabel>

      <div
        hidden={!formData?.images?.length}
        className={styles.imagesContainer}
      >
        {formData?.images?.map((elem) => (
          <div className={styles.imgBlock} key={elem}>
            <img src={elem} alt={formData.name} />
            <Button
              size={"sm"}
              variant={"danger"}
              onClick={() => handleDelete(elem)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFormImages;
