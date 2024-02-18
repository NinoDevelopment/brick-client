import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleRequest} from "@/functions/handleRequest";
import {IPromocode, REQUEST_METHODS} from "@/types/general";
import {API_ALL_PROMOCODES, API_ORDER} from "@/constants/api";

interface IPromos {
   data: IPromocode[],
   loading: boolean,
   error: null | string,
   selected: null | string,
}

const initialState:IPromos = {
   data: [],
   loading: false,
   error: null,
   selected: null,
}

export const getPromocodes = createAsyncThunk<any, undefined, {rejectValue: string}>(
   'promocodes/getPromocodes',
   async (_,{rejectWithValue}) => {
      const res = await handleRequest(REQUEST_METHODS.POST, API_ORDER + API_ALL_PROMOCODES, {});
      if (res.status !== 201){
         return rejectWithValue("Возникла ошибка при получении промокодов!")
      }
      return res.data
   }
)

export const promocodesSlice = createSlice({
   name: "promocodes",
   initialState,
   reducers: {
      selectCategory: (state, action) => {
         state.selected = action.payload;
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getPromocodes.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getPromocodes.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
         })
         .addCase(getPromocodes.rejected, (state) => {
            state.loading = false;
            state.error = "Возникла ошибка при получении промокодов!"
         })
   }
})

export default promocodesSlice.reducer;