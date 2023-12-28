import React from 'react';
import styles from "./MeetBanner.module.css";
import Link from "next/link";
import {LINK_ABOUT} from "@/constants/links";
import {Container} from "react-bootstrap";
import {APP_TITLE} from "@/constants/general";

const MeetBanner = () => {
	return (
		<div className={styles.MeetBanner}>
			<Container>
				<div className={styles.content}>
					<h1>Давайте знакомиться</h1>
					<p>
						Это Хлеб – место, где рождаются и заказываются хлеб, торты, пироги
						и прочие вкусности. Это сочетание всего самого вкусного,
						познавательного и развлекательного.
						<br/><br/>
						Мы просто очень хорошо печем хлеб, пирожки, торты и делаем
						разные пирожные! За качество отвечаем!
					</p>

					<Link href={LINK_ABOUT}>
						Подробнее о пекарне
					</Link>
				</div>

				<img className={styles.imageLeft} src={"/other/bread-2.png"} alt={APP_TITLE} />
			</Container>

			<img className={styles.imageRight} src={"/other/bread-1.png"} alt={APP_TITLE} />
			<img className={styles.imageLogo} src={"/other/logo-white.svg"} alt={APP_TITLE} />
		</div>
	);
};

export default MeetBanner;
