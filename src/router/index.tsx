import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/modules/Dashboard';
import Merchants from '../components/modules/Merchants';
import Customers from '../components/modules/Customers';
import Orders from '../components/modules/Orders';
import Analytics from '../components/modules/Analytics';
import Settings from '../components/modules/Settings';
import ComponentsExample from '../components/modules/ComponentsExample';
import UnderConstruction from '../components/modules/UnderConstruction';
import { Award, FileCheck, Package, Truck, Megaphone, DollarSign, Bell, Shield } from 'lucide-react';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'merchants',
        element: <Merchants />
      },
      {
        path: 'customers',
        element: <Customers />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'components',
        element: <ComponentsExample />
      },
      {
        path: 'loyalty',
        element: <UnderConstruction title="Loyalty Program" description="Manage customer loyalty rewards and programs" icon={Award} />
      },
      {
        path: 'kyc',
        element: <UnderConstruction title="KYC Review" description="Review and approve merchant KYC documents" icon={FileCheck} />
      },
      {
        path: 'catalogue',
        element: <UnderConstruction title="Catalogue Management" description="Manage product catalogues across all merchants" icon={Package} />
      },
      {
        path: 'delivery',
        element: <UnderConstruction title="Delivery Management" description="Track and manage delivery operations" icon={Truck} />
      },
      {
        path: 'promotions',
        element: <UnderConstruction title="Promotions & Marketing" description="Create and manage promotional campaigns" icon={Megaphone} />
      },
      {
        path: 'finance',
        element: <UnderConstruction title="Finance & Payments" description="Manage financial transactions and payouts" icon={DollarSign} />
      },
      {
        path: 'notifications',
        element: <UnderConstruction title="Notifications" description="Manage system notifications and alerts" icon={Bell} />
      },
      {
        path: 'roles',
        element: <UnderConstruction title="Roles & Permissions" description="Manage user roles and access permissions" icon={Shield} />
      }
    ]
  }
]);
