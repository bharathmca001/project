import { DollarSign, ShoppingBag, Store, Users, ArrowUpRight } from 'lucide-react';
import StatsCard from '../common/StatsCard';
import { mockAnalytics, mockOrders } from '../../data/mockData';
import Badge from '../common/Badge';

export default function Dashboard() {
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${mockAnalytics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          growth={mockAnalytics.revenueGrowth}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatsCard
          title="Total Orders"
          value={mockAnalytics.totalOrders.toLocaleString()}
          icon={ShoppingBag}
          growth={mockAnalytics.ordersGrowth}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard
          title="Active Merchants"
          value={mockAnalytics.totalMerchants}
          icon={Store}
          growth={mockAnalytics.merchantsGrowth}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatsCard
          title="Total Customers"
          value={mockAnalytics.totalCustomers.toLocaleString()}
          icon={Users}
          growth={mockAnalytics.customersGrowth}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
            <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Merchant</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-slate-900">{order.id}</td>
                    <td className="py-4 px-4 text-sm text-slate-700">{order.customerName}</td>
                    <td className="py-4 px-4 text-sm text-slate-700">{order.merchantName}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'success'
                            : order.status === 'pending'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm font-semibold text-slate-900 text-right">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-xl text-left font-medium transition-all duration-200 hover:translate-x-1">
              Add New Merchant
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-xl text-left font-medium transition-all duration-200 hover:translate-x-1">
              Review KYC Requests
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-xl text-left font-medium transition-all duration-200 hover:translate-x-1">
              Create Promotion
            </button>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 px-4 rounded-xl text-left font-medium transition-all duration-200 hover:translate-x-1">
              Generate Report
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-white/80 mb-2">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
