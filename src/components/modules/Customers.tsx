import { useState } from 'react';
import { Eye, Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign, MoreVertical } from 'lucide-react';
import { mockCustomers } from '../../data/mockData';
import Badge from '../common/Badge';
import SearchInput from '../common/SearchInput';
import Modal from '../common/Modal';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleViewCustomer = (customer: typeof mockCustomers[0]) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Management</h1>
        <p className="text-slate-600">View and manage all customer accounts and their activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <ShoppingBag size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Customers</p>
              <p className="text-2xl font-bold text-slate-900">{mockCustomers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
              <DollarSign size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Spent</p>
              <p className="text-2xl font-bold text-slate-900">
                ${mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <ShoppingBag size={24} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">
                {mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center">
              <DollarSign size={24} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-slate-900">
                ${(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) /
                   mockCustomers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="mb-6">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email, or phone..."
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredCustomers.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{mockCustomers.length}</span> customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => handleViewCustomer(customer)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {customer.name}
                    </h3>
                    <p className="text-xs text-slate-500">{customer.id}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical size={16} className="text-slate-600" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={14} />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={14} />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} />
                  <span>{customer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} />
                  <span>Joined {customer.joinDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Orders</p>
                  <p className="text-lg font-bold text-slate-900">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Spent</p>
                  <p className="text-lg font-bold text-slate-900">${customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <Badge variant={customer.loyaltyTier === 'Gold' ? 'warning' : customer.loyaltyTier === 'Silver' ? 'neutral' : 'info'}>
                  {customer.loyaltyTier} Tier
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Customer Details"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{selectedCustomer.name}</h3>
                <p className="text-slate-600">{selectedCustomer.id}</p>
                <Badge variant={selectedCustomer.loyaltyTier === 'Gold' ? 'warning' : selectedCustomer.loyaltyTier === 'Silver' ? 'neutral' : 'info'} size="md">
                  {selectedCustomer.loyaltyTier} Tier
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Email</p>
                <p className="text-lg text-slate-900">{selectedCustomer.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Phone</p>
                <p className="text-lg text-slate-900">{selectedCustomer.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Location</p>
                <p className="text-lg text-slate-900">{selectedCustomer.location}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Join Date</p>
                <p className="text-lg text-slate-900">{selectedCustomer.joinDate}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{selectedCustomer.totalOrders}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-slate-900">${selectedCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Loyalty Points</p>
                <p className="text-2xl font-bold text-slate-900">{selectedCustomer.loyaltyPoints}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Last Order</p>
                <p className="text-lg text-slate-900">{selectedCustomer.lastOrder}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                View Order History
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
