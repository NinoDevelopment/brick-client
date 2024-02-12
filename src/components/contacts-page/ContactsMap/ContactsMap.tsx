import styles from "./ContactsMap.module.css";
import {Map, Placemark} from "@pbe/react-yandex-maps";


const ContactsMap = () => {

	const position = [57.142030, 43.796198];

	return (
		<Map
			defaultState={{
				center: position,
				zoom: 15,
			}}
			className={styles.ContactsMap}
		>
			<Placemark geometry={position} />
		</Map>
	);
};

export default ContactsMap;
