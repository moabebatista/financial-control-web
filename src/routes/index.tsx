import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useAuth } from '../hooks/use-auth';

import { LoginPage } from '../pages/auth/login';

import { AppRoutes } from './app-routes';

import { PrivateRoute } from './private-route';

export function Router() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!signed ? (
          <Route
            path="*"
            element={<LoginPage />}
          />
        ) : (
          <Route
            path="*"
            element={
              <PrivateRoute>
                <AppRoutes />
              </PrivateRoute>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}