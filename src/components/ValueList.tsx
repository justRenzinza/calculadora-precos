'use client'

import { useState } from 'react'

type Props = {
	label: string
	values: number[]
	onChange: (arr: number[]) => void
}

function parseBRDecimal(input: string): number | null {
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
		<div className="rounded-xl border border-slate-200 p-4 bg-white">
			<h4 className="mb-3 font-medium text-slate-800">{label}</h4>
			<div className="flex gap-2">
				<input
					value={raw}
					onChange={(e) => setRaw(e.target.value)}
					onKeyDown={handleKey}
					placeholder="Exemplo: 1400,50"
					className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-green-500"
					inputMode="decimal"
				/>
				<button
					onClick={add}
					className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500
					transform transition duration-200 hover:scale-105"
				>
					Adicionar
				</button>
			</div>

			{values.length > 0 ? (
				<ul className="mt-3 flex flex-wrap gap-2">
					{values.map((v, i) => (
						<li
							key={`${label}-${i}-${v}`}
							className="group flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm"
						>
							<span className="text-slate-800">
								{v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
							</span>
							<button
								onClick={() => removeAt(i)}
								className="rounded-full bg-slate-300 px-2 text-xs text-slate-800 opacity-70 transition group-hover:opacity-100"
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
