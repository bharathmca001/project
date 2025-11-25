import axiosInstance from '../axios';
import { Customer } from '../../types';

export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    const response = await axiosInstance.get<Customer[]>('/customers');
    return response.data;
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await axiosInstance.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  async searchCustomers(query: string): Promise<Customer[]> {
    const response = await axiosInstance.get<Customer[]>('/customers/search', {
      params: { q: query },
    });
    return response.data;
  },
};
