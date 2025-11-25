import { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Download, Filter, MoreVertical, Star } from 'lucide-react';
import { mockMerchants } from '../../data/mockData';
import Badge from '../common/Badge';
import SearchInput from '../common/SearchInput';
import Select from '../common/Select';
import Modal from '../common/Modal';

export default function Merchants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<typeof mockMerchants[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredMerchants = mockMerchants.filter(merchant => {
    const matchesSearch = merchant.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || merchant.status === statusFilter;
    const matchesCategory = !categoryFilter || merchant.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(mockMerchants.map(m => m.category)));

  const handleViewMerchant = (merchant: typeof mockMerchants[0]) => {
    setSelectedMerchant(merchant);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Merchants Management</h1>
          <p className="text-slate-600">Manage and monitor all merchant accounts on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold">
          <Plus size={20} />
          Add Merchant
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by name, business, or email..."
            />
          </div>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending' },
              { value: 'suspended', label: 'Suspended' }
            ]}
            placeholder="Filter by Status"
          />
          <Select
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categories.map(cat => ({ value: cat, label: cat }))}
            placeholder="Filter by Category"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredMerchants.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{mockMerchants.length}</span> merchants
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
              <Filter size={16} />
              More Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Business Name</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Owner</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Location</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">KYC</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-slate-600">Revenue</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">Rating</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-slate-900">{merchant.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{merchant.businessName}</p>
                      <p className="text-xs text-slate-500">{merchant.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-700">{merchant.name}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{merchant.category}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{merchant.location}</td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        merchant.status === 'active'
                          ? 'success'
                          : merchant.status === 'pending'
                          ? 'warning'
                          : merchant.status === 'suspended'
                          ? 'error'
                          : 'neutral'
                      }
                    >
                      {merchant.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        merchant.kycStatus === 'approved'
                          ? 'success'
                          : merchant.kycStatus === 'rejected'
                          ? 'error'
                          : 'warning'
                      }
                    >
                      {merchant.kycStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-slate-900 text-right">
                    ${merchant.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-slate-900">{merchant.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewMerchant(merchant)}
                        className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
                        title="View Details"
                      >
                        <Eye size={16} className="text-slate-600 group-hover:text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-green-50 rounded-xl transition-colors group"
                        title="Edit"
                      >
                        <Edit size={16} className="text-slate-600 group-hover:text-green-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-slate-600 group-hover:text-red-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                        title="More Options"
                      >
                        <MoreVertical size={16} className="text-slate-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Merchant Details"
        size="lg"
      >
        {selectedMerchant && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Business Name</p>
                <p className="text-lg text-slate-900">{selectedMerchant.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Owner Name</p>
                <p className="text-lg text-slate-900">{selectedMerchant.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Email</p>
                <p className="text-lg text-slate-900">{selectedMerchant.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Phone</p>
                <p className="text-lg text-slate-900">{selectedMerchant.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Category</p>
                <p className="text-lg text-slate-900">{selectedMerchant.category}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Location</p>
                <p className="text-lg text-slate-900">{selectedMerchant.location}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Status</p>
                <Badge
                  variant={
                    selectedMerchant.status === 'active'
                      ? 'success'
                      : selectedMerchant.status === 'pending'
                      ? 'warning'
                      : selectedMerchant.status === 'suspended'
                      ? 'error'
                      : 'neutral'
                  }
                  size="md"
                >
                  {selectedMerchant.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">KYC Status</p>
                <Badge
                  variant={
                    selectedMerchant.kycStatus === 'approved'
                      ? 'success'
                      : selectedMerchant.kycStatus === 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                  size="md"
                >
                  {selectedMerchant.kycStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Revenue</p>
                <p className="text-lg font-bold text-slate-900">${selectedMerchant.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Orders</p>
                <p className="text-lg font-bold text-slate-900">{selectedMerchant.orders}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-amber-400 fill-amber-400" />
                  <span className="text-lg font-bold text-slate-900">{selectedMerchant.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Join Date</p>
                <p className="text-lg text-slate-900">{selectedMerchant.joinDate}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium">
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                Edit Merchant
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
