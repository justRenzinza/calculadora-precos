// app/page.tsx
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

  const mediaGeral = useMemo(() => {
    const avgs = CULTURES.map((c) => perCulture[c.key].avg).filter((n) => n > 0)
    if (!avgs.length) return 0
    return avgs.reduce((a, b) => a + b, 0) / avgs.length
  }, [perCulture])

  function exportCSV() {
    // data;conilon_avg;conilon_min;conilon_max;conilon_count;...;media_geral
    const today = new Date().toISOString().slice(0, 10)
    const row = [
      today,
      perCulture.conilon.avg.toFixed(2),
      perCulture.conilon.min.toFixed(2),
      perCulture.conilon.max.toFixed(2),
      perCulture.conilon.count,
      perCulture.arabicaRio.avg.toFixed(2),
      perCulture.arabicaRio.min.toFixed(2),
      perCulture.arabicaRio.max.toFixed(2),
      perCulture.arabicaRio.count,
      perCulture.arabicaDuro.avg.toFixed(2),
      perCulture.arabicaDuro.min.toFixed(2),
      perCulture.arabicaDuro.max.toFixed(2),
      perCulture.arabicaDuro.count,
      mediaGeral.toFixed(2),
    ].join(';')

    const header = [
      'data',
      'conilon_avg',
      'conilon_min',
      'conilon_max',
      'conilon_count',
      'arabica_rio_avg',
      'arabica_rio_min',
      'arabica_rio_max',
      'arabica_rio_count',
      'arabica_duro_avg',
      'arabica_duro_min',
      'arabica_duro_max',
      'arabica_duro_count',
      'media_geral',
    ].join(';')

    const csv = `${header}\n${row}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medias_${today}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function resetAll() {
    setValues({ conilon: [], arabicaRio: [], arabicaDuro: [] })
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_420px]">
      {/* ESQUERDA: Resultados */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/30">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Cotações (Médias do Dia)</h2>
          <div className="text-sm text-slate-400">
            Média geral:{' '}
            <span className="font-semibold text-slate-100">{formatBRL(mediaGeral || 0)}</span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <CoffeeCard
            title="Conilon"
            value={perCulture.conilon.avg}
            extra={`n=${perCulture.conilon.count} · min ${formatBRL(perCulture.conilon.min)} · máx ${formatBRL(perCulture.conilon.max)}`}
            formatBRL={formatBRL}
          />
          <CoffeeCard
            title="Arabica Rio"
            value={perCulture.arabicaRio.avg}
            extra={`n=${perCulture.arabicaRio.count} · min ${formatBRL(perCulture.arabicaRio.min)} · máx ${formatBRL(perCulture.arabicaRio.max)}`}
            formatBRL={formatBRL}
          />
          <div className="md:col-span-2">
            <CoffeeCard
              title="Arabica Duro"
              value={perCulture.arabicaDuro.avg}
              extra={`n=${perCulture.arabicaDuro.count} · min ${formatBRL(perCulture.arabicaDuro.min)} · máx ${formatBRL(perCulture.arabicaDuro.max)}`}
              formatBRL={formatBRL}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={exportCSV}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500"
          >
            Exportar CSV
          </button>
          <button
            onClick={resetAll}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Limpar valores
          </button>
        </div>
      </section>

      {/* DIREITA: Entrada de valores */}
      <aside className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl shadow-black/30">
        <h2 className="text-lg font-semibold">Inserir Valores</h2>
        <p className="mb-4 mt-1 text-sm text-slate-400">
          Digite valores (R$) e clique em “Adicionar”. Aceita ponto ou vírgula (ex: 1376,72).
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
