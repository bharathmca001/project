export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  category: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  kycStatus: 'pending' | 'approved' | 'rejected';
  revenue: number;
  orders: number;
  joinDate: string;
  location: string;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: string;
  lastOrder: string;
  location: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  merchantId: string;
  merchantName: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled' | 'in-transit';
  total: number;
  items: number;
  orderDate: string;
  date: string;
  deliveryType: 'pickup' | 'delivery';
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalMerchants: number;
  totalCustomers: number;
  revenueGrowth: number;
  ordersGrowth: number;
  merchantsGrowth: number;
  customersGrowth: number;
}
