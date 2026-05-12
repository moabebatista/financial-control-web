import { useEffect, useState } from 'react';

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
import { showToast } from '../../lib/toast';
import { CreateCategoryDialog } from '../categories/create-category-dialog';
import { defaultCategories } from '../../utils';

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

  const [categories, setCategories] =
  useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [
    openCategoryModal,
    setOpenCategoryModal,
  ] = useState(false);

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
      showToast.error(
        'Erro ao criar transação'
      );
    } finally {
      setLoading(false);
      showToast.success(
        'Transação criada com sucesso'
      );
    }
  }

  async function loadCategories() {
    const DEFAULT_CATEGORIES = defaultCategories;

    const response =
      await api.get('/categories');

      const filteredCategories = response.data.filter(
        (c: { id: string; name: string }) =>
          !DEFAULT_CATEGORIES.some(
            (defaultCategory) => defaultCategory.name.toLocaleLowerCase() === c.name.toLocaleLowerCase()
          )
      );

      setCategories([...DEFAULT_CATEGORIES, ...filteredCategories]);
    }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild className='cursor-pointer hover:bg-slate-800/50'>
        <Button>
         <span className="mr-1 text-lg" >+</span> Nova transação
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

          <div className="space-y-2 flex gap-2">
            <Select
              value={category}
              onValueChange={setCategory}
            
            >
              <SelectTrigger className="min-w-[130px] capitalize">
                <SelectValue placeholder="Selecione categoria" />
              </SelectTrigger>

              <SelectContent position='popper' side='bottom' align='start' sideOffset={4}>
                {categories.map(
                  (categoryItem) => (
                    <SelectItem
                      key={categoryItem.id}
                      value={categoryItem.name}
                      className='capitalize'
                    >
                      {categoryItem.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              className="w-35 cursor-pointer hover:bg-slate-800/50 text-black"
              onClick={() =>
                setOpenCategoryModal(true)
              }
            >
              + Nova Categoria
            </Button>
          </div>

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

      <CreateCategoryDialog
        open={openCategoryModal}
        onOpenChange={
          setOpenCategoryModal
        }
        onCreated={loadCategories}
      />
    </Dialog>
  );
}