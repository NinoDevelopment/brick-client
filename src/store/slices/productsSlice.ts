import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_PRODUCT} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {IProductId} from "@/types/products";
import {REQUEST_METHODS} from "@/types/general";

interface IProducts {
	products: IProductId[],
	loading: Boolean,
	error: null | string,
}

const initialState:IProducts = {
	products: [],
	loading: false,
	error: null,
}

export const getProducts = createAsyncThunk<any, undefined, {rejectValue: string}>(
	'products/getProducts',
	async (_,{rejectWithValue}) => {
		const res = await handleRequest(REQUEST_METHODS.GET, API_PRODUCT, {});
		if (res.status !== 200){
			return rejectWithValue("Возникла ошибка при получении товаров!")
		}
		return res.data
	}
)

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.loading = false;
			})
			.addCase(getProducts.rejected, (state) => {
				state.loading = false;
				state.error = "Возникла ошибка при получении товаров!"
			})
	}
})

export default productsSlice.reducer;
