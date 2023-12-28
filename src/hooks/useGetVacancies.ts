import {useAppDispatch, useAppSelector} from "@/store/store";
import {useEffect} from "react";
import {getVacancies} from "@/store/slices/vacanciesSlice";

export const useGetVacancies = () => {
	const vacancies = useAppSelector(state => state.vacancies);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!vacancies.vacancies.length) {
			dispatch(getVacancies())
		}
	},[])

	return {
		data: vacancies,
		updateVacancies: () => dispatch(getVacancies())
	};
}
