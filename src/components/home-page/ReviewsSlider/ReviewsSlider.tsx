import React from 'react';
import styles from "./ReviewsSlider.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {ReviewsSliderData} from "@/components/home-page/ReviewsSlider/ReviewsSliderData";
import {APP_TITLE} from "@/constants/general";
import {useMediaQuery} from "react-responsive";
import {Container} from "react-bootstrap";

const ReviewsSlider = () => {

	const media1200px = useMediaQuery({query: '(max-width: 1200px)'});
	const media768px = useMediaQuery({query: '(max-width: 768px)'});

	const getSliderPreView = () => {
		if (media768px) return 1;
		if (media1200px) return 2;
		return 3;
	}

	return (
		<div className={styles.ReviewsSlider}>
			<Container>
				<header>
					<h2>Отзывы клиентов</h2>
				</header>

				<Swiper
					slidesPerView={getSliderPreView()}
					spaceBetween={20}
					pagination={{clickable: true}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className={styles.slider}
				>
					{
						ReviewsSliderData.map(elem => (
							<SwiperSlide key={elem.date} className={styles.slide}>
								<header>
									<h5>{elem.name}</h5>
									<p>{elem.date}</p>
								</header>

								<div className={styles.stars}>
									<p>{elem.stars}</p>
									<img src="/icons/star-primary.svg" alt={APP_TITLE}/>
								</div>

								<p className={styles.text}>{elem.comment}</p>
							</SwiperSlide>
						))
					}
				</Swiper>
			</Container>
		</div>
	);
};

export default ReviewsSlider;
