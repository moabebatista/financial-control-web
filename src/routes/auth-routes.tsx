import { Routes, Route } from 'react-router-dom';

import { LoginPage } from '../pages/auth/login';

export function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />
    </Routes>
  );
}