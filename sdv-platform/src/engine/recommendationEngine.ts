import type { CustomerProfile, ProductId, RecommendationResult, Market, Region } from '../types';
import { products } from '../data/products';

interface WeightConfig {
  usage: number;
  explicitNeed: number;
  lifestyle: number;
  market: number;
  vehicle: number;
  price: number;
  featureUsage: number;
}

const defaultWeights: WeightConfig = {
  usage: 30,
  explicitNeed: 25,
  lifestyle: 15,
  market: 15,
  vehicle: 10,
  price: 0,
  featureUsage: 5,
};

function calcRemoteStart(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  const notes = (profile.dealerNotes || '').toLowerCase();
  const regions = ['hokkaido', 'minnesota'];
  const hotRegions = ['texas', 'okinawa'];
  
  // Usage Match (max 30)
  if (profile.drivingFrequency === 'daily') score += 10 * (weights.usage / 30);
  if (profile.primaryUsage?.includes('commuting') || profile.primaryUsage?.includes('daily_commuting')) {
    score += 20 * (weights.usage / 30);
  }
  
  // Explicit Need (max 25)
  if (notes.includes('cold') || notes.includes('寒い') || notes.includes('frost') || notes.includes('霜') ||
      notes.includes('hot') || notes.includes('暑い') || notes.includes('warm') || notes.includes('温度')) {
    score += 15 * (weights.explicitNeed / 25);
  }
  if (profile.frequentlyUsedFeatures?.includes('air_conditioning') || 
      profile.frequentlyUsedFeatures?.includes('climate_control')) {
    score += 10 * (weights.explicitNeed / 25);
  }
  
  // Lifestyle (max 15)
  if (profile.lifestyleTags?.includes('Family')) score += 8 * (weights.lifestyle / 15);
  if (profile.lifestyleTags?.includes('Commuter')) score += 7 * (weights.lifestyle / 15);
  
  // Market Context (max 15)
  if (regions.includes(profile.region || '')) score += 15 * (weights.market / 15);
  else if (hotRegions.includes(profile.region || '')) score += 12 * (weights.market / 15);
  else score += 3 * (weights.market / 15);
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'fj') score += 10 * (weights.vehicle / 10);
  
  // Profile Context (max 5)
  if (profile.hasSpouse && profile.childrenCount && profile.childrenCount > 0) score += 5 * (weights.featureUsage / 5);
  
  return Math.min(100, Math.round(score));
}

function calcAirLumbar(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  
  const weeklyKm = profile.weeklyDistanceKm || (profile.weeklyDistanceMiles ? profile.weeklyDistanceMiles * 1.6 : 0);
  
  // Usage Match (max 30)
  if (weeklyKm > 400) score += 25 * (weights.usage / 30);
  else if (weeklyKm > 250) score += 20 * (weights.usage / 30);
  else if (weeklyKm > 150) score += 10 * (weights.usage / 30);
  if (profile.highwayRatio && profile.highwayRatio > 30) score += 10 * (weights.usage / 30);
  
  // Explicit Need (max 25)
  if (profile.lifestyleTags?.includes('Long-distance')) score += 20 * (weights.explicitNeed / 25);
  if (profile.primaryUsage?.includes('highway_trips')) score += 15 * (weights.explicitNeed / 25);
  
  // Lifestyle (max 15)
  if (profile.interests?.comfort && profile.interests.comfort >= 4) score += 15 * (weights.lifestyle / 15);
  
  // Market Context (max 15)
  if (profile.region === 'hokkaido' || profile.region === 'colorado' || profile.region === 'minnesota') {
    score += 8 * (weights.market / 15);
  }
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'fj') score += 10 * (weights.vehicle / 10);
  
  // Profile Context
  if (profile.drivingFrequency === 'daily') score += 5 * (weights.featureUsage / 5);
  
  return Math.min(100, Math.round(score));
}

function calcSeatCover(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  
  // Usage Match (max 30)
  if (profile.primaryUsage?.includes('camping') || profile.lifestyleTags?.includes('Outdoor')) {
    score += 20 * (weights.usage / 30);
  }
  if (profile.primaryUsage?.includes('family_trips')) score += 10 * (weights.usage / 30);
  
  // Explicit Need (max 25)
  if (profile.childrenCount && profile.childrenCount > 0) score += 15 * (weights.explicitNeed / 25);
  const notes = (profile.dealerNotes || '').toLowerCase();
  if (notes.includes('汚') || notes.includes('clean') || notes.includes('camping') || notes.includes('キャンプ')) {
    score += 10 * (weights.explicitNeed / 25);
  }
  
  // Lifestyle (max 15)
  if (profile.lifestyleTags?.includes('Outdoor') || profile.lifestyleTags?.includes('Weekend Trip')) {
    score += 15 * (weights.lifestyle / 15);
  }
  if (profile.lifestyleTags?.includes('Family')) score += 10 * (weights.lifestyle / 15);
  
  // Market Context (max 15)
  if (profile.region === 'nagano' || profile.region === 'colorado') {
    score += 10 * (weights.market / 15);
  }
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'fj') score += 10 * (weights.vehicle / 10);
  
  // Profile Context
  if (profile.interests?.cleanliness && profile.interests.cleanliness >= 4) {
    score += 5 * (weights.featureUsage / 5);
  }
  
  return Math.min(100, Math.round(score));
}

function calcCableHolder(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  
  // Usage Match (max 30)
  if (profile.homeCharging) score += 25 * (weights.usage / 30);
  if (profile.chargingSessionsPerWeek && profile.chargingSessionsPerWeek >= 4) {
    score += 20 * (weights.usage / 30);
  } else if (profile.chargingSessionsPerWeek && profile.chargingSessionsPerWeek >= 2) {
    score += 10 * (weights.usage / 30);
  }
  
  // Explicit Need (max 25)
  if (profile.cableUsageFrequency === 'high') score += 20 * (weights.explicitNeed / 25);
  else if (profile.cableUsageFrequency === 'medium') score += 12 * (weights.explicitNeed / 25);
  const notes = (profile.dealerNotes || '').toLowerCase();
  if (notes.includes('cable') || notes.includes('ケーブル') || notes.includes('充電')) {
    score += 15 * (weights.explicitNeed / 25);
  }
  
  // Lifestyle (max 15)
  if (profile.interests?.convenience && profile.interests.convenience >= 4) {
    score += 15 * (weights.lifestyle / 15);
  }
  if (profile.lifestyleTags?.includes('Commuter')) score += 10 * (weights.lifestyle / 15);
  
  // Market Context (max 15)
  if (profile.region === 'california') score += 12 * (weights.market / 15);
  else score += 5 * (weights.market / 15);
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'bz4x') score += 10 * (weights.vehicle / 10);
  
  // Profile Context
  if (profile.interests?.evUsability && profile.interests.evUsability >= 4) {
    score += 5 * (weights.featureUsage / 5);
  }
  
  return Math.min(100, Math.round(score));
}

function calcRainMirror(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  const rainRegions = ['washington', 'new-york'];
  const moderateRainRegions = ['colorado', 'tokyo'];
  
  // Market Context (max 15 → heavy emphasis)
  if (rainRegions.includes(profile.region || '')) score += 25 * (weights.market / 15);
  else if (moderateRainRegions.includes(profile.region || '')) score += 10 * (weights.market / 15);
  else score += 3 * (weights.market / 15);
  
  // Explicit Need (max 25)
  if (profile.interests?.safety && profile.interests.safety >= 4) {
    score += 20 * (weights.explicitNeed / 25);
  }
  const notes = (profile.dealerNotes || '').toLowerCase();
  if (notes.includes('rain') || notes.includes('visibility') || notes.includes('視界') || notes.includes('雨')) {
    score += 20 * (weights.explicitNeed / 25);
  }
  
  // Usage Match (max 30)
  if (profile.drivingFrequency === 'daily') score += 10 * (weights.usage / 30);
  if (profile.primaryUsage?.includes('daily_commuting') || profile.primaryUsage?.includes('commuting')) {
    score += 10 * (weights.usage / 30);
  }
  
  // Lifestyle (max 15)
  if (profile.lifestyleTags?.includes('Commuter')) score += 10 * (weights.lifestyle / 15);
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'bz4x') score += 10 * (weights.vehicle / 10);
  
  return Math.min(100, Math.round(score));
}

function calcSmartKey(profile: CustomerProfile, weights: WeightConfig): number {
  let score = 0;
  // NOTE: Age must never create recommendation alone
  
  // Explicit Need (max 25) — must be primary driver
  if (profile.interests?.safety && profile.interests.safety >= 4) {
    score += 25 * (weights.explicitNeed / 25);
  } else if (profile.interests?.safety && profile.interests.safety >= 3) {
    score += 15 * (weights.explicitNeed / 25);
  }
  
  const notes = (profile.dealerNotes || '').toLowerCase();
  if (notes.includes('safety') || notes.includes('安全') || notes.includes('support') || notes.includes('支援') ||
      notes.includes('共有') || notes.includes('share')) {
    score += 15 * (weights.explicitNeed / 25);
  }
  
  // Usage Match (max 30)
  if (profile.sharedVehicle) score += 20 * (weights.usage / 30);
  if (profile.urbanRatio && profile.urbanRatio > 40) score += 10 * (weights.usage / 30);
  
  // Lifestyle (max 15)
  if (profile.frequentlyUsedFeatures?.includes('driver_assistance')) {
    score += 15 * (weights.lifestyle / 15);
  }
  
  // Market Context (max 15)
  if (profile.region === 'minnesota' || profile.region === 'new-york') {
    score += 8 * (weights.market / 15);
  }
  
  // Vehicle Fit (max 10)
  if (profile.vehicle === 'bz4x') score += 10 * (weights.vehicle / 10);
  
  // DO NOT add score from age alone
  
  return Math.min(100, Math.round(score));
}

function generateRecommendationText(
  productId: ProductId,
  profile: CustomerProfile,
  score: number,
  market: Market,
  region: Region | null
): Omit<RecommendationResult, 'productId' | 'rank' | 'fitScore' | 'scoreBreakdown'> {
  const isNA = market === 'north-america';
  const regionName = region ? region.charAt(0).toUpperCase() + region.slice(1) : '';
  
  const texts: Record<ProductId, Omit<RecommendationResult, 'productId' | 'rank' | 'fitScore' | 'scoreBreakdown'>> = {
    'fj-remote-start': {
      whyRecommended: {
        ja: `${profile.primaryUsage?.includes('commuting') ? '毎日の通勤' : '日常利用'}とお住まいの地域（${regionName}）の気候を踏まえると、乗車前の車内温度管理に高い価値があります。`,
        en: `Based on ${profile.primaryUsage?.includes('commuting') ? 'daily commuting' : 'regular use'} and the climate in ${regionName}, pre-conditioning cabin temperature has high value for this customer.`,
      },
      evidenceSignals: [
        { ja: '毎日通勤利用', en: 'Daily commute use' },
        { ja: `${regionName}の気候条件`, en: `Climate conditions in ${regionName}` },
        ...(profile.childrenCount && profile.childrenCount > 0 ? [{ ja: `子ども${profile.childrenCount}人乗車`, en: `${profile.childrenCount} child(ren) aboard` }] : []),
        ...(profile.frequentlyUsedFeatures?.includes('air_conditioning') ? [{ ja: 'エアコン頻繁利用', en: 'Frequent A/C use' }] : []),
      ],
      customerValue: {
        ja: '毎朝の乗車前に快適な車内温度を準備。霜取りや暖機の手間なしに、すぐに出発できます。',
        en: 'Pre-conditions the cabin to a comfortable temperature every morning. Get in and go — no more defrosting or warm-up wait.',
      },
      recommendedQuestion: {
        ja: '毎朝の出発前、霜取りや車内の温度調整に時間がかかることはありませんか？',
        en: 'Does defrosting or pre-conditioning your cabin take time every morning before departure?',
      },
      suggestedTalk: {
        ja: `${profile.name?.split('/')[0]?.trim() || 'お客様'}様は毎日通勤でご利用されていますね。リモートスタートを使うと、乗り込む15分前からエンジンを始動して車内を整えられます。${profile.childrenCount && profile.childrenCount > 0 ? `お子さん${profile.childrenCount}人を乗せる際も、快適な温度で迎えてあげられます。` : ''}冬の霜取り、夏の冷却、どちらも自動で対応できます。`,
        en: `${profile.name?.split('/')[1]?.trim() || 'Your customer'} uses the vehicle for daily commuting. With Remote Start, you can start the engine 15 minutes before getting in to prepare the cabin.${profile.childrenCount && profile.childrenCount > 0 ? ` Great for welcoming your ${profile.childrenCount} child(ren) into a comfortable temperature.` : ''} Handles both winter defrost and summer cooling automatically.`,
      },
      possibleObjection: {
        ja: 'そこまで必要ないかもしれない',
        en: 'I might not really need that',
      },
      suggestedResponse: {
        ja: '一度使い始めると「これなしでは無理」とおっしゃるお客様がほとんどです。特に寒い朝や暑い夏の日に価値を実感いただけます。',
        en: 'Most customers who start using it say they can\'t imagine going back. The value really shows on cold mornings and hot summer days.',
      },
      customerWhyText: {
        ja: 'あなたの毎日の通勤パターンと生活スタイルに合わせてお勧めしています。',
        en: 'Recommended based on your daily commuting pattern and lifestyle.',
      },
      customerSituation: {
        ja: '毎日の通勤・ご家族との外出に。乗り込む前に快適な温度の車内を準備。',
        en: 'For your daily commute and family outings. Cabin ready at the perfect temperature before you get in.',
      },
      customerBenefits: [
        { ja: '乗車前に快適な車内温度', en: 'Comfortable cabin temperature before entry' },
        { ja: '冬の霜取り・夏の冷却を自動化', en: 'Automated defrost in winter, cooling in summer' },
        { ja: '朝の準備時間を短縮', en: 'Save time on morning preparation' },
      ],
      customerUsageScene: {
        ja: '毎朝スマートフォンをタップするだけ。出発15分前には快適な車内が待っています。',
        en: 'Just tap your smartphone every morning. A comfortable cabin awaits 15 minutes before departure.',
      },
    },
    'fj-air-lumbar': {
      whyRecommended: {
        ja: `週${profile.weeklyDistanceKm || (profile.weeklyDistanceMiles ? Math.round(profile.weeklyDistanceMiles * 1.6) : 0)}kmの走行距離と${profile.primaryUsage?.includes('highway_trips') ? '高速道路利用' : '日常利用'}から、腰への負担軽減に高い価値があります。`,
        en: `Based on weekly driving of ${profile.weeklyDistanceKm || (profile.weeklyDistanceMiles ? Math.round(profile.weeklyDistanceMiles * 1.6) : 0)}km and ${profile.primaryUsage?.includes('highway_trips') ? 'highway use' : 'regular use'}, lumbar support has high value.`,
      },
      evidenceSignals: [
        { ja: `週間走行距離: ${profile.weeklyDistanceKm || (profile.weeklyDistanceMiles ? Math.round(profile.weeklyDistanceMiles * 1.6) : 0)}km`, en: `Weekly distance: ${profile.weeklyDistanceKm || (profile.weeklyDistanceMiles ? Math.round(profile.weeklyDistanceMiles * 1.6) : 0)}km` },
        ...(profile.lifestyleTags?.includes('Long-distance') ? [{ ja: '長距離ライフスタイル', en: 'Long-distance lifestyle' }] : []),
        ...(profile.interests?.comfort && profile.interests.comfort >= 4 ? [{ ja: 'コンフォートへの高い関心', en: 'High comfort interest' }] : []),
      ],
      customerValue: {
        ja: '長時間ドライブでも腰に疲れを感じにくい、快適な移動体験を実現します。',
        en: 'Achieve a comfortable driving experience without lumbar fatigue, even on long drives.',
      },
      recommendedQuestion: {
        ja: '長距離を走った後や、毎日の通勤で腰の疲れや重だるさを感じることはありますか？',
        en: 'Do you experience lumbar fatigue or heaviness after long drives or your daily commute?',
      },
      suggestedTalk: {
        ja: '毎週これだけの距離を運転されているなら、腰への蓄積疲労は確実にあります。エアーランバーはシートと背中の隙間をエアーで埋めて体圧を分散。「疲れにくい移動」に変えます。',
        en: 'With this much weekly driving, cumulative lumbar strain is a certainty. Air Lumbar fills the gap between seat and back with air to distribute pressure — transforming the drive into a fatigue-resistant experience.',
      },
      possibleObjection: {
        ja: 'シートの調整で十分では？',
        en: 'Isn\'t seat adjustment enough?',
      },
      suggestedResponse: {
        ja: 'シート調整は大まかな位置合わせです。エアーランバーは体型に合わせてエアー量を細かく調整できるため、より精密なフィット感が得られます。',
        en: 'Seat adjustment handles general positioning. Air Lumbar allows fine-tuning of air volume to your body shape for a more precise fit.',
      },
      customerWhyText: {
        ja: 'あなたの走行距離と利用パターンから、腰サポートが快適な移動体験に貢献すると判断しました。',
        en: 'Based on your driving distance and usage pattern, lumbar support would contribute to a more comfortable driving experience.',
      },
      customerSituation: {
        ja: '長距離ドライブや毎日の通勤で、腰への負担が蓄積しているかもしれません。',
        en: 'Long drives and daily commutes may be accumulating strain on your lumbar region.',
      },
      customerBenefits: [
        { ja: '長時間運転後の腰疲れを軽減', en: 'Reduced lumbar fatigue after long drives' },
        { ja: '正しい姿勢を自然にキープ', en: 'Naturally maintains proper posture' },
        { ja: '体圧を分散してリラックス', en: 'Distributes pressure for relaxation' },
      ],
      customerUsageScene: {
        ja: '週末の長距離ドライブも、毎日の通勤も、疲れにくい姿勢で過ごせます。',
        en: 'Whether weekend long drives or daily commutes, stay in a fatigue-resistant posture throughout.',
      },
    },
    'fj-seat-cover': {
      whyRecommended: {
        ja: `${profile.lifestyleTags?.includes('Outdoor') ? 'アウトドア' : ''}${profile.childrenCount && profile.childrenCount > 0 ? `・お子さん${profile.childrenCount}人` : ''}という利用状況から、シートの汚れ対策に高い価値があります。`,
        en: `Based on ${profile.lifestyleTags?.includes('Outdoor') ? 'outdoor' : ''}${profile.childrenCount && profile.childrenCount > 0 ? ` lifestyle and ${profile.childrenCount} child(ren)` : ' lifestyle'}, seat protection has high value.`,
      },
      evidenceSignals: [
        ...(profile.lifestyleTags?.includes('Outdoor') ? [{ ja: 'アウトドアライフスタイル', en: 'Outdoor lifestyle' }] : []),
        ...(profile.childrenCount && profile.childrenCount > 0 ? [{ ja: `子ども${profile.childrenCount}人同乗`, en: `${profile.childrenCount} child(ren) in vehicle` }] : []),
        ...(profile.primaryUsage?.includes('camping') ? [{ ja: 'キャンプ利用', en: 'Camping use' }] : []),
        ...(profile.interests?.cleanliness && profile.interests.cleanliness >= 4 ? [{ ja: '清潔感への関心', en: 'Cleanliness interest' }] : []),
      ],
      customerValue: {
        ja: '水・泥・汗・食べこぼしを拭き取るだけ。アウトドアや子どもとの外出後も、いつも清潔な車内をキープ。',
        en: 'Just wipe away water, mud, sweat, and spills. Keep the interior always clean after outdoor trips or outings with kids.',
      },
      recommendedQuestion: {
        ja: 'アウトドアや週末のお出かけの後、シートの汚れが気になることはありますか？',
        en: 'Do you notice seat soiling after outdoor trips or weekend outings?',
      },
      suggestedTalk: {
        ja: `${profile.lifestyleTags?.includes('Outdoor') ? 'キャンプや山へのお出かけ' : '週末のお出かけ'}の後、シートに泥や汚れが付くことはありませんか？シートカバーなら、帰宅後に拭き取るだけ。${profile.childrenCount && profile.childrenCount > 0 ? `ISOFIX対応なので、お子さんのチャイルドシートも安全に設置できます。` : ''}`,
        en: `After ${profile.lifestyleTags?.includes('Outdoor') ? 'camping or mountain trips' : 'weekend outings'}, do you ever find mud or dirt on the seats? With the Seat Cover, just wipe clean on arrival.${profile.childrenCount && profile.childrenCount > 0 ? ' ISOFIX compatible so child seats can be safely installed.' : ''}`,
      },
      possibleObjection: {
        ja: '見た目が変わるのが嫌だ',
        en: 'I don\'t want to change the appearance',
      },
      suggestedResponse: {
        ja: 'シートデザインに合わせたカバーですので、装着後もオリジナルの雰囲気を損ないません。実際の装着例をご覧になりますか？',
        en: 'Designed to match the seat style, so the original look is preserved after installation. Would you like to see an example?',
      },
      customerWhyText: {
        ja: 'あなたのアウトドアライフスタイルと家族での利用パターンから、シート保護が快適な車生活に貢献すると判断しました。',
        en: 'Based on your outdoor lifestyle and family usage pattern, seat protection would contribute to a comfortable vehicle life.',
      },
      customerSituation: {
        ja: 'アウトドアやご家族とのお出かけで、シートが汚れやすい環境で使われています。',
        en: 'Using the vehicle in environments where seats get dirty from outdoor activities and family outings.',
      },
      customerBenefits: [
        { ja: '水・泥・汗を拭き取るだけで清潔に', en: 'Just wipe away water, mud, and sweat to keep clean' },
        { ja: 'アウトドア後も車内をすっきり', en: 'Clean interior even after outdoor adventures' },
        { ja: 'ISOFIX対応で安全にチャイルドシート設置', en: 'ISOFIX compatible for safe child seat installation' },
      ],
      customerUsageScene: {
        ja: 'キャンプ帰り、海や山からの帰り道。泥だらけの服でも気にせず乗り込んで、帰宅後はさっと拭くだけ。',
        en: 'Coming back from camping, the beach, or the mountains. Hop in with muddy clothes and just wipe clean when home.',
      },
    },
    'bz-cable-holder': {
      whyRecommended: {
        ja: `自宅充電${profile.chargingSessionsPerWeek ? `週${profile.chargingSessionsPerWeek}回` : 'あり'}と充電ケーブルの高頻度利用から、収納利便性に高い価値があります。`,
        en: `Based on home charging${profile.chargingSessionsPerWeek ? ` ${profile.chargingSessionsPerWeek}x/week` : ''} and high cable usage frequency, cable storage convenience has high value.`,
      },
      evidenceSignals: [
        ...(profile.homeCharging ? [{ ja: '自宅充電あり', en: 'Home charging available' }] : []),
        ...(profile.chargingSessionsPerWeek ? [{ ja: `充電回数: 週${profile.chargingSessionsPerWeek}回`, en: `Charging sessions: ${profile.chargingSessionsPerWeek}x/week` }] : []),
        ...(profile.cableUsageFrequency === 'high' ? [{ ja: 'ケーブル利用頻度: 高', en: 'Cable usage frequency: High' }] : []),
        ...(profile.lifestyleTags?.includes('Commuter') ? [{ ja: 'コミューターライフスタイル', en: 'Commuter lifestyle' }] : []),
      ],
      customerValue: {
        ja: '毎日のケーブル束ね・収納の手間をゼロに。EV生活のルーティンをよりスムーズにします。',
        en: 'Eliminate daily cable bundling and storage hassle. Make your EV routine smoother.',
      },
      recommendedQuestion: {
        ja: '毎日の充電で、ケーブルの収納や取り扱いに不便を感じることはありますか？',
        en: 'Do you find cable storage or handling inconvenient during your daily charging routine?',
      },
      suggestedTalk: {
        ja: `毎週${profile.chargingSessionsPerWeek || '複数'}回充電されているなら、ケーブルの収納・取り出しが毎日のルーティンになっているはずです。専用ホルダーがあれば、充電後はかけるだけ・朝は取り出すだけ。毎日の小さなストレスが一つなくなります。`,
        en: `With ${profile.chargingSessionsPerWeek || 'multiple'} charging sessions per week, cable storage and retrieval must be a daily routine. A dedicated holder means just hang after charging and grab in the morning. One less daily small stress.`,
      },
      possibleObjection: {
        ja: 'そこまで必要か？',
        en: 'Is that really necessary?',
      },
      suggestedResponse: {
        ja: '毎日充電されるなら、毎日発生する手間です。実際に触ってみると「こんなに変わるとは」とおっしゃる方が多いです。',
        en: 'If you charge daily, it\'s a daily hassle. Many who try it say they had no idea it would make such a difference.',
      },
      customerWhyText: {
        ja: 'あなたの充電頻度と日常の利用パターンから、ケーブル管理の利便性向上が役立つと判断しました。',
        en: 'Based on your charging frequency and daily usage pattern, improving cable management convenience would be helpful.',
      },
      customerSituation: {
        ja: '自宅充電を毎日行うライフスタイルで、ケーブルの収納・取り出しが毎日のルーティンになっています。',
        en: 'Daily home charging lifestyle where cable storage and retrieval is part of the everyday routine.',
      },
      customerBenefits: [
        { ja: 'ケーブルをすっきり整理して毎日ストレスフリー', en: 'Neatly organized cable for daily stress-free use' },
        { ja: '取り出し・収納がワンアクション', en: 'Single-action retrieval and storage' },
        { ja: 'EV生活のルーティンをよりスムーズに', en: 'Make your EV daily routine smoother' },
      ],
      customerUsageScene: {
        ja: '充電が終わったらホルダーにかけるだけ。翌朝はそのまま取り出して出発。ケーブル管理のストレスがゼロになります。',
        en: 'Just hang on the holder when charging is done. Grab and go the next morning. Zero cable management stress.',
      },
    },
    'bz-rain-mirror': {
      whyRecommended: {
        ja: `${regionName}の雨天頻度と${profile.primaryUsage?.includes('daily_commuting') ? '毎日通勤' : '日常利用'}から、雨天時の視認性向上に高い価値があります。${isNA ? '（価値翻訳ロジックのコンセプトデモ）' : ''}`,
        en: `Based on rain frequency in ${regionName} and ${profile.primaryUsage?.includes('daily_commuting') ? 'daily commuting' : 'regular use'}, rain visibility improvement has high value.${isNA ? ' (Concept demo of localized value translation)' : ''}`,
      },
      evidenceSignals: [
        { ja: `居住地域: ${regionName}（雨天頻度${region === 'washington' ? '高' : '中'}）`, en: `Region: ${regionName} (rain frequency: ${region === 'washington' ? 'high' : 'medium'})` },
        ...(profile.drivingFrequency === 'daily' ? [{ ja: '毎日運転', en: 'Daily driving' }] : []),
        ...(profile.interests?.safety && profile.interests.safety >= 3 ? [{ ja: '安全性への関心', en: 'Safety interest' }] : []),
      ],
      customerValue: {
        ja: '雨天時のミラー視認性をサポート。太陽光で自動回復するのでメンテナンスも不要。',
        en: 'Supports mirror visibility in rain. Auto-recovers with sunlight so no maintenance needed.',
      },
      recommendedQuestion: {
        ja: '雨の日の運転で、ミラーが見えにくいと感じることはありますか？',
        en: 'Do you ever feel that mirrors are hard to see on rainy days?',
      },
      suggestedTalk: {
        ja: `${regionName}は雨の日が多い地域です。毎日通勤で運転されているなら、雨天時の視認性は安全運転の重要な要素です。レインクリアリングブルーミラーは親水コーティングで水滴を水膜に変え、後方視認性をサポートします。`,
        en: `${regionName} is a region with frequent rain. For daily commuters, rain visibility is a critical element of safe driving. The Rain Clearing Blue Mirror converts water droplets to a water film with hydrophilic coating to support rear visibility.`,
      },
      possibleObjection: {
        ja: 'そんなに変わるのか？',
        en: 'Does it really make that much difference?',
      },
      suggestedResponse: {
        ja: '実際に雨天時に体験いただくと、視認性の差は明確です。特に夜間の雨天運転では効果を強く実感いただけます。',
        en: 'The visibility difference becomes clear when you experience it in rain. The effect is especially noticeable during nighttime rain driving.',
      },
      customerWhyText: {
        ja: 'あなたの居住地域の気候と日常の運転パターンから、雨天時の視認性向上が安全な運転体験に貢献すると判断しました。',
        en: 'Based on your region\'s climate and daily driving pattern, improving rain visibility would contribute to a safer driving experience.',
      },
      customerSituation: {
        ja: '雨の多い地域での毎日の運転で、視認性の確保が安全な移動体験につながります。',
        en: 'Daily driving in a rainy region where securing visibility contributes to a safe driving experience.',
      },
      customerBenefits: [
        { ja: '雨天時の後方視認性をサポート', en: 'Supports rear visibility in rain' },
        { ja: '太陽光で自動回復、メンテナンス不要', en: 'Auto-recovers with sunlight, no maintenance needed' },
        { ja: '毎日の雨天通勤を安心サポート', en: 'Peace of mind support for daily rain commuting' },
      ],
      customerUsageScene: {
        ja: '雨の朝の通勤でも、ミラーがクリアな視界をサポート。車線変更や駐車も安心して行えます。',
        en: 'Even on rainy morning commutes, the mirror supports clear visibility. Lane changes and parking feel safer.',
      },
    },
    'bz-smart-key': {
      whyRecommended: {
        ja: `${profile.sharedVehicle ? '複数ドライバーでの共有' : ''}${profile.interests?.safety && profile.interests.safety >= 4 ? '・安全運転への明示的関心' : ''}から、運転支援機能に高い価値があります。（年齢は根拠としていません）`,
        en: `Based on ${profile.sharedVehicle ? 'shared vehicle use' : ''}${profile.interests?.safety && profile.interests.safety >= 4 ? ' and explicit safety interest' : ''}, driving support features have high value. (Age is not a recommendation factor)`,
      },
      evidenceSignals: [
        ...(profile.sharedVehicle ? [{ ja: '複数ドライバーで車を共有', en: 'Shared vehicle among multiple drivers' }] : []),
        ...(profile.interests?.safety && profile.interests.safety >= 4 ? [{ ja: '安全への高い関心（明示）', en: 'High safety interest (explicit)' }] : []),
        ...(profile.frequentlyUsedFeatures?.includes('driver_assistance') ? [{ ja: '運転支援機能の頻繁利用', en: 'Frequent driver assistance use' }] : []),
      ],
      customerValue: {
        ja: '専用キーでプラスサポートを始動。複数ドライバーそれぞれに合った設定で、安心して運転できる環境をサポートします。\n\n※本機能は運転を代替するものではなく、リスク低減を支援する機能です。',
        en: 'Activate Plus Support with a dedicated key. Support an environment where each driver can drive with peace of mind with settings appropriate for them.\n\n※This feature does not replace safe driving. It supports risk reduction.',
      },
      recommendedQuestion: {
        ja: '安全運転支援機能への関心や、ご家族と車を共有していることについて、何かお気づきのことはありますか？',
        en: 'Do you have any thoughts on driving support features or sharing the vehicle with family?',
      },
      suggestedTalk: {
        ja: `${profile.sharedVehicle ? '複数の方で車を共有されているとのことで、' : ''}安全運転への関心がお強いとのことで、プラスサポート用スマートキーをご紹介します。専用キーでプラスサポートを始動し、急加速の抑制支援や警報機能で安心の運転環境をサポートします。\n\n※事故を防止するものではなく、リスク低減を支援する機能です。必ず安全確認の上でご使用ください。`,
        en: `${profile.sharedVehicle ? 'Since you share the vehicle with multiple drivers, ' : ''}given your strong interest in safe driving, I\'d like to introduce the Plus Support Smart Key. Activate Plus Support with a dedicated key, with acceleration suppression support and alerts to support a safe driving environment.\n\n※This does not prevent accidents. It supports risk reduction. Always perform safety checks.`,
      },
      possibleObjection: {
        ja: '特に困っていない',
        en: 'I\'m not particularly concerned',
      },
      suggestedResponse: {
        ja: '明示的な困りごとがない場合でも、複数ドライバーでの共有や、慣れない状況での安心感として多くの方が価値を感じていただいています。',
        en: 'Even without a specific concern, many find value in the peace of mind for shared driving situations or in unfamiliar driving contexts.',
      },
      customerWhyText: {
        ja: 'あなたの安全への関心と、複数の方での利用スタイルから、運転支援サポートが快適な車生活に役立つと判断しました。',
        en: 'Based on your safety interest and shared-use driving style, driving support would contribute to a comfortable vehicle life.',
      },
      customerSituation: {
        ja: '複数の方が使う車として、それぞれに合った安心の運転環境が重要です。',
        en: 'As a vehicle shared among multiple drivers, a safe driving environment appropriate for each driver matters.',
      },
      customerBenefits: [
        { ja: '専用キーで必要な人にサポートを設定', en: 'Configure support for those who need it with a dedicated key' },
        { ja: '急加速抑制支援で安心の運転環境', en: 'Peace of mind driving with acceleration suppression support' },
        { ja: '警報・ディスプレイ通知でリスク低減を支援', en: 'Alert and display notifications to support risk reduction' },
      ],
      customerUsageScene: {
        ja: '複数の方で車を共有するとき、それぞれの運転スタイルに合わせた安心のサポートを提供。',
        en: 'When sharing the vehicle among multiple drivers, provides peace of mind support tailored to each driving style.',
      },
    },
  };
  
  return texts[productId];
}

export function runRecommendationEngine(
  profile: CustomerProfile,
  weights: WeightConfig = defaultWeights
): RecommendationResult[] {
  if (!profile.vehicle) return [];
  
  const market = profile.market;
  const region = profile.region || null;
  
  // Adjust weights for market context
  const adjustedWeights = { ...weights };
  
  // Only score products for the selected vehicle
  const scoringFunctions: Record<ProductId, (p: CustomerProfile, w: WeightConfig) => number> = {
    'fj-remote-start': calcRemoteStart,
    'fj-air-lumbar': calcAirLumbar,
    'fj-seat-cover': calcSeatCover,
    'bz-cable-holder': calcCableHolder,
    'bz-rain-mirror': calcRainMirror,
    'bz-smart-key': calcSmartKey,
  };
  
  const vehicleProducts: ProductId[] = profile.vehicle === 'fj'
    ? ['fj-remote-start', 'fj-air-lumbar', 'fj-seat-cover']
    : ['bz-cable-holder', 'bz-rain-mirror', 'bz-smart-key'];
  
  const results: RecommendationResult[] = vehicleProducts.map(productId => {
    const score = scoringFunctions[productId](profile, adjustedWeights);
    
    // Simplified breakdown
    const breakdown = {
      usageMatch: Math.round(score * 0.3),
      explicitNeed: Math.round(score * 0.25),
      lifestyleMatch: Math.round(score * 0.15),
      marketContext: Math.round(score * 0.15),
      vehicleFit: Math.round(score * 0.10),
      profileContext: Math.round(score * 0.05),
    };
    
    const textData = generateRecommendationText(productId, profile, score, market, region);
    
    return {
      productId,
      rank: 0,
      fitScore: score,
      scoreBreakdown: breakdown,
      ...textData,
    };
  });
  
  // Sort by score descending and assign ranks
  results.sort((a, b) => b.fitScore - a.fitScore);
  results.forEach((r, i) => { r.rank = i + 1; });
  
  return results.slice(0, 3);
}
