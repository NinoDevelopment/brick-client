import {toast} from "react-toastify";

export const TOAST_ERROR = (text?:string) => toast(text || "Ошибка!", {
	autoClose: 5000,
	type: "error",
})

export const TOAST_SUCCESS = (text?:string) => toast(text || "Успешно!", {
	autoClose: 5000,
	type: "success",
})
