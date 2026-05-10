import { useMemo, useState } from 'react'
import { useTierStore } from '../store/tierStore'
import { useT } from '../hooks/useT'
import { useTierPredictions } from '../api/queries'
import { TierTabs } from '../components/TierTabs'
import { FilterBar } from '../components/FilterBar'
import { HorizonToggle } from '../components/HorizonToggle'
import { ForecastCard } from '../components/ForecastCard'
import { Segmented } from '../components/Segmented'
import type { HeroPrediction } from '../types'

type SortKey = 'rank' | 'delta' | 'confidence'

const COMPARATORS: Record<SortKey, (a: HeroPrediction, b: HeroPrediction) => number> = {
  rank:       (a, b) => a.tier_rank - b.tier_rank,
  delta:      (a, b) => b.delta_pick - a.delta_pick,
  confidence: (a, b) => b.confidence - a.confidence,
}

export function ForecastPage() {
  const activeTier = useTierStore((s) => s.activeTier)
  const { t } = useT()
  const { data: predictions, isLoading, isError } = useTierPredictions(activeTier)

  const [sortKey, setSortKey] = useState<SortKey>('rank')

  const sorted = useMemo(() => {
    if (!predictions?.heroes) return []
    return [...predictions.heroes].sort(COMPARATORS[sortKey])
  }, [predictions, sortKey])

  const sortOptions = [
    { value: 'rank',       label: t.forecast.sortByRank },
    { value: 'delta',      label: t.forecast.sortByDelta },
    { value: 'confidence', label: t.forecast.sortByConfidence },
  ] as const

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-zinc-100">{t.forecast.title}</h1>
        <TierTabs />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <FilterBar />
        <div className="flex flex-wrap items-center gap-3">
          <HorizonToggle />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">{t.forecast.sortLabel}</span>
            <Segmented options={sortOptions} value={sortKey} onChange={setSortKey} />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center text-zinc-400">{t.common.loading}</div>
      )}

      {isError && (
        <div className="flex h-64 items-center justify-center text-red-400">{t.common.error}</div>
      )}

      {!isLoading && !isError && sorted.length === 0 && (
        <div className="flex h-64 items-center justify-center text-zinc-400">{t.forecast.noResults}</div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((hero) => (
          <ForecastCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  )
}
