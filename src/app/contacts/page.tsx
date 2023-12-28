import React from 'react';
import ContactsPage from "@/pagesList/ContactsPage/ContactsPage";
import {Metadata} from "next";
import {META_CONTACTS} from "@/constants/metadata";

export const metadata: Metadata = META_CONTACTS;

const page = () => <ContactsPage />;

export default page;
