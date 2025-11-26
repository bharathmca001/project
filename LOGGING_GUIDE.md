# Centralized Logging System Guide

## Overview

The centralized logging system provides structured, categorized logging with development-mode console output, persistent log storage, and export capabilities.

## Features

- **Log Levels**: debug, info, warn, error
- **Categories**: Organize logs by module/feature
- **Development Mode**: Color-coded console output in development
- **Production Silent**: No console output in production
- **Log History**: In-memory log storage (last 500 logs)
- **Export**: Download logs as JSON
- **Filtering**: Filter logs by level and category
- **Timestamps**: Accurate log timestamps

## Basic Usage

```typescript
import { logger } from '@/services/logger';

// Info level
logger.info('ComponentName', 'Action description', { optional: 'data' });

// Debug level
logger.debug('DataTable', 'Filtering applied', { count: 42 });

// Warning level
logger.warn('API', 'Slow response detected', { duration: 5000 });

// Error level
logger.error('API', 'Request failed', error);
```

## Log Levels

### Debug
```typescript
logger.debug('Merchants', 'Rendered', { count: 25 });
```
- Low-level diagnostic information
- Used for detailed debugging
- Only in development

### Info
```typescript
logger.info('Orders', 'Successfully loaded 15 orders');
```
- General informational messages
- Important application events
- Visible in development

### Warn
```typescript
logger.warn('API', 'Retry attempt 2 of 3', { endpoint: '/data' });
```
- Warning conditions
- Unexpected but recoverable situations
- Visible in development

### Error
```typescript
logger.error('Customers', 'Failed to fetch', error);
```
- Error conditions
- Application or API errors
- Visible in development

## Categories

Use meaningful category names for organization:

```typescript
// Module-based
logger.info('Merchants', 'Data loaded');
logger.info('Orders', 'Order created');
logger.info('Customers', 'Profile updated');

// Feature-based
logger.info('DataTable', 'Sort applied');
logger.info('Auth', 'Login successful');
logger.info('API', 'Request sent');
```

## Usage Examples

### Fetch Data with Logging

```typescript
import { logger } from '@/services/logger';
import { merchantService } from '@/services/api';

async function fetchMerchants() {
  try {
    setLoading(true);
    logger.info('Merchants', 'Fetching merchants data');

    const data = await merchantService.getMerchants();

    logger.info('Merchants', `Successfully loaded ${data.length} merchants`);
    setMerchants(data);
  } catch (error) {
    logger.error('Merchants', 'Failed to fetch merchants', error);
    toast.error('Failed to load merchants');
  } finally {
    setLoading(false);
  }
}
```

### Form Submission with Logging

```typescript
async function handleSubmit(formData) {
  try {
    logger.info('MerchantForm', 'Creating new merchant', {
      businessName: formData.businessName
    });

    const merchant = await merchantService.createMerchant(formData);

    logger.info('MerchantForm', 'Merchant created successfully', {
      id: merchant.id
    });

    toast.success('Merchant created!');
  } catch (error) {
    logger.error('MerchantForm', 'Failed to create merchant', error);
    toast.error('Failed to create merchant');
  }
}
```

### User Interaction with Logging

```typescript
function handleRowClick(merchant) {
  logger.info('Merchants', 'Row clicked', { id: merchant.id });
  setSelectedMerchant(merchant);
  setIsViewModalOpen(true);
}

function handleSort(columnKey) {
  logger.debug('DataTable', 'Sort applied', { column: columnKey });
  // ... sorting logic
}

function handleSearch(query) {
  logger.debug('DataTable', 'Search initiated', { query });
  // ... search logic
}
```

### Error Handling with Logging

```typescript
try {
  const data = await fetchData();
} catch (error) {
  if (error instanceof NetworkError) {
    logger.warn('API', 'Network error', { message: error.message });
  } else if (error instanceof ValidationError) {
    logger.warn('API', 'Validation failed', { fields: error.fields });
  } else {
    logger.error('API', 'Unexpected error', error);
  }
}
```

## API Reference

### logger.info()
```typescript
logger.info(category: string, message: string, data?: any): void
```

### logger.debug()
```typescript
logger.debug(category: string, message: string, data?: any): void
```

### logger.warn()
```typescript
logger.warn(category: string, message: string, data?: any): void
```

### logger.error()
```typescript
logger.error(category: string, message: string, data?: any | Error): void
```

### logger.getLogs()
```typescript
logger.getLogs(level?: LogLevel, category?: string): LogEntry[]
```

Get all logs, optionally filtered by level and/or category:

```typescript
// Get all logs
const allLogs = logger.getLogs();

// Get only errors
const errors = logger.getLogs('error');

// Get Merchants logs
const merchantLogs = logger.getLogs(undefined, 'Merchants');

// Get Merchants errors
const merchantErrors = logger.getLogs('error', 'Merchants');
```

### logger.clearLogs()
```typescript
logger.clearLogs(): void
```

Clear all logs from memory:

```typescript
logger.clearLogs();
```

### logger.exportLogs()
```typescript
logger.exportLogs(): string
```

Export logs as JSON string:

```typescript
const jsonString = logger.exportLogs();
console.log(jsonString);
```

### logger.downloadLogs()
```typescript
logger.downloadLogs(): void
```

Download logs as JSON file:

```typescript
// Creates file: logs-2024-11-26T10:30:45.123Z.json
logger.downloadLogs();
```

## Console Output

### Development Mode
In development, logs appear in the browser console with:
- Color-coded by level
- Emoji indicators
- Timestamp
- Category and message
- Optional data object

```
🔍 [10:30:45] DataTable: Filtered 100 items to 42
  {searchTerm: "pizza", searchKeys: Array(3)}

ℹ️ [10:30:46] Merchants: Successfully loaded 42 merchants

⚠️ [10:30:47] API: Slow response detected
  {duration: 5000}

❌ [10:30:48] API: Request failed
  {message: "Network error", stack: "..."}
```

### Production Mode
In production, logger output is disabled. Logs are still collected in memory for troubleshooting.

## Debug Mode

Access logs programmatically:

```typescript
// In browser console
window.__logger = logger;
logger.getLogs();  // See all logs
logger.getLogs('error');  // See errors only
logger.downloadLogs();  // Download for analysis
```

## Best Practices

### 1. Use Consistent Categories
```typescript
// Good
logger.info('Merchants', 'Data loaded');
logger.info('Merchants', 'Item created');

// Avoid
logger.info('MerchantsModule', 'Data loaded');
logger.info('merchant', 'Item created');
```

### 2. Include Contextual Data
```typescript
// Good
logger.info('Orders', 'Order created', { id: order.id, amount: order.total });

// Avoid
logger.info('Orders', 'Order created');
```

### 3. Use Appropriate Log Levels
```typescript
// Good
logger.debug('API', 'Making request', { endpoint: '/api/users' });
logger.info('API', 'Request successful', { status: 200 });
logger.warn('API', 'Slow response', { duration: 3000 });
logger.error('API', 'Request failed', error);

// Avoid
logger.info('API', 'Debug info'); // Should be debug
logger.debug('API', 'Critical error'); // Should be error
```

### 4. Handle Errors Properly
```typescript
// Good
try {
  const data = await fetch('/api/data');
} catch (error) {
  logger.error('API', 'Fetch failed', error);
}

// Avoid
try {
  const data = await fetch('/api/data');
} catch (error) {
  logger.error('API', 'Something went wrong'); // Lost error info
}
```

### 5. Log Important User Actions
```typescript
logger.info('Merchants', 'Row clicked', { id: merchant.id });
logger.info('Orders', 'Status updated', { orderId, newStatus });
logger.info('Customers', 'Profile viewed', { customerId });
```

### 6. Log API Operations
```typescript
logger.info('API', 'Fetching merchants');
logger.info('API', `Successfully loaded ${data.length} merchants`);
logger.error('API', 'Failed to fetch merchants', error);
```

## Log Entry Structure

```typescript
interface LogEntry {
  timestamp: string;     // ISO time (HH:mm:ss)
  level: LogLevel;       // 'debug' | 'info' | 'warn' | 'error'
  category: string;      // Organization category
  message: string;       // Log message
  data?: any;            // Optional data object
  stack?: string;        // Stack trace (errors only)
}
```

## Real-World Example

```typescript
import { useState, useEffect } from 'react';
import { logger } from '@/services/logger';
import { merchantService } from '@/services/api';
import toast from 'react-hot-toast';

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadMerchants();
  }, []);

  async function loadMerchants() {
    try {
      setLoading(true);
      logger.info('Merchants', 'Initiating data load');

      const data = await merchantService.getMerchants();

      logger.info('Merchants', `Successfully loaded ${data.length} merchants`);
      setMerchants(data);
    } catch (error) {
      logger.error('Merchants', 'Failed to load merchants', error);
      toast.error('Failed to load merchants');
    } finally {
      setLoading(false);
    }
  }

  function handleRowClick(merchant) {
    logger.debug('Merchants', 'Row interaction', {
      merchantId: merchant.id,
      businessName: merchant.businessName
    });
    setSelectedId(merchant.id);
  }

  async function handleDelete(id) {
    try {
      logger.info('Merchants', 'Delete initiated', { id });

      await merchantService.deleteMerchant(id);

      logger.info('Merchants', 'Merchant deleted successfully', { id });
      setMerchants(merchants.filter(m => m.id !== id));
      toast.success('Merchant deleted');
    } catch (error) {
      logger.error('Merchants', 'Failed to delete merchant', error);
      toast.error('Failed to delete merchant');
    }
  }

  return (
    // Component JSX
  );
}
```

## Debugging Tips

1. **Check logs in real-time**:
   ```typescript
   logger.getLogs(); // See all recent logs
   ```

2. **Filter logs by category**:
   ```typescript
   logger.getLogs(undefined, 'API'); // See API logs only
   ```

3. **Download logs for analysis**:
   ```typescript
   logger.downloadLogs();
   ```

4. **Monitor specific level**:
   ```typescript
   logger.getLogs('error'); // See errors only
   ```

5. **Clear history when needed**:
   ```typescript
   logger.clearLogs();
   ```

## Integration with External Services

Export logs for sending to external monitoring:

```typescript
async function sendLogsToMonitoring() {
  const logs = logger.getLogs();

  await fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify(logs)
  });
}
```

## Performance

- Logs stored in memory (last 500 entries)
- Minimal overhead in production (disabled output)
- No impact on render performance
- Automatic cleanup of old logs
