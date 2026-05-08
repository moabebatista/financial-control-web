interface Props {
  type: 'INCOME' | 'EXPENSE';
}

export function TransactionBadge({
  type,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        type === 'INCOME'
          ? 'bg-emerald-500/20 text-emerald-400'
          : 'bg-red-500/20 text-red-400'
      }`}
    >
      {type === 'INCOME'
        ? 'Receita'
        : 'Despesa'}
    </span>
  );
}