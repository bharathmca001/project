import axiosInstance from '../axios';
import { setAuthToken, clearAuthToken } from '../../utils/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);

    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data;
  },

  async logout(): Promise<void> {
    await axiosInstance.post('/auth/logout');
    clearAuthToken();
  },

  async refreshToken(): Promise<string> {
    const response = await axiosInstance.post<{ token: string }>('/auth/refresh');

    if (response.data.token) {
      setAuthToken(response.data.token);
    }

    return response.data.token;
  },

  async getCurrentUser(): Promise<LoginResponse['user']> {
    const response = await axiosInstance.get<LoginResponse['user']>('/auth/me');
    return response.data;
  },
};
