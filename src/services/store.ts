import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ConstructorSlice } from './ConstructorSlice';
import { IngridientSlice } from './IngridientSlice';
import { OrderSlice } from './OrderSlice';

const rootReducer = combineReducers({
  [ConstructorSlice.name]: ConstructorSlice.reducer,
  [IngridientSlice.name]: IngridientSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
