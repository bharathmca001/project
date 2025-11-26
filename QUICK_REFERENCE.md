# Quick Reference - Custom Components

This is a quick reference guide for all custom common components in the NearU Admin Panel.

## Import Statements

```typescript
import CustomInput from '@/components/common/CustomInput';
import Loader from '@/components/common/Loader';
import Modal from '@/components/common/Modal';
import Alert from '@/components/common/Alert';
import Badge from '@/components/common/Badge';
import DataTable from '@/components/common/DataTable';
import Select from '@/components/common/Select';
import SearchInput from '@/components/common/SearchInput';

import { useAlert } from '@/hooks/useAlert';
import { showToast } from '@/utils/toast';
import { logger } from '@/services/logger';
```

---

## CustomInput

```typescript
<CustomInput
  label="Email"
  icon={Mail}
  type="email"
  placeholder="john@example.com"
  error={errors.email?.message}
  helperText="Enter a valid email address"
  required
/>
```

---

## Loader

```typescript
// Spinner
<Loader variant="spinner" size="lg" />

// Dots
<Loader variant="dots" size="md" color="text-green-500" />

// Pulse
<Loader variant="pulse" size="xl" text="Loading..." />

// Full screen
<Loader fullScreen variant="spinner" size="xl" text="Please wait..." />
```

---

## Modal

```typescript
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="lg"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  }
>
  <div>Modal content</div>
</Modal>
```

---

## Alert (SweetAlert-style)

```typescript
const alert = useAlert();

// Show alert
alert.showAlert({
  title: 'Success!',
  message: 'Your changes have been saved.',
  type: 'success',
  confirmText: 'OK'
});

// Confirm dialog
const confirmed = await alert.confirm({
  title: 'Delete Item',
  message: 'Are you sure? This cannot be undone.',
  type: 'warning',
  confirmText: 'Yes, Delete',
  cancelText: 'Cancel'
});

if (confirmed) {
  // User clicked "Yes, Delete"
}

// In JSX
<Alert
  isOpen={alert.isOpen}
  onClose={alert.close}
  onConfirm={alert.handleConfirm}
  {...alert.options}
/>
```

---

## Toast Notifications

```typescript
// Success
showToast.success('Action completed!');

// Error
showToast.error('Something went wrong');

// Loading
const loadingToast = showToast.loading('Processing...');
showToast.dismiss(loadingToast);

// Custom
showToast.custom('Custom message', '🚀');

// Promise
await showToast.promise(
  fetchData(),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load'
  }
);
```

---

## Logger (Development Only)

```typescript
// Info
logger.info('Component', 'Action performed', { data });

// Debug
logger.debug('Component', 'Debug info', { details });

// Warning
logger.warn('Component', 'Warning message', { warning });

// Error
logger.error('Component', 'Error occurred', error);

// Get logs
const allLogs = logger.getLogs();
const errors = logger.getLogs('error');
const componentLogs = logger.getLogs(undefined, 'Component');

// Export logs
logger.downloadLogs();
logger.clearLogs();
```

---

## Badge

```typescript
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Rejected</Badge>
<Badge variant="info">In Progress</Badge>
<Badge variant="neutral">Inactive</Badge>
<Badge variant="success" size="md">Large Badge</Badge>
```

---

## DataTable

```typescript
const columns: Column<DataType>[] = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'amount',
    label: 'Amount',
    sortable: true,
    render: (value) => `$${value.toLocaleString()}`
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <Badge variant="success">{value}</Badge>
  }
];

<DataTable
  data={data}
  columns={columns}
  title="Data Table"
  searchKeys={['name', 'email']}
  loading={loading}
  onRowClick={(row) => console.log(row)}
  actions={(row) => (
    <button onClick={() => handleEdit(row)}>Edit</button>
  )}
/>
```

---

## Select

```typescript
<Select
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  placeholder="Select an option"
/>
```

---

## SearchInput

```typescript
<SearchInput
  value={searchTerm}
  onChange={(value) => setSearchTerm(value)}
  placeholder="Search..."
/>
```

---

## Complete Example

```typescript
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import CustomInput from '@/components/common/CustomInput';
import Loader from '@/components/common/Loader';
import Modal from '@/components/common/Modal';
import Alert from '@/components/common/Alert';
import { useAlert } from '@/hooks/useAlert';
import { showToast } from '@/utils/toast';
import { logger } from '@/services/logger';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const alert = useAlert();

  const handleSubmit = async () => {
    setLoading(true);
    logger.info('MyComponent', 'Form submission started');

    try {
      await saveData();
      showToast.success('Data saved successfully!');
      logger.info('MyComponent', 'Form submitted successfully');
    } catch (error) {
      showToast.error('Failed to save data');
      logger.error('MyComponent', 'Form submission failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = await alert.confirm({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this?',
      type: 'warning',
      confirmText: 'Yes, Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      showToast.success('Item deleted!');
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <button onClick={handleDelete}>Delete</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Data"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
          </>
        }
      >
        <div className="space-y-4">
          <CustomInput
            label="Email"
            icon={Mail}
            type="email"
            required
          />
          <CustomInput
            label="Password"
            icon={Lock}
            type="password"
            required
          />
        </div>
      </Modal>

      <Alert
        isOpen={alert.isOpen}
        onClose={alert.close}
        onConfirm={alert.handleConfirm}
        {...alert.options}
      />

      {loading && <Loader fullScreen variant="spinner" text="Saving..." />}
    </>
  );
}
```

---

## View Live Example

Visit `/components` route to see all components in action.

## Documentation

- Full Guide: `COMPONENTS_GUIDE.md`
- DataTable Guide: `DATATABLE_GUIDE.md`
- Logging Guide: `LOGGING_GUIDE.md`
- Architecture: `ARCHITECTURE.md`

## Notes

- Logger only works in development mode (production is silent)
- Toast notifications are already configured in App.tsx
- All components support Tailwind CSS customization
- Icons from lucide-react are pre-installed
