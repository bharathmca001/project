import axiosInstance from '../axios';
import { Analytics } from '../../types';

export const analyticsService = {
  async getAnalytics(): Promise<Analytics> {
    const response = await axiosInstance.get<Analytics>('/analytics');
    return response.data;
  },

  async getRevenueData(period: string): Promise<any> {
    const response = await axiosInstance.get('/analytics/revenue', {
      params: { period },
    });
    return response.data;
  },

  async getOrdersData(period: string): Promise<any> {
    const response = await axiosInstance.get('/analytics/orders', {
      params: { period },
    });
    return response.data;
  },
};
