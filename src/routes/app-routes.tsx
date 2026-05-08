import { Routes, Route } from 'react-router-dom';

import { DashboardPage } from '../pages/dashboard';

import { TransactionsPage } from '../pages/transactions';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage />}
      />

      <Route
        path="/transactions"
        element={<TransactionsPage />}
      />
    </Routes>
  );
}