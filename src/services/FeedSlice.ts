import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};
const initFeedState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeedsAsync = createAsyncThunk('feed/getFeeds', getFeedsApi);

export const FeedSlice = createSlice({
  name: 'feed',
  initialState: initFeedState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(getFeedsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      });
  }
});

export const feedSelectors = FeedSlice.selectors;
