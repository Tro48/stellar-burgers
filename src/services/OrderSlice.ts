import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TorderState = {
  request: boolean;
  loading: boolean;
  error: string | null;
  orderModalData: TOrder | null;
  ordersUser: TOrder[];
};

const initOrderState: TorderState = {
  request: false,
  loading: false,
  error: null,
  orderModalData: null,
  ordersUser: []
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (ingredientsIds: string[]) => await orderBurgerApi(ingredientsIds)
);

export const getOrderAsync = createAsyncThunk(
  'order/getOrder',
  async (orderId: number) => await getOrderByNumberApi(orderId)
);

export const getOrdersUserAsync = createAsyncThunk(
  'order/getAllOrder',
  getOrdersApi
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState: initOrderState,
  reducers: {
    clearOrder: () => initOrderState
  },
  selectors: {
    getRequest: (state) => state.request,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getOrderModalData: (state) => state.orderModalData,
    getOrdersUser: (state) => state.ordersUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.request = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.request = false;
        state.loading = false;
        state.error = null;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.request = false;
        state.loading = false;
        state.error = action.error.message || null;
      });
    builder
      .addCase(getOrderAsync.pending, (state) => {
        state.orderModalData = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderAsync.rejected, (state, action) => {
        state.orderModalData = null;
        state.loading = false;
        state.error = action.error.message || null;
      });
    builder
      .addCase(getOrdersUserAsync.pending, (state) => {
        state.ordersUser = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersUser = action.payload;
      })
      .addCase(getOrdersUserAsync.rejected, (state, action) => {
        state.ordersUser = [];
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export const {
  getRequest,
  getLoading,
  getError,
  getOrderModalData,
  getOrdersUser
} = OrderSlice.selectors;
export const orderActions = OrderSlice.actions;
