import React from "react";
import styles from "./GalleryItem.module.css";
import { IGalleryItem } from "@/types/gallery";
import { APP_TITLE } from "@/constants/general";
import { useFetch } from "@/hooks/useFetch";
import { IProductImg } from "@/types/products";
import { API_GALLERY_IMG } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";

interface IProps {
  data: IGalleryItem;
}

const GalleryItem = ({ data }: IProps) => {
  const { data: images } = useFetch<IProductImg>(
    API_GALLERY_IMG(data?._id as string),
    REQUEST_METHODS.GET,
    {},
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3>{data.name}</h3>
        <h4>{data?.description || "Без описания"}</h4>
      </div>

      <div className={styles.images}>
        {images?.images?.map((elem, idx) => (
          <img key={idx} src={elem} alt={APP_TITLE} />
        ))}
      </div>
    </div>
  );
};

export default GalleryItem;
