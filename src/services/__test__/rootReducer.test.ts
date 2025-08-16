import store, { rootReducer } from '../store';

describe('rootReducer', () => {
  test('Проверка инициализации rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
