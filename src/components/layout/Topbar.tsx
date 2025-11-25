import { Search, Bell, MessageSquare, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-30">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search merchants, customers, orders..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-8">
          <button className="relative p-3 hover:bg-slate-100 rounded-2xl transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="relative p-3 hover:bg-slate-100 rounded-2xl transition-colors">
            <MessageSquare size={20} className="text-slate-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">John Doe</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
