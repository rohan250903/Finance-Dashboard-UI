import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../context/DashboardContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const CategoryChart = () => {
  const { transactions, darkMode } = useDashboard();

  const getCategoryData = () => {
    const categoryMap = new Map<string, number>();
    let totalExpense = 0;

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
        totalExpense += t.amount;
      });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: ((amount / totalExpense) * 100).toFixed(1),
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const data = getCategoryData();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Spending by Category
      </h3>
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          No expense data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) => `${category} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: darkMode ? '#ffffff' : '#000000'
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
