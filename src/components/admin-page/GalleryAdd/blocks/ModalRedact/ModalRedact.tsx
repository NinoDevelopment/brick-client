import React, { FormEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGetGallery } from "@/hooks/useGetGallery";
import { IGalleryItem } from "@/types/gallery";
import { GALLERY_INITIAL } from "@/constants/gallery";
import { TOAST_ERROR, TOAST_SUCCESS } from "@/constants/toasts";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { API_GALLERY } from "@/constants/api";
import GalleryForm from "@/components/admin-page/GalleryAdd/blocks/GalleryForm/GalleryForm";

interface IProps {
  show: boolean;
  handleClose: () => void;
  data: IGalleryItem;
}

const ModalRedact = ({ show, handleClose, data }: IProps) => {
  const { updateGallery } = useGetGallery();
  const [formData, setFormData] = useState<IGalleryItem>(data);
  const [load, setLoad] = useState<boolean>(false);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.images.length) {
      TOAST_ERROR("Загрузите фото!");
      return;
    }

    setLoad(true);
    handleRequest(REQUEST_METHODS.PUT, API_GALLERY, formData)
      .then(() => {
        TOAST_SUCCESS("Категория фото успешно добавлен");
        updateGallery();
        handleClose();
      })
      .catch(() => TOAST_ERROR("Ошибка добавления категории фото"))
      .finally(() => {
        setFormData(GALLERY_INITIAL);
        setLoad(false);
      });
  };

  useEffect(() => {
    setFormData(data);
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
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalRedact;
