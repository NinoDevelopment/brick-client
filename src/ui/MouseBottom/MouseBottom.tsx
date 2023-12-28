import React from 'react';
import styles from "./MouseBottom.module.css";

const MouseBottom = () => {
	return (
		<button disabled className={styles.mouse}>
			<div className={styles.scroll} />
		</button>
	);
};

export default MouseBottom;
