import React, { type SubmitEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGetGallery } from "@/hooks/useGetGallery";
import { IGalleryItem } from "@/types/gallery";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_GALLERY } from "@/constants/api";
import GalleryForm from "@/components/admin-page/GalleryAdd/blocks/GalleryForm/GalleryForm";
import { useEntityImages } from "@/hooks/useEntityImages";
import { resolveEntityImages } from "@/functions/uploadMedia";

interface IProps {
  show: boolean;
  handleClose: () => void;
  data: IGalleryItem;
}

const ModalRedact = ({ show, handleClose, data }: IProps) => {
  const { updateGallery } = useGetGallery();
  const [formData, setFormData] = useState<IGalleryItem>(data);
  const [load, setLoad] = useState<boolean>(false);
  const imagesState = useEntityImages(data.images ?? []);

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
      const images = await resolveEntityImages(
        "gallery",
        formData._id as string,
        imagesState.previews,
        imagesState.takePendingFiles(),
      );
      await handleRequest(REQUEST_METHODS.PUT, API_GALLERY, {
        ...formData,
        images,
      });
      TOAST_SUCCESS("Категория фото успешно обновлена");
      updateGallery();
      handleClose();
    } catch {
      TOAST_ERROR("Ошибка обновления категории фото");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    setFormData(data);
    imagesState.sync(data.images ?? []);
  }, [data]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование категории</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <GalleryForm
          handleSend={handleSend}
          formData={formData}
          setFormData={setFormData}
          load={load}
          images={imagesState.previews}
          onAddFiles={handleAddFiles}
          onRemoveImage={imagesState.remove}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRedact;
