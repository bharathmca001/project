import { TrendingUp, DollarSign, ShoppingBag, Users, Store } from 'lucide-react';
import StatsCard from '../common/StatsCard';
import SimpleChart from '../common/SimpleChart';
import { mockAnalytics } from '../../data/mockData';

export default function Analytics() {
  const revenueData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
    { label: 'Jul', value: 72000 },
    { label: 'Aug', value: 68000 },
    { label: 'Sep', value: 75000 },
    { label: 'Oct', value: 82000 },
    { label: 'Nov', value: 78000 },
    { label: 'Dec', value: 95000 }
  ];

  const ordersData = [
    { label: 'Mon', value: 145 },
    { label: 'Tue', value: 189 },
    { label: 'Wed', value: 167 },
    { label: 'Thu', value: 201 },
    { label: 'Fri', value: 234 },
    { label: 'Sat', value: 298 },
    { label: 'Sun', value: 267 }
  ];

  const categoryData = [
    { label: 'Restaurant', value: 42 },
    { label: 'Grocery', value: 28 },
    { label: 'Pharmacy', value: 15 },
    { label: 'Retail', value: 10 },
    { label: 'Other', value: 5 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics & Reports</h1>
        <p className="text-slate-600">Track performance metrics and gain insights into your business</p>
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
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatsCard
          title="Total Customers"
          value={mockAnalytics.totalCustomers.toLocaleString()}
          icon={Users}
          growth={mockAnalytics.customersGrowth}
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Monthly Revenue</h2>
              <p className="text-sm text-slate-600">Revenue trend over the last 12 months</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp size={20} />
              <span className="text-sm font-semibold">+{mockAnalytics.revenueGrowth}%</span>
            </div>
          </div>
          <SimpleChart data={revenueData} type="bar" color="bg-gradient-to-t from-blue-500 to-cyan-500" height={250} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Weekly Orders</h2>
              <p className="text-sm text-slate-600">Order volume for the current week</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp size={20} />
              <span className="text-sm font-semibold">+{mockAnalytics.ordersGrowth}%</span>
            </div>
          </div>
          <SimpleChart data={ordersData} type="bar" color="bg-gradient-to-t from-emerald-500 to-green-500" height={250} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Merchants by Category</h2>
          <SimpleChart data={categoryData} type="bar" color="bg-gradient-to-t from-amber-500 to-orange-500" height={200} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Key Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Order Value</p>
                <p className="text-2xl font-bold text-slate-900">$48.50</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={24} className="text-blue-600" />
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-600 mb-1">Customer Retention</p>
                <p className="text-2xl font-bold text-slate-900">87%</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                <Users size={24} className="text-green-600" />
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-600 mb-1">Merchant Rating</p>
                <p className="text-2xl font-bold text-slate-900">4.6/5</p>
              </div>
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Store size={24} className="text-amber-600" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">12.4%</p>
              </div>
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} className="text-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Peak Hours</h3>
          <p className="text-3xl font-bold mb-2">6 PM - 9 PM</p>
          <p className="text-sm text-blue-100">Highest order volume</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Top Category</h3>
          <p className="text-3xl font-bold mb-2">Restaurants</p>
          <p className="text-sm text-emerald-100">42% of all merchants</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Growth Rate</h3>
          <p className="text-3xl font-bold mb-2">+{mockAnalytics.revenueGrowth}%</p>
          <p className="text-sm text-amber-100">Month over month</p>
        </div>
      </div>
    </div>
  );
}
