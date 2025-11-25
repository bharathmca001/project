import { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, MoreVertical, Download } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import Badge from '../common/Badge';
import SearchInput from '../common/SearchInput';
import Select from '../common/Select';
import Modal from '../common/Modal';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Pending Orders',
      value: mockOrders.filter(o => o.status === 'pending').length,
      icon: Clock,
      color: 'amber'
    },
    {
      label: 'In Transit',
      value: mockOrders.filter(o => o.status === 'in-transit').length,
      icon: Truck,
      color: 'blue'
    },
    {
      label: 'Delivered',
      value: mockOrders.filter(o => o.status === 'delivered').length,
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Cancelled',
      value: mockOrders.filter(o => o.status === 'cancelled').length,
      icon: XCircle,
      color: 'red'
    }
  ];

  const handleViewOrder = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Orders Management</h1>
        <p className="text-slate-600">Monitor and manage all orders across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
            blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
            green: { bg: 'bg-green-50', text: 'text-green-600' },
            red: { bg: 'bg-red-50', text: 'text-red-600' }
          };
          const colors = colorClasses[stat.color as keyof typeof colorClasses];

          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${colors.bg} rounded-2xl flex items-center justify-center`}>
                  <Icon size={24} className={colors.text} />
                </div>
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by order ID, customer, or merchant..."
            />
          </div>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'in-transit', label: 'In Transit' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
            placeholder="Filter by Status"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredOrders.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{mockOrders.length}</span> orders
          </p>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium">
            <Download size={16} />
            Export Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Order ID</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Customer</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Merchant</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Items</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-slate-600">Total</th>
                <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-slate-900">{order.id}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{order.customerName}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{order.merchantName}</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{order.items} items</td>
                  <td className="py-4 px-4 text-sm text-slate-700">{order.date}</td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        order.status === 'delivered'
                          ? 'success'
                          : order.status === 'pending'
                          ? 'warning'
                          : order.status === 'cancelled'
                          ? 'error'
                          : 'info'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-slate-900 text-right">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="p-2 hover:bg-blue-50 rounded-xl transition-colors group"
                        title="View Details"
                      >
                        <Eye size={16} className="text-slate-600 group-hover:text-blue-600" />
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
        title="Order Details"
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Order ID</p>
                <p className="text-lg font-bold text-slate-900">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Status</p>
                <Badge
                  variant={
                    selectedOrder.status === 'delivered'
                      ? 'success'
                      : selectedOrder.status === 'pending'
                      ? 'warning'
                      : selectedOrder.status === 'cancelled'
                      ? 'error'
                      : 'info'
                  }
                  size="md"
                >
                  {selectedOrder.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Customer</p>
                <p className="text-lg text-slate-900">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Merchant</p>
                <p className="text-lg text-slate-900">{selectedOrder.merchantName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Order Date</p>
                <p className="text-lg text-slate-900">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Items</p>
                <p className="text-lg text-slate-900">{selectedOrder.items} items</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Order Total</p>
                  <p className="text-3xl font-bold text-slate-900">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={24} className="text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-slate-900 mb-2">Order Timeline</p>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Order placed on {selectedOrder.date}</span>
                </div>
                {selectedOrder.status === 'delivered' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Order confirmed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Out for delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Delivered successfully</span>
                    </div>
                  </>
                )}
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
                Update Status
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
