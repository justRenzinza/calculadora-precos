// src/components/CoffeeCard.tsx
type Props = {
	title: string
	value: number
	extra?: string
	formatBRL: (v: number) => string
}

export function CoffeeCard({ title, value, extra, formatBRL }: Props) {
	return (
		<div className="h-full overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
			<div className="border-b border-green-200 bg-green-50 px-4 py-2 sm:px-5 sm:py-3">
				<h3 className="text-sm font-semibold text-green-700 sm:text-base">{title}</h3>
			</div>
			<div className="p-4 sm:p-5">
				<p className="text-2xl font-extrabold tracking-tight text-green-600 sm:text-3xl">
					{formatBRL(value || 0)}
				</p>
				{extra ? (
					<p className="mt-2 text-[11px] text-slate-600 sm:text-xs">{extra}</p>
				) : null}
			</div>
		</div>
	)
}
