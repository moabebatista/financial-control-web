import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage />}
      />
    </Routes>
  );
}