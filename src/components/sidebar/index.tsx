import {
  LayoutDashboard,
  Wallet,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-4">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Finance
      </h1>

      <nav className="flex flex-1 flex-col gap-2">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 cursor-pointer"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => navigate('/transactions')}
          className="flex items-center gap-2 rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 cursor-pointer"
        >
          <Wallet size={20} />
          Transações
        </button>

        <button
          onClick={() => navigate('/cards')}
          className="flex items-center gap-2 rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 cursor-pointer"
        >
          <CreditCard size={20} />
          Cartões
        </button>
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-2 rounded-lg px-4 py-3 text-red-400 transition hover:bg-slate-800"
      >
        <LogOut size={20} />
        Sair
      </button>
    </aside>
  );
}