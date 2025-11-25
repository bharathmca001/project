# Service Architecture

This directory contains the service layer for the NearU Admin Panel application.

## Structure

```
services/
├── axios.ts              # Axios instance with interceptors
├── api/
│   ├── index.ts         # API service exports
│   ├── merchantService.ts
│   ├── customerService.ts
│   ├── orderService.ts
│   ├── analyticsService.ts
│   └── authService.ts
```

## Axios Configuration

The `axios.ts` file creates a configured Axios instance with:

- Base URL from environment config
- Request timeout configuration
- JWT token handling in request interceptors
- Automatic token refresh on 401 responses
- Request/response logging in development mode
- Error handling and redirect on authentication failures

## API Services

Each service file provides methods for interacting with specific API endpoints:

### merchantService
- `getMerchants()` - Fetch all merchants
- `getMerchantById(id)` - Fetch single merchant
- `createMerchant(data)` - Create new merchant
- `updateMerchant(id, data)` - Update merchant
- `deleteMerchant(id)` - Delete merchant
- `searchMerchants(query)` - Search merchants
- `filterMerchants(filters)` - Filter merchants by criteria

### customerService
- `getCustomers()` - Fetch all customers
- `getCustomerById(id)` - Fetch single customer
- `searchCustomers(query)` - Search customers

### orderService
- `getOrders()` - Fetch all orders
- `getOrderById(id)` - Fetch single order
- `updateOrderStatus(id, status)` - Update order status
- `searchOrders(query)` - Search orders

### analyticsService
- `getAnalytics()` - Fetch analytics data
- `getRevenueData(period)` - Fetch revenue data
- `getOrdersData(period)` - Fetch orders data

### authService
- `login(credentials)` - User login
- `logout()` - User logout
- `refreshToken()` - Refresh JWT token
- `getCurrentUser()` - Get current user info

## Usage Example

```typescript
import { merchantService } from '@/services/api';

// Fetch merchants
const merchants = await merchantService.getMerchants();

// Create new merchant
const newMerchant = await merchantService.createMerchant({
  name: 'John Doe',
  email: 'john@example.com',
  // ... other fields
});
```

## JWT Token Handling

Tokens are automatically:
- Added to request headers via interceptors
- Stored in localStorage via `auth.ts` utilities
- Cleared on logout or 401 errors
- Refreshed when needed

## Environment Configuration

The service layer uses environment variables:
- `VITE_API_BASE_URL` - API base URL
- `VITE_APP_ENV` - Application environment (development/production)
- `VITE_API_TIMEOUT` - Request timeout in milliseconds
