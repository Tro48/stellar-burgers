import {
  checkAuthAsync,
  initUserState,
  loginAsync,
  logoutUserAsync,
  registerUserAsync,
  updateUserDataAsync,
  UserSlice
} from '../UserSlice';
import { loginDataMock, registerDataMock, userMock } from './mocks';

jest.mock('@api', () => ({
  loginUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  registerUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  getUserApi: jest.fn()
}));

jest.mock('@api', () => ({
  logoutApi: jest.fn()
}));

jest.mock('@api', () => ({
  updateUserApi: jest.fn()
}));

describe('тесты UserSlice', () => {
  test('проверка авторизации пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      checkAuthAsync.fulfilled(userMock, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userMock);
  });
  test('ошибка проверки авторизации пользователя', () => {
    const error = 'error';
    const state = UserSlice.reducer(
      initUserState,
      checkAuthAsync.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuth).toBe(false);
    expect(state.user).toBeNull();
  });
  test('ожидание проверки авторизации пользователя', () => {
    const state = UserSlice.reducer(initUserState, checkAuthAsync.pending(''));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('регистрация пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      registerUserAsync.fulfilled(userMock, '', registerDataMock)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userMock);
  });
  test('ошибка регистрации пользователя', () => {
    const error = 'error';
    const state = UserSlice.reducer(
      initUserState,
      registerUserAsync.rejected(new Error(error), '', registerDataMock)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuth).toBe(false);
    expect(state.user).toBeNull();
  });
  test('ожидание регистрации пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      registerUserAsync.pending('', registerDataMock)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('логин пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      loginAsync.fulfilled(
        {
          success: true,
          user: userMock,
          refreshToken: '',
          accessToken: ''
        },
        '',
        loginDataMock
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userMock);
  });
  test('ошибка логина пользователя', () => {
    const error = 'error';
    const state = UserSlice.reducer(
      initUserState,
      loginAsync.rejected(new Error(error), '', loginDataMock)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuth).toBe(false);
    expect(state.user).toBeNull();
  });
  test('ожидание логина пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      loginAsync.pending('', loginDataMock)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('обновление данных пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      updateUserDataAsync.fulfilled(userMock, '', registerDataMock)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userMock);
  });
  test('ошибка обновления данных пользователя', () => {
    const error = 'error';
    const state = UserSlice.reducer(
      initUserState,
      updateUserDataAsync.rejected(new Error(error), '', registerDataMock)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuth).toBe(true);
    expect(state.user).toBeNull();
  });
  test('ожидание обновления данных пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      updateUserDataAsync.pending('', registerDataMock)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('выход из аккаунта пользователя', () => {
    const state = UserSlice.reducer(
      initUserState,
      logoutUserAsync.fulfilled({ success: true }, '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.user).toBeNull();
  });
  test('ошибка выхода из аккаунта пользователя', () => {
    const error = 'error';
    const state = UserSlice.reducer(
      initUserState,
      logoutUserAsync.rejected(new Error(error), '')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
  test('ожидание выхода из аккаунта пользователя', () => {
    const state = UserSlice.reducer(initUserState, logoutUserAsync.pending(''));
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
});
