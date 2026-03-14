import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
