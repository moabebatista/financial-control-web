import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

import { Button } from '../ui/button';

import { Input } from '../ui/input';

import { api } from '../../services/api';

import { showToast } from '../../lib/toast';

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  onCreated: () => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: Props) {
  const [name, setName] =
    useState('');

  async function handleCreate() {
    if (!name) return;

    try {
      await api.post('/categories', {
        name,
      });

      showToast.success(
        'Categoria criada com sucesso'
      );

      onCreated();

      onOpenChange(false);

      setName('');
    } catch {
      showToast.error(
        'Erro ao criar categoria'
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
            Nova categoria
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nome da categoria"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Button
            className="w-full"
            onClick={handleCreate}
          >
            Criar categoria
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}