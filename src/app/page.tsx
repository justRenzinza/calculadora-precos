// src/app/page.tsx
'use client'

import { useMemo, useState } from 'react'
import { CoffeeCard } from '@/components/CoffeeCard'
import { ValueList } from '@/components/ValueList'

type CoffeeKey = 'conilon' | 'arabicaRio' | 'arabicaDuro'
type Culture = { key: CoffeeKey; label: string }

const CULTURES: Culture[] = [
	{ key: 'conilon', label: 'Conilon' },
	{ key: 'arabicaRio', label: 'Arabica Rio' },
	{ key: 'arabicaDuro', label: 'Arabica Duro' },
]

const formatBRL = (v: number) =>
	v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Home() {
	const [values, setValues] = useState<Record<CoffeeKey, number[]>>({
		conilon: [],
		arabicaRio: [],
		arabicaDuro: [],
	})

	function setCultureValues(key: CoffeeKey, arr: number[]) {
		setValues((prev) => ({ ...prev, [key]: arr }))
	}

	function stats(arr: number[]) {
		if (!arr.length) return { avg: 0, min: 0, max: 0, count: 0 }
		const sum = arr.reduce((a, b) => a + b, 0)
		const avg = sum / arr.length
		return { avg, min: Math.min(...arr), max: Math.max(...arr), count: arr.length }
	}

	const perCulture = useMemo(() => {
		return {
			conilon: stats(values.conilon),
			arabicaRio: stats(values.arabicaRio),
			arabicaDuro: stats(values.arabicaDuro),
		}
	}, [values])

	function resetAll() {
		setValues({ conilon: [], arabicaRio: [], arabicaDuro: [] })
	}

	return (
		<div className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_420px]">
			{/* ESQUERDA: Resultados */}
			<section className="rounded-2xl border border-green-300 bg-white p-4 shadow-sm sm:p-6">
				<h2 className="mb-3 text-base font-semibold text-green-700 sm:mb-4 sm:text-lg">
					Médias do Dia
				</h2>

				{/* 1 card por linha no mobile, 3 no desktop */}
				<div className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-3">
					<div className="h-full">
						<CoffeeCard
							title="Conilon"
							value={perCulture.conilon.avg}
							extra={`Quantidade = ${perCulture.conilon.count} | Mínimo ${formatBRL(perCulture.conilon.min)} | Máximo ${formatBRL(perCulture.conilon.max)}`}
							formatBRL={formatBRL}
						/>
					</div>
					<div className="h-full">
						<CoffeeCard
							title="Arabica Rio"
							value={perCulture.arabicaRio.avg}
							extra={`Quantidade = ${perCulture.arabicaRio.count} | Mínimo ${formatBRL(perCulture.arabicaRio.min)} | Máximo ${formatBRL(perCulture.arabicaRio.max)}`}
							formatBRL={formatBRL}
						/>
					</div>
					<div className="h-full">
						<CoffeeCard
							title="Arabica Duro"
							value={perCulture.arabicaDuro.avg}
							extra={`Quantidade = ${perCulture.arabicaDuro.count} | Mínimo ${formatBRL(perCulture.arabicaDuro.min)} | Máximo ${formatBRL(perCulture.arabicaDuro.max)}`}
							formatBRL={formatBRL}
						/>
					</div>
				</div>

				<div className="mt-4 sm:mt-6">
					<button
						onClick={resetAll}
						className="w-full sm:w-auto rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
					>
						Limpar valores
					</button>
				</div>
			</section>

			{/* DIREITA: Entrada de valores */}
			<aside className="order-last md:order-none rounded-2xl border border-green-300 bg-white p-4 shadow-sm sm:p-6">
				<h2 className="text-base font-semibold text-green-700 sm:text-lg">Inserir Valores</h2>
				<p className="mb-4 mt-1 text-xs text-green-700/80 sm:text-sm">
					Digite valores (R$) e clique em [Adicionar]. Aceita ponto ou vírgula (ex: 1.234,56).
				</p>

				<div className="space-y-6">
					{CULTURES.map((c) => (
						<ValueList
							key={c.key}
							label={c.label}
							values={values[c.key]}
							onChange={(arr) => setCultureValues(c.key, arr)}
						/>
					))}
				</div>
			</aside>
		</div>
	)
}
