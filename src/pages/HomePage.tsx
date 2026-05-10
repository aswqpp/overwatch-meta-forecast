import { Link } from 'react-router-dom'
import { useTierStore } from '../store/tierStore'
import { useUIStore } from '../store/uiStore'
import { useTranslation } from '../i18n'
import { useTierPredictions, useMetaAnalysis } from '../api/queries'
import { TrendingHeroCard } from '../components/TrendingHeroCard'
import { TierTabs } from '../components/TierTabs'

export function HomePage() {
  const { activeTier } = useTierStore()
  const { locale } = useUIStore()
  const t = useTranslation(locale)

  const { data: predictions, isLoading, isError } = useTierPredictions(activeTier)
  const { data: analysis } = useMetaAnalysis()

  const byAbsDelta = predictions?.heroes
    ? [...predictions.heroes].sort((a, b) => Math.abs(b.delta_pick) - Math.abs(a.delta_pick))
    : []

  const rising  = byAbsDelta.filter((h) => h.delta_pick > 0).slice(0, 5)
  const falling = byAbsDelta.filter((h) => h.delta_pick < 0).slice(0, 5)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-100">{t.home.title}</h1>
        <p className="mt-2 text-zinc-400">{t.home.subtitle}</p>
        {analysis && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-800/60 px-4 py-1.5 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {t.home.patch} {analysis.patch}
          </div>
        )}
      </div>

      {/* Tier selector */}
      <div className="mb-8 mx-auto max-w-sm">
        <TierTabs t={t} />
      </div>

      {isLoading && (
        <div className="flex h-48 items-center justify-center text-zinc-400">
          {t.common.loading}
        </div>
      )}

      {isError && (
        <div className="flex h-48 items-center justify-center text-red-400">
          {t.common.error}
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Rising */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-400">
              <span>↑</span>{t.home.topRising}
            </h2>
            <div className="space-y-2">
              {rising.map((hero, i) => (
                <TrendingHeroCard key={hero.id} hero={hero} rank={i + 1} t={t} />
              ))}
            </div>
          </section>

          {/* Falling */}
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-400">
              <span>↓</span>{t.home.topFalling}
            </h2>
            <div className="space-y-2">
              {falling.map((hero, i) => (
                <TrendingHeroCard key={hero.id} hero={hero} rank={i + 1} t={t} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* CTA */}
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
