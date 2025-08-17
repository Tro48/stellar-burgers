import {
  getIngredientsAsync,
  IngridientSlice,
  initIngridientState
} from '../IngridientSlice';
import { ingredientsDataMock } from './mocks';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('тесты IngridientSlice', () => {
  test('получение списка ингредиентов', () => {
    const state = IngridientSlice.reducer(
      initIngridientState,
      getIngredientsAsync.fulfilled(ingredientsDataMock, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingridients).toEqual(ingredientsDataMock);
  });
  test('ошибка получения списка ингредиентов', () => {
    const error = 'error';
    const state = IngridientSlice.reducer(
      initIngridientState,
      getIngredientsAsync.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
  test('загрузка списка ингредиентов', () => {
    const state = IngridientSlice.reducer(
      initIngridientState,
      getIngredientsAsync.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});
