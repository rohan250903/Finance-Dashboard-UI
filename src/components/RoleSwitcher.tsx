import { useDashboard } from '../context/DashboardContext';
import { User, Shield } from 'lucide-react';

export const RoleSwitcher = () => {
  const { role, setRole } = useDashboard();

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-2">
      <button
        onClick={() => setRole('viewer')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          role === 'viewer'
            ? 'bg-blue-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <User className="w-4 h-4" />
        <span className="text-sm font-medium">Viewer</span>
      </button>
      <button
        onClick={() => setRole('admin')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
          role === 'admin'
            ? 'bg-purple-500 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Shield className="w-4 h-4" />
        <span className="text-sm font-medium">Admin</span>
      </button>
    </div>
  );
};
