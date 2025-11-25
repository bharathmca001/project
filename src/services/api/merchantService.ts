import axiosInstance from '../axios';
import { Merchant } from '../../types';

interface CreateMerchantData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  category: string;
  location: string;
}

interface UpdateMerchantData extends Partial<CreateMerchantData> {
  status?: string;
  kycStatus?: string;
}

export const merchantService = {
  async getMerchants(): Promise<Merchant[]> {
    const response = await axiosInstance.get<Merchant[]>('/merchants');
    return response.data;
  },

  async getMerchantById(id: string): Promise<Merchant> {
    const response = await axiosInstance.get<Merchant>(`/merchants/${id}`);
    return response.data;
  },

  async createMerchant(data: CreateMerchantData): Promise<Merchant> {
    const response = await axiosInstance.post<Merchant>('/merchants', data);
    return response.data;
  },

  async updateMerchant(id: string, data: UpdateMerchantData): Promise<Merchant> {
    const response = await axiosInstance.put<Merchant>(`/merchants/${id}`, data);
    return response.data;
  },

  async deleteMerchant(id: string): Promise<void> {
    await axiosInstance.delete(`/merchants/${id}`);
  },

  async searchMerchants(query: string): Promise<Merchant[]> {
    const response = await axiosInstance.get<Merchant[]>('/merchants/search', {
      params: { q: query },
    });
    return response.data;
  },

  async filterMerchants(filters: {
    status?: string;
    category?: string;
    kycStatus?: string;
  }): Promise<Merchant[]> {
    const response = await axiosInstance.get<Merchant[]>('/merchants', {
      params: filters,
    });
    return response.data;
  },
};
