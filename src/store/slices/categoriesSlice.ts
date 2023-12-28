import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ICategoryId} from "@/types/categories";
import {API_CATEGORY} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";

interface ICategories {
	categories: ICategoryId[],
	loading: Boolean,
	error: null | string,
	selected: null | string,
}

const initialState:ICategories = {
	categories: [],
	loading: false,
	error: null,
	selected: null,
}

export const getCategories = createAsyncThunk<any, undefined, {rejectValue: string}>(
	'categories/getCategories',
	async (_,{rejectWithValue}) => {
		const res = await handleRequest(REQUEST_METHODS.GET, API_CATEGORY, {});
		if (res.status !== 200){
			return rejectWithValue("Возникла ошибка при получении категорий!")
		}
		return res.data
	}
)

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		selectCategory: (state, action) => {
			state.selected = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getCategories.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
				state.loading = false;
			})
			.addCase(getCategories.rejected, (state) => {
				state.loading = false;
				state.error = "Возникла ошибка при получении категорий!"
			})
	}
})

export const {selectCategory} = categoriesSlice.actions;
export default categoriesSlice.reducer;
