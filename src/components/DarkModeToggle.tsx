import { useDashboard } from '../context/DashboardContext';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDashboard();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};
