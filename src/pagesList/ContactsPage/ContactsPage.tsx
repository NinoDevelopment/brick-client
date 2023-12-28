'use client'
import React from 'react';
import styles from "./ContactsPage.module.css";
import PhoneEmailLinks from "@/ui/PhoneEmailLinks/PhoneEmailLinks";
import PhotoGallery from "@/components/contacts-page/PhotoGallery/PhotoGallery";
import {Container} from "react-bootstrap";

const ContactsPage = () => {
	return (
		<Container className={styles.main}>
			<PhoneEmailLinks />
			<PhotoGallery />
		</Container>
	);
};

export default ContactsPage;
