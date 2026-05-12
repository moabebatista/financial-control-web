import { Loader2 } from 'lucide-react';

interface Props {
  text?: string;
}

export function Loading({
  text = 'Carregando...',
}: Props) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-violet-500" />

      <p className="text-sm text-slate-400">
        {text}
      </p>
    </div>
  );
}