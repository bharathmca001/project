import { useState, useEffect } from 'react';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { mockCustomers } from '../../data/mockData';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import DataTable, { Column } from '../common/DataTable';
import { logger } from '../../services/logger';

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  orders: number;
  spent: number;
  joinDate: string;
}

export default function Customers() {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      logger.info('Customers', 'Fetching customers data');
      await new Promise(resolve => setTimeout(resolve, 500));
      setCustomers(mockCustomers as CustomerData[]);
      logger.info('Customers', `Successfully loaded ${mockCustomers.length} customers`);
    } catch (error) {
      logger.error('Customers', 'Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: 'Total Customers',
      value: customers.length,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Active',
      value: customers.filter(c => c.status === 'active').length,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Inactive',
      value: customers.filter(c => c.status === 'inactive').length,
      color: 'bg-slate-50 text-slate-600',
    },
    {
      label: 'Total Orders',
      value: customers.reduce((sum, c) => sum + c.orders, 0),
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  const columns: Column<CustomerData>[] = [
    {
      key: 'id',
      label: 'Customer ID',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
    },
    {
      key: 'orders',
      label: 'Orders',
      sortable: true,
    },
    {
      key: 'spent',
      label: 'Total Spent',
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'active' ? 'success' : 'neutral'}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customers Management</h1>
        <p className="text-slate-600">View and manage all customer accounts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Mail size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        data={customers}
        columns={columns}
        title="All Customers"
        searchKeys={['name', 'email', 'phone', 'location']}
        loading={loading}
        onRowClick={(customer) => {
          logger.info('Customers', 'Row clicked', { id: customer.id });
          setSelectedCustomer(customer);
          setIsViewModalOpen(true);
        }}
        actions={(customer) => (
          <button
            onClick={() => {
              setSelectedCustomer(customer);
              setIsViewModalOpen(true);
            }}
            className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
            title="View Details"
          >
            <Eye size={16} className="text-slate-600 group-hover:text-blue-600" />
          </button>
        )}
      />

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Customer Details"
        size="lg"
        footer={
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="px-6 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Close
          </button>
        }
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Customer ID</p>
                <p className="text-lg font-mono text-slate-900">{selectedCustomer.id}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Status</p>
                <Badge variant={selectedCustomer.status === 'active' ? 'success' : 'neutral'} size="md">
                  {selectedCustomer.status}
                </Badge>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-600">Name</p>
                </div>
                <p className="text-lg text-slate-900">{selectedCustomer.name}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={14} />
                  <p className="text-sm font-semibold text-slate-600">Email</p>
                </div>
                <p className="text-lg text-slate-900">{selectedCustomer.email}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Phone size={14} />
                  <p className="text-sm font-semibold text-slate-600">Phone</p>
                </div>
                <p className="text-lg text-slate-900">{selectedCustomer.phone}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} />
                  <p className="text-sm font-semibold text-slate-600">Location</p>
                </div>
                <p className="text-lg text-slate-900">{selectedCustomer.location}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Orders</p>
                <p className="text-lg font-bold text-slate-900">{selectedCustomer.orders}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Spent</p>
                <p className="text-lg font-bold text-slate-900">
                  ${selectedCustomer.spent.toLocaleString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-slate-600 mb-1">Join Date</p>
                <p className="text-lg text-slate-900">{selectedCustomer.joinDate}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
