# DataTable Component Guide

## Overview

The `DataTable` component is a reusable, production-ready table component with built-in search, sorting, pagination, and data export capabilities.

## Features

- **Search**: Real-time search across specified columns
- **Sorting**: Click column headers to sort data (ascending, descending, no sort)
- **Pagination**: Built-in pagination with 10 items per page
- **Export**: Export filtered data to CSV
- **Custom Rendering**: Custom cell renderers for complex data
- **Row Actions**: Custom action buttons for each row
- **Row Click Events**: Handle row clicks for detail views
- **Loading State**: Built-in loading indicator
- **Responsive**: Mobile-friendly design

## Basic Usage

```typescript
import { useState } from 'react';
import DataTable, { Column } from '@/components/common/DataTable';
import { Merchant } from '@/types';

function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: Column<Merchant>[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'businessName',
      label: 'Business Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (value) => `$${value.toLocaleString()}`,
    },
  ];

  return (
    <DataTable
      data={merchants}
      columns={columns}
      title="Merchants"
      searchKeys={['businessName', 'email', 'id']}
      loading={loading}
      onRowClick={(merchant) => {
        console.log('Row clicked:', merchant);
      }}
    />
  );
}
```

## Column Configuration

### Column Type

```typescript
interface Column<T> {
  key: keyof T;           // The data key to display
  label: string;          // Column header label
  sortable?: boolean;     // Enable sorting (default: true)
  render?: (value, row) => React.ReactNode;  // Custom cell renderer
  className?: string;     // Custom CSS classes
}
```

### Examples

#### Basic Column
```typescript
{
  key: 'name',
  label: 'Name',
  sortable: true,
}
```

#### Currency Column
```typescript
{
  key: 'revenue',
  label: 'Revenue',
  sortable: true,
  render: (value) => `$${value.toLocaleString()}`,
}
```

#### Status Badge Column
```typescript
{
  key: 'status',
  label: 'Status',
  sortable: true,
  render: (value) => (
    <Badge variant={value === 'active' ? 'success' : 'warning'}>
      {value}
    </Badge>
  ),
}
```

#### Custom Renderer
```typescript
{
  key: 'createdAt',
  label: 'Created',
  sortable: true,
  render: (value) => new Date(value).toLocaleDateString(),
}
```

## Props

### DataTable<T extends { id: string }>

```typescript
interface DataTableProps<T> {
  // Required
  data: T[];                              // Array of data to display
  columns: Column<T>[];                   // Column definitions

  // Optional
  title?: string;                         // Table title
  searchKeys?: (keyof T)[];              // Keys to search in
  onRowClick?: (row: T) => void;         // Row click handler
  actions?: (row: T) => React.ReactNode; // Custom action buttons
  loading?: boolean;                      // Show loading state
}
```

## Complete Example: Merchants Module

```typescript
import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import DataTable, { Column } from '@/components/common/DataTable';
import { merchantService } from '@/services/api';
import { Merchant } from '@/types';
import { logger } from '@/services/logger';

export default function Merchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      logger.info('Merchants', 'Fetching merchants');
      const data = await merchantService.getMerchants();
      setMerchants(data);
    } catch (error) {
      logger.error('Merchants', 'Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Merchant>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'businessName', label: 'Business', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'revenue',
      label: 'Revenue',
      sortable: true,
      render: (v) => `$${v.toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (v) => <Badge variant="success">{v}</Badge>,
    },
  ];

  return (
    <DataTable
      data={merchants}
      columns={columns}
      title="Merchants"
      searchKeys={['businessName', 'email']}
      loading={loading}
      onRowClick={(merchant) => {
        logger.info('Merchants', 'Selected merchant', { id: merchant.id });
      }}
      actions={(merchant) => (
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-50 rounded">
            <Eye size={16} />
          </button>
          <button className="p-2 hover:bg-green-50 rounded">
            <Edit size={16} />
          </button>
          <button className="p-2 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      )}
    />
  );
}
```

## Logging Integration

The DataTable automatically logs:
- Search operations
- Sort operations
- Data export
- Row filtering

Access logs via:
```typescript
import { logger } from '@/services/logger';

// Get all DataTable logs
const logs = logger.getLogs('DataTable');

// Export logs
logger.downloadLogs();
```

## Search Behavior

Search is case-insensitive and searches across all specified `searchKeys`:

```typescript
<DataTable
  data={data}
  columns={columns}
  searchKeys={['name', 'email', 'phone']} // Search across these fields
/>
```

The search:
- Converts input to lowercase
- Checks partial matches
- Filters across multiple columns
- Updates pagination to page 1

## Sorting

- Click any sortable column header to sort
- First click: ascending
- Second click: descending
- Third click: remove sort
- Pagination resets to page 1

## Pagination

- 10 items per page by default
- Shows page numbers and previous/next buttons
- Only displays if data exceeds 10 items
- Resets on search or sort

## Export

- Export button exports filtered data (after search/sort)
- Format: CSV
- Filename: `{title}-{timestamp}.csv`
- Handles comma-escaped values

```typescript
// Click "Export CSV" button in table header
// Downloads: merchants-2024-11-26T10:30:45.123Z.csv
```

## Styling

DataTable uses Tailwind CSS and follows the project design system:
- Responsive design
- Hover states
- Active states
- Accessibility features

Custom styling via `className` prop on columns:
```typescript
{
  key: 'amount',
  label: 'Amount',
  className: 'text-right font-semibold',
}
```

## Performance

- Efficient filtering with useMemo
- Lazy rendering of visible rows only
- Optimized re-renders
- Logging doesn't impact performance

## Accessibility

- Keyboard navigation support
- Semantic HTML table structure
- Screen reader friendly
- ARIA labels on buttons

## Best Practices

1. **Always provide `id` field**: DataTable requires unique `id` on each row
2. **Use searchKeys**: Specify which columns to search in
3. **Custom renderers**: For complex data like dates, currency, badges
4. **Action buttons**: Keep concise and clear
5. **Loading state**: Set `loading` during data fetch
6. **Error handling**: Wrap in try-catch with logging

```typescript
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await service.getData();
    setData(data);
    logger.info('Component', 'Data loaded successfully');
  } catch (error) {
    logger.error('Component', 'Failed to load data', error);
    toast.error('Failed to load data');
  } finally {
    setLoading(false);
  }
};
```

## Common Use Cases

### Search by Multiple Fields
```typescript
searchKeys={['name', 'email', 'phone', 'location']}
```

### Sort Only Numeric Columns
```typescript
{
  key: 'revenue',
  label: 'Revenue',
  sortable: true,  // Only this column is sortable
}
```

### Complex Status Display
```typescript
{
  key: 'status',
  label: 'Status',
  render: (value) => {
    const statusConfig = {
      active: { variant: 'success', text: 'Active' },
      pending: { variant: 'warning', text: 'Pending' },
      inactive: { variant: 'neutral', text: 'Inactive' },
    };
    const config = statusConfig[value] || statusConfig.inactive;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  },
}
```

### Formatted Currency
```typescript
{
  key: 'amount',
  label: 'Amount',
  render: (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value),
}
```

## Troubleshooting

**No data displayed**
- Check `id` field exists on all rows
- Verify column `key` matches data properties
- Check `data` prop is not empty

**Search not working**
- Ensure `searchKeys` includes the columns you want to search
- Verify data types match (strings vs numbers)

**Sorting not working**
- Verify `sortable: true` on columns
- Check column data types are comparable

**Performance issues**
- Check data size (>1000 items may need virtual scrolling)
- Look at custom renderers for expensive operations

## Future Enhancements

- Virtual scrolling for large datasets
- Multi-column sorting
- Column visibility toggle
- Custom page size
- Server-side pagination
- Advanced filtering UI
