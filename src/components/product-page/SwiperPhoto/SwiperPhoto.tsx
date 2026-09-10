import styles from "./SwiperPhoto.module.css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Placeholder } from "react-bootstrap";
import ProductImage from "@/ui/ProductImage/ProductImage";

interface ISwiperPhoto {
  images: string[] | null | undefined;
  name?: string;
}

const SwiperPhoto: React.FC<ISwiperPhoto> = ({ images, name }) => {
  if (!images) {
    return (
      <Placeholder as={"div"} animation="glow" className={styles.placeholder}>
        <Placeholder xs={12} />
      </Placeholder>
    );
  }

  return (
    <Swiper
      navigation={true}
      pagination={{ dynamicBullets: true }}
      modules={[Pagination, Navigation]}
      className={styles.SwiperPhoto}
    >
      {images?.map((elem, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <ProductImage
            src={elem}
            alt={name || "Фото кирпича"}
            className={styles.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperPhoto;
