import {
  createContext,
  useEffect,
  useState,
} from 'react';

import type { ReactNode } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signed: boolean;

  signIn: (data: SignInData) => Promise<void>;

  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext =
  createContext({} as AuthContextData);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  useEffect(() => {
    const storagedToken =
      localStorage.getItem('@finance:token');

    const storagedUser =
      localStorage.getItem('@finance:user');

    if (storagedToken && storagedUser) {
      setToken(storagedToken);

      setUser(JSON.parse(storagedUser));

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${storagedToken}`;
    }
  }, []);

  async function signIn({
    email,
    password,
  }: SignInData) {
    const response = await api.post(
      '/sessions',
      {
        email,
        password,
      }
    );

    const { token, user } = response.data;

    localStorage.setItem(
      '@finance:token',
      token
    );

    localStorage.setItem(
      '@finance:user',
      JSON.stringify(user)
    );

    api.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;

    setToken(token);

    setUser(user);
  }

  function logout() {
    localStorage.removeItem('@finance:token');

    localStorage.removeItem('@finance:user');

    setUser(null);

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signed: !!user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}