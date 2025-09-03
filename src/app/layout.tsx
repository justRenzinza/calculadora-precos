// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Médias | Café',
  description: 'Calculadora de médias diárias de preços de café',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-indigo-500/90" />
              <h1 className="text-lg font-semibold">Painel de Cálculo de Médias</h1>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-12 border-t border-slate-800 px-4 py-6 text-center text-sm text-slate-400">
          Demo Next.js + TypeScript + Tailwind · sem persistência de cotações
        </footer>
      </body>
    </html>
  )
}
