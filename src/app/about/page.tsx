import React from 'react';
import AboutPage from "@/pagesList/AboutPage/AboutPage";
import {Metadata} from "next";
import {META_ABOUT} from "@/constants/metadata";

export const metadata: Metadata = META_ABOUT;

const page = () => <AboutPage />

export default page;
