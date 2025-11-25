import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface MerchantFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  category: string;
  location: string;
}

interface AddMerchantFormProps {
  onSubmit: (data: MerchantFormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function AddMerchantForm({ onSubmit, isSubmitting }: AddMerchantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<MerchantFormData>();

  const categories = [
    'Restaurant',
    'Cafe',
    'Grocery',
    'Pharmacy',
    'Retail',
    'Bakery',
    'Fast Food',
    'Other'
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Owner Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('name', { required: 'Owner name is required' })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.name ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="Enter owner's full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.email ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="Enter email address"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.phone ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="+1 234-567-8900"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('businessName', { required: 'Business name is required' })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.businessName ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="Enter business name"
            disabled={isSubmitting}
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${
              errors.category ? 'border-red-500' : 'border-slate-200'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
              errors.location ? 'border-red-500' : 'border-slate-200'
            }`}
            placeholder="City, State"
            disabled={isSubmitting}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Adding Merchant...
            </>
          ) : (
            'Add Merchant'
          )}
        </button>
      </div>
    </form>
  );
}
