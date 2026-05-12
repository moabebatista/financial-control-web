import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

import { Card } from '../ui/card';

interface Transaction {
  category: string;
  amount: number;
  type: string;
}

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#14b8a6',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#22c55e',
];

export function CategoryChart({
  transactions,
}: Props) {
  const expenses = transactions.filter(
    (item) => item.type === 'EXPENSE'
  );

  const grouped =
    expenses.reduce(
      (acc, transaction) => {
        const existing =
          acc.find(
            (item) =>
              item.name ===
              transaction.category
          );

        if (existing) {
          existing.value +=
            transaction.amount;
        } else {
          acc.push({
            name: transaction.category,
            value:
              transaction.amount,
          });
        }

        return acc;
      },
      [] as {
        name: string;
        value: number;
      }[]
    );

  return (
    <Card className="border-slate-800 bg-slate-950 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Gastos por categoria
        </h2>

        <p className="text-sm text-slate-400">
          Distribuição das despesas
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={grouped}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {grouped.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
             formatter={(value) => [
                `R$ ${Number(value).toFixed(2)}`,
                'Valor',
             ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}