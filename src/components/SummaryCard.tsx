import { Video as LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const SummaryCard = ({ title, amount, icon: Icon, color, trend }: SummaryCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow  hover:scale-105 hover:shadow-xl hover:-translate-y-1
  cursor-pointer  ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${amount.toLocaleString()}
          </p>
          {trend && (
            <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
