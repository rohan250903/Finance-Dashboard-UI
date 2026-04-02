import { useDashboard } from './context/DashboardContext';
import { SummaryCard } from './components/SummaryCard';
import { RoleSwitcher } from './components/RoleSwitcher';
import { DarkModeToggle } from './components/DarkModeToggle';
import { MonthlyTrendChart } from './components/MonthlyTrendChart';
import { CategoryChart } from './components/CategoryChart';
import { TransactionTable } from './components/TransactionTable';
import { Insights } from './components/Insights';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

function App() {
  const { transactions } = useDashboard();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brown-700 dark:text-white">
              Finance Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your income and expenses
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <DarkModeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Balance"
            amount={balance}
            icon={Wallet}
            color="bg-blue-500"
          />
          <SummaryCard
            title="Total Income"
            amount={totalIncome}
            icon={TrendingUp}
            color="bg-green-500"
          />
          <SummaryCard
            title="Total Expenses"
            amount={totalExpense}
            icon={TrendingDown}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MonthlyTrendChart />
          <CategoryChart />
        </div>

        <div className="mb-8">
          <Insights />
        </div>

        <div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}

export default App;
