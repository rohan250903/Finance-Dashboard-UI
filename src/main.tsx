import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DashboardProvider } from './context/DashboardContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardProvider>
      <App />
    </DashboardProvider>
  </StrictMode>
);
