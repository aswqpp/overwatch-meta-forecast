import { useUIStore } from '../store/uiStore'
import { useT } from '../hooks/useT'
import { Segmented } from './Segmented'
import type { Horizon } from '../types'

const HORIZONS: readonly Horizon[] = ['7d', '14d', '30d']

export function HorizonToggle() {
  const { t } = useT()
  const horizon = useUIStore((s) => s.horizon)
  const setHorizon = useUIStore((s) => s.setHorizon)

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-zinc-500">{t.horizon.label}</span>
      <Segmented
        options={HORIZONS.map((v) => ({ value: v, label: t.horizon[v] }))}
        value={horizon}
        onChange={setHorizon}
      />
    </div>
  )
}
