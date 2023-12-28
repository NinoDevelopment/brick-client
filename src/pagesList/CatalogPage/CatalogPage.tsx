'use client'
import React from 'react';
import CatalogBanner from "@/components/catalog-page/CatalogBanner/CatalogBanner";
import CategoryProducts from "@/components/catalog-page/CategoryProducts/CategoryProducts";
import {Container} from "react-bootstrap";

const CatalogPage = () => {
	return (
		<Container>
			<CatalogBanner />
			<CategoryProducts />
		</Container>
	);
};

export default CatalogPage;
