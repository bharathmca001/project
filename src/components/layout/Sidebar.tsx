import { useState } from 'react';
import {
  LayoutDashboard,
  Store,
  Users,
  ShoppingBag,
  BarChart3,
  Award,
  FileCheck,
  Package,
  Truck,
  Megaphone,
  DollarSign,
  Bell,
  Shield,
  Settings,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'merchants', label: 'Merchants', icon: Store },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'loyalty', label: 'Loyalty', icon: Award },
  { id: 'kyc', label: 'KYC Review', icon: FileCheck },
  { id: 'catalogue', label: 'Catalogue', icon: Package },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'promotions', label: 'Promotions', icon: Megaphone },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
  { id: 'components', label: 'Components', icon: Layers },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ activeTab, onTabChange, onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          {!isCollapsed ? (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              NearU Admin
            </h1>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Store size={24} className="text-white" />
            </div>
          )}
          <button
            onClick={handleToggleCollapse}
            className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => onTabChange(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25'
                      : 'hover:bg-slate-700/50 hover:translate-x-1'
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                  />
                  {!isCollapsed && (
                    <span
                      className={`text-sm font-medium ${
                        isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
                {isCollapsed && hoveredItem === item.id && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl shadow-2xl whitespace-nowrap z-[9999] border border-slate-700 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          {!isCollapsed && (
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-4 border border-blue-500/20">
              <p className="text-xs text-slate-400 mb-1">Admin User</p>
              <p className="text-sm font-semibold">John Doe</p>
              <p className="text-xs text-slate-500">admin@nearu.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
