'use client'
import React from 'react';
import CategoryProducts from "@/components/catalog-page/CategoryProducts/CategoryProducts";
import {Container} from "react-bootstrap";

const CatalogPage = () => {
	return (
		<Container>
			<CategoryProducts />
		</Container>
	);
};

export default CatalogPage;
