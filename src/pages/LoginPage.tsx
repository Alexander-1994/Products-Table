import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '~/components/features';
import { LockIcon } from '~/components/ui';
import { locale } from '~/constants/locale';
import { useAuth } from '~/hooks/useAuth';
import type { TLoginForm } from '~/types/auth';

// Пусть наш accessToken живет сутки
const TOKEN_LIFETIME = 1440;

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { user, handleSignIn, loading, error } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/products', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (data: TLoginForm) => {
    handleSignIn({ ...data, expiresInMins: TOKEN_LIFETIME });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-200">
          <div className="text-center mb-10">
            <LockIcon />
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {locale.welcome}
            </h2>
            <p className="text-gray-600">{locale.pleaseLogin}</p>
          </div>
          <LoginForm
            isLoading={loading}
            error={error}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
