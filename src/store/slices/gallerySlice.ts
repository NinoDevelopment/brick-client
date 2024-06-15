import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_GALLERY } from "@/constants/api";
import { handleRequest } from "@/functions/handleRequest";
import { REQUEST_METHODS } from "@/types/general";
import { IGalleryItem } from "@/types/gallery";

interface IGallerySlice {
  categories: IGalleryItem[];
  loading: boolean;
  error: null | string;
}

const initialState: IGallerySlice = {
  categories: [],
  loading: false,
  error: null,
};

export const getGallery = createAsyncThunk<
  any,
  undefined,
  { rejectValue: string }
>("gallery/getGallery", async (_, { rejectWithValue }) => {
  const res = await handleRequest(REQUEST_METHODS.GET, API_GALLERY, {});
  if (res.status !== 200) {
    return rejectWithValue("Возникла ошибка при получении товаров!");
  }
  return res.data;
});

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGallery.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getGallery.rejected, (state) => {
        state.loading = false;
        state.error = "Возникла ошибка при получении товаров!";
      });
  },
});

export default gallerySlice.reducer;
