import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import { Router } from './routes';

import { AuthProvider } from './contexts/auth-context';
import { Toaster } from 'sonner';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
      <Toaster
        richColors
        position="top-right"
      />
    </AuthProvider>
  </React.StrictMode>
);
