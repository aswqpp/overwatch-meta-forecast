import type { Strings } from './en'

export const ja: Strings = {
  nav: {
    home: 'ホーム',
    forecast: '予測',
  },
  home: {
    title: 'OW メタ予測',
    subtitle: 'AIによるヒーロー採用率予測',
    topRising: 'TOP 5 上昇',
    topFalling: 'TOP 5 下降',
    viewAll: '全予測を見る',
    patch: 'パッチ',
  },
  forecast: {
    title: 'ヒーロー予測',
    sortLabel: '並替',
    sortByRank: 'ランク',
    sortByDelta: '変化量',
    sortByConfidence: '信頼度',
    noResults: '結果なし',
  },
  filter: {
    region: '地域',
    platform: 'PF',
    global: '全体',
    kr: '韓国',
    us: '米州',
    eu: '欧州',
    pc: 'PC',
    console: 'コンソール',
  },
  tier: {
    high: 'GM+',
    mid: 'プラチナ-ダイヤ',
    low: 'ブロンズ-ゴールド',
  },
  horizon: {
    label: '期間',
    '7d': '7日',
    '14d': '14日',
    '30d': '30日',
  },
  badge: {
    confidence: {
      high: '高',
      medium: '中',
      low: '低',
    },
  },
  role: {
    tank: 'タンク',
    damage: 'DPS',
    support: 'サポート',
  },
  common: {
    pickRate: '採用率',
    winRate: '勝率',
    loading: '読込中…',
    error: 'データ取得失敗',
  },
}
