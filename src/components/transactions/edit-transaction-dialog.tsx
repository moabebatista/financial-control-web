import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Button } from '../ui/button';

import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { api } from '../../services/api';

import type { Transaction } from './transactions-table';
import { showToast } from '../../lib/toast';

interface Props {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  transaction: Transaction;

  onUpdated: () => void;
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  transaction,
  onUpdated,
}: Props) {
  const [title, setTitle] =
    useState(transaction.title);

  const [amount, setAmount] =
    useState(
      String(transaction.amount)
    );

  const [category, setCategory] =
    useState(transaction.category);

  const [type, setType] = useState<
    'INCOME' | 'EXPENSE'
  >(transaction.type);

  const [date, setDate] =
    useState(
      transaction.date.split('T')[0]
    );

  const [loading, setLoading] =
    useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);

      await api.put(
        `/transactions/${transaction.id}`,
        {
          title,
          amount: Number(amount),
          category,
          type,
          date,
        }
      );

      onUpdated();

      onOpenChange(false);
    } catch {
      showToast.error(
        'Erro ao atualizar transação'
      );
    } finally {
      setLoading(false);
      showToast.success(
        'Transação atualizada com sucesso'
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>
            Editar transação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <Input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <Input
            placeholder="Categoria"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <Input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <Select
            value={type}
            onValueChange={(
              value:
                | 'INCOME'
                | 'EXPENSE'
            ) => setType(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="INCOME">
                Receita
              </SelectItem>

              <SelectItem value="EXPENSE">
                Despesa
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading
              ? 'Salvando...'
              : 'Salvar alterações'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}