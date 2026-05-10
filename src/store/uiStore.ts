import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale, Horizon } from '../types'

interface UIState {
  locale: Locale
  horizon: Horizon
  setLocale: (locale: Locale) => void
  setHorizon: (horizon: Horizon) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      locale: 'ko',
      horizon: '7d',
      setLocale: (locale) => set({ locale }),
      setHorizon: (horizon) => set({ horizon }),
    }),
    { name: 'owmf-ui' },
  ),
)
