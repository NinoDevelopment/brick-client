import {createSlice} from "@reduxjs/toolkit";
import {IShopCartItem} from "@/types/shopCart";

interface IShopCart {
	data: IShopCartItem[],
}

const initialState:IShopCart = {
	data: [],
}

const checkItem = (item:IShopCartItem, payload:IShopCartItem) => {
	return item.itemId === payload.itemId && item.weight === payload.weight;
}

const findItem = (data:IShopCartItem[], payload:IShopCartItem) => {
	return data.find(item => checkItem(item, payload));
}

export const shopCartSlice = createSlice({
	name: "shopCart",
	initialState,
	reducers: {
		addItem: (state, action) => { //add item
			if (findItem(state.data, action.payload)) {
				state.data = state.data.map(item => (
					checkItem(item, action.payload) ? {...item, quantity: item.quantity + 1} : item
				))
			}else {
				state.data = [...state.data, action.payload]
			}
		},
		removeItem: (state, action) => { //delete 1 amount item
			const findItemInner = findItem(state.data, action.payload);
			const filteredData = state.data.filter(item => item !== findItemInner);
			if (findItemInner && findItemInner.quantity > 1) {
				state.data = [...filteredData, {...action.payload, quantity: action.payload.quantity - 1}]
			}else {
				state.data = filteredData;
			}
		},
		clearItem: (state, action) => { //delete all amount item
			state.data = state.data.filter(item => item !== findItem(state.data, action.payload));
		},
		clearShopCart: state => { // clear all
			state.data = [];
		}
	},
})


export const { addItem, removeItem, clearItem, clearShopCart } = shopCartSlice.actions;
export default shopCartSlice.reducer;
