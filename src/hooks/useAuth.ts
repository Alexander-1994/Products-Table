import { login, initializeAuth, logout, clearError } from '~/redux/authSlice';
import type { TLoginRequest } from '~/types/auth';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

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
