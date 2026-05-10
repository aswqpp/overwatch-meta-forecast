import type { Strings } from './en'

export const ko: Strings = {
  nav: {
    home: '홈',
    forecast: '예측',
  },
  home: {
    title: '오버워치 메타 예측',
    subtitle: 'AI 기반 영웅 픽률 예측 서비스',
    topRising: 'TOP 5 상승',
    topFalling: 'TOP 5 하락',
    viewAll: '전체 예측 보기',
    patch: '패치',
  },
  forecast: {
    title: '영웅 예측',
    sortLabel: '정렬',
    sortByRank: '순위',
    sortByDelta: '변화량',
    sortByConfidence: '신뢰도',
    noResults: '검색 결과 없음',
  },
  filter: {
    region: '지역',
    platform: '플랫폼',
    global: '전체',
    kr: '한국',
    us: '아메리카',
    eu: '유럽',
    pc: 'PC',
    console: '콘솔',
  },
  tier: {
    high: 'GM+',
    mid: '플래-다이아',
    low: '브론즈-골드',
  },
  horizon: {
    label: '기간',
    '7d': '7일',
    '14d': '14일',
    '30d': '30일',
  },
  badge: {
    confidence: {
      high: '높음',
      medium: '보통',
      low: '낮음',
    },
  },
  role: {
    tank: '탱커',
    damage: '딜러',
    support: '힐러',
  },
  common: {
    pickRate: '픽률',
    winRate: '승률',
    loading: '로딩 중…',
    error: '데이터 로드 실패',
  },
}
