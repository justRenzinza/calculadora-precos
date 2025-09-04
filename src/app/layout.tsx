// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cálculo de Médias',
	description: 'Calculadora de médias diárias de preços de café',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className="bg-white text-slate-800 antialiased">
				<header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
					<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
						<div className="flex items-center gap-2">
							<img src="/coffee-beans.png" alt="Ícone de café" className="h-6 w-6" />
							<h1 className="text-lg font-semibold">Calculadora de Médias de Café</h1>
						</div>
					</div>
				</header>

				<main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

				<footer className="mt-12 border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
					Projeto Calculadora para estudar Next.js, TypeScript e Tailwind.css
				</footer>
			</body>
		</html>
	)
}
