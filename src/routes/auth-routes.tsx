import { Routes, Route } from 'react-router-dom';

import { LoginPage } from '../pages/auth/login';

import { RegisterPage } from '../pages/auth/register';

export function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="*"
        element={<LoginPage />}
      />
    </Routes>
  );
}