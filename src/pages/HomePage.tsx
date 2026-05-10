import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTierStore } from '../store/tierStore'
import { useT } from '../hooks/useT'
import { useTierPredictions, useMetaAnalysis } from '../api/queries'
import { TrendingHeroCard } from '../components/TrendingHeroCard'
import { TierTabs } from '../components/TierTabs'

export function HomePage() {
  const activeTier = useTierStore((s) => s.activeTier)
  const { t } = useT()

  const { data: predictions, isLoading, isError } = useTierPredictions(activeTier)
  const { data: analysis } = useMetaAnalysis()

  const { rising, falling } = useMemo(() => {
    const heroes = predictions?.heroes ?? []
    return {
      rising: heroes
        .filter((h) => h.delta_pick > 0)
        .sort((a, b) => b.delta_pick - a.delta_pick)
        .slice(0, 5),
      falling: heroes
        .filter((h) => h.delta_pick < 0)
        .sort((a, b) => a.delta_pick - b.delta_pick)
        .slice(0, 5),
    }
  }, [predictions])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-100">{t.home.title}</h1>
        <p className="mt-2 text-zinc-400">{t.home.subtitle}</p>
        {analysis && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 px-4 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t.home.patch} {analysis.patch}
          </div>
        )}
      </header>

      <div className="mx-auto mb-8 max-w-sm">
        <TierTabs />
      </div>

      {isLoading && (
        <div className="flex h-48 items-center justify-center text-zinc-400">{t.common.loading}</div>
      )}

      {isError && (
        <div className="flex h-48 items-center justify-center text-red-400">{t.common.error}</div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-400">
              <span>↑</span>
              {t.home.topRising}
            </h2>
            <div className="space-y-2">
              {rising.map((hero, i) => (
                <TrendingHeroCard key={hero.id} hero={hero} rank={i + 1} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-400">
              <span>↓</span>
              {t.home.topFalling}
            </h2>
            <div className="space-y-2">
              {falling.map((hero, i) => (
                <TrendingHeroCard key={hero.id} hero={hero} rank={i + 1} />
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/forecast"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-700"
        >
          {t.home.viewAll} →
        </Link>
      </div>
    </div>
  )
}
