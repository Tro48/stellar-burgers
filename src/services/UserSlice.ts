import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  error: string | null;
  loading: boolean;
};

export const initUserState: TUserState = {
  user: null,
  isAuth: false,
  error: null,
  loading: false
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: Date.now() });
      localStorage.setItem('refreshToken', response.refreshToken);
    } else {
      throw new Error('Login failed');
    }
    return response;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);
    if (response.success) {
      setCookie('accessToken', response.accessToken, { expires: Date.now() });
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    return response.user;
  }
);

export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  const response = await getUserApi();
  if (!response.success) {
    deleteCookie('accessToken');
  }
  return response.user;
});

export const logoutUserAsync = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  if (response.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
  return response;
});

export const updateUserDataAsync = createAsyncThunk(
  'user/updateUserData',
  async (userData: Partial<TRegisterData>) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
    getError: (state) => state.error,
    getLoading: (state) => state.loading
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state) => {
      state.isAuth = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.user = null;
        state.isAuth = false;
      });
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.user = null;
        state.isAuth = false;
      });
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.error = null;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.user = null;
        state.isAuth = false;
      });
    builder
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
    builder
      .addCase(updateUserDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(updateUserDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.user = null;
        state.isAuth = true;
      });
  }
});

export const { getError, getIsAuth, getLoading, getUser } = UserSlice.selectors;
export const { setUser, setIsAuth } = UserSlice.actions;
