import axiosInstance from '../axios';
import { Order } from '../../types';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await axiosInstance.get<Order[]>('/orders');
    return response.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await axiosInstance.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await axiosInstance.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  },

  async searchOrders(query: string): Promise<Order[]> {
    const response = await axiosInstance.get<Order[]>('/orders/search', {
      params: { q: query },
    });
    return response.data;
  },
};
