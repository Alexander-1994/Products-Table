import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import type { TLoginForm } from '~/types/auth';
import { Input, Checkbox, Button, Loader } from '../ui';
import { locale } from '~/constants/locale';

type TProps = {
  isLoading: boolean;
  error: string | null;
  onSubmit: (data: TLoginForm) => void;
};

export const LoginForm: FC<TProps> = ({ isLoading, error, onSubmit }) => {
  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
  } = useForm<TLoginForm>({
    defaultValues: {
      // Оставляю тестовые креды по дефолту (для проверки)
      username: 'emilys',
      password: 'emilyspass',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  return (
    <form onSubmit={submitHandler(onSubmit)} className="space-y-6" noValidate>
      <Input
        label={locale.username}
        id="username"
        error={errors.username?.message}
        disabled={isLoading}
        placeholder={locale.enterUsername}
        {...register('username', {
          required: locale.requiredField,
          minLength: {
            value: 3,
            message: locale.minThreeCharacters,
          },
          pattern: {
            value: /^[a-zA-Z0-9_-]+$/,
            message: locale.specialCharactersOnly,
          },
        })}
      />
      <Input
        type="password"
        label={locale.password}
        id="password"
        error={errors.password?.message}
        disabled={isLoading}
        placeholder="••••••••"
        {...register('password', {
          required: locale.requiredField,
          minLength: {
            value: 6,
            message: locale.minSixCharacters,
          },
        })}
      />
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-sm animate-in slide-in-from-top-2">
          {error}
        </div>
      )}
      <Checkbox
        label={locale.rememberMe}
        id="rememberMe"
        disabled={isLoading}
        {...register('rememberMe')}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : locale.login}
      </Button>
    </form>
  );
};
