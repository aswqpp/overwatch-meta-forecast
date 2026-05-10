import { useTierStore } from '../store/tierStore'
import { useT } from '../hooks/useT'
import { Segmented } from './Segmented'
import type { Tier } from '../types'

const TIERS: readonly Tier[] = ['high', 'mid', 'low']

export function TierTabs() {
  const { t } = useT()
  const activeTier = useTierStore((s) => s.activeTier)
  const setActiveTier = useTierStore((s) => s.setActiveTier)

  return (
    <Segmented
      options={TIERS.map((v) => ({ value: v, label: t.tier[v] }))}
      value={activeTier}
      onChange={setActiveTier}
      size="md"
      fullWidth
    />
  )
}
