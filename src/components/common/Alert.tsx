import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

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
