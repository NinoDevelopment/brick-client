import React from 'react';
import styles from "./SwiperNavigation.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import {Placeholder} from "react-bootstrap";


interface ISwiperNavigation {
	images: string[] | null | undefined,
}

const SwiperNavigation: React.FC<ISwiperNavigation> = ({ images }) => {

	//check images !== null || undefined
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
			modules={[Navigation]}
			className={styles.SwiperNavigation}
		>
			{
				images?.map((elem,index) => (
					<SwiperSlide key={index}>
						<img className={styles.image} src={elem} alt={"image"} />
					</SwiperSlide>
				))
			}
		</Swiper>
	);
};

export default SwiperNavigation;
