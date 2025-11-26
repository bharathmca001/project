import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2, Plus, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import AddMerchantForm from '../forms/AddMerchantForm';
import DataTable, { Column } from '../common/DataTable';
import { mockMerchants } from '../../data/mockData';
import { Merchant } from '../../types';
import { logger } from '../../services/logger';

interface MerchantFormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  category: string;
  location: string;
}

export default function Merchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      logger.info('Merchants', 'Fetching merchants data');
      await new Promise(resolve => setTimeout(resolve, 500));
      setMerchants(mockMerchants);
      logger.info('Merchants', `Successfully loaded ${mockMerchants.length} merchants`);
    } catch (error) {
      logger.error('Merchants', 'Failed to fetch merchants', error);
      toast.error('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMerchant = async (formData: MerchantFormData) => {
    try {
      setIsSubmitting(true);
      logger.info('Merchants', 'Creating new merchant', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMerchant: Merchant = {
        id: `M${String(merchants.length + 1).padStart(3, '0')}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        category: formData.category,
        location: formData.location,
        status: 'pending',
        kycStatus: 'pending',
        revenue: 0,
        orders: 0,
        rating: 0,
        joinDate: new Date().toISOString().split('T')[0]
      };

      logger.info('Merchants', 'Merchant created successfully', { id: newMerchant.id });
      toast.success('Merchant added successfully!');
      setMerchants([newMerchant, ...merchants]);
      setIsAddModalOpen(false);
    } catch (error) {
      logger.error('Merchants', 'Failed to add merchant', error);
      toast.error('Failed to add merchant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMerchant = (merchant: Merchant) => {
    logger.warn('Merchants', 'Delete action triggered', { id: merchant.id });
    toast.error('Delete functionality coming soon');
  };

  const handleEditMerchant = (merchant: Merchant) => {
    logger.info('Merchants', 'Edit action triggered', { id: merchant.id });
    toast.error('Edit functionality coming soon');
  };

  const columns: Column<Merchant>[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'businessName',
      label: 'Business Name',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Owner',
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'active'
              ? 'success'
              : value === 'pending'
              ? 'warning'
              : value === 'suspended'
              ? 'error'
              : 'neutral'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'kycStatus',
      label: 'KYC',
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'approved'
              ? 'success'
              : value === 'rejected'
              ? 'error'
              : 'warning'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="font-semibold">{value}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Merchants Management</h1>
          <p className="text-slate-600">Manage and monitor all merchant accounts on the platform</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
        >
          <Plus size={20} />
          Add Merchant
        </button>
      </div>

      <DataTable
        data={merchants}
        columns={columns}
        title="All Merchants"
        searchKeys={['businessName', 'name', 'email', 'category', 'location']}
        loading={loading}
        onRowClick={(merchant) => {
          logger.info('Merchants', 'Row clicked', { id: merchant.id });
          setSelectedMerchant(merchant);
          setIsViewModalOpen(true);
        }}
        actions={(merchant) => (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setSelectedMerchant(merchant);
                setIsViewModalOpen(true);
              }}
              className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
              title="View Details"
            >
              <Eye size={16} className="text-slate-600 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => handleEditMerchant(merchant)}
              className="p-2 hover:bg-green-50 rounded-xl transition-colors group"
              title="Edit"
            >
              <Edit size={16} className="text-slate-600 group-hover:text-green-600" />
            </button>
            <button
              onClick={() => handleDeleteMerchant(merchant)}
              className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
              title="Delete"
            >
              <Trash2 size={16} className="text-slate-600 group-hover:text-red-600" />
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Merchant"
        size="lg"
      >
        <AddMerchantForm onSubmit={handleAddMerchant} isSubmitting={isSubmitting} />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Merchant Details"
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              Edit Merchant
            </button>
          </>
        }
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
          </div>
        )}
      </Modal>
    </div>
  );
}
