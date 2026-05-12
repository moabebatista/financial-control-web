import { useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import { Button } from '../ui/button';
import { DeleteTransactionDialog } from './delete-transaction-dialog';

import {
    MoreHorizontal,
    Pencil,
    Trash,
} from 'lucide-react';


import { EditTransactionDialog } from './edit-transaction-dialog';

import type { Transaction } from './transactions-table';

interface Props {
  transaction: Transaction;

  onUpdated: () => void;
}

export function TransactionActions({
  transaction,
  onUpdated,
}: Props) {
  const [openEdit, setOpenEdit] =
    useState(false);
  const [openDelete, setOpenDelete] =
  useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='text-slate-400 cursor-pointer'>
          <Button
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal
              size={18}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              setOpenEdit(true)
            }
            className="text-black cursor-pointer hover:bg-black/10"
          >
            <Pencil
              size={16}
              className="mr-2"
            />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
            setOpenDelete(true)
            }
            className="text-red-500 cursor-pointer hover:bg-black/10"
          >
            <Trash
              size={16}
              className="mr-2"
            />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTransactionDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        transaction={transaction}
        onUpdated={onUpdated}
      />
      
      <DeleteTransactionDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        transactionId={transaction.id}
        onDeleted={onUpdated}
      />
    </>
  );
}