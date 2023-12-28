'use client'
import React, {FormEvent, useState} from 'react';
import styles from "./page.module.css";
import {Button, FloatingLabel, Form, FormControl, Spinner} from "react-bootstrap";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {API_ADMIN_AUTH} from "@/constants/api";
import {LINK_ADMIN, LINK_ERROR} from "@/constants/links";

const page = () => {

	const [key, setKey] = useState<string>('');
	const [load, setLoad] = useState<boolean>(false);

	//send form
	const handleSend = (e:FormEvent) => {
		e.preventDefault();
		globalThis.localStorage.setItem('key', key);
		setLoad(true);
		handleRequest(REQUEST_METHODS.POST, API_ADMIN_AUTH, {})
			.then(res => {
				if (res.data === true) {
					globalThis.location.replace(LINK_ADMIN);
				}else {
					globalThis.localStorage.removeItem('key');
					globalThis.location.replace(LINK_ERROR);
				}
			})
			.catch(() => {
				globalThis.localStorage.removeItem('key');
				globalThis.location.replace(LINK_ERROR);
			})
			.finally(() => {
				setLoad(false);
				setKey('');
			})
	}

	return (
		<div className={styles.main}>

			<Form onSubmit={handleSend}>
				<FloatingLabel label={"Введите ключ"}>
					<FormControl
						required
						className={"w-100 mb-2"}
						value={key}
						onChange={e => setKey(e.target.value)}
						placeholder="Введите ключ"
					/>

					<Button disabled={load} variant={"dark"} type={"submit"}>
						{load ? <Spinner size={"sm"} /> : "Далее"}
					</Button>
				</FloatingLabel>
			</Form>

		</div>
	);
};

export default page;
