import { useEffect, useState } from 'react';

import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
} from 'lucide-react';

import { AppLayout } from '../../layouts/app-layout';
import { SummaryCard } from '../../components/dashboard/summary-card';

import { api } from '../../services/api';

interface DashboardData {
  income: number;
  expense: number;
  balance: number;
}

export function DashboardPage() {
  const [data, setData] =
    useState<DashboardData>({
      income: 0,
      expense: 0,
      balance: 0,
    });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const response =
      await api.get('/dashboard');

    setData(response.data);
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400">
            Visão geral financeira
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <SummaryCard
            title="Receitas"
            amount={data.income}
            icon={
              <ArrowUpCircle
                className="text-emerald-400"
              />
            }
          />

          <SummaryCard
            title="Despesas"
            amount={data.expense}
            icon={
              <ArrowDownCircle
                className="text-red-400"
              />
            }
          />

          <SummaryCard
            title="Saldo"
            amount={data.balance}
            icon={
              <DollarSign
                className="text-blue-400"
              />
            }
          />
        </div>
      </div>
    </AppLayout>
  );
}