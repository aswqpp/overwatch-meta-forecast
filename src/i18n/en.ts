export const en = {
  nav: {
    home: 'Home',
    forecast: 'Forecast',
  },
  home: {
    title: 'Overwatch Meta Forecast',
    subtitle: 'AI-powered hero pick rate predictions',
    topRising: 'Top 5 Rising',
    topFalling: 'Top 5 Falling',
    viewAll: 'View All Forecasts',
    patch: 'Patch',
  },
  forecast: {
    title: 'Hero Forecast',
    sortLabel: 'Sort',
    sortByRank: 'Rank',
    sortByDelta: 'Delta',
    sortByConfidence: 'Confidence',
    noResults: 'No heroes found',
  },
  filter: {
    region: 'Region',
    platform: 'Platform',
    global: 'Global',
    kr: 'Korea',
    us: 'Americas',
    eu: 'Europe',
    pc: 'PC',
    console: 'Console',
  },
  tier: {
    high: 'GM+',
    mid: 'Plat–Diamond',
    low: 'Bronze–Gold',
  },
  horizon: {
    label: 'Window',
    '7d': '7d',
    '14d': '14d',
    '30d': '30d',
  },
  badge: {
    confidence: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
  },
  role: {
    tank: 'Tank',
    damage: 'DPS',
    support: 'Support',
  },
  common: {
    pickRate: 'Pick',
    winRate: 'Win',
    loading: 'Loading…',
    error: 'Failed to load data',
  },
}

export type Strings = typeof en
