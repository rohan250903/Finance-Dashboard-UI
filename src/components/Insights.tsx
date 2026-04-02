import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb } from 'lucide-react';

export const Insights = () => {
  const { transactions } = useDashboard();

  const generateInsights = () => {
    const insights: Array<{ type: 'positive' | 'negative' | 'warning' | 'info'; message: string }> = [];

    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth - 1;

    const currentMonthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === currentMonth
    );
    const lastMonthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === lastMonth
    );

    const categoryExpenses = new Map<string, number>();
    const currentMonthCategoryExpenses = new Map<string, number>();
    const lastMonthCategoryExpenses = new Map<string, number>();

    transactions.forEach((t) => {
      if (t.type === 'expense') {
        categoryExpenses.set(t.category, (categoryExpenses.get(t.category) || 0) + t.amount);
      }
    });

    currentMonthTransactions.forEach((t) => {
      if (t.type === 'expense') {
        currentMonthCategoryExpenses.set(
          t.category,
          (currentMonthCategoryExpenses.get(t.category) || 0) + t.amount
        );
      }
    });

    lastMonthTransactions.forEach((t) => {
      if (t.type === 'expense') {
        lastMonthCategoryExpenses.set(
          t.category,
          (lastMonthCategoryExpenses.get(t.category) || 0) + t.amount
        );
      }
    });

    const currentMonthTotal = currentMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthTotal = lastMonthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    if (lastMonthTotal > 0) {
      const percentChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      if (percentChange > 20) {
        insights.push({
          type: 'warning',
          message: `You spent ${percentChange.toFixed(0)}% more this month compared to last month.`,
        });
      } else if (percentChange < -20) {
        insights.push({
          type: 'positive',
          message: `Great job! You spent ${Math.abs(percentChange).toFixed(0)}% less this month compared to last month.`,
        });
      }
    }

    const sortedCategories = Array.from(categoryExpenses.entries()).sort((a, b) => b[1] - a[1]);
    if (sortedCategories.length > 0) {
      const topCategory = sortedCategories[0];
      insights.push({
        type: 'info',
        message: `Your highest spending category is ${topCategory[0]} with $${topCategory[1].toLocaleString()} in total.`,
      });
    }

    currentMonthCategoryExpenses.forEach((currentAmount, category) => {
      const lastAmount = lastMonthCategoryExpenses.get(category) || 0;
      if (lastAmount > 0) {
        const percentChange = ((currentAmount - lastAmount) / lastAmount) * 100;
        if (percentChange > 25) {
          insights.push({
            type: 'negative',
            message: `You spent ${percentChange.toFixed(0)}% more on ${category} this month compared to last month.`,
          });
        }
      }
    });

    const currentMonthIncome = currentMonthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    if (currentMonthIncome > 0 && currentMonthTotal > 0) {
      const savingsRate = ((currentMonthIncome - currentMonthTotal) / currentMonthIncome) * 100;
      if (savingsRate > 30) {
        insights.push({
          type: 'positive',
          message: `Excellent! You're saving ${savingsRate.toFixed(0)}% of your income this month.`,
        });
      } else if (savingsRate < 10 && savingsRate > 0) {
        insights.push({
          type: 'warning',
          message: `Your savings rate is only ${savingsRate.toFixed(0)}%. Consider reducing expenses.`,
        });
      } else if (savingsRate < 0) {
        insights.push({
          type: 'negative',
          message: `Warning: You're spending ${Math.abs(savingsRate).toFixed(0)}% more than you earn this month.`,
        });
      }
    }

    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-5 h-5" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:shadow-xl hover:-translate-y-1';
      case 'negative':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:shadow-xl hover:-translate-y-1';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300 hover:shadow-xl hover:-translate-y-1';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:shadow-xl hover:-translate-y-1';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Smart Insights</h3>

      {insights.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Not enough data to generate insights
        </div>
      ) : (
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border ${getColorClasses(insight.type)}`}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(insight.type)}</div>
              <p className="text-sm flex-1">{insight.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
