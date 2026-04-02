import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Role, TransactionType } from '../types';
import { mockTransactions } from '../data/mockData';

interface DashboardContextType {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  setRole: (role: Role) => void;
  setDarkMode: (darkMode: boolean) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem('transactions');
    return stored ? JSON.parse(stored) : mockTransactions;
  });

  const [role, setRole] = useState<Role>(() => {
    const stored = localStorage.getItem('role');
    return (stored as Role) || 'viewer';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        role,
        darkMode,
        setRole,
        setDarkMode,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
