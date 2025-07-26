import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorItem = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialConstructor: TConstructorItem = {
  bun: null,
  ingredients: []
};

export const ConstructorSlice = createSlice({
  name: 'constructorBun',
  initialState: initialConstructor,
  selectors: {
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients
  },
  reducers: {}
});

export const { getBun, getIngredients } = ConstructorSlice.selectors;
export const constructorActions = ConstructorSlice.actions;
