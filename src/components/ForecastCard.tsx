import type { SyntheticEvent } from 'react'
import { useT } from '../hooks/useT'
import { heroNames } from '../i18n'
import { DeltaBadge } from './DeltaBadge'
import { ConfidenceBadge } from './ConfidenceBadge'
import { RoleBadge } from './RoleBadge'
import type { HeroPrediction } from '../types'

const hideOnError = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none'
}

export function ForecastCard({ hero }: { hero: HeroPrediction }) {
  const { t, locale } = useT()
  const displayName = heroNames[hero.id]?.[locale] ?? hero.name

  return (
    <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/60 p-4 transition-all hover:border-zinc-600 hover:bg-zinc-800">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-zinc-700">
            <img
              src={`/heroes/${hero.id}.png`}
              alt={displayName}
              className="h-full w-full object-cover"
              onError={hideOnError}
            />
          </div>
          <div>
            <h3 className="font-bold text-zinc-100">{displayName}</h3>
            <RoleBadge role={hero.role} />
          </div>
        </div>
        <span className="font-mono text-xs text-zinc-500">#{hero.tier_rank}</span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-zinc-900/60 p-2">
          <div className="mb-1 text-xs text-zinc-500">{t.common.pickRate}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-200">
              {(hero.pick_rate * 100).toFixed(1)}%
            </span>
            <DeltaBadge value={hero.delta_pick} />
          </div>
        </div>
        <div className="rounded-lg bg-zinc-900/60 p-2">
          <div className="mb-1 text-xs text-zinc-500">{t.common.winRate}</div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-200">
              {(hero.win_rate * 100).toFixed(1)}%
            </span>
            <DeltaBadge value={hero.delta_win} />
          </div>
        </div>
      </div>

      <ConfidenceBadge value={hero.confidence} />
    </div>
  )
}
