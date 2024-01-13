'use client'
import React from 'react';
import CategoriesAdd from "@/components/admin-page/CategoriesAdd/CategoriesAdd";
import ProductAdd from "@/components/admin-page/ProductAdd/ProductAdd";
import CategoriesList from "@/components/admin-page/CategoriesList/CategoriesList";
import ProductsList from "@/components/admin-page/ProductsList/ProductsList";
import OrdersList from "@/components/admin-page/OrdersList/OrdersList";
import {Container} from "react-bootstrap";
import {useFetch} from "@/hooks/useFetch";
import {API_ADMIN_AUTH} from "@/constants/api";
import {REQUEST_METHODS} from "@/types/general";
import {redirect} from "next/navigation";
import {LINK_ERROR} from "@/constants/links";
import SpinnerPrimary from "@/ui/SpinnerPrimary/SpinnerPrimary";
import styles from "./page.module.css";

const page = () => {

	const { data, error, load } = useFetch<boolean>(API_ADMIN_AUTH, REQUEST_METHODS.POST, {}, false);

	if (error) redirect(LINK_ERROR);
	if (load) {
		return (
			<Container className={styles.spinnerContainer}>
				<SpinnerPrimary />
			</Container>
		)
	}

	if (data)
	return (
		<Container className={"pt-3 pb-3"}>
			<OrdersList />
			<hr className={"my-5"} />
			<CategoriesAdd />
			<hr className={"my-5"} />
			<CategoriesList />
			<hr className={"my-5"} />
			<ProductAdd />
			<hr className={"my-5"} />
			<ProductsList />
		</Container>
	);
};

export default page;
