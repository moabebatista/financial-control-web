import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/use-auth';

interface Props {
  children: React.ReactNode;
}

export function PrivateRoute({
  children,
}: Props) {
  const { signed } = useAuth();

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}