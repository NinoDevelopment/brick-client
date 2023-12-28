import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_ORDER} from "@/constants/api";
import {handleRequest} from "@/functions/handleRequest";
import {REQUEST_METHODS} from "@/types/general";
import {IOrderFormId} from "@/types/order";

interface IOrders {
	orders: IOrderFormId[],
	loading: Boolean,
	error: null | string,
}

const initialState:IOrders = {
	orders: [],
	loading: false,
	error: null,
}

export const getOrders = createAsyncThunk<any, undefined, {rejectValue: string}>(
	'orders/getOrders',
	async (_,{rejectWithValue}) => {
		const res = await handleRequest(REQUEST_METHODS.GET, API_ORDER, {});
		if (res.status !== 200){
			return rejectWithValue("Возникла ошибка при получении заказов!")
		}
		return res.data
	}
)

export const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.orders = action.payload;
				state.loading = false;
			})
			.addCase(getOrders.rejected, (state) => {
				state.loading = false;
				state.error = "Возникла ошибка при получении заказов!"
			})
	}
})

export default ordersSlice.reducer;
