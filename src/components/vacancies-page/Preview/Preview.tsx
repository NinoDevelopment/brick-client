import React from 'react';
import styles from "./Preview.module.css";
import Link from "next/link";
import {LINK_HOME} from "@/constants/links";
import {APP_TITLE} from "@/constants/general";
import {Container} from "react-bootstrap";
import MouseBottom from "@/ui/MouseBottom/MouseBottom";

const Preview = () => {
	return (
		<div className={styles.Preview}>
			<Container className={styles.container}>
				<header className={styles.header}>
					<Link href={LINK_HOME} className={styles.homeLink}>
						<img src="/icons/white-back-arrow.svg" alt="<"/>
						На главную
					</Link>

					<Link href={LINK_HOME} className={styles.logo}>
						<img src="/Logo-white.svg" alt={APP_TITLE} />
					</Link>
				</header>

				<div className={styles.content}>
					<h1>
						Приглашаем в коллектив <br/>
						профессионалов
					</h1>
					<h3>Заряди себя энергией хлеба</h3>
				</div>

				<img
					className={styles.mobileImage}
					src="/other/vacancies-mobile.svg"
					alt={APP_TITLE}
				/>

				<footer className={styles.footer}>
					<div className={styles.inner}>
						<p>Смотреть список вакансий</p>
						<MouseBottom />
					</div>
				</footer>
			</Container>
		</div>
	);
};

export default Preview;
