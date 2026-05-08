import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';

import { Button } from '../../components/ui/button';

import { Input } from '../../components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

import { api } from '../../services/api';

interface Props {
  onCreated: () => void;
}

export function CreateTransactionDialog({
  onCreated,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState('');

  const [amount, setAmount] =
    useState('');

  const [category, setCategory] =
    useState('');

  const [type, setType] = useState<
    'INCOME' | 'EXPENSE'
  >('INCOME');

  const [date, setDate] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  async function handleCreate() {
    if(!title || !amount || !category || !date) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);

      await api.post('/transactions', {
        title,
        amount: Number(amount),
        category,
        type,
        date,
      });

      onCreated();

      setOpen(false);

      setTitle('');
      setAmount('');
      setCategory('');
      setDate('');
      setType('INCOME');
    } catch {
      alert(
        'Erro ao criar transação'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild className='cursor-pointer hover:bg-slate-800/50'>
        <Button>
          Nova transação
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>
            Criar transação
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
            className="w-full cursor-pointer hover:bg-slate-800/50"
            disabled={loading}
            onClick={handleCreate}
          >
            {loading
              ? 'Criando...'
              : 'Criar transação'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}