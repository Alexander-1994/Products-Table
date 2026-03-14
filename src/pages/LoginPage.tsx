import { type FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { LockIcon, Input, Checkbox, Button, Loader } from '~/components/ui';
import { useAuth } from '~/hooks/useAuth';
import type { TLoginRequest } from '~/types/auth';

type TLoginForm = Omit<TLoginRequest, 'expiresInMins'> & {
  rememberMe: boolean;
};

// Пусть наш accessToken живет сутки
const TOKEN_LIFETIME = 1440;

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { user, signIn, loading, error } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/products', { replace: true });
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
  } = useForm<TLoginForm>({
    defaultValues: {
      /* TODO!!! */
      username: 'emilys',
      password: 'emilyspass',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  const handleSubmit = (data: TLoginForm) => {
    signIn({ ...data, expiresInMins: TOKEN_LIFETIME });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-200">
          {/* Header */}
          <div className="text-center mb-10">
            <LockIcon />
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Добро пожаловать!
            </h2>
            <p className="text-gray-600">Войдите в свой аккаунт</p>
          </div>
          <form
            onSubmit={submitHandler(handleSubmit)}
            className="space-y-6"
            noValidate
          >
            <Input
              label="Логин *"
              id="username"
              error={errors.username?.message}
              disabled={loading}
              placeholder="Введите логин"
              {...register('username', {
                required: 'Логин обязателен',
                minLength: {
                  value: 3,
                  message: 'Минимум 3 символа',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message: 'Только буквы, цифры, _ и -',
                },
              })}
            />
            <Input
              type="password"
              label="Пароль *"
              id="password"
              error={errors.password?.message}
              disabled={loading}
              placeholder="••••••••"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов',
                },
              })}
            />
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm animate-in slide-in-from-top-2">
                {error}
              </div>
            )}
            <Checkbox
              label="Запомнить меня"
              id="rememberMe"
              disabled={loading}
              {...register('rememberMe')}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? <Loader /> : 'Войти'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
