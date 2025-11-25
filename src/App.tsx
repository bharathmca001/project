import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './components/modules/Dashboard';
import Merchants from './components/modules/Merchants';
import Customers from './components/modules/Customers';
import Orders from './components/modules/Orders';
import Analytics from './components/modules/Analytics';
import Settings from './components/modules/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <p className="text-slate-600">This module is under construction</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Topbar />
      <main className="ml-64 mt-16 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
