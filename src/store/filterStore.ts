import { create } from 'zustand'
import type { Region, Platform } from '../types'

interface FilterState {
  region: Region
  platform: Platform
  setRegion: (region: Region) => void
  setPlatform: (platform: Platform) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  region: 'global',
  platform: 'pc',
  setRegion: (region) => set({ region }),
  setPlatform: (platform) => set({ platform }),
}))
