export type Role = 'tank' | 'damage' | 'support'
export type Tier = 'high' | 'mid' | 'low'
export type Region = 'global' | 'kr' | 'us' | 'eu'
export type Platform = 'pc' | 'console'
export type Horizon = '7d' | '14d' | '30d'
export type Trend = 'up' | 'down' | 'stable'
export type Locale = 'ko' | 'en' | 'ja'

export interface HeroPrediction {
  id: string
  name: string
  role: Role
  pick_rate: number
  win_rate: number
  delta_pick: number
  delta_win: number
  confidence: number
  tier_rank: number
  trend: Trend
}

export interface TierPredictions {
  tier: Tier
  generated_at: string
  horizon: Horizon
  heroes: HeroPrediction[]
}

export interface MetaAnalysis {
  generated_at: string
  patch: string
  top_rising: string[]
  top_falling: string[]
  meta_summary: Record<Locale, string>
}
