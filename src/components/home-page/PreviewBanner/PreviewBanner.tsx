import React from 'react';
import styles from "./PreviewBanner.module.css";
import Link from "next/link";
import {LINK_CATALOG} from "@/constants/links";

const PreviewBanner = () => {
	return (
		<div className={styles.PreviewBanner}>
			<video autoPlay muted loop className={styles.video}>
				<source src="/videos/bg-preview.mp4" type="video/mp4"/>
			</video>

			<div className={styles.content}>
				<h1><b>Ведущий</b> поставщик <br /> кирпича в России</h1>
				<h4>
					Помощь строителям и архитекторам в их поисках <br/>
					за экспериментальный и беспрецедентный дизайн.
				</h4>

				<Link href={LINK_CATALOG}>
					Перейти в каталог
				</Link>
			</div>
		</div>
	);
};

export default PreviewBanner;
