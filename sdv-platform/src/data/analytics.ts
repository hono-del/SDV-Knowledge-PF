import type { AnalyticsData, ImprovementInsight } from '../types';

export const analyticsData: AnalyticsData = {
  learningCompletion: 68,
  quizAccuracy: 74,
  salesAssistUsage: 142,
  recommendationViews: 89,
  interestedRate: 42,
  demoViewRate: 31,
  recommendationByProduct: [
    { productId: 'fj-remote-start', name: { ja: 'リモートスタート', en: 'Remote Start' }, count: 38, interestedRate: 47 },
    { productId: 'fj-seat-cover', name: { ja: 'シートカバー', en: 'Seat Cover' }, count: 35, interestedRate: 51 },
    { productId: 'bz-cable-holder', name: { ja: 'ケーブルホルダー', en: 'Cable Holder' }, count: 29, interestedRate: 55 },
    { productId: 'bz-rain-mirror', name: { ja: 'レインミラー', en: 'Rain Mirror' }, count: 24, interestedRate: 38 },
    { productId: 'fj-air-lumbar', name: { ja: 'エアーランバー', en: 'Air Lumbar' }, count: 22, interestedRate: 36 },
    { productId: 'bz-smart-key', name: { ja: 'スマートキー', en: 'Smart Key' }, count: 18, interestedRate: 33 },
  ],
  interestByMarket: [
    { market: 'Japan', interestedRate: 39 },
    { market: 'North America', interestedRate: 46 },
  ],
  interestByState: [
    { state: 'Washington', rate: 58 },
    { state: 'Minnesota', rate: 52 },
    { state: 'Colorado', rate: 45 },
    { state: 'New York', rate: 43 },
    { state: 'Texas', rate: 41 },
    { state: 'California', rate: 36 },
    { state: 'Tokyo', rate: 40 },
    { state: 'Hokkaido', rate: 48 },
    { state: 'Nagano', rate: 44 },
    { state: 'Okinawa', rate: 39 },
  ],
  valueResonance: [
    { value: 'Convenience', score: 87 },
    { value: 'Comfort', score: 76 },
    { value: 'Safety', score: 72 },
    { value: 'Cleanliness', score: 65 },
    { value: 'EV Usability', score: 61 },
    { value: 'Outdoor', score: 58 },
    { value: 'Design', score: 43 },
  ],
  learningVsSales: [
    { month: 'Apr', learning: 18, sales: 12 },
    { month: 'May', learning: 24, sales: 16 },
    { month: 'Jun', learning: 28, sales: 21 },
    { month: 'Jul', learning: 31, sales: 26 },
    { month: 'Aug', learning: 35, sales: 29 },
    { month: 'Sep', learning: 38, sales: 34 },
  ],
};

export const improvementInsights: ImprovementInsight[] = [
  {
    id: 'insight-1',
    title: {
      ja: 'Washington × Rain Clearing Blue Mirror',
      en: 'Washington × Rain Clearing Blue Mirror',
    },
    content: {
      ja: 'WashingtonのbZ4Xユーザーでは「Visibility」を訴求したRain Clearing Blue Mirrorの反応率が58%と高い。全体平均38%と比べて大幅に上回っている。',
      en: 'bZ4X users in Washington show a 58% interest rate for Rain Clearing Blue Mirror when "Visibility" is emphasized — significantly above the overall average of 38%.',
    },
    suggestedAction: {
      ja: 'WashingtonのMarket WeightをRain Clearing Blue Mirrorで +10% 調整し、Visibilityを主要Value訴求に設定することを推奨。',
      en: 'Recommended: Adjust Market Weight for Rain Clearing Blue Mirror in Washington by +10% and set Visibility as the primary value appeal.',
    },
    targetProductId: 'bz-rain-mirror',
    targetMarket: 'north-america',
    targetState: 'washington',
    adjustmentType: 'marketWeight',
    adjustmentValue: 10,
    status: 'new',
  },
  {
    id: 'insight-2',
    title: {
      ja: 'Family × Outdoor FJ × Seat Cover',
      en: 'Family × Outdoor FJ × Seat Cover',
    },
    content: {
      ja: 'Family × OutdoorのFJユーザーでは、Seat CoverのEasy Cleaning訴求がDesign訴求より反応率が18ポイント高い（51% vs 33%）。',
      en: 'FJ users with Family × Outdoor lifestyle show 18 points higher interest when Seat Cover is promoted with Easy Cleaning vs Design (51% vs 33%).',
    },
    suggestedAction: {
      ja: 'Family / Outdoor profileではSeat CoverのEasy CleaningをPrimary Value訴求に変更することを推奨。',
      en: 'Recommended: Change Seat Cover primary value appeal to Easy Cleaning for Family/Outdoor profiles.',
    },
    targetProductId: 'fj-seat-cover',
    targetMarket: 'japan',
    adjustmentType: 'valueEmphasis',
    adjustmentValue: 18,
    status: 'new',
  },
  {
    id: 'insight-3',
    title: {
      ja: 'Minnesota × Cold Weather × Remote Start',
      en: 'Minnesota × Cold Weather × Remote Start',
    },
    content: {
      ja: 'MinnesotaのFJユーザーでのRemote Start反応率が52%と高水準。Cold Weather訴求を強化することでさらなる向上が期待できる。',
      en: 'FJ users in Minnesota show a 52% interest rate for Remote Start. Strengthening cold weather appeals could drive further improvement.',
    },
    suggestedAction: {
      ja: 'MinnesotaでのRemote Startについて、Cold Weather / Defrost訴求のWeightを +15% 調整することを推奨。',
      en: 'Recommended: Increase Cold Weather / Defrost appeal weight for Remote Start in Minnesota by +15%.',
    },
    targetProductId: 'fj-remote-start',
    targetMarket: 'north-america',
    targetState: 'minnesota',
    adjustmentType: 'marketWeight',
    adjustmentValue: 15,
    status: 'reviewed',
  },
];

export const knowledgeSources = [
  {
    id: 'source-fj',
    name: { ja: 'Land Cruiser FJ 商品ページ', en: 'Land Cruiser FJ Product Page' },
    url: 'https://factory.kinto-jp.com/products/vehicle/FJ001/',
    type: 'website' as const,
    brand: 'KINTO Factory',
    vehicle: 'fj' as const,
    market: 'japan' as const,
    language: 'ja' as const,
    lastImported: '2026-10-01T09:00:00Z',
    status: 'connected' as const,
    productCount: 3,
  },
  {
    id: 'source-bz4x',
    name: { ja: 'bZ4X 商品ページ', en: 'bZ4X Product Page' },
    url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/',
    type: 'website' as const,
    brand: 'KINTO Factory',
    vehicle: 'bz4x' as const,
    market: 'japan' as const,
    language: 'ja' as const,
    lastImported: '2026-10-01T09:15:00Z',
    status: 'connected' as const,
    productCount: 3,
  },
];
