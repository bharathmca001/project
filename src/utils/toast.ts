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
