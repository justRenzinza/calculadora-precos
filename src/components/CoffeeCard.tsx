// src/components/CoffeeCard.tsx
import { useState } from 'react'

type Props = {
	title: string
	value: number
	extra?: string
	formatBRL: (v: number) => string
}

export function CoffeeCard({ title, value, extra, formatBRL }: Props) {
	const [copied, setCopied] = useState(false) // feedback visual

	// copia o texto para a área de transferência (desktop e mobile)
	async function copyValue() {
		const text = formatBRL(value || 0)
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(text)
			} else {
				// fallback para navegadores antigos
				const ta = document.createElement('textarea')
				ta.value = text
				ta.style.position = 'fixed'
				ta.style.left = '-9999px'
				document.body.appendChild(ta)
				ta.focus()
				ta.select()
				document.execCommand('copy')
				document.body.removeChild(ta)
			}
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		} catch {
			
		}
	}

	const displayed = formatBRL(value || 0)

	return (
		<div className="h-full overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
			<div className="border-b border-green-200 bg-green-50 px-4 py-2 sm:px-5 sm:py-3">
				<h3 className="text-sm font-semibold text-green-700 sm:text-base">{title}</h3>
			</div>

			<div className="p-4 sm:p-5">
				<p className="text-2xl font-extrabold tracking-tight text-green-600 sm:text-3xl">
					{displayed}
				</p>

				{extra ? (
					<p className="mt-2 text-[11px] text-slate-600 sm:text-xs">{extra}</p>
				) : null}

				<div className="mt-4">
					<button
						onClick={copyValue}
						className={`w-full sm:w-auto rounded-lg px-3 py-2 text-sm font-medium transition ${
							copied
								? 'bg-green-700 text-white'
								: 'bg-green-600 text-white hover:bg-green-500'
						}`}
						aria-live="polite"
					>
						{copied ? 'Copiado!' : 'Copiar valor'}
					</button>
				</div>
			</div>
		</div>
	)
}
