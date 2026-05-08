import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { api } from '../../services/api';

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleRegister() {
    try {
      setLoading(true);

      await api.post('/users', {
        name,
        email,
        password,
      });

      alert('Conta criada com sucesso!');

      navigate('/login');
    } catch {
      alert('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md space-y-4 border-slate-800 bg-slate-900 p-6 text-white">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            Criar conta
          </h1>

          <p className="text-slate-400">
            Cadastre-se para continuar
          </p>
        </div>

        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          disabled={loading}
          onClick={handleRegister}
        >
          {loading
            ? 'Criando conta...'
            : 'Criar conta'}
        </Button>

        <p className="text-center text-sm text-slate-400">
          Já possui conta?{' '}
          <Link
            to="/login"
            className="text-white hover:underline"
          >
            Entrar
          </Link>
        </p>
      </Card>
    </div>
  );
}