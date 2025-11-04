import {
  createOrderAsync,
  getOrderAsync,
  getOrdersUserAsync,
  initOrderState,
  OrderSlice
} from '../OrderSlice';
import {
  createOrderMock,
  orderIdsMock,
  orderNumberMock,
  orderResponceMock,
  userOrdersMock
} from './mocks';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('тесты OrderSlice', () => {
  test('создание ордера', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      createOrderAsync.fulfilled(createOrderMock, '', orderIdsMock)
    );
    expect(state.loading).toBe(false);
    expect(state.request).toBe(false);
    expect(state.orderModalData).toEqual(createOrderMock.order);
    expect(state.error).toBeNull();
  });
  test('ошибка создания ордера', () => {
    const error = 'error';
    const state = OrderSlice.reducer(
      initOrderState,
      createOrderAsync.rejected(new Error(error), '', orderIdsMock)
    );
    expect(state.loading).toBe(false);
    expect(state.request).toBe(false);
    expect(state.error).toBe(error);
  });
  test('ожидание создания ордера', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      createOrderAsync.pending('', orderIdsMock)
    );
    expect(state.loading).toBe(true);
    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });
  test('получение ордера', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      getOrderAsync.fulfilled(orderResponceMock, '', orderNumberMock)
    );
    expect(state.loading).toBe(false);
    expect(state.orderModalData).toEqual(orderResponceMock.orders[0]);
  });
  test('ошибка получения ордера', () => {
    const error = 'error';
    const state = OrderSlice.reducer(
      initOrderState,
      getOrderAsync.rejected(new Error(error), '', orderNumberMock)
    );
    expect(state.loading).toBe(false);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBe(error);
  });
  test('ожидание получения ордера', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      getOrderAsync.pending('', orderNumberMock)
    );
    expect(state.loading).toBe(true);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });
  test('получение ордера пользователя', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      getOrdersUserAsync.fulfilled(userOrdersMock.orders, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ordersUser).toEqual(orderResponceMock.orders);
  });
  test('ошибка получения ордера пользователя', () => {
    const error = 'error';
    const state = OrderSlice.reducer(
      initOrderState,
      getOrdersUserAsync.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.ordersUser).toEqual([]);
    expect(state.error).toBe(error);
  });
  test('ожидание получения ордера пользователя', () => {
    const state = OrderSlice.reducer(
      initOrderState,
      getOrdersUserAsync.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.ordersUser).toEqual([]);
    expect(state.error).toBeNull();
  });
});
