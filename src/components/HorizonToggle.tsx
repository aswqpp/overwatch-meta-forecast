import { useUIStore } from '../store/uiStore'
import type { Strings } from '../i18n'
import type { Horizon } from '../types'

interface HorizonToggleProps {
  t: Strings
}

const HORIZONS: Horizon[] = ['7d', '14d', '30d']

export function HorizonToggle({ t }: HorizonToggleProps) {
  const { horizon, setHorizon } = useUIStore()

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-zinc-500">{t.horizon.label}</span>
      <div className="flex rounded-lg bg-zinc-800/60 p-0.5">
        {HORIZONS.map((h) => (
          <button
            key={h}
            onClick={() => setHorizon(h)}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              horizon === h
                ? 'bg-zinc-700 text-zinc-100'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {t.horizon[h]}
          </button>
        ))}
      </div>
    </div>
  )
}
