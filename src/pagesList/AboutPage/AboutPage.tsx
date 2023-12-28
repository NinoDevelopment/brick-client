'use client'
import React from 'react';
import {Container} from "react-bootstrap";
import AboutContent from "@/components/about-page/AboutContent/AboutContent";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
	return (
		<Container className={styles.main}>
			<h1 className={styles.title}>О компании</h1>
			<AboutContent />
		</Container>
	);
};

export default AboutPage;
