# Custom Common Components Guide

Complete implementation guide for all reusable common components in the NearU Admin Panel.

## Table of Contents
1. [CustomInput](#custominput)
2. [Loader](#loader)
3. [Modal](#modal)
4. [Toast](#toast)
5. [Logger](#logger)
6. [Alert (SweetAlert-style)](#alert)
7. [Badge](#badge)
8. [DataTable](#datatable)
9. [Select](#select)
10. [SearchInput](#searchinput)

---

## CustomInput

Reusable input component with validation, error states, and icons.

### File: `src/components/common/CustomInput.tsx`

```typescript
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
```

### Usage Example:

```typescript
import CustomInput from '@/components/common/CustomInput';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="space-y-4">
      <CustomInput
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        required
        {...register('email', { required: 'Email is required' })}
      />

      <CustomInput
        label="Password"
        icon={Lock}
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
        required
      />

      <CustomInput
        label="Full Name"
        icon={User}
        placeholder="John Doe"
      />

      <CustomInput
        label="Phone"
        icon={Phone}
        type="tel"
        placeholder="+1 234-567-8900"
      />
    </div>
  );
}
```

---

## Loader

Versatile loading component with multiple variants.

### File: `src/components/common/Loader.tsx`

```typescript
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

export default function Loader({
  size = 'md',
  variant = 'spinner',
  color = 'text-blue-500',
  fullScreen = false,
  text
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={`${sizeClasses[size]} border-4 ${color} border-t-transparent rounded-full animate-spin`}
          />
        );

      case 'dots':
        return (
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${dotSize[size]} ${color.replace('text-', 'bg-')} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-full animate-pulse`} />
        );

      case 'bars':
        return (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1 ${
                  size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : size === 'lg' ? 'h-8' : 'h-10'
                } ${color.replace('text-', 'bg-')} rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className="flex flex-col items-center gap-3">
      {renderLoader()}
      {text && (
        <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
```

### Usage Example:

```typescript
import Loader from '@/components/common/Loader';

function Examples() {
  return (
    <div className="space-y-8">
      <Loader variant="spinner" size="lg" />

      <Loader variant="dots" size="md" color="text-green-500" />

      <Loader variant="pulse" size="xl" text="Loading data..." />

      <Loader variant="bars" size="lg" color="text-purple-500" />

      <Loader fullScreen variant="spinner" size="xl" text="Please wait..." />
    </div>
  );
}
```

---

## Modal

Already exists in `src/components/common/Modal.tsx`. Here's the enhanced usage guide:

### Usage Example:

```typescript
import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { Save, X } from 'lucide-react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl">
              <Save size={18} />
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p>Modal content goes here</p>
        </div>
      </Modal>
    </>
  );
}
```

---

## Toast

Already implemented via `react-hot-toast`. Here's the complete usage guide:

### File: `src/utils/toast.ts`

```typescript
import toast, { Toaster } from 'react-hot-toast';

export const showToast = {
  success: (message: string, duration = 3000) => {
    toast.success(message, { duration });
  },

  error: (message: string, duration = 4000) => {
    toast.error(message, { duration });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },

  custom: (message: string, icon?: string) => {
    toast(message, { icon });
  },

  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  }
};

export { Toaster };
```

### Usage Example:

```typescript
import { showToast } from '@/utils/toast';

function MyComponent() {
  const handleSave = async () => {
    const loadingToast = showToast.loading('Saving changes...');

    try {
      await saveData();
      showToast.dismiss(loadingToast);
      showToast.success('Changes saved successfully!');
    } catch (error) {
      showToast.dismiss(loadingToast);
      showToast.error('Failed to save changes');
    }
  };

  const handlePromise = async () => {
    await showToast.promise(
      fetchData(),
      {
        loading: 'Loading data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data'
      }
    );
  };

  return (
    <div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => showToast.custom('Custom message', '🚀')}>
        Custom Toast
      </button>
    </div>
  );
}
```

---

## Logger

Development-only logging system.

### File: `src/services/logger.ts`

Already implemented. The logger automatically disables console output in production while still storing logs in memory.

### Usage Example:

```typescript
import { logger } from '@/services/logger';

function MyComponent() {
  useEffect(() => {
    logger.info('MyComponent', 'Component mounted');

    fetchData()
      .then(data => {
        logger.info('MyComponent', 'Data loaded', { count: data.length });
      })
      .catch(error => {
        logger.error('MyComponent', 'Failed to load data', error);
      });

    return () => {
      logger.debug('MyComponent', 'Component unmounted');
    };
  }, []);

  const handleClick = () => {
    logger.info('MyComponent', 'Button clicked', { timestamp: Date.now() });
  };

  return <button onClick={handleClick}>Click Me</button>;
}

// Access logs programmatically
logger.getLogs();
logger.getLogs('error');
logger.getLogs('info', 'MyComponent');
logger.downloadLogs();
logger.clearLogs();
```

---

## Alert

SweetAlert-style confirmation and alert dialogs.

### File: `src/components/common/Alert.tsx`

```typescript
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export default function Alert({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false
}: AlertProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const icons = {
    success: { Icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    error: { Icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    warning: { Icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
    info: { Icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    question: { Icon: AlertTriangle, color: 'text-slate-500', bg: 'bg-slate-50' }
  };

  const { Icon, color, bg } = icons[type];

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <X size={18} className="text-slate-600" />
        </button>

        <div className="p-8 text-center">
          <div className={`w-20 h-20 ${bg} rounded-3xl flex items-center justify-center mx-auto mb-6`}>
            <Icon size={40} className={color} />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>

          <div className="flex gap-3">
            {showCancel && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3 rounded-xl transition-all font-medium text-white ${
                type === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg'
                  : type === 'success'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg'
                  : type === 'warning'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Hook for Alert: `src/hooks/useAlert.ts`

```typescript
import { useState } from 'react';

interface AlertOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({
    title: '',
    message: '',
    type: 'info'
  });
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

  const showAlert = (opts: AlertOptions, onConfirm?: () => void) => {
    setOptions(opts);
    setOnConfirmCallback(() => onConfirm);
    setIsOpen(true);
  };

  const confirm = (opts: Omit<AlertOptions, 'showCancel'>): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions({ ...opts, showCancel: true });
      setOnConfirmCallback(() => () => resolve(true));
      setIsOpen(true);
    });
  };

  const close = () => {
    setIsOpen(false);
    setOnConfirmCallback(null);
  };

  return {
    isOpen,
    options,
    showAlert,
    confirm,
    close,
    handleConfirm: onConfirmCallback || (() => {})
  };
}
```

### Usage Example:

```typescript
import Alert from '@/components/common/Alert';
import { useAlert } from '@/hooks/useAlert';

function MyComponent() {
  const alert = useAlert();

  const handleDelete = async () => {
    const confirmed = await alert.confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      type: 'warning',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      // Proceed with deletion
      alert.showAlert({
        title: 'Deleted!',
        message: 'The item has been deleted successfully.',
        type: 'success'
      });
    }
  };

  const handleSuccess = () => {
    alert.showAlert({
      title: 'Success!',
      message: 'Your changes have been saved.',
      type: 'success',
      confirmText: 'Great!'
    });
  };

  const handleError = () => {
    alert.showAlert({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      type: 'error',
      confirmText: 'OK'
    });
  };

  return (
    <>
      <button onClick={handleDelete}>Delete Item</button>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>

      <Alert
        isOpen={alert.isOpen}
        onClose={alert.close}
        onConfirm={alert.handleConfirm}
        {...alert.options}
      />
    </>
  );
}
```

---

## Badge

Already exists. See `src/components/common/Badge.tsx`.

---

## DataTable

Already exists. See `src/components/common/DataTable.tsx` and `DATATABLE_GUIDE.md`.

---

## Select

Already exists. See `src/components/common/Select.tsx`.

---

## SearchInput

Already exists. See `src/components/common/SearchInput.tsx`.

---

## Example Page Component

Comprehensive example showing all components together.

### File: `src/components/modules/ComponentsExample.tsx`

```typescript
import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import CustomInput from '../common/CustomInput';
import Loader from '../common/Loader';
import Modal from '../common/Modal';
import Alert from '../common/Alert';
import { useAlert } from '../../hooks/useAlert';
import { showToast } from '../../utils/toast';
import Badge from '../common/Badge';
import { logger } from '../../services/logger';

export default function ComponentsExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const handleSubmit = () => {
    setLoading(true);
    logger.info('ComponentsExample', 'Form submission started');

    setTimeout(() => {
      setLoading(false);
      logger.info('ComponentsExample', 'Form submitted successfully');
      showToast.success('Form submitted successfully!');
    }, 2000);
  };

  const handleDelete = async () => {
    const confirmed = await alert.confirm({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      type: 'warning',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      showToast.success('Item deleted!');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Components Example</h1>
        <p className="text-slate-600">All custom components in action</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Custom Inputs</h2>
          <div className="space-y-4">
            <CustomInput
              label="Email"
              icon={Mail}
              type="email"
              placeholder="john@example.com"
              required
            />
            <CustomInput
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter password"
              helperText="Must be at least 8 characters"
            />
            <CustomInput
              label="Name"
              icon={User}
              placeholder="John Doe"
              error="This field is required"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Loaders</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">Spinner</p>
              <Loader variant="spinner" size="lg" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">Dots</p>
              <Loader variant="dots" size="md" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">Pulse</p>
              <Loader variant="pulse" size="lg" color="text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-600">Bars</p>
              <Loader variant="bars" size="md" color="text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success" size="md">Large Badge</Badge>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Open Modal
            </button>
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit with Toast'}
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600"
            >
              Delete with Alert
            </button>
            <button
              onClick={() => {
                alert.showAlert({
                  title: 'Information',
                  message: 'This is an info alert message.',
                  type: 'info'
                });
              }}
              className="w-full px-4 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600"
            >
              Show Info Alert
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl">
              Save
            </button>
          </>
        }
      >
        <p className="text-slate-600">This is a modal with custom content.</p>
      </Modal>

      <Alert
        isOpen={alert.isOpen}
        onClose={alert.close}
        onConfirm={alert.handleConfirm}
        {...alert.options}
      />

      {loading && <Loader fullScreen variant="spinner" size="xl" text="Processing..." />}
    </div>
  );
}
```

---

## Quick Reference

### Import Statements

```typescript
import CustomInput from '@/components/common/CustomInput';
import Loader from '@/components/common/Loader';
import Modal from '@/components/common/Modal';
import Alert from '@/components/common/Alert';
import Badge from '@/components/common/Badge';
import DataTable from '@/components/common/DataTable';
import Select from '@/components/common/Select';
import SearchInput from '@/components/common/SearchInput';
import { useAlert } from '@/hooks/useAlert';
import { showToast } from '@/utils/toast';
import { logger } from '@/services/logger';
```

### Common Patterns

```typescript
// Form with validation
<CustomInput
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register('email')}
/>

// Loading state
{loading && <Loader variant="spinner" size="md" text="Loading..." />}

// Toast notifications
showToast.success('Action completed!');
showToast.error('Something went wrong');

// Confirm dialog
const confirmed = await alert.confirm({
  title: 'Are you sure?',
  message: 'This action cannot be undone.',
  type: 'warning'
});

// Logging (development only)
logger.info('Component', 'Action performed', { data });
logger.error('Component', 'Error occurred', error);
```
