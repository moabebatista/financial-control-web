import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { TransactionBadge } from './transaction-badge';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
}

interface Props {
  transactions: Transaction[];
}

export function TransactionsTable({
  transactions,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-white">
              Título
            </TableHead>

            <TableHead className="text-white">
              Categoria
            </TableHead>

            <TableHead className="text-white">
              Tipo
            </TableHead>

            <TableHead className="text-white">
              Data
            </TableHead>

            <TableHead className="text-right text-white">
              Valor
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map(
            (transaction) => (
              <TableRow
                key={transaction.id}
                className="border-slate-800 cursor-pointer hover:bg-slate-800/50"
              >
                <TableCell className="font-medium text-white">
                  {transaction.title}
                </TableCell>

                <TableCell className="text-white">
                  {transaction.category}
                </TableCell>

                <TableCell className="text-white">
                  <TransactionBadge
                    type={transaction.type}
                  />
                </TableCell>

                <TableCell className="text-white">
                  {new Date(
                    transaction.date
                  ).toLocaleDateString(
                    'pt-BR'
                  )}
                </TableCell>

                <TableCell className="text-right font-semibold text-white">
                  {transaction.amount.toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL',
                    }
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}