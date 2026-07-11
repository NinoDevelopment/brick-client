import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import categoriesSlice from "@/store/slices/categoriesSlice";
import productsSlice from "@/store/slices/productsSlice";
import shopCartSlice from "@/store/slices/shopCartSlice";
import ordersSlice from "@/store/slices/ordersSlice";
import gallerySlice from "@/store/slices/gallerySlice";
import promocodesSlice from "@/store/slices/promocodeSlice";

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const rootReducer = combineReducers({
  categories: categoriesSlice,
  products: productsSlice,
  orders: ordersSlice,
  shopCart: shopCartSlice,
  gallery: gallerySlice,
  promocodes: promocodesSlice,
});

const persistConfig = {
  key: "@brick-client-kovernino:",
  blacklist: ["products", "categories", "orders", "gallery", "promocodes"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
