import { LucideIcon } from 'lucide-react';

interface UnderConstructionProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function UnderConstruction({ title, description, icon: Icon }: UnderConstructionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600">{description}</p>
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Coming Soon</h2>
          <p className="text-slate-600 mb-6">
            This module is currently under development. We're working hard to bring you this feature soon.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900 font-medium">
              Check back later for updates or contact support if you need immediate assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
