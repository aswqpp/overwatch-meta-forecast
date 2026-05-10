import { useFilterStore } from '../store/filterStore'
import type { Strings } from '../i18n'
import type { Region, Platform } from '../types'

interface FilterBarProps {
  t: Strings
}

export function FilterBar({ t }: FilterBarProps) {
  const { region, platform, setRegion, setPlatform } = useFilterStore()

  const regions: { value: Region; label: string }[] = [
    { value: 'global', label: t.filter.global },
    { value: 'kr',     label: t.filter.kr },
    { value: 'us',     label: t.filter.us },
    { value: 'eu',     label: t.filter.eu },
  ]

  const platforms: { value: Platform; label: string }[] = [
    { value: 'pc',      label: t.filter.pc },
    { value: 'console', label: t.filter.console },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">{t.filter.region}</span>
        <div className="flex rounded-lg bg-zinc-800/60 p-0.5">
          {regions.map((r) => (
            <button
              key={r.value}
              onClick={() => setRegion(r.value)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                region === r.value
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">{t.filter.platform}</span>
        <div className="flex rounded-lg bg-zinc-800/60 p-0.5">
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => setPlatform(p.value)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                platform === p.value
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
