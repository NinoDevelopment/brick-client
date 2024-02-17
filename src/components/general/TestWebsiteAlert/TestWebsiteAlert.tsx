import React from 'react';
import styles from "./TestWebsiteAlert.module.css";

const TestWebsiteAlert: React.FC = () => {
	return (
		<div className={styles.TestWebsiteAlert}>
			<h6>
				Сейчас сайт работает в тестовом режиме!
			</h6>
		</div>
	);
};

export default TestWebsiteAlert;
