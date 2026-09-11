import React, { type SubmitEvent, useEffect, useState } from "react";
import { ICategoryId } from "@/types/categories";
import { Button, Form, FormControl, Modal, Spinner } from "react-bootstrap";
import { handleRequest } from "@/functions/handleRequest";
import { API_CATEGORY } from "@/constants/api";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { useGetCategories } from "@/hooks/useGetCategories";
import styles from "./CategoriesRedact.module.css";
import { REQUEST_METHODS } from "@/types/general";
import { useEntityImages } from "@/hooks/useEntityImages";
import { resolveEntityImages } from "@/functions/uploadMedia";

interface ICategoriesRedact {
  data: ICategoryId;
  show: boolean;
  handleClose: () => void;
}

const CategoriesRedact: React.FC<ICategoriesRedact> = ({
  data,
  show,
  handleClose,
}) => {
  const { updateCategories } = useGetCategories();
  const [formData, setFormData] = useState<ICategoryId>(data);
  const [load, setLoad] = useState<boolean>(false);
  const imagesState = useEntityImages(data.image ? [data.image] : []);

  useEffect(() => {
    setFormData(data);
    imagesState.sync(data.image ? [data.image] : []);
  }, [data]);

  const handleFileUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      TOAST_ERROR("Ошибка конвертации, выберите другое изображение.");
      return;
    }
    imagesState.addFiles([file], { max: 1, replace: true });
  };

  const handleRedact = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imagesState.previews.length) {
      TOAST_ERROR("Загрузите изображение для категории!");
      return;
    }

    setLoad(true);
    try {
      const [image] = await resolveEntityImages(
        "categories",
        formData._id,
        imagesState.previews,
        imagesState.takePendingFiles(),
      );
      await handleRequest(REQUEST_METHODS.PUT, API_CATEGORY, {
        ...formData,
        image,
      });
      TOAST_SUCCESS("Категория успешно изменена");
      updateCategories();
      handleClose();
    } catch {
      TOAST_ERROR("Ошибка изменения категории");
    } finally {
      setLoad(false);
    }
  };

  return (
    <Modal
      className={styles.CategoriesRedact}
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Редактирование категории</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleRedact}>
          <FormControl
            required
            placeholder={"Название"}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <FormControl
            as={"textarea"}
            rows={3}
            placeholder={"Описание"}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <FormControl
            type={"file"}
            accept="image/*"
            onChange={(e) =>
              handleFileUpload((e.target as HTMLInputElement).files?.[0])
            }
          />

          {imagesState.previews[0] ? (
            <img
              className={styles.preview}
              src={imagesState.previews[0]}
              alt={formData.name}
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
            variant={"outline-primary"}
          >
            {load ? <Spinner size={"sm"} /> : "Отправить"}
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button size={"sm"} variant={"secondary"} onClick={handleClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriesRedact;
