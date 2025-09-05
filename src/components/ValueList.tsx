// src/components/ValueList.tsx
'use client' 

import { useState } from 'react' 

type Props = {
	label: string // rótulo exibido (nome da cultura)
	values: number[] // lista de valores atuais
	onChange: (arr: number[]) => void // callback para atualizar a lista
}

// função que converte string para numeros (aceita 1.234,56 / 1234,56 / 1234.56)
function parseBRDecimal(input: string): number | null {
	const cleaned = input.trim().replace(/\./g, '').replace(',', '.') 
	const n = Number(cleaned) 
	return isFinite(n) ? n : null 
}

// componente de entrada de múltiplos valores para uma cultura
export function ValueList({ label, values, onChange }: Props) {
	const [raw, setRaw] = useState('') 

	// função pra adicionar o número na lista de valores
	function add() {
		const n = parseBRDecimal(raw) // converte texto em número
		if (n === null) return 
		onChange([...values, n]) 
		setRaw('') 
	}

	// função pra remover itens pelo indice
	function removeAt(i: number) {
		const copy = [...values] 
		copy.splice(i, 1) 
		onChange(copy) 
	}

	// função que fazer o enter adicionar numeros!!
	function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') add() 
	}

	return (
		<div className="rounded-xl border border-green-200 bg-white p-4">
			<h4 className="mb-3 font-medium text-green-700">{label}</h4>

			<div className="flex flex-col gap-2 sm:flex-row">
				<input
					value={raw} 
					onChange={(e) => setRaw(e.target.value)} 
					onKeyDown={handleKey} // atalho para Enter
					placeholder="Exemplo: 1400,50" 
					className="w-full rounded-lg border border-slate-300 bg-white px-3 
					py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-green-500" 
					inputMode="decimal"/>
				<button
					onClick={add} // adiciona elementos
					className="w-full sm:w-auto rounded-lg bg-green-600 px-3 py-2 text-sm font-medium 
					text-white transition duration-200 hover:scale-105 hover:bg-green-500">
					Adicionar
				</button>
			</div>

			{values.length > 0 ? (
				<ul className="mt-3 flex flex-wrap gap-2">
					{values.map((v, i) => (
						<li
							key={`${label}-${i}-${v}`} 
							className="group flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm"
						>
							<span className="text-green-800">
								{v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} {/* formata para BRL */}
							</span>
							<button
								onClick={() => removeAt(i)} // remove esse índice
								className="rounded-full bg-green-200 px-2 text-xs text-green-800 opacity-70 transition group-hover:opacity-100" 
								title="Remover" 
							>
								× 
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-3 text-xs text-green-700/70">Nenhum valor adicionado ainda.</p>
			)}
		</div>
	)
}
