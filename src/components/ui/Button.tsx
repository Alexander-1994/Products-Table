import type { FC, ButtonHTMLAttributes } from 'react';

type TProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export const Button: FC<TProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const base =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:none';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 disabled:bg-indigo-400',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-500',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400',
    ghost:
      'bg-transparent hover:bg-gray-100 text-gray-900 focus:ring-gray-500 border border-gray-200 disabled:border-gray-100 disabled:hover:bg-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`
        ${base} ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
