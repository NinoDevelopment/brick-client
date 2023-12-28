import React from 'react';
import styles from "./PhotoGallery.module.css";
import {APP_TITLE} from "@/constants/general";
import ContactsMap from "@/components/contacts-page/ContactsMap/ContactsMap";

const PhotoGallery = () => {
	return (
		<div className={styles.PhotoGallery}>
			<h2>Фотогалерея</h2>

			<div className={styles.containerBlock}>
				<div className={styles.images}>
					<img src="/other/contacts-1.png" alt={APP_TITLE}/>
					<img src="/other/contacts-2.png" alt={APP_TITLE}/>
				</div>

				<div className={styles.map}>
					<ContactsMap />
				</div>
			</div>
		</div>
	);
};

export default PhotoGallery;
