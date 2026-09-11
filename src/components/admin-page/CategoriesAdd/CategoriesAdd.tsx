import React, { type SubmitEvent, useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import styles from "./CategoriesAdd.module.css";
import { CATEGORY_INITIAL } from "@/constants/categories";
import { ICategory } from "@/types/categories";
import { API_CATEGORY } from "@/constants/api";
import { handleRequest } from "@/functions/handleRequest";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { useGetCategories } from "@/hooks/useGetCategories";
import { REQUEST_METHODS } from "@/types/general";
import { useEntityImages } from "@/hooks/useEntityImages";
import { resolveEntityImages } from "@/functions/uploadMedia";

const CategoriesAdd = () => {
  const [formData, setFormData] = useState<ICategory>(CATEGORY_INITIAL);
  const [load, setLoad] = useState<boolean>(false);
  const { updateCategories } = useGetCategories();
  const imagesState = useEntityImages();

  const handleFileUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      TOAST_ERROR("Ошибка конвертации, выберите другое изображение.");
      return;
    }
    imagesState.addFiles([file], { max: 1, replace: true });
  };

  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imagesState.previews.length) {
      TOAST_ERROR("Загрузите изображение для категории!");
      return;
    }

    setLoad(true);
    try {
      const created = await handleRequest(REQUEST_METHODS.POST, API_CATEGORY, {
        ...formData,
        image: "",
      });
      const id = created.data._id as string;
      const [image] = await resolveEntityImages(
        "categories",
        id,
        imagesState.previews,
        imagesState.takePendingFiles(),
      );
      await handleRequest(REQUEST_METHODS.PUT, API_CATEGORY, {
        ...formData,
        _id: id,
        image,
      });
      TOAST_SUCCESS("Категория успешно добавлена");
      updateCategories();
      setFormData(CATEGORY_INITIAL);
      imagesState.sync([]);
    } catch {
      TOAST_ERROR("Ошибка добавления категории");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className={styles.CategoriesAdd}>
      <h1>Добавить категорию</h1>

      <Form onSubmit={handleSend}>
        <FloatingLabel label={"Название"}>
          <FormControl
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel label={"Описание"}>
          <FormControl
            as={"textarea"}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </FloatingLabel>

        <FloatingLabel label={"Загрузите фото категории"}>
          <FormControl
            type={"file"}
            multiple={false}
            accept="image/*"
            onChange={(e) =>
              handleFileUpload((e.target as HTMLInputElement).files?.[0])
            }
          />
        </FloatingLabel>

        {imagesState.previews[0] ? (
          <img
            className={styles.alertPhoto}
            src={imagesState.previews[0]}
            alt={formData.name || "Фото категории"}
          />
        ) : null}

        <Form.Check
          className={"my-2"}
          type="switch"
          label="Распродажа в категории"
          checked={formData.hasSale}
          onChange={() =>
            setFormData({ ...formData, hasSale: !formData.hasSale })
          }
        />

        <Button
          disabled={load}
          type={"submit"}
          size={"sm"}
          className={"w-100"}
          variant={"dark"}
        >
          {load ? <Spinner size={"sm"} /> : "Отправить"}
        </Button>
      </Form>
    </div>
  );
};

export default CategoriesAdd;
