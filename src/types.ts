export type TransactionType = 'income' | 'expense';

export type Category = 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Salary' | 'Investment' | 'Other';

export type Role = 'viewer' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryData {
  category: Category;
  amount: number;
  percentage: number;
}
