import { FeedSlice, getFeedsAsync, initFeedState } from '../FeedSlice';
import { userOrdersMock } from './mocks';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('тесты FeedSlice', () => {
  test('получение списка заказов', () => {
    const state = FeedSlice.reducer(
      initFeedState,
      getFeedsAsync.fulfilled(userOrdersMock, '')
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(userOrdersMock.orders);
    expect(state.total).toEqual(userOrdersMock.total);
    expect(state.totalToday).toEqual(userOrdersMock.totalToday);
    expect(state.error).toBeNull();
  });
  test('ошибка получения списка заказов', () => {
    const error = 'error';
    const state = FeedSlice.reducer(
      initFeedState,
      getFeedsAsync.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toEqual(0);
    expect(state.totalToday).toEqual(0);
    expect(state.error).toBe(error);
  });
  test('тест загрузки списка заказов', () => {
    const state = FeedSlice.reducer(initFeedState, getFeedsAsync.pending(''));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});
