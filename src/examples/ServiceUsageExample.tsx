import { useState, useEffect } from 'react';
import { merchantService, customerService, orderService, authService } from '../services/api';
import toast from 'react-hot-toast';

export default function ServiceUsageExample() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const data = await merchantService.getMerchants();
      setMerchants(data);
      toast.success('Merchants loaded successfully');
    } catch (error) {
      toast.error('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  };

  const createMerchant = async () => {
    try {
      const newMerchant = await merchantService.createMerchant({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        businessName: 'John\'s Pizza',
        category: 'Restaurant',
        location: 'New York, NY'
      });

      setMerchants([newMerchant, ...merchants]);
      toast.success('Merchant created successfully');
    } catch (error) {
      toast.error('Failed to create merchant');
    }
  };

  const updateMerchant = async (id: string) => {
    try {
      const updated = await merchantService.updateMerchant(id, {
        status: 'active',
        kycStatus: 'approved'
      });

      setMerchants(merchants.map(m => m.id === id ? updated : m));
      toast.success('Merchant updated successfully');
    } catch (error) {
      toast.error('Failed to update merchant');
    }
  };

  const deleteMerchant = async (id: string) => {
    try {
      await merchantService.deleteMerchant(id);
      setMerchants(merchants.filter(m => m.id !== id));
      toast.success('Merchant deleted successfully');
    } catch (error) {
      toast.error('Failed to delete merchant');
    }
  };

  const searchMerchants = async (query: string) => {
    try {
      const results = await merchantService.searchMerchants(query);
      setMerchants(results);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const filterMerchants = async () => {
    try {
      const filtered = await merchantService.filterMerchants({
        status: 'active',
        category: 'Restaurant'
      });
      setMerchants(filtered);
    } catch (error) {
      toast.error('Filter failed');
    }
  };

  const handleLogin = async () => {
    try {
      const { token, user } = await authService.login({
        email: 'admin@nearu.com',
        password: 'password123'
      });

      console.log('Login successful:', { token, user });
      toast.success(`Welcome ${user.name}!`);
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const fetchCustomers = async () => {
    try {
      const customers = await customerService.getCustomers();
      console.log('Customers:', customers);
    } catch (error) {
      toast.error('Failed to load customers');
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await orderService.getOrders();
      console.log('Orders:', orders);
    } catch (error) {
      toast.error('Failed to load orders');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Service Usage Examples</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={fetchMerchants}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Fetch Merchants
        </button>

        <button
          onClick={createMerchant}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Merchant
        </button>

        <button
          onClick={() => searchMerchants('pizza')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Search Merchants
        </button>

        <button
          onClick={filterMerchants}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Filter Merchants
        </button>

        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
        >
          Login
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>

        <button
          onClick={fetchCustomers}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Fetch Customers
        </button>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Fetch Orders
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Merchants ({merchants.length})</h2>
        <pre className="bg-slate-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(merchants, null, 2)}
        </pre>
      </div>
    </div>
  );
}
