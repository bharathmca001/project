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
