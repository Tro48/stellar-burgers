import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type TConstructorItem = {
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
  reducers: {
    addIngridient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        const { type } = payload;
        type === 'bun'
          ? (state.bun = payload)
          : state.ingredients.push(payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngridient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },
    upIngridient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id
      );
      if (index > 0) {
        const temp = state.ingredients[index - 1];
        state.ingredients[index - 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    downIngridient: (state, action) => {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient._id === action.payload._id
      );
      if (index >= 0 && index < state.ingredients.length - 1) {
        const temp = state.ingredients[index + 1];
        state.ingredients[index + 1] = state.ingredients[index];
        state.ingredients[index] = temp;
      }
    },
    clearConstructor: () => initialConstructor
  }
});

export const { getBun, getIngredients } = ConstructorSlice.selectors;
export const constructorActions = ConstructorSlice.actions;
