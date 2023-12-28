import React from 'react';
import {Spinner} from "react-bootstrap";
import styles from "./SpinnerPrimary.module.css";

const SpinnerPrimary = () => {
	return (
		<Spinner className={styles.SpinnerPrimary} />
	);
};

export default SpinnerPrimary;
