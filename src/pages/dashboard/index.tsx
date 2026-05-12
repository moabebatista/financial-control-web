import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { SummaryCards } from '../../components/dashboard/summary-card';

import { ExpenseChart } from '../../components/dashboard/expense-chart';

import { CategoryChart } from '../../components/dashboard/category-chart';
import { Loading } from '../../components/ui/loading';

interface DashboardData {
  income: number;
  expense: number;
  balance: number;
}

interface Transaction {
  id: string;
  title: string;
  amount: number;

  type: 'INCOME' | 'EXPENSE';

  category: string;

  date: string;
}

export function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData>({
      income: 0,
      expense: 0,
      balance: 0,
    });

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [
        dashboardResponse,
        transactionsResponse,
      ] = await Promise.all([
        api.get('/dashboard'),

        api.get('/transactions'),
      ]);

      setDashboard(
        dashboardResponse.data
      );

      setTransactions(
        transactionsResponse.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }

  if (loading) {
    return (
      <Loading text="Carregando dashboard..." />
    );
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400">
            Visão geral financeira
          </p>
        </div>

        <SummaryCards
          income={dashboard.income}
          expense={dashboard.expense}
          balance={dashboard.balance}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <ExpenseChart
            income={dashboard.income}
            expense={dashboard.expense}
          />

          <CategoryChart
            transactions={transactions}
          />
        </div>
      </div>
  );
}