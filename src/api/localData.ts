import type { Tier, TierPredictions, MetaAnalysis } from '../types'

export async function fetchTierPredictions(tier: Tier): Promise<TierPredictions> {
  const res = await fetch(`/data/predictions/${tier}/latest.json`)
  if (!res.ok) throw new Error(`Failed to load ${tier} predictions: ${res.status}`)
  return res.json() as Promise<TierPredictions>
}

export async function fetchMetaAnalysis(): Promise<MetaAnalysis> {
  const res = await fetch('/data/analysis/latest.json')
  if (!res.ok) throw new Error(`Failed to load meta analysis: ${res.status}`)
  return res.json() as Promise<MetaAnalysis>
}
