import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistStore,
	persistReducer
} from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

//slices
import categoriesSlice from "@/store/slices/categoriesSlice";
import productsSlice from "@/store/slices/productsSlice";
import shopCartSlice from "@/store/slices/shopCartSlice";
import ordersSlice from "@/store/slices/ordersSlice";
import vacanciesSlice from "@/store/slices/vacanciesSlice";

const createNoopStorage = () => {
	return {
		getItem(_key:any) {
			return Promise.resolve(null);
		},
		setItem(_key:any, value:any) {
			return Promise.resolve(value);
		},
		removeItem(_key:any) {
			return Promise.resolve();
		},
	};
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
	categories: categoriesSlice,
	products: productsSlice,
	orders: ordersSlice,
	shopCart: shopCartSlice,
	vacancies: vacanciesSlice,
});

const persistConfig = {
	key: 'root',
	blacklist: ['products','categories','orders','vacancies'],
	storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer : persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistedStore = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
