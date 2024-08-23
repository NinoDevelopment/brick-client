import React from "react";
import GalleryPage from "@/pagesList/GalleryPage/GalleryPage";
import { Metadata } from "next";
import { META_GALLERY } from "@/constants/metadata";

export const metadata: Metadata = META_GALLERY;

const page = () => <GalleryPage />;

export default page;
