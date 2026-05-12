import {
  ArrowDown,
  ArrowUp,
  Wallet,
} from 'lucide-react';

import { Card } from '../ui/card';

interface Props {
  income: number;
  expense: number;
  balance: number;
}

export function SummaryCards({
  income,
  expense,
  balance,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Receitas
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-500">
              R$ {income.toFixed(2)}
            </h2>
          </div>

          <ArrowUp className="text-green-500" />
        </div>
      </Card>

      <Card className="border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Despesas
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-500">
              R$ {expense.toFixed(2)}
            </h2>
          </div>

          <ArrowDown className="text-red-500" />
        </div>
      </Card>

      <Card className="border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Saldo
            </p>

            <h2 className="mt-2 text-3xl font-bold text-cyan-500">
              R$ {balance.toFixed(2)}
            </h2>
          </div>

          <Wallet className="text-cyan-500" />
        </div>
      </Card>
    </div>
  );
}