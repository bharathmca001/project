import { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
  helperText?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, icon: Icon, required, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
              error
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <span className="font-medium">{error}</span>
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
