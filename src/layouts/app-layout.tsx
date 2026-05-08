import type { ReactNode } from 'react';
import { Sidebar } from '../components/sidebar';

interface Props {
  children: ReactNode;
}

export function AppLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}