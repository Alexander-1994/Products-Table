import { login, initializeAuth, logout, clearError } from '~/redux/authSlice';
import type { TLoginRequest } from '~/types/auth';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const handleSignIn = (data: TLoginRequest & { rememberMe: boolean }) =>
    dispatch(login(data));

  const handleAuthInit = () => dispatch(initializeAuth());

  const handleSignOut = () => dispatch(logout());

  const handleErrorReset = () => dispatch(clearError());

  return {
    user,
    loading,
    error,
    handleSignIn,
    handleAuthInit,
    handleSignOut,
    handleErrorReset,
  };
};
