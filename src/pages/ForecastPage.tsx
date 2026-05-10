import { useState, useMemo } from 'react'
import { useTierStore } from '../store/tierStore'
import { useUIStore } from '../store/uiStore'
import { useTranslation } from '../i18n'
import { useTierPredictions } from '../api/queries'
import { TierTabs } from '../components/TierTabs'
import { FilterBar } from '../components/FilterBar'
import { HorizonToggle } from '../components/HorizonToggle'
import { ForecastCard } from '../components/ForecastCard'
import type { HeroPrediction } from '../types'

type SortKey = 'rank' | 'delta' | 'confidence'

export function ForecastPage() {
  const { activeTier } = useTierStore()
  const { locale } = useUIStore()
  const t = useTranslation(locale)

  const { data: predictions, isLoading, isError } = useTierPredictions(activeTier)
  const [sortKey, setSortKey] = useState<SortKey>('rank')

  const sorted = useMemo<HeroPrediction[]>(() => {
    if (!predictions?.heroes) return []
    return [...predictions.heroes].sort((a, b) => {
      if (sortKey === 'rank')       return a.tier_rank - b.tier_rank
      if (sortKey === 'delta')      return b.delta_pick - a.delta_pick
      /* confidence */              return b.confidence - a.confidence
    })
  }, [predictions, sortKey])

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'rank',       label: t.forecast.sortByRank },
    { key: 'delta',      label: t.forecast.sortByDelta },
    { key: 'confidence', label: t.forecast.sortByConfidence },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title + Tier tabs */}
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-zinc-100">{t.forecast.title}</h1>
        <TierTabs t={t} />
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <FilterBar t={t} />
        <div className="flex flex-wrap items-center gap-3">
          <HorizonToggle t={t} />

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">{t.forecast.sortLabel}</span>
            <div className="flex rounded-lg bg-zinc-800/60 p-0.5">
              {SORT_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSortKey(key)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    sortKey === key
                      ? 'bg-zinc-700 text-zinc-100'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex h-64 items-center justify-center text-zinc-400">
          {t.common.loading}
        </div>
      )}

      {isError && (
        <div className="flex h-64 items-center justify-center text-red-400">
          {t.common.error}
        </div>
      )}

      {!isLoading && !isError && sorted.length === 0 && (
        <div className="flex h-64 items-center justify-center text-zinc-400">
          {t.forecast.noResults}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((hero) => (
          <ForecastCard key={hero.id} hero={hero} t={t} />
        ))}
      </div>
    </div>
  )
}
