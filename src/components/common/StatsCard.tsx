import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  growth?: number;
  iconColor: string;
  iconBg: string;
}

export default function StatsCard({ title, value, icon: Icon, growth, iconColor, iconBg }: StatsCardProps) {
  const isPositive = growth && growth > 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mb-3">{value}</p>
          {growth !== undefined && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(growth)}%
              </span>
              <span className="text-xs text-slate-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div className={`${iconBg} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
