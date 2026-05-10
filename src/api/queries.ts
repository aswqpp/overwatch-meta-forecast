import { useQuery } from '@tanstack/react-query'
import { fetchTierPredictions, fetchMetaAnalysis } from './localData'
import type { Tier } from '../types'

export function useTierPredictions(tier: Tier) {
  return useQuery({
    queryKey: ['predictions', tier],
    queryFn: () => fetchTierPredictions(tier),
  })
}

export function useMetaAnalysis() {
  return useQuery({
    queryKey: ['meta-analysis'],
    queryFn: fetchMetaAnalysis,
  })
}
