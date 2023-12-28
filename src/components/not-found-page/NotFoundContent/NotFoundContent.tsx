import React from 'react';
import styles from "./NotFoundContent.module.css";
import BackLink from "@/ui/BackLink/BackLink";
import {LINK_HOME} from "@/constants/links";
import {Container} from "react-bootstrap";

const NotFoundContent = () => {
	return (
		<Container className={styles.NotFoundContent}>
			<div className={styles.goBack}>
				<BackLink link={LINK_HOME} text={"На главную"} />
			</div>

			<div className={styles.content}>
				<img
					alt={"Not found"}
					src={"/other/not-found.svg"}
				/>
				<h5>Ой...Такой страницы не существует...</h5>
			</div>
		</Container>
	);
};

export default NotFoundContent;
