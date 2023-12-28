import React from 'react';
import ProductPage from "@/pagesList/ProductPage/ProductPage";
import {Metadata} from "next";
import {META_PRODUCT} from "@/constants/metadata";

export const metadata: Metadata = META_PRODUCT;

const page = () => <ProductPage />

export default page;
