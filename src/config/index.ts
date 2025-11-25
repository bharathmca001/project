const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  isDevelopment: import.meta.env.VITE_APP_ENV === 'development',
  isProduction: import.meta.env.VITE_APP_ENV === 'production',
};

export default config;
