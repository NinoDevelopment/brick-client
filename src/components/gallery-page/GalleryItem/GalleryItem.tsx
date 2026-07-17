"use client";

import React, { useEffect, useState } from "react";
import styles from "./GalleryItem.module.css";
import { IGalleryItem } from "@/types/gallery";
import { useFetch } from "@/hooks/useFetch";
import { IProductImg } from "@/types/products";
import { API_GALLERY_IMG } from "@/constants/api";
import { REQUEST_METHODS } from "@/types/general";

interface IProps {
  data: IGalleryItem;
}

const GalleryItem = ({ data }: IProps) => {
  const { data: imagesData, load } = useFetch<IProductImg>(
    API_GALLERY_IMG(data?._id as string),
    REQUEST_METHODS.GET,
    {},
  );

  const images = imagesData?.images ?? [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
        return;
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % images.length,
        );
        return;
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + images.length) % images.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, images.length]);

  const hero = images[0];
  const rest = images.slice(1);

  return (
    <article className={styles.wrapper}>
      {load && !images.length && <div className={styles.skeleton} />}

      {hero && (
        <button
          type="button"
          className={styles.hero}
          onClick={() => setLightboxIndex(0)}
          aria-label={`${data.name}, увеличить фото`}
        >
          <img src={hero} alt={`${data.name}, фото 1`} />
        </button>
      )}

      <div className={styles.content}>
        <h2 className={styles.title}>{data.name}</h2>
        {data.description && (
          <p className={styles.description}>{data.description}</p>
        )}
      </div>

      {!!rest.length && (
        <div className={styles.thumbs}>
          {rest.map((src, idx) => {
            const imageIndex = idx + 1;
            return (
              <button
                type="button"
                key={`${data._id}-${imageIndex}`}
                className={styles.thumb}
                onClick={() => setLightboxIndex(imageIndex)}
                aria-label={`${data.name}, увеличить фото ${imageIndex + 1}`}
              >
                <img
                  src={src}
                  alt={`${data.name}, фото ${imageIndex + 1}`}
                />
              </button>
            );
          })}
        </div>
      )}

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={data.name}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label="Закрыть"
            onClick={() => setLightboxIndex(null)}
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              aria-label="Предыдущее фото"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + images.length) % images.length,
                );
              }}
            >
              ‹
            </button>
          )}

          <img
            className={styles.lightboxImage}
            src={images[lightboxIndex]}
            alt={`${data.name}, фото ${lightboxIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              aria-label="Следующее фото"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % images.length);
              }}
            >
              ›
            </button>
          )}

          {images.length > 1 && (
            <p className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </article>
  );
};

export default GalleryItem;
