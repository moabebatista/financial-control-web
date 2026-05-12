import { CreditCard } from 'lucide-react';

import { Card } from '../ui/card';

interface Props {
  card: {
    name: string;

    limit: number;

    closingDay: number;

    dueDay: number;

    brand?: string;

    color?: string;
  };
}

export function CreditCardCard({
  card,
}: Props) {
  return (
    <Card
      className="relative overflow-hidden border-slate-800 p-6 text-white"
      style={{
        background:
          card.color ||
          'linear-gradient(to right, #0f172a, #1e293b)',
      }}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/70">
            {card.brand || 'Cartão'}
          </p>

          <h2 className="text-2xl font-bold">
            {card.name}
          </h2>
        </div>

        <CreditCard size={32} />
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm text-white/70">
            Limite
          </p>

          <h3 className="text-3xl font-bold">
            R${' '}
            {card.limit.toLocaleString(
              'pt-BR',
              {
                minimumFractionDigits: 2,
              }
            )}
          </h3>
        </div>

        <div className="flex justify-between pt-4 text-sm text-white/80">
          <span>
            Fecha dia {card.closingDay}
          </span>

          <span>
            Vence dia {card.dueDay}
          </span>
        </div>
      </div>
    </Card>
  );
}