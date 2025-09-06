// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cálculo de Médias',
	description: 'Calculadora de médias diárias de preços de café',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" className="h-full">
			<body className="min-h-screen h-full flex flex-col bg-white text-slate-800 antialiased">
				<header className="w-full sticky top-0 z-10 border-b border-green-700 bg-green-600 text-white backdrop-blur">
					<div className="mx-auto flex max-w-6xl items-center justify-center px-3 py-2 sm:px-4 sm:py-3">
						<div className="flex items-center gap-2 min-w-0">
							<img src="/coffee-beans.png" alt="Ícone de café" className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
							<h1 className="truncate text-sm font-semibold sm:text-lg">
								Calculadora de Médias de Café
							</h1>
						</div>
					</div>
				</header>

				<main className="flex-1 w-full overflow-x-hidden">
					<div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
						{children}
					</div>
				</main>

				<footer className="w-full mt-auto border-t border-green-700 bg-green-600 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur sm:px-4 sm:py-3 sm:text-sm">
					Next.js + TypeScript + Tailwind.css
				</footer>
			</body>
		</html>
	)
}
