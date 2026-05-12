import { Routes, Route } from 'react-router-dom';

import { AppLayout } from '../layouts/app-layout';

import { DashboardPage } from '../pages/dashboard';

import { TransactionsPage } from '../pages/transactions';

import { CardsPage } from '../pages/cards';

export function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/transactions"
          element={<TransactionsPage />}
        />

        <Route
          path="/cards"
          element={<CardsPage />}
        />
      </Routes>
    </AppLayout>
  );
}