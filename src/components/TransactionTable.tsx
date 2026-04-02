import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Transaction, TransactionType } from '../types';
import { Search, Filter, ArrowUpDown, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { TransactionModal } from './TransactionModal';

type SortField = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export const TransactionTable = () => {
  const { transactions, role, deleteTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filteredAndSortedTransactions = transactions
    .filter((t) => {
      const matchesSearch =
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.date.includes(searchTerm);
      const matchesFilter = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'date') {
        return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
      } else {
        return multiplier * (a.amount - b.amount);
      }
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transactions</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TransactionType | 'all')}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {role === 'admin' && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => toggleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Description
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Type
              </th>
              <th
                className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => toggleSort('amount')}
              >
                <div className="flex items-center justify-end gap-2">
                  Amount
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              {role === 'admin' && (
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === 'admin' ? 6 : 5}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 text-sm text-right font-semibold ${
                      transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {transaction.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td className="py-3 px-4 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                          aria-label="Edit transaction"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                          aria-label="Delete transaction"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TransactionModal
          transaction={editingTransaction}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(null);
          }}
        />
      )}
    </div>
  );
};
