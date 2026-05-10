import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Tier } from '../types'

interface TierState {
  activeTier: Tier
  setActiveTier: (tier: Tier) => void
}

export const useTierStore = create<TierState>()(
  persist(
    (set) => ({
      activeTier: 'high',
      setActiveTier: (activeTier) => set({ activeTier }),
    }),
    { name: 'owmf-tier' },
  ),
)
