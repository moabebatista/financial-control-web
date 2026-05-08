import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/use-auth';

import { AppRoutes } from './app-routes';

import { AuthRoutes } from './auth-routes';

export function Router() {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {signed ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
}