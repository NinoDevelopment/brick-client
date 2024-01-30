import React, {FormEvent, useState} from 'react';
import styles from './GalleryAdd.module.css';
import {GALLERY_INITIAL} from "@/constants/gallery";
import {IGalleryItem} from "@/types/gallery";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_GALLERY} from "@/constants/api";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetGallery} from "@/hooks/useGetGallery";
import GalleryForm from "@/components/admin-page/GalleryAdd/blocks/GalleryForm/GalleryForm";

const GalleryAdd = () => {

   const { updateGallery } = useGetGallery();
   const [formData, setFormData] = useState<IGalleryItem>(GALLERY_INITIAL)
   const [load, setLoad] = useState<boolean>(false)

   const handleSend = (e: FormEvent) => {
      e.preventDefault();

      if (!formData.images.length) {
         TOAST_ERROR('Загрузите фото!')
         return
      }

      setLoad(true);
      handleRequest(REQUEST_METHODS.POST, API_GALLERY, formData)
         .then(() => {
            TOAST_SUCCESS('Категория фото успешно добавлен');
            updateGallery();
         })
         .catch(() => TOAST_ERROR('Ошибка добавления категории фото'))
         .finally(() => {
            setFormData(GALLERY_INITIAL)
            setLoad(false)
         })
   }

   return (
      <div className={styles.wrapper}>
         <header className={styles.header}>
            <h1>Добавить категорию в галлерею</h1>
         </header>

         <GalleryForm
            formData={formData}
            setFormData={setFormData}
            load={load}
            handleSend={handleSend}
         />
      </div>
   );
};

export default GalleryAdd;