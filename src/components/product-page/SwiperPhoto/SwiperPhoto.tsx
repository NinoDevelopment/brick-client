import React from 'react';
import styles from "./SwiperPhoto.module.css";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {Placeholder} from "react-bootstrap";

interface ISwiperPhoto {
	images: string[] | null | undefined,
}

const SwiperPhoto: React.FC<ISwiperPhoto> = ({ images }) => {

	if (!images) {
		return (
			<Placeholder as={"div"} animation="glow" className={styles.placeholder}>
				<Placeholder xs={12} />
			</Placeholder>
		)
	}

	return (
		<Swiper
			navigation={true}
			pagination={{dynamicBullets: true,}}
			modules={[Pagination, Navigation]}
			className={styles.SwiperPhoto}
		>
			{
				images?.map((elem,index) => (
					<SwiperSlide key={index} className={styles.slide}>
						<img src={elem} alt="" className={styles.image} />
					</SwiperSlide>
				))
			}
		</Swiper>
	);
};

export default SwiperPhoto;
