import { useUIStore } from '../store/uiStore'
import { heroNames } from '../i18n'
import { DeltaBadge } from './DeltaBadge'
import { RoleBadge } from './RoleBadge'
import type { HeroPrediction } from '../types'
import type { Strings } from '../i18n'

interface TrendingHeroCardProps {
  hero: HeroPrediction
  rank: number
  t: Strings
}

export function TrendingHeroCard({ hero, rank, t }: TrendingHeroCardProps) {
  const { locale } = useUIStore()
  const displayName = heroNames[hero.id]?.[locale] ?? hero.name

  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-700/50 bg-zinc-800/60 p-3 transition-colors hover:bg-zinc-800">
      <span className="w-6 text-center text-sm font-bold text-zinc-500">#{rank}</span>
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-700">
        <img
          src={`/heroes/${hero.id}.png`}
          alt={displayName}
          className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-semibold text-zinc-100">{displayName}</span>
          <RoleBadge role={hero.role} t={t} />
        </div>
        <div className="text-xs text-zinc-400">
          {t.common.pickRate} {(hero.pick_rate * 100).toFixed(1)}%
        </div>
      </div>
      <DeltaBadge value={hero.delta_pick} />
    </div>
  )
}
