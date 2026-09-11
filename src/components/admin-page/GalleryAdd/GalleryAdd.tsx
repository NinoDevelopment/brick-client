import React, { type SubmitEvent, useState } from "react";
import styles from "./GalleryAdd.module.css";
import { GALLERY_INITIAL } from "@/constants/gallery";
import { IGalleryItem } from "@/types/gallery";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_GALLERY } from "@/constants/api";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { useGetGallery } from "@/hooks/useGetGallery";
import GalleryForm from "@/components/admin-page/GalleryAdd/blocks/GalleryForm/GalleryForm";
import { useEntityImages } from "@/hooks/useEntityImages";
import { resolveEntityImages } from "@/functions/uploadMedia";

const GalleryAdd = () => {
  const { updateGallery } = useGetGallery();
  const [formData, setFormData] = useState<IGalleryItem>(GALLERY_INITIAL);
  const [load, setLoad] = useState<boolean>(false);
  const imagesState = useEntityImages();

  const handleAddFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = 8 - imagesState.previews.length;
    if (remaining <= 0) {
      TOAST_ERROR("Невозможно добавить более 8 фото");
      return;
    }
    if (files.length > remaining) {
      TOAST_ERROR("Невозможно добавить более 8 фото");
    }
    imagesState.addFiles(files, { max: 8 });
  };

  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imagesState.previews.length) {
      TOAST_ERROR("Загрузите фото!");
      return;
    }

    setLoad(true);
    try {
      const created = await handleRequest(REQUEST_METHODS.POST, API_GALLERY, {
        ...formData,
        images: [],
      });
      const id = created.data._id as string;
      const images = await resolveEntityImages(
        "gallery",
        id,
        imagesState.previews,
        imagesState.takePendingFiles(),
      );
      await handleRequest(REQUEST_METHODS.PUT, API_GALLERY, {
        ...formData,
        _id: id,
        images,
      });
      TOAST_SUCCESS("Категория фото успешно добавлен");
      setFormData(GALLERY_INITIAL);
      imagesState.sync([]);
      updateGallery();
    } catch {
      TOAST_ERROR("Ошибка добавления категории фото");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Добавить категорию в галерею</h1>
      </header>

      <GalleryForm
        formData={formData}
        setFormData={setFormData}
        load={load}
        handleSend={handleSend}
        images={imagesState.previews}
        onAddFiles={handleAddFiles}
        onRemoveImage={imagesState.remove}
      />
    </div>
  );
};

export default GalleryAdd;
