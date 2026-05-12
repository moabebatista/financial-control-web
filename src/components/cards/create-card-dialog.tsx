import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Button } from '../ui/button';

import { Input } from '../ui/input';

import { api } from '../../services/api';

import { showToast } from '../../lib/toast';

interface Props {
  onCreated: () => void;
}

export function CreateCardDialog({
  onCreated,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState('');

  const [limit, setLimit] =
    useState('');

  const [
    closingDay,
    setClosingDay,
  ] = useState('');

  const [dueDay, setDueDay] =
    useState('');

  const [brand, setBrand] =
    useState('');

  const [color, setColor] =
    useState('#1e293b');

  async function handleCreate() {
    try {
      await api.post('/cards', {
        name,

        limit: Number(limit),

        closingDay: Number(
          closingDay
        ),

        dueDay: Number(dueDay),

        brand,

        color,
      });

      showToast.success(
        'Cartão criado com sucesso'
      );

      onCreated();

      setOpen(false);
    } catch {
      showToast.error(
        'Erro ao criar cartão'
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          + Novo cartão
        </Button>
      </DialogTrigger>

      <DialogContent className="border-slate-800 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle>
            Novo cartão
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            type="number"
            placeholder="Limite"
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value)
            }
          />

          <Input
            type="number"
            placeholder="Dia fechamento"
            value={closingDay}
            onChange={(e) =>
              setClosingDay(
                e.target.value
              )
            }
          />

          <Input
            type="number"
            placeholder="Dia vencimento"
            value={dueDay}
            onChange={(e) =>
              setDueDay(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Bandeira"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
          />

          <div className="space-y-2">
            <label className="text-sm">
              Cor cartão
            </label>

            <Input
              type="color"
              value={color}
              onChange={(e) =>
                setColor(e.target.value)
              }
            />
          </div>

          <Button
            className="w-full"
            onClick={handleCreate}
          >
            Criar cartão
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}