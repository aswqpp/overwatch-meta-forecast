import type { Tier } from '../types'

export interface RawHeroStat {
  hero: string
  pickrate: number
  winrate: number
}

export type DivisionData = Partial<Record<string, RawHeroStat[]>>

// API returns no total_games, so we use simple average across divisions
const TIER_DIVISIONS: Record<Tier, string[]> = {
  high: ['master', 'grandmaster'],
  mid:  ['diamond', 'platinum'],
  low:  ['bronze', 'silver', 'gold'],
}

function avg(nums: number[]): number {
  return nums.length === 0 ? 0 : nums.reduce((a, b) => a + b, 0) / nums.length
}

export function getTierData(tier: Tier, divisionData: DivisionData): RawHeroStat[] {
  const divisions = TIER_DIVISIONS[tier]

  const heroIds = new Set<string>()
  for (const div of divisions) {
    divisionData[div]?.forEach((h) => heroIds.add(h.hero))
  }

  const merged: RawHeroStat[] = []
  for (const heroId of heroIds) {
    const samples = divisions
      .flatMap((div) => divisionData[div] ?? [])
      .filter((h) => h.hero === heroId)

    if (samples.length === 0) continue

    merged.push({
      hero:     heroId,
      pickrate: avg(samples.map((s) => s.pickrate)),
      winrate:  avg(samples.map((s) => s.winrate)),
    })
  }

  return merged.sort((a, b) => b.pickrate - a.pickrate)
}
