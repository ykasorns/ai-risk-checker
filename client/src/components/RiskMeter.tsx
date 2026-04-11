import { RiskLevel, riskLevelDescriptions } from '@/lib/data/aiProvidersData';

interface RiskMeterProps {
  level: RiskLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskMeter({ level, showLabel = true, size = 'md' }: RiskMeterProps) {
  const config = riskLevelDescriptions[level];
  const riskPercentages: Record<RiskLevel, number> = {
    low: 25,
    medium: 50,
    high: 75,
    'very-high': 100,
  };

  const percentage = riskPercentages[level];

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="space-y-2">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: config.color,
          }}
        />
      </div>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span
            className={`font-semibold ${labelSizeClasses[size]}`}
            style={{ color: config.color }}
          >
            {config.label}
          </span>
          <span className={`text-gray-500 ${labelSizeClasses[size]}`}>{percentage}%</span>
        </div>
      )}
    </div>
  );
}
