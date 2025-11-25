import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split('/')[1] || 'dashboard';

  const handleTabChange = (tab: string) => {
    navigate(tab === 'dashboard' ? '/' : `/${tab}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/');
  };

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
  }, []);

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
              const user = { name: 'John Doe', email: 'admin@nearu.com', role: 'Super Admin' };
              setCurrentUser(user);
              setIsAuthenticated(true);
              localStorage.setItem('currentUser', JSON.stringify(user));
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
        onTabChange={handleTabChange}
        onCollapseChange={setIsSidebarCollapsed}
      />
      <Topbar
        isSidebarCollapsed={isSidebarCollapsed}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-16 p-8 transition-all duration-300`}>
        <Outlet />
      </main>
    </div>
  );
}
