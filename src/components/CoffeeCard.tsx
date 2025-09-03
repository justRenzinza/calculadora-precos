// src/components/CoffeeCard.tsx
type Props = {
	title: string
	value: number
	median?: number
	extra?: string
	formatBRL: (v: number) => string
}

export function CoffeeCard({ title, value, median, extra, formatBRL }: Props) {
	return (
		<div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
			{/* Header verdinho */}
			<div className="flex items-center justify-between border-b border-green-200 bg-green-50 px-5 py-3">
				<h3 className="font-semibold text-green-800">{title}</h3>
				{typeof median === 'number' && median > 0 ? (
					<span className="rounded-full border border-green-300 bg-white px-2.5 py-1 text-xs font-medium text-green-800">
						Mediana: {formatBRL(median)}
					</span>
				) : null}
			</div>

			{/* Corpo */}
			<div className="p-5">
				<p className="text-3xl font-extrabold tracking-tight text-green-600">
					{formatBRL(value || 0)}
				</p>
				{extra ? (
					<p className="mt-2 text-xs text-slate-500">{extra}</p>
				) : null}
			</div>
		</div>
	)
}
