import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import AuthService from '~/api/auth';
import { locale } from '~/constants/locale';
import type { TLoginRequest, TUser, TLoginResponse } from '~/types/auth';

type TAuthState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async Thunks
export const login = createAsyncThunk<
  TUser,
  TLoginRequest & { rememberMe: boolean },
  { rejectValue: string }
>('auth/login', async (data, { rejectWithValue }) => {
  try {
    const { rememberMe, ...credentials } = data;

    const authData: TLoginResponse = await AuthService.login(credentials);

    const user: TUser = {
      id: authData.id,
      username: authData.username,
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      gender: authData.gender,
      image: authData.image,
    };

    AuthService.setTokens(rememberMe, authData.accessToken);

    return user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const initializeAuth = createAsyncThunk<
  TUser | null,
  void,
  { rejectValue: string }
>('auth/initializeAuth', async (_, { rejectWithValue }) => {
  const token = AuthService.getAccessToken();

  if (!token) {
    return null;
  }

  try {
    const user = await AuthService.getMe(token);

    return user;
  } catch (error: any) {
    AuthService.clearTokens();

    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  AuthService.clearTokens();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || locale.somethingWentWrong;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || null;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || locale.somethingWentWrong;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
