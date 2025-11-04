import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngridientState = {
  ingridients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initIngridientState: TIngridientState = {
  ingridients: [],
  loading: false,
  error: null
};

export const getIngredientsAsync = createAsyncThunk(
  'ingredients/getIngridients',
  getIngredientsApi
);

export const IngridientSlice = createSlice({
  name: 'ingredients',
  initialState: initIngridientState,
  selectors: {
    getIngridients: (state) => state.ingridients,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsAsync.fulfilled, (state, action) => {
        state.ingridients = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getIngredientsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { getIngridients, getLoading, getError } =
  IngridientSlice.selectors;
