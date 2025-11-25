interface DataPoint {
  label: string;
  value: number;
}

interface SimpleChartProps {
  data: DataPoint[];
  type: 'bar' | 'line';
  color?: string;
  height?: number;
}

export default function SimpleChart({ data, type, color = 'bg-blue-500', height = 200 }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
        {data.map((point, index) => {
          const percentage = (point.value / maxValue) * 100;

          if (type === 'bar') {
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                  <div
                    className={`w-full ${color} rounded-t-xl transition-all duration-500 hover:opacity-80 relative group`}
                    style={{ height: `${percentage}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {point.value}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-medium truncate w-full text-center">{point.label}</p>
              </div>
            );
          }

          return null;
        })}
      </div>

      {type === 'line' && (
        <svg width="100%" height={height} className="overflow-visible">
          <polyline
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (point.value / maxValue) * 80;
              return `${x}%,${y}%`;
            }).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-blue-500"
          />
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (point.value / maxValue) * 80;
            return (
              <g key={index}>
                <circle
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  className="fill-blue-500 hover:r-6 transition-all cursor-pointer"
                />
                <text
                  x={`${x}%`}
                  y="95%"
                  textAnchor="middle"
                  className="text-xs fill-slate-600 font-medium"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
