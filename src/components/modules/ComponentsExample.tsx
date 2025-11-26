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
      logger.info('ComponentsExample', 'Item deleted by user');
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
              <Loader variant="bars" size="md" color="text-cyan-500" />
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
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              Open Modal
            </button>
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit with Toast'}
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
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
              className="w-full px-4 py-3 bg-slate-500 text-white rounded-xl hover:bg-slate-600 transition-colors font-medium"
            >
              Show Info Alert
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Toast Notifications</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => showToast.success('Success message!')}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
          >
            Success Toast
          </button>
          <button
            onClick={() => showToast.error('Error message!')}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
          >
            Error Toast
          </button>
          <button
            onClick={() => showToast.custom('Custom message!', '🚀')}
            className="px-4 py-2 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors font-medium"
          >
            Custom Toast
          </button>
          <button
            onClick={() => {
              const loadingToast = showToast.loading('Processing...');
              setTimeout(() => {
                showToast.dismiss(loadingToast);
                showToast.success('Completed!');
              }, 2000);
            }}
            className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors font-medium"
          >
            Loading Toast
          </button>
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
              className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                showToast.success('Modal action completed!');
                setIsModalOpen(false);
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Save
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-slate-600">This is a modal with custom content.</p>
          <CustomInput
            label="Example Field"
            placeholder="Enter something..."
          />
        </div>
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
