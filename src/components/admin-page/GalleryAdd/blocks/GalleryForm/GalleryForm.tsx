import React, {Dispatch, FormEvent, SetStateAction} from 'react';
import styles from './GalleryForm.module.css';
import {Button, FloatingLabel, Form, FormControl, Spinner} from "react-bootstrap";
import {IGalleryItem} from "@/types/gallery";
import {convertToBase64} from "@/functions/convertToBase64";
import {TOAST_ERROR} from "@/constants/toasts";

interface IProps {
   handleSend: (e: FormEvent) => void;
   formData: IGalleryItem;
   setFormData: Dispatch<SetStateAction<IGalleryItem>>;
   load: boolean;
}

const GalleryForm = ({ handleSend, formData, setFormData, load }: IProps) => {

   const handleUploadFiles = async (images:Blob[]) => {
      if (images?.length > 8) {
         TOAST_ERROR('Невозможно добавить более 8 фото')
      }
      const imagesInner: string[] = [];
      for (let elem of images) {
         const res = await handleSetFile(elem);
         imagesInner.push(String(res))
      }
      setFormData({
         ...formData,
         images: imagesInner?.length > 8 ? imagesInner.slice(0, 8) : imagesInner
      })
   }

   const handleDelete = (image:string) => {
      const filteredImages = formData?.images?.filter(elem => elem !== image);
      setFormData({...formData, images: filteredImages})
   }

   const handleSetFile = async (file:Blob | undefined) => {
      if (!file) return;
      return convertToBase64(file)
   };

   return (
      <form onSubmit={handleSend} className={styles.wrapper}>
         <FloatingLabel label={"Название"}>
            <FormControl
               required
               value={formData.name}
               onChange={e => setFormData({...formData, name: e.target.value})}
            />
         </FloatingLabel>
         <FloatingLabel label={"Описание"}>
            <FormControl
               as={'textarea'}
               value={formData.description}
               onChange={e => setFormData({...formData, description: e.target.value})}
            />
         </FloatingLabel>

         <FloatingLabel label={"Загрузите фото товара"}>
            <FormControl
               max={8}
               type={"file"} multiple={true}
               //@ts-ignore
               onChange={e => handleUploadFiles(e.target.files)}
            />
         </FloatingLabel>

         <div hidden={!formData?.images?.length} className={styles.imagesContainer}>
            {
               formData?.images?.map(elem => (
                  <div className={styles.imgBlock} key={elem}>
                     <img src={elem} alt={formData.name}/>
                     <Button size={"sm"} variant={"danger"} onClick={() => handleDelete(elem)}>
                        Удалить
                     </Button>
                  </div>
               ))
            }
         </div>

         <Form.Check // prettier-ignore
            className={"my-2"}
            type="switch"
            label="Показывать"
            defaultChecked={formData.show}
            onChange={() => setFormData({...formData, show: !formData.show})}
         />
         <Button size={'sm'} type={'submit'} disabled={load}>
            {load ? <Spinner size={'sm'} /> : 'Отправить'}
         </Button>
      </form>
   );
};

export default GalleryForm;