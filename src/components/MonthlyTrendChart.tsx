import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { useDashboard } from '../context/DashboardContext';

export const MonthlyTrendChart = () => {
  const { transactions, darkMode } = useDashboard();

  const getMonthlyData = () => {
    const monthlyMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { income: 0, expense: 0 });
      }

      const data = monthlyMap.get(monthKey)!;
      if (t.type === 'income') {
        data.income += t.amount;
      } else {
        data.expense += t.amount;
      }
    });

    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6);
  };

  const data = getMonthlyData();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6  hover:shadow-xl hover:-translate-y-1">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Trends
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis
            dataKey="month"
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke={darkMode ? '#9ca3af' : '#6b7280'}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              color: darkMode ? '#ffffff' : '#000000'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
