import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

import { Button } from '../ui/button';

import { api } from '../../services/api';
import { showToast } from '../../lib/toast';

interface Props {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  transactionId: string;

  onDeleted: () => void;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transactionId,
  onDeleted,
}: Props) {

  async function handleDelete() {
    try {
      await api.delete(
        `/transactions/${transactionId}`
      );

      onDeleted();

      onOpenChange(false);
      showToast.success(
      'Transação excluída com sucesso'
     );
    } catch {
     showToast.error(
      'Erro ao excluir transação'
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
            Excluir transação
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Essa ação não poderá ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 text-black cursor-pointer">
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancelar
          </Button>

          <Button
          className='cursor-pointer'
            variant="destructive"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}