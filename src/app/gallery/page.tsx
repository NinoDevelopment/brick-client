import React from 'react';
import GalleryPage from "@/pagesList/GalleryPage/GalleryPage";
import {Metadata} from "next";
import {META_CONTACTS} from "@/constants/metadata";

export const metadata: Metadata = META_CONTACTS;

const page = () => <GalleryPage />;

export default page;
