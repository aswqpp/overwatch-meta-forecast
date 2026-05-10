import { useFilterStore } from '../store/filterStore'
import { useT } from '../hooks/useT'
import { Segmented } from './Segmented'
import type { Region, Platform } from '../types'

const REGIONS: readonly Region[] = ['global', 'kr', 'us', 'eu']
const PLATFORMS: readonly Platform[] = ['pc', 'console']

export function FilterBar() {
  const { t } = useT()
  const region = useFilterStore((s) => s.region)
  const setRegion = useFilterStore((s) => s.setRegion)
  const platform = useFilterStore((s) => s.platform)
  const setPlatform = useFilterStore((s) => s.setPlatform)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">{t.filter.region}</span>
        <Segmented
          options={REGIONS.map((v) => ({ value: v, label: t.filter[v] }))}
          value={region}
          onChange={setRegion}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">{t.filter.platform}</span>
        <Segmented
          options={PLATFORMS.map((v) => ({ value: v, label: t.filter[v] }))}
          value={platform}
          onChange={setPlatform}
        />
      </div>
    </div>
  )
}
