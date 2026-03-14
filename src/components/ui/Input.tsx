import { type InputHTMLAttributes, forwardRef } from 'react';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, TProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={`
        w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/20
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
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  )
);
