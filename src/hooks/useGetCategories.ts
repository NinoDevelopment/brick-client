import {useAppDispatch, useAppSelector} from "@/store/store";
import {useEffect} from "react";
import {getCategories, selectCategory} from "@/store/slices/categoriesSlice";

export const useGetCategories = () => {
	const data = useAppSelector(state => state.categories);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!data.categories.length) {
			dispatch(getCategories())
		}
		if (!data.selected && data.categories.length) {
			dispatch(selectCategory(data.categories?.[0]?._id))
		}
	},[data.categories.length])

	return {
		data: data,
		updateCategories: () => dispatch(getCategories()),
		selectCategory: (id:string) => dispatch(selectCategory(id)),
	};
}
