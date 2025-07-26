import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { clear } from 'console';

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
  reducers: {
    addIngridient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
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
