import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_VACANCY} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {IVacancyId} from "@/types/vacancies";

interface IVacancies {
	vacancies: IVacancyId[],
	loading: Boolean,
	error: null | string,
}

const initialState:IVacancies = {
	vacancies: [],
	loading: false,
	error: null,
}

export const getVacancies = createAsyncThunk<any, undefined, {rejectValue: string}>(
	'vacancies/getVacancies',
	async (_,{rejectWithValue}) => {
		const res = await handleRequest(REQUEST_METHODS.GET, API_VACANCY, {});
		if (res.status !== 200){
			return rejectWithValue("Возникла ошибка при получении вакансий!")
		}
		return res.data
	}
)

export const vacanciesSlice = createSlice({
	name: "vacancies",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getVacancies.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getVacancies.fulfilled, (state, action) => {
				state.vacancies = action.payload;
				state.loading = false;
			})
			.addCase(getVacancies.rejected, (state) => {
				state.loading = false;
				state.error = "Возникла ошибка при получении вакансий!"
			})
	}
})

export default vacanciesSlice.reducer;
