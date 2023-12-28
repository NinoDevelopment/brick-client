import {useAppDispatch, useAppSelector} from "@/store/store";
import {useEffect} from "react";
import {getOrders} from "@/store/slices/ordersSlice";
import {TOAST_SUCCESS} from "@/constants/toasts";

export const useGetOrders = () => {
	const data = useAppSelector(state => state.orders);
	const dispatch = useAppDispatch();

	const handleUpdate = () => {
		dispatch(getOrders())
		TOAST_SUCCESS("Заказы успешно обновлены!")
	}

	useEffect(() => {
		if (!data.orders.length) {
			dispatch(getOrders())
		}
	},[])

	return {
		data,
		updateOrders: handleUpdate
	};
}
