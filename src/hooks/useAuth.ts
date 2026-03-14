import { useSelector } from 'react-redux';

import { login, initializeAuth, logout, clearError } from '~/redux/authSlice';
import type { TRootState } from '~/redux/store';
import type { TLoginRequest } from '~/types/auth';

import { useAppDispatch } from './useAppDispatch';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useSelector(
    (state: TRootState) => state.auth
  );

  const signIn = (data: TLoginRequest & { rememberMe: boolean }) =>
    dispatch(login(data));
  const initAuth = () => dispatch(initializeAuth());
  const signOut = () => dispatch(logout());
  const resetError = () => dispatch(clearError());

  return {
    user,
    loading,
    error,
    signIn,
    initAuth,
    signOut,
    resetError,
  };
};
