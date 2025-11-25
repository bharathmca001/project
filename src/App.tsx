import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/modules/Dashboard';
import Merchants from './components/modules/Merchants';
import Customers from './components/modules/Customers';
import Orders from './components/modules/Orders';
import Analytics from './components/modules/Analytics';
import Settings from './components/modules/Settings';
import UnderConstruction from './components/modules/UnderConstruction';
import { Award, FileCheck, Package, Truck, Megaphone, DollarSign, Bell, Shield } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'merchants':
        return <Merchants />;
      case 'customers':
        return <Customers />;
      case 'orders':
        return <Orders />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'loyalty':
        return <UnderConstruction title="Loyalty Program" description="Manage customer loyalty rewards and programs" icon={Award} />;
      case 'kyc':
        return <UnderConstruction title="KYC Review" description="Review and approve merchant KYC documents" icon={FileCheck} />;
      case 'catalogue':
        return <UnderConstruction title="Catalogue Management" description="Manage product catalogues across all merchants" icon={Package} />;
      case 'delivery':
        return <UnderConstruction title="Delivery Management" description="Track and manage delivery operations" icon={Truck} />;
      case 'promotions':
        return <UnderConstruction title="Promotions & Marketing" description="Create and manage promotional campaigns" icon={Megaphone} />;
      case 'finance':
        return <UnderConstruction title="Finance & Payments" description="Manage financial transactions and payouts" icon={DollarSign} />;
      case 'notifications':
        return <UnderConstruction title="Notifications" description="Manage system notifications and alerts" icon={Bell} />;
      case 'roles':
        return <UnderConstruction title="Roles & Permissions" description="Manage user roles and access permissions" icon={Shield} />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">NearU Admin</h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentUser({ name: 'John Doe', email: 'admin@nearu.com', role: 'Super Admin' });
              setIsAuthenticated(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@nearu.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                defaultValue="admin123"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Sign In
            </button>
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-xs text-slate-600 text-center">
                <span className="font-semibold">Demo Account:</span><br />
                Email: admin@nearu.com<br />
                Password: admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCollapseChange={setIsSidebarCollapsed}
      />
      <Topbar
        isSidebarCollapsed={isSidebarCollapsed}
        currentUser={currentUser}
        onLogout={() => {
          setIsAuthenticated(false);
          setCurrentUser(null);
          setActiveTab('dashboard');
        }}
      />
      <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-16 p-8 transition-all duration-300`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
