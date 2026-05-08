import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

import { Router } from './routes';

import { AuthProvider } from './contexts/auth-context';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
