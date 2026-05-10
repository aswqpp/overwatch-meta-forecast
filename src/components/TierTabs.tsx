import { useTierStore } from '../store/tierStore'
import type { Strings } from '../i18n'
import type { Tier } from '../types'

interface TierTabsProps {
  t: Strings
}

const TIERS: Tier[] = ['high', 'mid', 'low']

export function TierTabs({ t }: TierTabsProps) {
  const { activeTier, setActiveTier } = useTierStore()

  return (
    <div className="flex gap-1 rounded-xl bg-zinc-800/60 p-1">
      {TIERS.map((tier) => (
        <button
          key={tier}
          onClick={() => setActiveTier(tier)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTier === tier
              ? 'bg-zinc-700 text-zinc-100 shadow'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {t.tier[tier]}
        </button>
      ))}
    </div>
  )
}
