import { useEffect, useState } from 'react';

import { TransactionsTable } from '../../components/transactions/transactions-table';

import type { Transaction } from '../../components/transactions/transactions-table';

import { CreateTransactionDialog } from '../../components/transactions/create-transaction-dialog';

import { api } from '../../services/api';

export function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const response =
      await api.get('/transactions');

    setTransactions(response.data);
  }

  return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Transações
            </h1>

            <p className="text-slate-400">
              Gerencie suas movimentações
            </p>
          </div>

          <CreateTransactionDialog
            onCreated={loadTransactions}
          />
        </div>

        <TransactionsTable
          transactions={transactions}
           onUpdated={loadTransactions}
        />
      </div>
  );
}