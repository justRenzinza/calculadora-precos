// components/CoffeeCard.tsx
type Props = {
    title: string
    value: number
    extra?: string
    formatBRL: (v: number) => string
}

export function CoffeeCard({ title, value, extra, formatBRL }: Props) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
        <h3 className="text-indigo-400 font-semibold">{title}</h3>
        <p className="mt-2 text-3xl font-extrabold tracking-tight">
            {formatBRL(value || 0)}
        </p>
        {extra ? <p className="mt-2 text-xs text-slate-400">{extra}</p> : null}
        </div>
    )
}
