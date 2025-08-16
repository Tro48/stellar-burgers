import {
  constructorActions,
  ConstructorSlice,
  TConstructorItem
} from '../ConstructorSlice';
import { bunMock, ingredientMock } from './mocks';

const initialState: TConstructorItem = {
  bun: null,
  ingredients: []
};

describe('тесты ConstructorSlice', () => {
  test('тест добавления булки', () => {
    const state = ConstructorSlice.reducer(
      initialState,
      constructorActions.addIngridient(bunMock)
    );
    expect(state.bun).not.toBeNull();
    expect(state.bun).toMatchObject({
      ...bunMock,
      id: expect.any(String)
    });
  });
  test('тест добавления ингредиента', () => {
    const state = ConstructorSlice.reducer(
      initialState,
      constructorActions.addIngridient(ingredientMock)
    );
    expect(state.ingredients[0]).toMatchObject({
      ...ingredientMock,
      id: expect.any(String)
    });
  });
  test('тест удаления ингредиента', () => {
    const state = ConstructorSlice.reducer(
      { ...initialState, ingredients: [ingredientMock] },
      constructorActions.removeIngridient(ingredientMock)
    );
    expect(state.ingredients).toEqual([]);
  });
});
