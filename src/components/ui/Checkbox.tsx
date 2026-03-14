import { type InputHTMLAttributes, forwardRef } from 'react';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = forwardRef<HTMLInputElement, TProps>(
  ({ label, ...props }, ref) => (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-3 text-sm select-none cursor-pointer group">
        <input
          type="checkbox"
          ref={ref}
          className="
      w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 
      rounded focus:ring-indigo-500 focus:ring-2 
      hover:bg-gray-50 transition-all duration-200
    "
          {...props}
        />
        <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
      </label>
    </div>
  )
);
