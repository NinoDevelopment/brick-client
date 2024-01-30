import React, {useState} from 'react';
import styles from './GalleryCard.module.css';
import {IGalleryItem} from "@/types/gallery";
import {useFetch} from "@/hooks/useFetch";
import {IProductImg} from "@/types/products";
import {API_GALLERY, API_GALLERY_IMG} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {APP_TITLE} from "@/constants/general";
import {Button, ButtonGroup, Spinner} from "react-bootstrap";
import ModalRedact from "@/components/admin-page/GalleryAdd/blocks/ModalRedact/ModalRedact";
import {handleRequest} from "@/functions/handleRequest";
import {TOAST_ERROR, TOAST_SUCCESS} from "@/constants/toasts";
import {useGetGallery} from "@/hooks/useGetGallery";

interface IProps {
   data: IGalleryItem
}

const GalleryCard = ({ data }: IProps) => {

   const { updateGallery } = useGetGallery()
   const [showModal, setShowModal] = useState(false);
   const { data: images } = useFetch<IProductImg>(API_GALLERY_IMG(data?._id as string), REQUEST_METHODS.GET, {});
   const [loadDelete, setLoadDelete] = useState<boolean>(false);

   const handleDelete = () => {
      setLoadDelete(true);
      handleRequest(REQUEST_METHODS.DELETE, API_GALLERY, {projectIds: [data._id]})
         .then(() => {
            TOAST_SUCCESS("Товар успешно удален");
            updateGallery();
         })
         .catch(() => TOAST_ERROR("Ошибка удаления товара"))
         .finally(() => {
            setLoadDelete(false);
         })
   }

   return (
      <div className={styles.wrapper}>
         <h3>{data.name}</h3>
         <p>{data?.description || 'Без описания'}</p>
         <p>Показывать: <b>{data?.show ? 'Да' : 'Нет'}</b></p>

         <div className={styles.content}>
            {
               images?.images?.map((elem, key) => (
                  <img key={key} loading={'lazy'} src={elem} alt={APP_TITLE}/>
               ))
            }
         </div>

         <ButtonGroup>
            <Button size={'sm'} variant={'danger'} onClick={handleDelete} disabled={loadDelete}>
               {loadDelete ? <Spinner size={'sm'} /> : 'Удалить'}
            </Button>
            <Button size={'sm'} onClick={() => setShowModal(true)} disabled={!images?.images}>
               {images?.images ? 'Редактировать' : 'Загрузка фото...'}
            </Button>
         </ButtonGroup>

         {
            images?.images &&
            <ModalRedact
               data={{ ...data, images: images?.images }}
               show={showModal}
               handleClose={() => setShowModal(false)}
            />
         }
      </div>
   );
};

export default GalleryCard;