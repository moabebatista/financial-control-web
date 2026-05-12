import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card } from '../ui/card';

interface Props {
  income: number;
  expense: number;
}

export function ExpenseChart({
  income,
  expense,
}: Props) {
  const data = [
    {
      name: 'Receitas',
      value: income,
    },
    {
      name: 'Despesas',
      value: expense,
    },
  ];

  return (
    <Card className="border-slate-800 bg-slate-950 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Receitas vs Despesas
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <Tooltip />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}