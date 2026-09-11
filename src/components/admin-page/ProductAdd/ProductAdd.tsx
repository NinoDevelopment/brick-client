import React, { type SubmitEvent, useState } from "react";
import styles from "./ProductAdd.module.css";
import { Button, Form, Spinner } from "react-bootstrap";
import { ITEM_INITIAL } from "@/constants/products";
import { IProductWithImg } from "@/types/products";
import ProductFormImages from "@/components/admin-page/ProductAdd/components/ProductFormImages/ProductFormImages";
import { API_PRODUCT } from "@/constants/api";
import { handleRequest } from "@/functions/handleRequest";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import ProductFormCategorySelect from "@/components/admin-page/ProductAdd/components/ProductFormCategorySelect/ProductFormCategorySelect";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductFormInputs from "@/components/admin-page/ProductAdd/components/ProductFormInputs/ProductFormInputs";
import { REQUEST_METHODS } from "@/types/general";
import { buildProductPayload } from "@/functions/buildProductPayload";
import { useEntityImages } from "@/hooks/useEntityImages";
import { resolveEntityImages } from "@/functions/uploadMedia";

const ProductAdd = () => {
  const { updateProducts } = useGetProducts();
  const [formData, setFormData] = useState<IProductWithImg>(ITEM_INITIAL);
  const [load, setLoad] = useState<boolean>(false);
  const imagesState = useEntityImages();

  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imagesState.previews.length) {
      TOAST_ERROR("Загрузите изображения товара!");
      return;
    }

    if (!formData.categoryId) {
      TOAST_ERROR("Выберите категорию товара!");
      return;
    }

    setLoad(true);
    try {
      const created = await handleRequest(
        REQUEST_METHODS.POST,
        API_PRODUCT,
        buildProductPayload({ ...formData, images: [] }),
      );
      const id = created.data._id as string;
      const images = await resolveEntityImages(
        "items",
        id,
        imagesState.previews,
        imagesState.takePendingFiles(),
      );
      await handleRequest(
        REQUEST_METHODS.PUT,
        API_PRODUCT,
        buildProductPayload({ ...formData, _id: id, images }),
      );
      TOAST_SUCCESS("Товар успешно добавлен");
      setFormData(ITEM_INITIAL);
      imagesState.sync([]);
      updateProducts();
    } catch {
      TOAST_ERROR("Ошибка добавления товара");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className={styles.ProductAdd}>
      <h1 className={styles.title}>Добавить товар</h1>

      <Form onSubmit={handleSend}>
        <ProductFormCategorySelect
          formData={formData}
          setFormData={setFormData}
        />

        <ProductFormInputs formData={formData} setFormData={setFormData} />

        <ProductFormImages
          images={imagesState.previews}
          name={formData.name}
          onAddFiles={imagesState.addFiles}
          onRemove={imagesState.remove}
        />

        <Button
          disabled={load}
          size={"sm"}
          variant={"dark"}
          className={"w-100"}
          type={"submit"}
        >
          {load ? <Spinner size={"sm"} /> : "Отправить"}
        </Button>
      </Form>
    </div>
  );
};

export default ProductAdd;
