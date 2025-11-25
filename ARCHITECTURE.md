# NearU Admin Panel - Architecture Documentation

## Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Reusable UI components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components (Sidebar, Topbar)
│   └── modules/        # Feature modules
├── config/             # Configuration files
├── data/               # Mock data
├── lib/                # Third-party library configs
├── router/             # React Router configuration
├── services/           # API services & Axios setup
│   └── api/           # Individual API services
├── types/              # TypeScript type definitions
└── utils/              # Utility functions

## Environment Configuration

The application supports multiple environments through `.env` files:

### Available Environment Files
- `.env` - Default environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

### Environment Variables

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=development
VITE_API_TIMEOUT=30000

# Supabase (if needed)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## Service Architecture

### Axios Instance Configuration

The application uses a centralized Axios instance with:
- JWT token management via interceptors
- Automatic authentication handling
- Request/response logging in development
- Error handling and automatic redirects

### Using Services in Components

```typescript
import { merchantService } from '@/services/api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function MerchantsList() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const data = await merchantService.getMerchants();
      setMerchants(data);
    } catch (error) {
      toast.error('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const newMerchant = await merchantService.createMerchant(formData);
      setMerchants([newMerchant, ...merchants]);
      toast.success('Merchant created successfully');
    } catch (error) {
      toast.error('Failed to create merchant');
    }
  };

  // Component render...
}
```

### JWT Token Handling

The application automatically handles JWT tokens:

```typescript
import { setAuthToken, getAuthToken, clearAuthToken } from '@/utils/auth';

// After login
const response = await authService.login({ email, password });
// Token is automatically stored in localStorage

// Token is automatically added to all API requests

// On logout
await authService.logout();
// Token is automatically cleared
```

## Available Scripts

```bash
# Development with hot-reload
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint

# Type checking
npm run typecheck
```

## API Service Examples

### Merchants Service

```typescript
import { merchantService } from '@/services/api';

// Get all merchants
const merchants = await merchantService.getMerchants();

// Get single merchant
const merchant = await merchantService.getMerchantById('M001');

// Create merchant
const newMerchant = await merchantService.createMerchant({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  businessName: 'John\'s Pizza',
  category: 'Restaurant',
  location: 'New York, NY'
});

// Update merchant
const updated = await merchantService.updateMerchant('M001', {
  status: 'active',
  kycStatus: 'approved'
});

// Delete merchant
await merchantService.deleteMerchant('M001');

// Search merchants
const results = await merchantService.searchMerchants('pizza');

// Filter merchants
const filtered = await merchantService.filterMerchants({
  status: 'active',
  category: 'Restaurant'
});
```

### Auth Service

```typescript
import { authService } from '@/services/api';

// Login
const { token, user } = await authService.login({
  email: 'admin@nearu.com',
  password: 'password123'
});

// Get current user
const currentUser = await authService.getCurrentUser();

// Refresh token
const newToken = await authService.refreshToken();

// Logout
await authService.logout();
```

## Request/Response Interceptors

### Request Interceptor
- Automatically adds JWT token to Authorization header
- Logs request details in development mode
- Can be extended for custom headers

### Response Interceptor
- Logs response data in development mode
- Handles 401 errors (clears token, redirects to login)
- Handles 403 errors (access forbidden)
- Can be extended for custom error handling

## Mock Data vs API

Currently, the application uses mock data in development. To switch to real API:

1. Update environment variables to point to your API
2. Replace mock data usage in components with service calls
3. Ensure API endpoints match service method expectations

Example migration:

```typescript
// Before (using mock data)
import { mockMerchants } from '@/data/mockData';
const [merchants, setMerchants] = useState(mockMerchants);

// After (using API service)
import { merchantService } from '@/services/api';
const [merchants, setMerchants] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await merchantService.getMerchants();
    setMerchants(data);
  };
  fetchData();
}, []);
```

## Type Safety

All services use TypeScript interfaces for request/response data:

```typescript
import { Merchant, Customer, Order } from '@/types';

// Services return typed data
const merchant: Merchant = await merchantService.getMerchantById('M001');
const customers: Customer[] = await customerService.getCustomers();
const orders: Order[] = await orderService.getOrders();
```

## Error Handling Best Practices

```typescript
try {
  const data = await merchantService.createMerchant(formData);
  toast.success('Success!');
  // Handle success...
} catch (error) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Operation failed';
    toast.error(message);
  } else {
    toast.error('An unexpected error occurred');
  }
}
```

## Development vs Production

### Development Mode
- Detailed request/response logging
- Source maps enabled
- Hot module replacement
- API: `http://localhost:3000/api`

### Production Mode
- Optimized bundle
- No logging
- Minified assets
- API: `https://api.nearu.com/api`

## Next Steps

1. Implement real backend API endpoints
2. Add authentication flow
3. Implement refresh token mechanism
4. Add request caching if needed
5. Implement optimistic UI updates
6. Add pagination support
