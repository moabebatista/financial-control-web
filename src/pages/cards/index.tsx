import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { CreateCardDialog } from '../../components/cards/create-card-dialog';

import { CreditCardCard } from '../../components/cards/credit-card-card';

interface Card {
  id: string;

  name: string;

  limit: number;

  closingDay: number;

  dueDay: number;

  brand?: string;

  color?: string;
}

export function CardsPage() {
  const [cards, setCards] =
    useState<Card[]>([]);

  async function loadCards() {
    const response =
      await api.get('/cards');

    setCards(response.data);
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Cartões
          </h1>

          <p className="text-slate-400">
            Gerencie seus cartões
          </p>
        </div>

        <CreateCardDialog
          onCreated={loadCards}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <CreditCardCard
            key={card.id}
            card={card}
          />
        ))}
      </div>
    </div>
  );
}
