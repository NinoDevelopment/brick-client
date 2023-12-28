import React from 'react';
import CatalogPage from "@/pagesList/CatalogPage/CatalogPage";
import {Metadata} from "next";
import {META_CATALOG} from "@/constants/metadata";

export const metadata: Metadata = META_CATALOG;

const page = () => <CatalogPage />;

export default page;
