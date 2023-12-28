import axios, {AxiosResponse} from "axios";
import {REQUEST_METHODS} from "@/types/general";
import {getAdminKey} from "@/functions/getKey";

export const handleRequest = (method:REQUEST_METHODS, url:string, data:any): Promise<AxiosResponse> => {

	const options = {
		method: method,
		url: process.env.NEXT_PUBLIC_API_LINK + url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': getAdminKey(),
		},
		data: data
	};

	return axios.request(options)
}
