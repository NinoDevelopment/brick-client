"use client";
import styles from "./GalleryProjects.module.css";
import { Container } from "react-bootstrap";
import { useGetGallery } from "@/hooks/useGetGallery";
import GalleryItem from "@/components/gallery-page/GalleryItem/GalleryItem";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import { IGalleryItem } from "@/types/gallery";

interface IGalleryProjects {
  initialCategories?: IGalleryItem[];
}

const GalleryProjects = ({ initialCategories }: IGalleryProjects) => {
  const { data } = useGetGallery(Boolean(initialCategories?.length));
  const categories =
    data.categories.length > 0
      ? data.categories
      : initialCategories ?? [];
  const loading =
    !categories.length && data.loading;

  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.itemsContainer}>
          {loading && (
            <div className={styles.loader}>
              <SpinnerPrimary />
            </div>
          )}

          {!loading && !categories.length && (
            <h5 className={styles.noItems}>Список категорий галереи пуст</h5>
          )}

          {!!categories.length &&
            categories.map((elem) => (
              <GalleryItem key={elem._id} data={elem} />
            ))}
        </div>
      </Container>
    </section>
  );
};

export default GalleryProjects;
