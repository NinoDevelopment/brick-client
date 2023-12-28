import {useEffect, useState} from "react";
import axios from "axios";
import {REQUEST_METHODS} from "@/types/general";
import {getAdminKey} from "@/functions/getKey";

export const useFetch = <T>(url:string, method?:string, body?:object, interval?:number | false) => {
	const [data, setData] = useState<T | null>(null);
	const [load, setLoad] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const options = {
		method: method || REQUEST_METHODS.GET,
		url: process.env.NEXT_PUBLIC_API_LINK + url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getAdminKey(),
		},
		data: body || {},
	};

	const handleFetch = () => {
		setLoad(true);
		axios.request(options)
			.then(res => setData(res.data))
			.catch(err => setError(err.message))
			.finally(() => setLoad(false));
	}

	useEffect(() => {
		if (interval) {
			const handleInterval = setInterval(() => {
				handleFetch()
			}, 1000);
			return () => clearInterval(handleInterval);
		}else {
			handleFetch()
		}
	},[JSON.stringify(options), interval])

	return { data, error, load }
}
