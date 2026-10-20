import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'fj-remote-start',
    vehicle: 'fj',
    name: { ja: 'リモートスタート', en: 'Remote Start' },
    shortDesc: {
      ja: '乗車前にスマートフォンからエンジン始動・空調制御',
      en: 'Start your engine and control climate remotely before you get in'
    },
    description: {
      ja: '遠隔でエンジンを始動し、乗車前に車内を快適な温度に整えます。冬の霜取り、夏の冷却、通勤前の暖機をスマートフォンから操作。',
      en: 'Remotely start your engine and prepare the cabin temperature before you arrive. Perfect for defrosting in winter, cooling in summer, and pre-conditioning for commutes.'
    },
    functions: ['remote_engine_start', 'pre_conditioning', 'defrost_support', 'warmup_timer'],
    valueTags: ['comfort', 'convenience', 'cold_weather', 'hot_weather', 'commuting'],
    targetContexts: ['commuting', 'family', 'daily_use', 'cold_climate', 'hot_climate'],
    primaryValues: [
      { ja: '乗車前の快適な車内温度', en: 'Comfortable cabin before you enter' },
      { ja: '冬の霜取り自動化', en: 'Automated defrost in winter' },
      { ja: '通勤ストレスの軽減', en: 'Reduced commuting stress' },
      { ja: 'スマートフォンから簡単操作', en: 'Easy smartphone control' },
    ],
    personalizationSignals: ['region', 'season', 'commuting', 'family', 'weekly_distance'],
    imageEmoji: '🔑',
    availableInJapan: true,
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_08/',
  },
  {
    id: 'fj-air-lumbar',
    vehicle: 'fj',
    name: { ja: 'エアーランバー', en: 'Air Lumbar' },
    shortDesc: {
      ja: '腰部をエアーで支え、長距離ドライブの疲れを軽減',
      en: 'Air support for your lumbar to reduce fatigue on long drives'
    },
    description: {
      ja: '背中とシートの隙間をエアーで埋め、姿勢をサポート。体圧を分散して長時間運転の疲労を軽減します。',
      en: 'Fill the gap between your back and seat with air support to maintain proper posture and distribute pressure during long drives.'
    },
    functions: ['lumbar_air_support', 'posture_assist', 'pressure_distribution'],
    valueTags: ['comfort', 'long_distance', 'fatigue_reduction', 'commuting'],
    targetContexts: ['long_distance', 'commuting', 'highway', 'daily_use'],
    primaryValues: [
      { ja: '腰・背中への負担軽減', en: 'Reduced strain on back and lumbar' },
      { ja: '長時間ドライブの快適性', en: 'Comfort on long drives' },
      { ja: '正しい姿勢のサポート', en: 'Proper posture support' },
      { ja: '体圧の分散', en: 'Pressure distribution' },
    ],
    personalizationSignals: ['weekly_distance', 'long_distance', 'highway', 'comfort_interest'],
    imageEmoji: '💺',
    availableInJapan: true,
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_04/',
  },
  {
    id: 'fj-seat-cover',
    vehicle: 'fj',
    name: { ja: 'シートカバー', en: 'Seat Cover' },
    shortDesc: {
      ja: '撥水・汚れに強いシートカバーで車内をいつも清潔に',
      en: 'Water-resistant seat cover that keeps your interior clean'
    },
    description: {
      ja: '水・泥・汗に強い撥水加工で、アウトドアや子どもとのおでかけ後も拭き取るだけ。ISOFIX対応で安全性も確保。',
      en: 'Water and dirt resistant material wipes clean after outdoor adventures or trips with kids. ISOFIX compatible for child seat safety.'
    },
    functions: ['water_repellent', 'easy_clean', 'isofix_compatible', 'mud_resistant'],
    valueTags: ['cleanliness', 'outdoor', 'family', 'convenience', 'lifestyle'],
    targetContexts: ['outdoor', 'family', 'camping', 'sports', 'kids'],
    primaryValues: [
      { ja: '水・泥・汗への高い耐性', en: 'Resistant to water, mud, and sweat' },
      { ja: '汚れを拭き取りやすい', en: 'Easy to wipe clean' },
      { ja: 'ISOFIX対応', en: 'ISOFIX compatible' },
      { ja: 'アウトドアライフスタイルへの対応', en: 'Made for outdoor lifestyles' },
    ],
    personalizationSignals: ['family', 'outdoor', 'camping', 'children', 'lifestyle_tags'],
    imageEmoji: '🛡️',
    availableInJapan: true,
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_03/',
  },
  {
    id: 'bz-cable-holder',
    vehicle: 'bz4x',
    name: { ja: '充電ケーブルホルダー', en: 'Charging Cable Holder' },
    shortDesc: {
      ja: '充電ケーブルをすっきり整理、毎日の充電をもっとスマートに',
      en: 'Neatly organize your charging cable for smarter daily EV use'
    },
    description: {
      ja: '長い充電ケーブルをホルダーで整理し、毎回まとめる手間を解消。収納性と持ち運びやすさを両立した実用的なアクセサリー。',
      en: 'Organize your charging cable with a dedicated holder to eliminate the hassle of bundling cables. Combines storage convenience with portability.'
    },
    functions: ['cable_storage', 'cable_organization', 'portable_storage'],
    valueTags: ['convenience', 'ev_usability', 'commuting', 'organization'],
    targetContexts: ['ev_commuter', 'home_charging', 'daily_use'],
    primaryValues: [
      { ja: '毎回の収納の手間を解消', en: 'Eliminate daily cable bundling hassle' },
      { ja: '収納性の向上', en: 'Improved storage convenience' },
      { ja: '持ち運びしやすい設計', en: 'Portable design' },
      { ja: 'EV生活をより快適に', en: 'More comfortable EV lifestyle' },
    ],
    personalizationSignals: ['home_charging', 'charging_frequency', 'cable_usage', 'commuter'],
    imageEmoji: '🔌',
    availableInJapan: true,
    sourceUrl: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/',
  },
  {
    id: 'bz-rain-mirror',
    vehicle: 'bz4x',
    name: { ja: 'レインクリアリングブルーミラー', en: 'Rain Clearing Blue Mirror' },
    shortDesc: {
      ja: '雨天時の後方視認性を向上させる親水コーティングミラー',
      en: 'Hydrophilic coating mirror for better rear visibility in rain'
    },
    description: {
      ja: 'ミラー表面に親水処理を施し、雨天時の水滴を均一な水膜に変えることで視認性をサポート。太陽光によって親水性が回復・持続します。',
      en: 'Hydrophilic coating on mirror surface transforms water droplets into a uniform water film to support visibility in rain. Solar light maintains the hydrophilic effect.'
    },
    functions: ['hydrophilic_coating', 'rain_clarity', 'solar_recovery', 'rear_visibility'],
    valueTags: ['safety', 'visibility', 'rainy_weather', 'commuting'],
    targetContexts: ['rainy_region', 'commuting', 'urban', 'daily_use'],
    primaryValues: [
      { ja: '雨天時の後方視認性サポート', en: 'Rain weather rear visibility support' },
      { ja: 'ミラーの親水処理', en: 'Hydrophilic mirror surface treatment' },
      { ja: '太陽光で親水性が回復', en: 'Solar-powered hydrophilic recovery' },
      { ja: '安全な運転をサポート', en: 'Support for safer driving' },
    ],
    personalizationSignals: ['market_state', 'rain_frequency', 'commuting', 'safety_interest'],
    imageEmoji: '🪞',
    availableInJapan: true,
    sourceUrl: 'https://toyota.jp/bz4x/accessory/',
  },
  {
    id: 'bz-smart-key',
    vehicle: 'bz4x',
    name: { ja: 'プラスサポート用スマートキー', en: 'Plus Support Smart Key' },
    shortDesc: {
      ja: '専用キーでプラスサポートを作動、安心の運転支援機能',
      en: 'Dedicated key to activate Plus Support driving assistance'
    },
    description: {
      ja: '専用キーによりプラスサポートを始動。急アクセル時の加速抑制支援、警報・ディスプレイでの注意喚起で、安心して車を使える環境をサポートします。',
      en: 'Activate Plus Support with a dedicated key. Acceleration suppression support during sudden acceleration, with alerts and display notifications to support safer vehicle use for all drivers.'
    },
    functions: ['plus_support_activation', 'acceleration_suppression', 'alert_notification', 'shared_use'],
    valueTags: ['safety', 'shared_vehicle', 'family', 'driving_support'],
    targetContexts: ['shared_vehicle', 'safety_conscious', 'urban', 'parking'],
    primaryValues: [
      { ja: '急加速抑制支援', en: 'Acceleration suppression support' },
      { ja: '警報・ディスプレイ通知', en: 'Alert and display notifications' },
      { ja: '複数ドライバーへの対応', en: 'Support for multiple drivers' },
      { ja: '安心の運転支援環境', en: 'Peace of mind driving support environment' },
    ],
    personalizationSignals: ['safety_interest', 'shared_vehicle', 'urban_parking', 'explicit_safety_need'],
    imageEmoji: '🗝️',
    availableInJapan: true,
    sourceUrl: 'https://toyota.jp/bz4x/accessory/',
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id);

export const getProductsByVehicle = (vehicle: 'fj' | 'bz4x'): Product[] =>
  products.filter(p => p.vehicle === vehicle);
