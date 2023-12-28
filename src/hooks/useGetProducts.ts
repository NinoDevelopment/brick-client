import {useAppDispatch, useAppSelector} from "@/store/store";
import {useEffect} from "react";
import {getProducts} from "@/store/slices/productsSlice";

export const useGetProducts = () => {
	const products = useAppSelector(state => state.products);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!products.products.length) {
			dispatch(getProducts())
		}
	},[])

	return {
		data: products,
		updateProducts: () => dispatch(getProducts())
	};
}
