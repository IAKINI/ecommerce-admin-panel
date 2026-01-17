'use client';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'number' | 'currency';
}

export default function StatsCard({ title, value, icon, trend, format = 'number' }: StatsCardProps) {
  const formatValue = (val: number) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);
    }
    return val.toLocaleString('tr-TR');
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatValue(value)}
          </p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">önceki aya göre</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="text-primary-600">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}