import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import { getAuthToken, clearAuthToken } from '../utils/auth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (requestConfig: any) => {
    const token = getAuthToken();

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (config.isDevelopment) {
      console.log('📤 Request:', {
        method: requestConfig.method?.toUpperCase(),
        url: requestConfig.url,
        params: requestConfig.params,
        data: requestConfig.data,
        headers: requestConfig.headers,
      });
    }

    return requestConfig;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (config.isDevelopment) {
      console.log('📥 Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    if (config.isDevelopment) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = '/';
    }

    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
