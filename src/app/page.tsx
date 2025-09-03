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
		<div className="grid gap-8 md:grid-cols-[1fr_420px]">
			{/* ESQUERDA: Resultados */}
			<section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-green-700">Médias do Dia</h2>
				</div>

				{/* 3 cards iguais em desktop */}
				<div className="grid items-stretch gap-5 md:grid-cols-3">
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

				<div className="mt-6">
					<button
						onClick={resetAll}
						className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 
						hover:bg-red-200 transform transition duration-200 hover:scale-105">
						Limpar valores
					</button>
				</div>
			</section>

			{/* DIREITA: Entrada de valores */}
			<aside className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
				<h2 className="text-lg font-semibold text-green-700">Inserir Valores</h2>
				<p className="mb-4 mt-1 text-sm text-black-300 font-semibold">
					Digite valores (R$) e clique em [Adicionar]. Aceita ponto ou vírgula (ex: 1400,50). Obs: Não clique em [Adicionar]
					sem ter nenhum valor, pois isso vai alterar a média.
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
