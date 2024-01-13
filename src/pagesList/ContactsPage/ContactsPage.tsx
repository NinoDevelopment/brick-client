'use client'
import React from 'react';
import styles from "./ContactsPage.module.css";
import PhoneEmailLinks from "@/ui/PhoneEmailLinks/PhoneEmailLinks";
import {Container} from "react-bootstrap";
import PreviewBanner from "@/components/contacts-page/PreviewBanner/PreviewBanner";
import ContactsForm from "@/components/contacts-page/ContactsForm/ContactsForm";

const ContactsPage = () => {
	return (
		<div className={styles.main}>
			<PreviewBanner />
			<Container>
				<PhoneEmailLinks />
			</Container>
			<ContactsForm />
		</div>
	);
};

export default ContactsPage;
