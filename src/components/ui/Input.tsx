import { type InputHTMLAttributes, forwardRef } from 'react';

import { locale } from '~/constants/locale';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  value?: string;
  onClear?: VoidFunction;
};

export const Input = forwardRef<HTMLInputElement, TProps>(
  ({ label, error, className = '', onClear, ...props }, ref) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          className={`
              w-full pr-12 pl-4 py-3 rounded-2xl border-2 transition-all duration-200 
              focus:outline-none focus:ring-4 focus:ring-indigo-500/20
              ${
                error
                  ? 'border-red-300 bg-red-50 focus:ring-red-500/20'
                  : 'border-gray-200 hover:border-gray-300 focus:border-indigo-300'
              }
              ${className}
            `}
          ref={ref}
          {...props}
        />
        {props.value && onClear && (
          <button
            onClick={onClear}
            className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center 
                        w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                        rounded-full transition-all duration-200 hover:scale-105 group"
            title={locale.clear}
          >
            x
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  )
);
