import type { ReactNode } from 'react';
import { Card } from '../ui/card';

interface Props {
  title: string;
  amount: number;
  icon: ReactNode;
}

export function SummaryCard({
  title,
  amount,
  icon,
}: Props) {
  return (
    <Card className="border-slate-800 bg-slate-950 p-6 text-white">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {title}
        </span>

        {icon}
      </div>

      <h2 className="mt-4 text-3xl font-bold">
        {amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h2>
    </Card>
  );
}