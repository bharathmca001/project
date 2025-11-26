interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

export default function Loader({
  size = 'md',
  variant = 'spinner',
  color = 'text-blue-500',
  fullScreen = false,
  text
}: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5'
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div
            className={`${sizeClasses[size]} border-4 ${color} border-t-transparent rounded-full animate-spin`}
          />
        );

      case 'dots':
        return (
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${dotSize[size]} ${color.replace('text-', 'bg-')} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${color.replace('text-', 'bg-')} rounded-full animate-pulse`} />
        );

      case 'bars':
        return (
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1 ${
                  size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : size === 'lg' ? 'h-8' : 'h-10'
                } ${color.replace('text-', 'bg-')} rounded-full animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const content = (
    <div className="flex flex-col items-center gap-3">
      {renderLoader()}
      {text && (
        <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
