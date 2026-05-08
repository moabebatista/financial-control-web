import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { useAuth } from '../../hooks/use-auth';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export function LoginPage() {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function handleLogin() {
    try {
      await signIn({
        email,
        password,
      });

      navigate('/');
    } catch {
      alert('Login inválido');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <Card className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <Input
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          className="w-full"
          onClick={handleLogin}
        >
          Entrar
        </Button>
        <p className="text-center text-sm text-slate-600">
          Não possui conta?{' '}
          <Link
            to="/register"
            className="text-slate-500 hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </Card>
    </div>
  );
}