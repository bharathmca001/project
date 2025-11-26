import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck, Eye } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import DataTable, { Column } from '../common/DataTable';
import { logger } from '../../services/logger';

interface OrderData {
  id: string;
  customerName: string;
  merchantName: string;
  amount: number;
  status: string;
  date: string;
  items: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      logger.info('Orders', 'Fetching orders data');
      await new Promise(resolve => setTimeout(resolve, 500));
      // Cast via unknown first to avoid the "may be a mistake" conversion error
      setOrders(mockOrders as unknown as OrderData[]);
      logger.info('Orders', `Successfully loaded ${mockOrders.length} orders`);
    } catch (error) {
      logger.error('Orders', 'Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: 'Pending Orders',
      value: orders.filter(o => o.status === 'pending').length,
      icon: Clock,
      color: 'amber'
    },
    {
      label: 'In Transit',
      value: orders.filter(o => o.status === 'in-transit').length,
      icon: Truck,
      color: 'blue'
    },
    {
      label: 'Delivered',
      value: orders.filter(o => o.status === 'delivered').length,
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Cancelled',
      value: orders.filter(o => o.status === 'cancelled').length,
      icon: XCircle,
      color: 'red'
    }
  ];

  const columns: Column<OrderData>[] = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
    },
    {
      key: 'merchantName',
      label: 'Merchant',
      sortable: true,
    },
    {
      key: 'items',
      label: 'Items',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge
          variant={
            value === 'delivered'
              ? 'success'
              : value === 'pending'
              ? 'warning'
              : value === 'cancelled'
              ? 'error'
              : value === 'in-transit'
              ? 'info'
              : 'neutral'
          }
        >
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Orders Management</h1>
        <p className="text-slate-600">Track and manage all customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            amber: 'bg-amber-50 text-amber-600',
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            red: 'bg-red-50 text-red-600',
          };

          return (
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
                <div
                  className={`p-3 rounded-xl ${
                    colorClasses[stat.color as keyof typeof colorClasses]
                  }`}
                >
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DataTable
        data={orders}
        columns={columns}
        title="All Orders"
        searchKeys={['id', 'customerName', 'merchantName']}
        loading={loading}
        onRowClick={(order) => {
          logger.info('Orders', 'Row clicked', { id: order.id });
          setSelectedOrder(order);
          setIsViewModalOpen(true);
        }}
        actions={(order) => (
          <button
            onClick={() => {
              setSelectedOrder(order);
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
        title="Order Details"
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
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">Order ID</p>
                <p className="text-lg font-mono text-slate-900">{selectedOrder.id}</p>
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
                      : selectedOrder.status === 'in-transit'
                      ? 'info'
                      : 'neutral'
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
                <p className="text-sm font-semibold text-slate-600 mb-1">Items</p>
                <p className="text-lg font-bold text-slate-900">{selectedOrder.items}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-semibold text-slate-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${selectedOrder.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
