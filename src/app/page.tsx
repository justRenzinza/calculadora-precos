// src/app/page.tsx
'use client' 

import { useEffect, useMemo, useState } from 'react' 
import { CoffeeCard } from '@/components/CoffeeCard' 
import { ValueList } from '@/components/ValueList' 

type CoffeeKey = 'conilon' | 'arabicaRio' | 'arabicaDuro' // define os tipos válidos de chave
type Culture = { key: CoffeeKey; label: string } // tipo para cultura: chave + rótulo

// lista de culturas disponíveis
const CULTURES: Culture[] = [ 
	{ key: 'conilon', label: 'Conilon' }, 
	{ key: 'arabicaRio', label: 'Arabica Rio' }, 
	{ key: 'arabicaDuro', label: 'Arabica Duro' }, 
]

// função para formatar no estilo 1400,50 (sem R$, sem pontos de milhar)
const formatBRNumber = (v: number) => v.toFixed(2).replace('.', ',') 

// chaves de armazenamento (por usuário)
const USER_ID = 'default' 
const STORAGE_KEY = `coffeeCalc:v1:values:${USER_ID}` 

// componente principal da página
export default function Home() { 
	const [values, setValues] = useState<Record<CoffeeKey, number[]>>({ 
		conilon: [], 
		arabicaRio: [], 
		arabicaDuro: [], 
	})

	// carrega do localStorage ao montar
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY) // lê a chave do usuário
			if (!raw) return // se não existe, não faz nada
			const parsed = JSON.parse(raw) as Partial<Record<CoffeeKey, number[]>>
			// validação simples e merge para garantir as 3 chaves
			setValues({
				conilon: Array.isArray(parsed?.conilon) ? (parsed!.conilon as number[]) : [],
				arabicaRio: Array.isArray(parsed?.arabicaRio) ? (parsed!.arabicaRio as number[]) : [],
				arabicaDuro: Array.isArray(parsed?.arabicaDuro) ? (parsed!.arabicaDuro as number[]) : [],
			})
		} catch {
			// se der errado n acontece nada
		}
	}, [])

	// salva no localStorage sempre que "values" mudar
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(values)) 
		} catch {
			
		}
	}, [values])

	// função que atualiza os valores de um café especifico
	function setCultureValues(key: CoffeeKey, arr: number[]) { 
		setValues((prev) => ({ ...prev, [key]: arr })) 
	}

	// função que calcula os valores (media, valor minimo e valor máximo)
	function stats(arr: number[]) { 
		if (!arr.length) return { avg: 0, min: 0, max: 0, count: 0 } 
		const sum = arr.reduce((a, b) => a + b, 0) 
		const avg = sum / arr.length 
		return { avg, min: Math.min(...arr), max: Math.max(...arr), count: arr.length }
	}

	// memoriza estatistica dos cafés calculados
	const perCulture = useMemo(() => { 
		return {
			conilon: stats(values.conilon), 
			arabicaRio: stats(values.arabicaRio), 
			arabicaDuro: stats(values.arabicaDuro), 
		}
	}, [values]) 

	// função pra limpar valores (zera o array e apaga do localStorage)
	function resetAll() { 
		const empty = { conilon: [], arabicaRio: [], arabicaDuro: [] }
		setValues(empty) // volta arrays para vazio
		try { localStorage.setItem(STORAGE_KEY, JSON.stringify(empty)) } catch {

		} 
	}

	return (
		<div className="grid gap-6 sm:gap-8 md:grid-cols-[1fr_420px]">
			
			<section className="rounded-2xl border border-green-300 bg-white p-4 shadow-sm sm:p-6">
				<h2 className="mb-3 text-base font-semibold text-green-700 sm:mb-4 sm:text-lg">
					Médias do Dia
				</h2>

				<div className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-3">
					<div className="h-full">
						<CoffeeCard
							title="Conilon" 
							value={perCulture.conilon.avg} 
							extra={`Quantidade = ${perCulture.conilon.count} 
							| Mínimo ${formatBRNumber(perCulture.conilon.min)} 
							| Máximo ${formatBRNumber(perCulture.conilon.max)}`} 
							formatBRL={formatBRNumber} 
						/>
					</div>
					<div className="h-full">
						<CoffeeCard
							title="Arabica Rio" 
							value={perCulture.arabicaRio.avg} 
							extra={`Quantidade = ${perCulture.arabicaRio.count} 
							| Mínimo ${formatBRNumber(perCulture.arabicaRio.min)} 
							| Máximo ${formatBRNumber(perCulture.arabicaRio.max)}`} 
							formatBRL={formatBRNumber} 
						/>
					</div>
					<div className="h-full">
						<CoffeeCard
							title="Arabica Duro" 
							value={perCulture.arabicaDuro.avg} 
							extra={`Quantidade = ${perCulture.arabicaDuro.count} 
							| Mínimo ${formatBRNumber(perCulture.arabicaDuro.min)} 
							| Máximo ${formatBRNumber(perCulture.arabicaDuro.max)}`} 
							formatBRL={formatBRNumber} 
						/>
					</div>
				</div>

				<div className="mt-4 sm:mt-6">
					<button
						onClick={resetAll} // botão que chama a função resetAll
						className="w-full sm:w-auto rounded-lg border border-red-200 bg-red-50 px-4 
						py-2 text-sm font-medium transition duration-200 hover:scale-105 text-red-700 hover:bg-red-100"
					>
						Limpar valores
					</button>
				</div>
			</section>

			<aside className="order-last md:order-none rounded-2xl border border-green-300 bg-white p-4 shadow-sm sm:p-6">
				<h2 className="text-base font-semibold text-green-700 sm:text-lg">Inserir Valores</h2>
				<p className="mb-4 mt-1 text-xs text-green-700/80 sm:text-sm">
					Digite valores (R$) e clique em [Adicionar]. Aceita ponto ou vírgula (ex: 1.234,56).
				</p>

				<div className="space-y-6">
					{CULTURES.map((c) => ( // .map transformar cada item em um componente
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
