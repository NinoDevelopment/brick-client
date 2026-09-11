import React, { Dispatch, type SubmitEvent, SetStateAction } from "react";
import styles from "./GalleryForm.module.css";
import {
  Button,
  FloatingLabel,
  Form,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { IGalleryItem } from "@/types/gallery";

interface IProps {
  handleSend: (e: SubmitEvent<HTMLFormElement>) => void;
  formData: IGalleryItem;
  setFormData: Dispatch<SetStateAction<IGalleryItem>>;
  load: boolean;
  images: string[];
  onAddFiles: (files: FileList | null) => void;
  onRemoveImage: (image: string) => void;
}

const GalleryForm = ({
  handleSend,
  formData,
  setFormData,
  load,
  images,
  onAddFiles,
  onRemoveImage,
}: IProps) => {
  return (
    <form onSubmit={handleSend} className={styles.wrapper}>
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

      <FloatingLabel label={"Загрузите фото товара"}>
        <FormControl
          max={8}
          type={"file"}
          multiple={true}
          accept="image/*"
          onChange={(e) =>
            onAddFiles((e.target as HTMLInputElement).files)
          }
        />
      </FloatingLabel>

      <div hidden={!images.length} className={styles.imagesContainer}>
        {images.map((elem) => (
          <div className={styles.imgBlock} key={elem}>
            <img src={elem} alt={formData.name} />
            <Button
              size={"sm"}
              variant={"danger"}
              onClick={() => onRemoveImage(elem)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>

      <Form.Check
        className={"my-2"}
        type="switch"
        label="Показывать"
        defaultChecked={formData.show}
        onChange={() => setFormData({ ...formData, show: !formData.show })}
      />
      <Button size={"sm"} type={"submit"} disabled={load}>
        {load ? <Spinner size={"sm"} /> : "Отправить"}
      </Button>
    </form>
  );
};

export default GalleryForm;
