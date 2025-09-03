'use client'

import { useState } from 'react'

type Props = {
	label: string
	values: number[]
	onChange: (arr: number[]) => void
}

function parseBRDecimal(input: string): number | null {
	// aceita "1.234,56" ou "1234.56" ou "1234,56"
	const cleaned = input.trim().replace(/\./g, '').replace(',', '.')
	const n = Number(cleaned)
	return isFinite(n) ? n : null
}

export function ValueList({ label, values, onChange }: Props) {
	const [raw, setRaw] = useState('')

	function add() {
		const n = parseBRDecimal(raw)
		if (n === null) return
		onChange([...values, n])
		setRaw('')
	}

	function removeAt(i: number) {
		const copy = [...values]
		copy.splice(i, 1)
		onChange(copy)
	}

	function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') add()
	}

	return (
		<div className="rounded-xl border border-slate-800 p-4">
			<h4 className="mb-3 font-medium text-slate-200">{label}</h4>
			<div className="flex gap-2">
				<input
					value={raw}
					onChange={(e) => setRaw(e.target.value)}
					onKeyDown={handleKey}
					placeholder="Ex: 1.376,72"
					className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-slate-500"
					inputMode="decimal"
				/>
				<button
					onClick={add}
					className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500"
				>
					Adicionar
				</button>
			</div>

			{values.length > 0 ? (
				<ul className="mt-3 flex flex-wrap gap-2">
					{values.map((v, i) => (
						<li
							key={`${label}-${i}-${v}`}
							className="group flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm"
						>
							<span>
								{v.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
							<button
								onClick={() => removeAt(i)}
								className="rounded-full bg-slate-700 px-2 text-xs text-slate-200 opacity-70 transition group-hover:opacity-100"
								title="Remover"
							>
								×
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-3 text-xs text-slate-500">Nenhum valor adicionado ainda.</p>
			)}
		</div>
	)
}
