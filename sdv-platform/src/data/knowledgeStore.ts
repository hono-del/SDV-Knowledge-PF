// ─────────────────────────────────────────────────────────────────────────────
// Knowledge Store — AI Ready処理済みデータの蓄積庫
// パイプライン処理を通じて構造化されたチャンク・リレーションシップの一元管理
// ─────────────────────────────────────────────────────────────────────────────

export interface KnowledgeChunk {
  chunk_id: string;
  chunk_type: string;
  content: string;
  metadata: Record<string, unknown>;
  chunk_tokens: number;
  embedding_dims: number;
}

export interface KnowledgeRelationship {
  from: string;
  fromType: string;
  rel: string;
  relColor: string;
  to: string;
  toType: string;
  source?: string; // vehicle/product group
}

export interface ProcessedSource {
  id: string;
  name: string;
  url: string;
  processedAt: string;
  vehicle: string;
  chunkCount: number;
  relationshipCount: number;
  status: 'active';
}

export const chunkTypeConfig: Record<string, { label: { ja: string; en: string }; color: string; bg: string }> = {
  product_overview:     { label: { ja: '商品概要',     en: 'Product Overview'  }, color: 'text-white',     bg: 'bg-navy-900'   },
  product_function:     { label: { ja: '機能',         en: 'Function'          }, color: 'text-amber-800', bg: 'bg-amber-100'  },
  customer_value_scene: { label: { ja: '価値×シーン',  en: 'Value × Scene'     }, color: 'text-teal-800',  bg: 'bg-teal-100'   },
  target_customer:      { label: { ja: 'ターゲット顧客',en: 'Target Customer'   }, color: 'text-purple-800',bg: 'bg-purple-100' },
  install_info:         { label: { ja: '施工情報',     en: 'Install Info'      }, color: 'text-blue-800',  bg: 'bg-blue-100'   },
  constraint:           { label: { ja: '制約・注意',   en: 'Constraint'        }, color: 'text-red-800',   bg: 'bg-red-100'    },
  price_info:           { label: { ja: '価格情報',     en: 'Price Info'        }, color: 'text-green-800', bg: 'bg-green-100'  },
  campaign:             { label: { ja: 'キャンペーン', en: 'Campaign'          }, color: 'text-pink-800',  bg: 'bg-pink-100'   },
  document_overview:    { label: { ja: '資料概要',     en: 'Document Overview' }, color: 'text-white',     bg: 'bg-indigo-800' },
  market_overview:      { label: { ja: '市場概観',     en: 'Market Overview'   }, color: 'text-indigo-800',bg: 'bg-indigo-100' },
  regional_context:     { label: { ja: '地域文脈',     en: 'Regional Context'  }, color: 'text-cyan-800',  bg: 'bg-cyan-100'   },
  customer_segment:     { label: { ja: '顧客セグメント',en: 'Customer Segment' }, color: 'text-purple-800',bg: 'bg-purple-100' },
  value_messaging:      { label: { ja: '価値メッセージ',en: 'Value Messaging'  }, color: 'text-teal-800',  bg: 'bg-teal-100'   },
  dealer_observation:   { label: { ja: 'Dealer Voice', en: 'Dealer Voice'      }, color: 'text-orange-800',bg: 'bg-orange-100' },
};

// ── FJ Chunks (Land Cruiser "FJ") ─────────────────────────────────────────
export const fjChunks: KnowledgeChunk[] = [
  {
    chunk_id: 'FJ001_08__overview__001', chunk_type: 'product_overview',
    content: 'リモートスタート（ベーシックタイプ）は、ランドクルーザー "FJ"（2026〜）全グレードに対応した遠隔エンジン始動システムです。コンパクトなボディに充実した基本機能を搭載し、乗車前に車内温度を快適に整えられます。保証は3年または6万km。部品代・取付費・保証を含む。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', vehicle_year: '2026〜', grade: '全グレード', category: 'comfort_convenience', entity_type: 'upgrade_product', market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/', source_type: 'public_web', warranty_years: 3, warranty_km: 60000 },
    chunk_tokens: 84, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__function__remote_engine__001', chunk_type: 'product_function',
    content: 'リモートスタート機能：リモートエンジン始動 — リモコン操作で離れた場所からエンジンを始動できる。乗車前にエンジンをかけることで、エアコンも同時に制御され夏冬問わず乗り込み時の車内温度が快適になる。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', function_id: 'remote_engine', function_label: 'リモートエンジン始動', category: 'comfort_convenience', value_tags: ['comfort', 'convenience', 'time_saving'], scene_tags: ['winter_morning', 'summer_heat', 'daily_commute'], target_customer_tags: ['cold_region_user', 'family', 'commuter'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 72, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__function__defrost__001', chunk_type: 'product_function',
    content: 'リモートスタート機能：デフロスター・デフォッガー・ミラーヒーター制御 — フロントガラス・リアガラス・サイドミラーの霜取りをリモートで自動実行。暖機時間は10分・20分・30分の3段階から選択可能。冬の朝に乗り込む前に霜取り完了・暖機完了状態にできる。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', function_id: 'defrost', function_label: 'デフロスター・デフォッガー制御', category: 'comfort_convenience', value_tags: ['cold_weather_comfort', 'safety', 'time_saving'], scene_tags: ['winter_morning', 'cold_region', 'snowy_road'], target_customer_tags: ['cold_region_user', 'outdoor_enthusiast'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 91, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__function__smart_unlock__001', chunk_type: 'product_function',
    content: 'リモートスタート機能：スマートエントリー連動ドア解錠 — リモートスタート作動中にドアの解錠が可能。アンサーバック機能（音・LEDの光）でエンジン始動の確認ができる。リモコン電池残量警告（音・LEDの光）で電池切れを事前に通知。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', function_id: 'smart_unlock', function_label: 'スマートエントリー連動ドア解錠', value_tags: ['convenience', 'usability'], scene_tags: ['daily_commute', 'parking_lot'], target_customer_tags: ['commuter', 'family'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 78, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__value_scene__winter__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 冬の朝・寒冷地】リモートスタートを利用することで、乗り込む前に霜取り＆暖機が完了しエンジン全開で即発進できる。快適・時短・安心という感情ベネフィットを提供。特に寒冷地ユーザーへの適合度が最も高い。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', scene_id: 'winter_morning', scene_label: '冬の朝・寒冷地', value_provided: '乗り込む前に霜取り＆暖機完了', emotion_benefit: ['快適', '時短', '安心'], target_customer_tags: ['cold_region_user', 'outdoor_enthusiast'], fit_score_cold_region: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 89, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__value_scene__summer__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 夏の炎天下・駐車場】リモートスタートでエアコンを事前制御し、灼熱の車内を乗り込み前に冷却。子供やペットが乗車する場合も安全・安心。安全・快適・気遣いの感情ベネフィットを提供。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', scene_id: 'summer_heat', scene_label: '夏の炎天下・駐車場', value_provided: '乗り込み前に車内冷却完了', emotion_benefit: ['安全', '快適', '気遣い'], target_customer_tags: ['family', 'commuter'], fit_score_family: 4, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 83, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__value_scene__commute__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 毎朝の通勤・送迎】出発10分前にリモートスタートでエンジン始動。乗り込んだ瞬間から快適な空間が整っている。便利・ストレスフリーの感情ベネフィット。共働き通勤者・学校送迎ファミリーに適合。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', scene_id: 'daily_commute', scene_label: '毎朝の通勤・送迎', value_provided: '乗り込んだら即快適な空間', emotion_benefit: ['便利', 'ストレスフリー'], target_customer_tags: ['dual_income_commuter', 'family'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 77, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__value_scene__outdoor__001', chunk_type: 'customer_value_scene',
    content: '【シーン: アウトドア・山間地】林道・雪道などの過酷環境でも快適スタートを実現。防寒対策完了の状態で出発できる。タフ・頼もしいの感情ベネフィット。アウトドア愛好家・登山・キャンプユーザーに適合。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', scene_id: 'outdoor_mountain', scene_label: 'アウトドア・山間地', value_provided: '過酷環境でも快適スタート', emotion_benefit: ['タフ', '頼もしい'], target_customer_tags: ['outdoor_enthusiast', 'cold_region_user'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 80, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__target_customer__001', chunk_type: 'target_customer',
    content: 'リモートスタートの主要ターゲット顧客：①寒冷地ユーザー（霜取り・暖機がコア需要 / 適合度5）②ファミリー層（毎朝の送迎・安全性重要 / 適合度4）③アウトドア愛好家（雪山・キャンプの過酷環境対応 / 適合度4）④共働き通勤者（時短・利便性 / 適合度3）',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', target_customers: [{ id: 'cold_region_user', fit_score: 5 }, { id: 'family', fit_score: 4 }, { id: 'outdoor_enthusiast', fit_score: 4 }, { id: 'dual_income_commuter', fit_score: 3 }], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 95, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__install__001', chunk_type: 'install_info',
    content: 'リモートスタートの施工情報：手配期間は最短1ヶ月程度（部品手配・施工場所調整含む）。施工時間は半日〜1日。保証3年または6万km。対象グレード：全グレード。モデリスタ・TRD・GRパーツ装着車は追加費用が発生する場合あり。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', lead_time_min: '1month', work_time: 'half_day_to_1_day', warranty_years: 3, warranty_km: 60000, grade_coverage: 'all_grades', market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 88, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__constraint__001', chunk_type: 'constraint',
    content: 'リモートスタートの注意事項・制約：①T-Connectのリモートスタート（アプリ）と同時装着不可。②植込み型心臓ペースメーカー使用者は発信機から22cm以内に近づけないこと。③一般公道上・密閉空間でのエンジン作動禁止。地方自治体の条例による罰則対象になる場合あり。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', constraint_type: ['compatibility', 'safety', 'legal'], incompatible_with: ['T-Connect Remote Start App'], safety_note: 'pacemaker_22cm_restriction', market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 99, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_02__overview__001', chunk_type: 'product_overview',
    content: 'エアーランバーサポートは、ランドクルーザー "FJ"（2026〜）向けの腰部サポートシステムです。背中とシートの隙間をエアーで充填し体圧を分散。長時間ドライブの疲労軽減・腰痛予防に効果的。保証3年または6万km。',
    metadata: { product_id: 'FJ001_02', product_name: 'エアーランバーサポート', vehicle: 'Land Cruiser FJ', vehicle_year: '2026〜', category: 'comfort_health', entity_type: 'upgrade_product', value_tags: ['fatigue_reduction', 'health', 'long_drive_comfort'], scene_tags: ['long_distance_drive', 'outdoor_return'], target_customer_tags: ['long_distance_driver', 'age_40_60'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_02/', warranty_years: 3, warranty_km: 60000 },
    chunk_tokens: 76, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_02__function__air_lumbar__001', chunk_type: 'product_function',
    content: 'エアーランバーサポート機能：エアークッション腰部サポート — 背中とシートの隙間をエアーで充填し腰部を保持。長時間座位による体圧の集中を分散し、腰痛・疲労を軽減する。エア量は個人の体型・好みに合わせて調節可能。',
    metadata: { product_id: 'FJ001_02', product_name: 'エアーランバーサポート', vehicle: 'Land Cruiser FJ', function_id: 'air_lumbar', function_label: 'エアークッション腰部サポート', value_tags: ['fatigue_reduction', 'health', 'body_pressure_distribution'], scene_tags: ['long_distance_drive', 'outdoor_return'], target_customer_tags: ['long_distance_driver', 'age_40_60'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_02/' },
    chunk_tokens: 76, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_02__value_scene__long_drive__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 長距離ドライブ】エアーランバーサポートにより、3時間超の連続ドライブでも腰痛・疲労を軽減。SAでの休憩回数を減らせる。疲れにくい・健康的という感情ベネフィット。長距離ドライブユーザー・40〜60代に強く適合。',
    metadata: { product_id: 'FJ001_02', product_name: 'エアーランバーサポート', vehicle: 'Land Cruiser FJ', scene_id: 'long_distance_drive', scene_label: '長距離ドライブ', value_provided: '3時間超でも腰痛・疲労を軽減', emotion_benefit: ['疲れにくい', '健康的'], target_customer_tags: ['long_distance_driver', 'age_40_60'], fit_score_long_distance: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_02/' },
    chunk_tokens: 84, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_02__target_customer__001', chunk_type: 'target_customer',
    content: 'エアーランバーサポートの主要ターゲット顧客：①長距離ドライバー（腰痛対策が直結ニーズ / 適合度5）②40〜60代ユーザー（腰部健康への関心が高い年代 / 適合度4）③アウトドア愛好家（キャンプ帰りの疲労回復にも寄与 / 適合度3）',
    metadata: { product_id: 'FJ001_02', product_name: 'エアーランバーサポート', vehicle: 'Land Cruiser FJ', target_customers: [{ id: 'long_distance_driver', fit_score: 5 }, { id: 'age_40_60', fit_score: 4 }, { id: 'outdoor_enthusiast', fit_score: 3 }], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_02/' },
    chunk_tokens: 69, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__overview__001', chunk_type: 'product_overview',
    content: 'シートカバー（撥水）は、ランドクルーザー "FJ"（2026〜）向けの全席対応シートカバーです。撥水加工で水・泥・汗に強く拭き取りやすい。ISOFIX対応でチャイルドシートの固定穴を塞がない設計。アウトドア・ファミリー・ペットオーナーに最適。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', vehicle_year: '2026〜', category: 'protection_style', entity_type: 'upgrade_product', value_tags: ['cleanliness', 'protection', 'asset_value'], scene_tags: ['outdoor_return', 'childcare', 'pet_ride'], target_customer_tags: ['outdoor_enthusiast', 'family', 'pet_owner'], isofix_compatible: true, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/', warranty_years: 1 },
    chunk_tokens: 81, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__function__water_repellent__001', chunk_type: 'product_function',
    content: 'シートカバー機能：撥水加工 — 水・泥・汗・飲み物の飛び散りをはじき、拭き取りだけで清潔を維持できる。シート生地へのダメージを防ぎ、車両の資産価値を保護。アウトドア帰り・子育て・ペット乗車時の汚れに対して特に効果的。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', function_id: 'water_repellent', function_label: '撥水加工', value_tags: ['cleanliness', 'protection', 'asset_value', 'low_maintenance'], scene_tags: ['outdoor_return', 'childcare', 'pet_ride'], target_customer_tags: ['outdoor_enthusiast', 'family', 'pet_owner'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 79, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__function__isofix__001', chunk_type: 'product_function',
    content: 'シートカバー機能：ISOFIX対応設計 — チャイルドシート固定用のISOFIXアンカーポイントを塞がない専用設計。チャイルドシートを取り外すことなくシートカバーを装着・使用できる。子育てファミリーの安全性と利便性を両立。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', function_id: 'isofix_compatible', function_label: 'ISOFIX対応設計', value_tags: ['child_safety', 'convenience', 'family_friendly'], scene_tags: ['childcare', 'school_run'], target_customer_tags: ['family', 'young_parent'], isofix_compatible: true, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 77, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__value_scene__outdoor__001', chunk_type: 'customer_value_scene',
    content: '【シーン: アウトドア帰り・泥汚れ】キャンプ・登山・サーフィン帰りの泥・砂・水濡れも撥水加工で拭き取り一発。シートへのダメージなし。メンテナンスフリー・爽快という感情ベネフィット。アウトドア愛好家に適合度最高。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', scene_id: 'outdoor_return', scene_label: 'アウトドア帰り・泥汚れ', value_provided: '泥・水汚れを拭き取り一発', emotion_benefit: ['メンテナンスフリー', '爽快'], target_customer_tags: ['outdoor_enthusiast'], fit_score_outdoor: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 78, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__value_scene__family__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 子育て・ファミリー乗車】子供の食べこぼし・飲み物の溢れ・汗などをシートカバーが受け止める。ISOFIX対応でチャイルドシートとの共存も問題なし。清潔・安心という感情ベネフィット。ファミリー層に適合度最高。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', scene_id: 'childcare', scene_label: '子育て・ファミリー乗車', value_provided: '食べこぼし・飲み物から清潔に守る', emotion_benefit: ['清潔', '安心'], target_customer_tags: ['family', 'young_parent'], fit_score_family: 5, isofix_compatible: true, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 80, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__value_scene__pet__001', chunk_type: 'customer_value_scene',
    content: '【シーン: ペット同乗】犬・猫の毛・爪・体臭からシートを保護。撥水加工で濡れた犬の体からの水気もはじく。清潔・安心というベネフィット。ペットオーナーに直結する需要。FJの広い荷室と合わせてペット乗車に最適な環境を提供。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', scene_id: 'pet_ride', scene_label: 'ペット同乗', value_provided: 'ペットの毛・爪・水気からシートを保護', emotion_benefit: ['清潔', '安心', '気兼ねなし'], target_customer_tags: ['pet_owner', 'outdoor_enthusiast'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 82, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__target_customer__001', chunk_type: 'target_customer',
    content: 'シートカバー（撥水）の主要ターゲット顧客：①アウトドア愛好家（泥・水への耐性がコア価値 / 適合度5）②ファミリー層（子育て汚れ・ISOFIX対応 / 適合度5）③ペットオーナー（毛・爪・水気からシートを保護 / 適合度4）④スタイル重視ユーザー（外観を損なわず資産価値を保護 / 適合度3）',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', target_customers: [{ id: 'outdoor_enthusiast', fit_score: 5 }, { id: 'family', fit_score: 5 }, { id: 'pet_owner', fit_score: 4 }, { id: 'style_conscious', fit_score: 3 }], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 87, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_08__price__001', chunk_type: 'price_info',
    content: 'リモートスタート（ベーシックタイプ）の価格情報：部品代・取付工賃・3年保証をすべて含んだパッケージ価格。KINTO UPGRADE FACTORYの販売店でログイン後に確認可能。モデリスタ・TRD・GRパーツ等の装着車は追加費用（工賃・部品代）が発生する可能性あり。施工後の実費精算となるケースあり。',
    metadata: { product_id: 'FJ001_08', product_name: 'リモートスタート（ベーシックタイプ）', vehicle: 'Land Cruiser FJ', price_includes: ['parts', 'installation', 'warranty_3yr'], price_visibility: 'login_required', additional_cost_risk: true, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 88, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_02__price__001', chunk_type: 'price_info',
    content: 'エアーランバーサポートの価格情報：部品代・取付工賃・3年保証を含んだパッケージ価格。KINTO UPGRADE FACTORYの販売店でログイン後に確認可能。施工時間が半日程度のため工賃は比較的低め。',
    metadata: { product_id: 'FJ001_02', product_name: 'エアーランバーサポート', vehicle: 'Land Cruiser FJ', price_includes: ['parts', 'installation', 'warranty_3yr'], price_visibility: 'login_required', additional_cost_risk: false, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_02/' },
    chunk_tokens: 61, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ001_05__price__001', chunk_type: 'price_info',
    content: 'シートカバー（撥水）の価格情報：部品代・取付工賃・1年保証を含んだパッケージ価格。KINTO UPGRADE FACTORYの販売店でログイン後に確認可能。施工が数時間程度のため、リモートスタートより工賃は低め。前後全席対応のため部品点数は多い。',
    metadata: { product_id: 'FJ001_05', product_name: 'シートカバー（撥水）', vehicle: 'Land Cruiser FJ', price_includes: ['parts', 'installation', 'warranty_1yr'], price_visibility: 'login_required', warranty_years: 1, seat_count: 'all_seats_front_rear', market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_05/' },
    chunk_tokens: 70, embedding_dims: 1536,
  },
  {
    chunk_id: 'FJ__campaign__limited_towel__001', chunk_type: 'campaign',
    content: '【期間限定プレゼントキャンペーン】KINTO UPGRADE FACTORYを通じてランドクルーザー "FJ"（2026〜）の純正用品を注文したお客様に「オリジナルランドクルーザー "FJ" マイクロファイバータオル」をプレゼント。対象：全純正アクセサリー注文（リモートスタート・エアーランバー・シートカバー等）。期間限定のため詳細はキャンペーン概要PDFを確認。',
    metadata: { campaign_id: 'FJ_TOWEL_CAMPAIGN_2026', campaign_type: 'limited_time_gift', campaign_gift: 'オリジナルランドクルーザー "FJ" マイクロファイバータオル', applicable_products: ['FJ001_08', 'FJ001_02', 'FJ001_05', 'all_FJ_accessories'], vehicle: 'Land Cruiser FJ', vehicle_year: '2026〜', channel: 'KINTO UPGRADE FACTORY', campaign_status: 'active', campaign_period: 'limited_time', market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/products/FJ001_08/' },
    chunk_tokens: 105, embedding_dims: 1536,
  },
];

// ── bZ4X Chunks ────────────────────────────────────────────────────────────
export const bz4xChunks: KnowledgeChunk[] = [
  {
    chunk_id: 'BZ001_01__overview__001', chunk_type: 'product_overview',
    content: '充電ケーブルホルダーは、bZ4X向けの長い充電ケーブルをすっきり整理するオーガナイザーです。収納性と持ち運びやすさを両立。EV特有の充電ケーブル管理問題を解消し、トランクスペースを有効活用できます。',
    metadata: { product_id: 'BZ001_01', product_name: '充電ケーブルホルダー', vehicle: 'bZ4X', vehicle_year: '2022〜', category: 'ev_convenience', entity_type: 'upgrade_product', value_tags: ['convenience', 'ev_usability', 'storage'], scene_tags: ['home_charging', 'ev_commute', 'parking'], target_customer_tags: ['ev_commuter', 'ev_early_adopter'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 73, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_01__function__cable_storage__001', chunk_type: 'product_function',
    content: '充電ケーブルホルダー機能：ケーブル収納・整理整頓 — 最大7mの充電ケーブルを巻き取り、コンパクトに収納。ホルダーとして固定することでトランク内でのケーブルの散乱を防ぐ。EVの毎日の充電ルーティンをストレスフリーにする。',
    metadata: { product_id: 'BZ001_01', product_name: '充電ケーブルホルダー', vehicle: 'bZ4X', function_id: 'cable_storage', function_label: 'ケーブル収納・整理整頓', value_tags: ['convenience', 'storage', 'stress_free'], scene_tags: ['home_charging', 'ev_daily_routine'], target_customer_tags: ['ev_commuter', 'ev_early_adopter'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 79, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_01__value_scene__home_charging__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 自宅充電・毎日のルーティン】自宅で毎晩充電するEVオーナーにとって、ケーブルの取り出し・巻き取りがストレスになる。ホルダーで整頓することで充電作業が快適に。便利・スマートという感情ベネフィット。EV通勤者に高く適合。',
    metadata: { product_id: 'BZ001_01', product_name: '充電ケーブルホルダー', vehicle: 'bZ4X', scene_id: 'home_charging', scene_label: '自宅充電・毎日のルーティン', value_provided: '充電作業をストレスフリーに', emotion_benefit: ['便利', 'スマート'], target_customer_tags: ['ev_commuter'], fit_score_ev_commuter: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 82, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_01__target_customer__001', chunk_type: 'target_customer',
    content: '充電ケーブルホルダーの主要ターゲット顧客：①EV通勤者（毎日の充電作業効率化 / 適合度5）②EVアーリーアダプター（EV体験最適化への関心高い / 適合度4）③ファミリーEVユーザー（子育て・送迎でも快適なEV運用 / 適合度3）',
    metadata: { product_id: 'BZ001_01', product_name: '充電ケーブルホルダー', vehicle: 'bZ4X', target_customers: [{ id: 'ev_commuter', fit_score: 5 }, { id: 'ev_early_adopter', fit_score: 4 }, { id: 'family_ev', fit_score: 3 }], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 76, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_02__overview__001', chunk_type: 'product_overview',
    content: 'レインクリアリングブルーミラーは、bZ4X向けの親水コーティング加工済みサイドミラーです。雨天時の後方視認性をサポートし、水滴がミラーに残らず視界が確保できる。太陽光で親水性が回復・持続する自己回復機能付き。',
    metadata: { product_id: 'BZ001_02', product_name: 'レインクリアリングブルーミラー', vehicle: 'bZ4X', vehicle_year: '2022〜', category: 'safety_visibility', entity_type: 'upgrade_product', value_tags: ['safety', 'visibility', 'rainy_day_confidence'], scene_tags: ['rainy_weather', 'night_driving', 'highway'], target_customer_tags: ['daily_commuter', 'safety_conscious', 'rainy_region_user'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 78, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_02__function__hydrophilic__001', chunk_type: 'product_function',
    content: 'レインクリアリングブルーミラー機能：親水コーティング・自己回復 — 雨水がミラー面に均一に広がり水玉を作らず視界を確保。太陽光（UV）が当たることで親水性が自動回復し、コーティング効果が持続する。ワイパー等の手入れ不要。',
    metadata: { product_id: 'BZ001_02', product_name: 'レインクリアリングブルーミラー', vehicle: 'bZ4X', function_id: 'hydrophilic_coating', function_label: '親水コーティング・自己回復', value_tags: ['safety', 'low_maintenance', 'visibility'], scene_tags: ['rainy_weather', 'highway', 'night_driving'], target_customer_tags: ['daily_commuter', 'safety_conscious'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 80, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_02__value_scene__rainy__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 雨天・高速道路】高速走行中の雨天でもミラーに水滴が残らず後方確認がクリア。車線変更・合流の安全性が向上する。安心・安全・自信という感情ベネフィット。日常の通勤ドライバー・雨天頻度の高い地域ユーザーに適合。',
    metadata: { product_id: 'BZ001_02', product_name: 'レインクリアリングブルーミラー', vehicle: 'bZ4X', scene_id: 'rainy_highway', scene_label: '雨天・高速道路', value_provided: '雨天でも後方視界クリア', emotion_benefit: ['安心', '安全', '自信'], target_customer_tags: ['daily_commuter', 'safety_conscious'], fit_score_safety: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 83, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_03__overview__001', chunk_type: 'product_overview',
    content: 'プラスサポート用スマートキーは、bZ4X向けの安全運転支援起動専用キーです。急加速抑制支援・速度警報・ディスプレイ通知などのプラスサポート機能を、この専用キーを使用したときのみ有効化できます。家族の安全な運転習慣をサポート。',
    metadata: { product_id: 'BZ001_03', product_name: 'プラスサポート用スマートキー', vehicle: 'bZ4X', vehicle_year: '2022〜', category: 'safety_support', entity_type: 'upgrade_product', value_tags: ['safety', 'family_safety', 'driving_support'], scene_tags: ['teen_driver', 'elderly_driver', 'shared_vehicle'], target_customer_tags: ['family', 'safety_conscious', 'senior_household'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 80, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_03__function__speed_control__001', chunk_type: 'product_function',
    content: 'プラスサポート用スマートキー機能：急加速抑制支援・速度警報 — 急なアクセル操作を緩和する急加速抑制。設定速度を超えると音声・ディスプレイで警報。このキーを使用している場合のみ安全支援が有効になり、通常キーでは通常走行が可能。',
    metadata: { product_id: 'BZ001_03', product_name: 'プラスサポート用スマートキー', vehicle: 'bZ4X', function_id: 'speed_control', function_label: '急加速抑制支援・速度警報', value_tags: ['safety', 'accident_prevention', 'peace_of_mind'], scene_tags: ['teen_driver', 'elderly_driver'], target_customer_tags: ['family', 'safety_conscious'], market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 84, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ001_03__value_scene__family_safety__001', chunk_type: 'customer_value_scene',
    content: '【シーン: 家族への車共有・免許取りたて】子供・高齢の親が運転する際にプラスサポートキーを使用させることで急加速・速度超過リスクを低減。安心・安全・気遣いという感情ベネフィット。家族で車を共有するファミリー層に強く訴求。',
    metadata: { product_id: 'BZ001_03', product_name: 'プラスサポート用スマートキー', vehicle: 'bZ4X', scene_id: 'family_shared_vehicle', scene_label: '家族への車共有・免許取りたて', value_provided: '急加速・速度超過リスクを低減', emotion_benefit: ['安心', '安全', '気遣い'], target_customer_tags: ['family', 'senior_household'], fit_score_family: 5, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 86, embedding_dims: 1536,
  },
  {
    chunk_id: 'BZ__price__001', chunk_type: 'price_info',
    content: 'bZ4Xアクセサリー（充電ケーブルホルダー・レインクリアリングブルーミラー・プラスサポート用スマートキー）の価格情報：すべて部品代・取付工賃・保証を含むパッケージ価格。KINTO UPGRADE FACTORYの販売店でログイン後に確認可能。EV車種のため施工注意点あり（HV/EV特有の電気系作業）。',
    metadata: { vehicle: 'bZ4X', applicable_products: ['BZ001_01', 'BZ001_02', 'BZ001_03'], price_includes: ['parts', 'installation', 'warranty'], price_visibility: 'login_required', ev_specific_caution: true, market: 'japan', language: 'ja', source_url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/' },
    chunk_tokens: 82, embedding_dims: 1536,
  },
];

export const DEMO_PDF_FILENAME = 'Regional_Market_Customer_Insight_Guide_DEMO.pdf';
export const DEMO_PDF_PATH = `/demo/${DEMO_PDF_FILENAME}`;

export const isDemoPdfFilename = (name: string | null | undefined): boolean => {
  if (!name) return false;
  const n = name.toLowerCase().replace(/\s+/g, '_');
  return n.includes('regional_market') || n.includes('insight_guide') || n.includes('mkt-insight');
};

const INSIGHT_META = {
  source_id: 'source-insight',
  source_type: 'pdf',
  source_file: DEMO_PDF_FILENAME,
  document_id: 'MKT-INSIGHT-DEMO-001',
  document_version: '1.2',
  hypothesis: true,
  market_scope: ['japan', 'north-america'],
  language: 'ja',
};

// ── PDF Insight Chunks (Regional Market & Customer Insight Guide) ─────────
export const insightChunks: KnowledgeChunk[] = [
  {
    chunk_id: 'INSIGHT__overview__001', chunk_type: 'document_overview',
    content: 'Regional Market & Customer Insight Guide（MKT-INSIGHT-DEMO-001 / v1.2 / 2026-09-15）。商品仕様だけでは説明できない「誰に・どこで・何が価値になるか」を、地域特性・顧客セグメント・利用行動・課題・価値テーマとして整理した仮説インサイト集。実在の調査結果ではなくデモ用仮説。対象範囲は日本／米国サンプル地域。',
    metadata: { ...INSIGHT_META, entity_type: 'insight_document', included_knowledge: ['market_overview', 'regional_context', 'customer_segments', 'pain_points', 'value_messaging'] },
    chunk_tokens: 96, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__market__japan__001', chunk_type: 'market_overview',
    content: '【Japan 市場概観】Key Hypothesis: Language translation ≠ Value translation。日本では通勤・買い物・送迎・週末レジャーが混在し、都市部は短中距離の日常利用が中心。北海道〜沖縄まで気候差が大きく、冬季準備・暑熱対策・山間利用で優先価値が変わる。便利さ・安心・日々の小さな手間削減など、生活に直結する説明が理解されやすい。セールス示唆：「機能が何か」より「いつ役立つか」を生活シーンに置き換える。',
    metadata: { ...INSIGHT_META, market: 'japan', mobility_pattern: 'commute_shopping_school_run_weekend', customer_tendency: ['convenience', 'reassurance', 'daily_friction_reduction'], sales_implication: 'scene_over_spec', value_tags: ['convenience', 'time_saving', 'readiness'] },
    chunk_tokens: 118, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__market__na__001', chunk_type: 'market_overview',
    content: '【North America 市場概観】州や生活圏によって差が大きい。郊外では長距離通勤、Family Trip、週末移動が重要。暑熱・降雨・積雪・山岳など州差が大きく、Market ContextがRecommendationに影響する。Convenience / Safety / Lifestyleとの結び付けと具体的なUse Case提示が重要。同一機能でもTexasとMinnesotaでは訴求軸を変える方が自然。',
    metadata: { ...INSIGHT_META, market: 'north-america', mobility_pattern: 'long_commute_family_trip_weekend', customer_tendency: ['convenience', 'safety', 'lifestyle'], sales_implication: 'state_specific_value_axis', value_tags: ['convenience', 'safety', 'pre_conditioning'] },
    chunk_tokens: 108, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__tokyo__001', chunk_type: 'regional_context',
    content: '【Tokyo / Moderate】環境は都市／郊外。典型利用は通勤・送迎・買い物。摩擦は渋滞、時間効率、短中距離利用。優先価値は Convenience / Time Saving。同じ顧客でも都市の生活導線では「いつ役立つか」の時短説明が刺さる。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'tokyo', climate: 'moderate', environment: ['urban', 'suburban'], typical_use: ['commute', 'school_run', 'shopping'], friction: ['congestion', 'time_efficiency'], priority_value: ['convenience', 'time_saving'] },
    chunk_tokens: 78, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__hokkaido__001', chunk_type: 'regional_context',
    content: '【Hokkaido / Cold & Snow】環境は寒冷／積雪。典型利用は通勤・日常利用・長距離。摩擦は霜、積雪、冬季の乗車前準備。優先価値は Pre-conditioning / Readiness。「乗る前に整う」体験がコアメッセージになる。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'hokkaido', climate: 'cold_snow', environment: ['cold', 'snow'], typical_use: ['commute', 'daily', 'long_distance'], friction: ['frost', 'snow', 'pre_drive_prep'], priority_value: ['pre_conditioning', 'readiness'], linked_products: ['FJ001_08'] },
    chunk_tokens: 76, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__nagano__001', chunk_type: 'regional_context',
    content: '【Nagano / Mountain & Snow】環境は山間／レジャー。典型利用はOutdoor・週末移動。摩擦は雪、山道、汚れ、長時間移動。優先価値は Outdoor / Comfort / Cleanliness。「気兼ねなく使える」変換が有効。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'nagano', climate: 'mountain_snow', environment: ['mountain', 'leisure'], typical_use: ['outdoor', 'weekend'], friction: ['snow', 'mountain_road', 'dirt', 'long_drive'], priority_value: ['outdoor', 'comfort', 'cleanliness'], linked_products: ['FJ001_05', 'FJ001_02'] },
    chunk_tokens: 74, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__okinawa__001', chunk_type: 'regional_context',
    content: '【Okinawa / Hot & Humid】環境は暑熱／高湿度。典型利用はFamily・観光・日常利用。摩擦は強い日差し、乗車直後の暑さ。優先価値は Cabin Comfort / Convenience。乗車前の車内冷却が訴求の中心。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'okinawa', climate: 'hot_humid', environment: ['heat', 'humidity'], typical_use: ['family', 'tourism', 'daily'], friction: ['strong_sun', 'cabin_heat_on_entry'], priority_value: ['cabin_comfort', 'convenience'], linked_products: ['FJ001_08'] },
    chunk_tokens: 72, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__california__001', chunk_type: 'regional_context',
    content: '【California / Warm Mixed】典型モビリティはEV・都市郊外。優先価値は Charging convenience / Digital experience。日常EV利用と充電まわりの手間削減がRecommendationの起点になる。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'california', climate: 'warm_mixed', typical_use: ['ev', 'urban_suburban'], priority_value: ['charging_convenience', 'digital_experience'], linked_products: ['BZ001_01'] },
    chunk_tokens: 62, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__texas__001', chunk_type: 'regional_context',
    content: '【Texas / Hot】典型モビリティは長距離通勤・郊外。優先価値は Pre-conditioning / Long-distance comfort。暑さ対策はConvenienceではなく「乗車直後の体験」として説明した方が伝わりやすい。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'texas', climate: 'hot', typical_use: ['long_commute', 'suburban'], priority_value: ['pre_conditioning', 'long_distance_comfort'], linked_products: ['FJ001_08', 'FJ001_02'] },
    chunk_tokens: 68, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__washington__001', chunk_type: 'regional_context',
    content: '【Washington / Rainy】典型モビリティは通勤・都市郊外。優先価値は Visibility / Weather readiness。雨の日は機能説明よりも「視界がどう変わるか」の具体例が理解されやすい。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'washington', climate: 'rainy', typical_use: ['commute', 'urban_suburban'], priority_value: ['visibility', 'weather_readiness'], linked_products: ['BZ001_02'] },
    chunk_tokens: 64, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__minnesota__001', chunk_type: 'regional_context',
    content: '【Minnesota / Very Cold】典型モビリティは冬季日常利用。優先価値は Winter readiness / Pre-conditioning。冬季利用では「朝の準備」「霜・雪」「毎日の通勤」をセットで聞くとニーズを捉えやすい。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'minnesota', climate: 'very_cold', typical_use: ['winter_daily'], priority_value: ['winter_readiness', 'pre_conditioning'], linked_products: ['FJ001_08'] },
    chunk_tokens: 66, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__colorado__001', chunk_type: 'regional_context',
    content: '【Colorado / Mountain Snow】典型モビリティはOutdoor・長距離レジャー。優先価値は Outdoor readiness / Comfort。雪・山岳・長時間移動が重なるため、快適性とアウトドア耐性が同時に効く。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'colorado', climate: 'mountain_snow', typical_use: ['outdoor', 'long_leisure'], priority_value: ['outdoor_readiness', 'comfort'], linked_products: ['FJ001_05', 'FJ001_02'] },
    chunk_tokens: 64, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__region__newyork__001', chunk_type: 'regional_context',
    content: '【New York / Rain Snow】典型モビリティは都市＋郊外・渋滞。優先価値は Visibility / Convenience。天候変化と時間効率が同時に効くため、視認性と時短の両軸で説明する。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'new-york', climate: 'rain_snow', typical_use: ['urban', 'suburban', 'congestion'], priority_value: ['visibility', 'convenience'] },
    chunk_tokens: 58, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__dealer__washington__001', chunk_type: 'dealer_observation',
    content: '【Dealer / Customer Observation — Washington】“雨の日は機能説明よりも「視界がどう変わるか」の具体例が理解されやすい。” 商品スペックではなく、天候時の見え方を言語化することがRecommendation理由になる。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'washington', voice_type: 'dealer_hypothesis', value_theme: 'visibility', linked_products: ['BZ001_02'] },
    chunk_tokens: 70, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__dealer__texas__001', chunk_type: 'dealer_observation',
    content: '【Dealer / Customer Observation — Texas】“暑さ対策はConvenienceではなく「乗車直後の体験」として説明した方が伝わりやすい。” Cabin Comfortを「家族が乗る前から快適に」へ変換する。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'texas', voice_type: 'dealer_hypothesis', value_theme: 'cabin_comfort', linked_products: ['FJ001_08'] },
    chunk_tokens: 68, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__dealer__minnesota__001', chunk_type: 'dealer_observation',
    content: '【Dealer / Customer Observation — Minnesota】“冬季利用では「朝の準備」「霜・雪」「毎日の通勤」をセットで聞くとニーズを捉えやすい。” ヒアリング順序自体が価値翻訳の一部になる。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'minnesota', voice_type: 'dealer_hypothesis', value_theme: 'readiness', linked_products: ['FJ001_08'] },
    chunk_tokens: 66, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__family__001', chunk_type: 'customer_segment',
    content: '【Family Driver】送迎・買い物・週末外出が中心。価値は Comfort / Convenience / Cleanliness。属性（家族）だけでなく、子供同乗・汚れ・乗車直後の快適さといった行動信号でRecommendationする。',
    metadata: { ...INSIGHT_META, segment_id: 'family_driver', usage: ['school_run', 'shopping', 'weekend'], value_tags: ['comfort', 'convenience', 'cleanliness'], signal_priority: ['pain_point', 'destination', 'family_usage'], linked_products: ['FJ001_08', 'FJ001_05'] },
    chunk_tokens: 72, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__outdoor__001', chunk_type: 'customer_segment',
    content: '【Outdoor User】山・海・キャンプ場利用。価値は Outdoor readiness / Easy cleaning。汚れ・雪・レジャー後のメンテナンス負荷がPain Point。シート保護と快適スタートが同時に効く。',
    metadata: { ...INSIGHT_META, segment_id: 'outdoor_user', usage: ['mountain', 'sea', 'camping'], value_tags: ['outdoor_readiness', 'easy_cleaning'], signal_priority: ['destination', 'pain_point'], linked_products: ['FJ001_05', 'FJ001_08'] },
    chunk_tokens: 68, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__commuter__001', chunk_type: 'customer_segment',
    content: '【Commuter】固定時間帯の日常通勤。価値は Time saving / Comfort。毎朝の準備時間と天候時のストレスが信号。地域（北海道・Washington・Minnesota）と組み合わせると訴求が具体化する。',
    metadata: { ...INSIGHT_META, segment_id: 'commuter', usage: ['fixed_time', 'commute'], value_tags: ['time_saving', 'comfort'], signal_priority: ['driving_distance', 'feature_usage'], linked_products: ['FJ001_08'] },
    chunk_tokens: 66, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__longdistance__001', chunk_type: 'customer_segment',
    content: '【Long-distance Driver】高速道路・遠距離移動、週320km級の走行。価値は Comfort / Fatigue reduction。走行距離信号は快適性・疲労仮説に直結し、ランバーサポート等の提案根拠になる。',
    metadata: { ...INSIGHT_META, segment_id: 'long_distance_driver', usage: ['highway', 'long_distance'], value_tags: ['comfort', 'fatigue_reduction'], signal_priority: ['driving_distance'], linked_products: ['FJ001_02'] },
    chunk_tokens: 64, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__evdaily__001', chunk_type: 'customer_segment',
    content: '【EV Daily User】自宅充電・日常EV利用が重い。価値は Charging convenience / Simplicity。充電ケーブルの片付けなど「毎日の小さな手間」がRecommendation理由になる。',
    metadata: { ...INSIGHT_META, segment_id: 'ev_daily_user', usage: ['home_charging', 'daily_ev'], value_tags: ['charging_convenience', 'simplicity'], signal_priority: ['feature_usage', 'pain_point'], linked_products: ['BZ001_01'] },
    chunk_tokens: 62, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__segment__multidriver__001', chunk_type: 'customer_segment',
    content: '【Multi-driver Household】家族で車両共有。価値は Safety support / Ease of use。誰が運転するかで有効化できる安全支援（プラスサポートキー等）が共有世帯の不安に応える。',
    metadata: { ...INSIGHT_META, segment_id: 'multi_driver_household', usage: ['shared_vehicle'], value_tags: ['safety_support', 'ease_of_use'], signal_priority: ['pain_point', 'family_usage'], linked_products: ['BZ001_03'] },
    chunk_tokens: 64, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__signal__usage__001', chunk_type: 'customer_segment',
    content: '【Recommendation Signal】属性より行動信号を優先する。Driving distance（週320km／長距離）は快適性・疲労仮説へ。Destination（キャンプ場／市街地／高速）はOutdoor／Visibility／Convenienceの優先度を変える。Feature usage（空調／充電／ナビ）は次提案の推定に使う。Pain point（雨の日の視界／車内の汚れ）はRecommendation理由を説明可能にする。',
    metadata: { ...INSIGHT_META, entity_type: 'recommendation_signal', signals: ['driving_distance', 'destination', 'feature_usage', 'pain_point'], principle: 'behavior_over_demographics' },
    chunk_tokens: 110, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__hokkaido_commuter__001', chunk_type: 'value_messaging',
    content: '【Hokkaido × Commuter】観察ニーズは寒い朝の準備負担。価値テーマは Readiness / Comfort。メッセージ方向は「乗る前に整う」体験を前面に。Dealer質問例：「冬の朝、乗車前の準備に時間がかかりますか？」リモートスタートの霜取り・暖機と接続する。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'hokkaido', segment_id: 'commuter', observed_need: 'cold_morning_prep', value_theme: ['readiness', 'comfort'], message_direction: 'ready_before_you_enter', dealer_question: '冬の朝、乗車前の準備に時間がかかりますか？', linked_products: ['FJ001_08'] },
    chunk_tokens: 88, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__texas_family__001', chunk_type: 'value_messaging',
    content: '【Texas × Family】観察ニーズは暑い日の乗車直後。価値テーマは Cabin Comfort。メッセージ方向は「家族が乗る前から快適に」。Dealer質問例：「暑い日に、乗った直後の車内温度は気になりますか？」',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'texas', segment_id: 'family_driver', observed_need: 'hot_cabin_on_entry', value_theme: ['cabin_comfort'], message_direction: 'comfortable_before_family_enters', dealer_question: '暑い日に、乗った直後の車内温度は気になりますか？', linked_products: ['FJ001_08'] },
    chunk_tokens: 82, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__washington_commuter__001', chunk_type: 'value_messaging',
    content: '【Washington × Commuter】観察ニーズは雨天時の視認性。価値テーマは Visibility。メッセージ方向は天候時の見やすさを具体化。Dealer質問例：「雨の日の通勤で、見えづらさを感じることはありますか？」レインミラー等の提案根拠になる。',
    metadata: { ...INSIGHT_META, market: 'north-america', region: 'washington', segment_id: 'commuter', observed_need: 'rain_visibility', value_theme: ['visibility'], message_direction: 'make_weather_visibility_concrete', dealer_question: '雨の日の通勤で、見えづらさを感じることはありますか？', linked_products: ['BZ001_02'] },
    chunk_tokens: 84, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__nagano_outdoor__001', chunk_type: 'value_messaging',
    content: '【Nagano × Outdoor】観察ニーズは汚れ・雪・レジャー利用。価値テーマは Cleanliness / Outdoor。メッセージ方向は「気兼ねなく使える」に変換。Dealer質問例：「キャンプや雪道の後、車内の汚れは気になりますか？」撥水シートカバーと接続する。',
    metadata: { ...INSIGHT_META, market: 'japan', region: 'nagano', segment_id: 'outdoor_user', observed_need: 'dirt_snow_leisure', value_theme: ['cleanliness', 'outdoor'], message_direction: 'use_without_hesitation', dealer_question: 'キャンプや雪道の後、車内の汚れは気になりますか？', linked_products: ['FJ001_05'] },
    chunk_tokens: 86, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__ev_daily__001', chunk_type: 'value_messaging',
    content: '【EV Daily User】観察ニーズは充電まわりの小さな手間。価値テーマは Convenience。メッセージ方向は毎日の充電動作を簡単に。Dealer質問例：「充電ケーブルの片付けを面倒に感じることはありますか？」ケーブルホルダー提案の根拠。',
    metadata: { ...INSIGHT_META, segment_id: 'ev_daily_user', observed_need: 'charging_friction', value_theme: ['convenience'], message_direction: 'simplify_daily_charging', dealer_question: '充電ケーブルの片付けを面倒に感じることはありますか？', linked_products: ['BZ001_01'] },
    chunk_tokens: 80, embedding_dims: 1536,
  },
  {
    chunk_id: 'INSIGHT__msg__principles__001', chunk_type: 'value_messaging',
    content: '【Messaging Principles】①商品仕様の言い換えで終わらず、利用シーンまで落とす。②年齢だけで推薦しない。行動・明示ニーズを優先。③安全・効果は断定せず、支援・期待価値として表現。Context → Value Theme → Message Direction が価値翻訳の基本形。',
    metadata: { ...INSIGHT_META, entity_type: 'messaging_principle', principles: ['scene_not_spec', 'behavior_over_age', 'support_not_claim'] },
    chunk_tokens: 86, embedding_dims: 1536,
  },
];

export const RAW_PDF_TEXT = `【抽出元 PDF】${DEMO_PDF_FILENAME}
Document ID: MKT-INSIGHT-DEMO-001  |  Version 1.2  |  2026-09-15
Scope: Japan / U.S. sample regions
Status: DEMO / HYPOTHESIS

==== Page 1 / PURPOSE ====
地域・顧客文脈を価値翻訳に活用するための仮説インサイト集
商品仕様だけでは説明できない「誰に・どこで・何が価値になるか」を整理する。
実在の調査結果・販売実績を示すものではありません。

==== Page 2 / Market Overview ====
Key Hypothesis: Language translation ≠ Value translation.
市場・気候・利用文脈に応じて「何を価値として前に出すか」を変える。

Japan — 生活導線・日常利便性
・通勤・買い物・送迎・週末レジャーが混在。都市部は短中距離。
・北海道〜沖縄まで気候差。冬季準備・暑熱対策・山間利用。
・「機能が何か」より「いつ役立つか」を生活シーンに置き換える。

North America — 州差・走行距離・気候差
・郊外では長距離通勤、Family Trip、週末移動。
・同一機能でもTexasとMinnesotaでは訴求軸を変える。

==== Page 3 / Japan Regional Context ====
Tokyo     Moderate     Convenience / Time Saving
Hokkaido  Cold & Snow  Pre-conditioning / Readiness
Nagano    Mountain     Outdoor / Comfort / Cleanliness
Okinawa   Hot & Humid  Cabin Comfort / Convenience

==== Page 4 / U.S. State Context ====
California  Charging convenience / Digital experience
Texas       Pre-conditioning / Long-distance comfort
Washington  Visibility / Weather readiness
Minnesota   Winter readiness / Pre-conditioning
Colorado    Outdoor readiness / Comfort
New York    Visibility / Convenience

Dealer Voice:
WA  “雨の日は機能説明よりも視界がどう変わるかの具体例”
TX  “暑さ対策は乗車直後の体験として説明”
MN  “朝の準備・霜雪・毎日の通勤をセットで聞く”

==== Page 5 / Customer Segments ====
Family Driver / Outdoor User / Commuter
Long-distance Driver / EV Daily User / Multi-driver Household
Signals: Driving distance / Destination / Feature usage / Pain point

==== Page 6 / Value Messaging Guide ====
Hokkaido × Commuter  → 「乗る前に整う」
Texas × Family       → 「家族が乗る前から快適に」
Washington × Commuter→ 天候時の見やすさを具体化
Nagano × Outdoor     → 「気兼ねなく使える」
EV Daily User        → 毎日の充電動作を簡単に`;

export const insightRelationships: KnowledgeRelationship[] = [
  { from: '北海道', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: 'Readiness', toType: 'value', source: 'insight' },
  { from: '北海道', fromType: 'region', rel: 'fits_product', relColor: 'gold', to: 'リモートスタート', toType: 'product', source: 'insight' },
  { from: '東京', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: '時短・利便性', toType: 'value', source: 'insight' },
  { from: '長野', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: 'Cleanliness', toType: 'value', source: 'insight' },
  { from: '長野', fromType: 'region', rel: 'fits_product', relColor: 'gold', to: 'シートカバー', toType: 'product', source: 'insight' },
  { from: '沖縄', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: 'Cabin Comfort', toType: 'value', source: 'insight' },
  { from: 'Texas', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: '乗車直後の快適', toType: 'value', source: 'insight' },
  { from: 'Texas', fromType: 'region', rel: 'fits_product', relColor: 'gold', to: 'リモートスタート', toType: 'product', source: 'insight' },
  { from: 'Washington', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: 'Visibility', toType: 'value', source: 'insight' },
  { from: 'Washington', fromType: 'region', rel: 'fits_product', relColor: 'gold', to: 'レインミラー', toType: 'product', source: 'insight' },
  { from: 'Minnesota', fromType: 'region', rel: 'prioritizes', relColor: 'teal', to: 'Winter readiness', toType: 'value', source: 'insight' },
  { from: 'California', fromType: 'region', rel: 'fits_product', relColor: 'gold', to: 'ケーブルホルダー', toType: 'product', source: 'insight' },
  { from: 'Family Driver', fromType: 'customer', rel: 'values', relColor: 'purple', to: 'Comfort / Cleanliness', toType: 'value', source: 'insight' },
  { from: 'Outdoor User', fromType: 'customer', rel: 'values', relColor: 'purple', to: 'Outdoor readiness', toType: 'value', source: 'insight' },
  { from: 'Outdoor User', fromType: 'customer', rel: 'fits_product', relColor: 'gold', to: 'シートカバー', toType: 'product', source: 'insight' },
  { from: 'Commuter', fromType: 'customer', rel: 'values', relColor: 'purple', to: 'Time saving', toType: 'value', source: 'insight' },
  { from: 'EV Daily User', fromType: 'customer', rel: 'fits_product', relColor: 'gold', to: 'ケーブルホルダー', toType: 'product', source: 'insight' },
  { from: 'Multi-driver', fromType: 'customer', rel: 'fits_product', relColor: 'gold', to: 'スマートキー', toType: 'product', source: 'insight' },
  { from: 'Hokkaido×Commuter', fromType: 'scene', rel: 'message_is', relColor: 'blue', to: '乗る前に整う', toType: 'value', source: 'insight' },
  { from: 'Texas×Family', fromType: 'scene', rel: 'message_is', relColor: 'blue', to: '乗る前から快適に', toType: 'value', source: 'insight' },
  { from: 'Washington×Commuter', fromType: 'scene', rel: 'message_is', relColor: 'blue', to: '視界の具体化', toType: 'value', source: 'insight' },
  { from: 'Nagano×Outdoor', fromType: 'scene', rel: 'message_is', relColor: 'blue', to: '気兼ねなく使える', toType: 'value', source: 'insight' },
  { from: 'Dealer Voice WA', fromType: 'customer', rel: 'informs', relColor: 'amber', to: 'Visibility訴求', toType: 'value', source: 'insight' },
  { from: 'Dealer Voice TX', fromType: 'customer', rel: 'informs', relColor: 'amber', to: '乗車直後体験', toType: 'value', source: 'insight' },
];

export const pdfPipelineSteps = [
  { id: 'source_connected', label: { ja: 'PDF受付', en: 'PDF Received' }, detail: { ja: `${DEMO_PDF_FILENAME} を受信`, en: `Received ${DEMO_PDF_FILENAME}` } },
  { id: 'content_extraction', label: { ja: 'PDFテキスト抽出', en: 'PDF Text Extraction' }, detail: { ja: '6ページ・レイアウト解析・テキスト抽出', en: 'Parsing 6 pages, layout, and text' } },
  { id: 'content_cleaning', label: { ja: 'ノイズ除去・クリーニング', en: 'Noise Removal & Cleaning' }, detail: { ja: 'ヘッダー/フッター・ページ番号・DEMOラベルを除去', en: 'Removing headers, footers, page numbers, DEMO labels' } },
  { id: 'semantic_chunking', label: { ja: 'セマンティックチャンキング', en: 'Semantic Chunking' }, detail: { ja: '市場・地域・セグメント・メッセージ単位で分割', en: 'Splitting by market / region / segment / message' } },
  { id: 'metadata_enrichment', label: { ja: 'メタデータ付与', en: 'Metadata Enrichment' }, detail: { ja: '市場・地域・顧客・価値テーマ・仮説フラグを付与', en: 'Tagging market / region / customer / value theme / hypothesis' } },
  { id: 'relationship_mapping', label: { ja: 'リレーションシップマッピング', en: 'Relationship Mapping' }, detail: { ja: '地域↔価値↔顧客↔商品の関係を構造化', en: 'Structuring region ↔ value ↔ customer ↔ product' } },
  { id: 'validation', label: { ja: 'バリデーション', en: 'Validation' }, detail: { ja: '仮説フラグ・スコープ・必須フィールドチェック', en: 'Hypothesis flag, scope, required field check' } },
  { id: 'ai_ready', label: { ja: 'AI Ready 登録完了', en: 'AI Ready — Registered' }, detail: { ja: 'ナレッジベースへ書き込み完了', en: 'Written to knowledge base' } },
];

export const insightRegionCards = [
  { id: 'tokyo', name: { ja: '東京', en: 'Tokyo' }, climate: 'Moderate', priority: 'Convenience / Time Saving', friction: { ja: '渋滞・時間効率', en: 'Congestion, time efficiency' } },
  { id: 'hokkaido', name: { ja: '北海道', en: 'Hokkaido' }, climate: 'Cold & Snow', priority: 'Pre-conditioning / Readiness', friction: { ja: '霜・積雪・乗車前準備', en: 'Frost, snow, pre-drive prep' } },
  { id: 'nagano', name: { ja: '長野', en: 'Nagano' }, climate: 'Mountain & Snow', priority: 'Outdoor / Comfort / Cleanliness', friction: { ja: '雪・汚れ・長時間移動', en: 'Snow, dirt, long travel' } },
  { id: 'okinawa', name: { ja: '沖縄', en: 'Okinawa' }, climate: 'Hot & Humid', priority: 'Cabin Comfort / Convenience', friction: { ja: '日差し・乗車直後の暑さ', en: 'Sun, cabin heat on entry' } },
  { id: 'texas', name: { ja: 'Texas', en: 'Texas' }, climate: 'Hot', priority: 'Pre-conditioning / Long-distance comfort', friction: { ja: '暑い日の乗車直後', en: 'Hot cabin on entry' } },
  { id: 'washington', name: { ja: 'Washington', en: 'Washington' }, climate: 'Rainy', priority: 'Visibility / Weather readiness', friction: { ja: '雨天時の視認性', en: 'Rain visibility' } },
];

export const insightSegmentCards = [
  { id: 'family', name: 'Family Driver', usage: { ja: '送迎・買い物・週末', en: 'School run, shopping, weekend' }, value: 'Comfort / Convenience / Cleanliness' },
  { id: 'outdoor', name: 'Outdoor User', usage: { ja: '山・海・キャンプ', en: 'Mountain, sea, camping' }, value: 'Outdoor readiness / Easy cleaning' },
  { id: 'commuter', name: 'Commuter', usage: { ja: '固定時間帯の通勤', en: 'Fixed-time commute' }, value: 'Time saving / Comfort' },
  { id: 'ev', name: 'EV Daily User', usage: { ja: '自宅充電・日常EV', en: 'Home charging, daily EV' }, value: 'Charging convenience / Simplicity' },
];

// ── All Chunks Combined ────────────────────────────────────────────────────
export const allChunks: KnowledgeChunk[] = [...fjChunks, ...bz4xChunks, ...insightChunks];

// ── Relationships ──────────────────────────────────────────────────────────
export const fjRelationships: KnowledgeRelationship[] = [
  { from: 'リモートスタート', fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '快適性',           toType: 'value',    source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '時短・利便性',     toType: 'value',    source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'useful_in',          relColor: 'blue',   to: '冬の寒冷地',       toType: 'scene',    source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'useful_in',          relColor: 'blue',   to: '夏の炎天下',       toType: 'scene',    source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: '寒冷地ユーザー',   toType: 'customer', source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: 'ファミリー層',     toType: 'customer', source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: 'アウトドア愛好家', toType: 'customer', source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'has_function',       relColor: 'gold',   to: 'エアコン事前制御', toType: 'function', source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'has_function',       relColor: 'gold',   to: 'デフロスター制御', toType: 'function', source: 'fj' },
  { from: 'リモートスタート', fromType: 'product', rel: 'has_function',       relColor: 'gold',   to: '暖機タイマー',     toType: 'function', source: 'fj' },
  { from: 'エアーランバー',   fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '疲労軽減',         toType: 'value',    source: 'fj' },
  { from: 'エアーランバー',   fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '健康・快適性',     toType: 'value',    source: 'fj' },
  { from: 'エアーランバー',   fromType: 'product', rel: 'useful_in',          relColor: 'blue',   to: '長距離ドライブ',   toType: 'scene',    source: 'fj' },
  { from: 'エアーランバー',   fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: '長距離ドライバー', toType: 'customer', source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '清潔維持',         toType: 'value',    source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'provides',           relColor: 'teal',   to: '資産価値保護',     toType: 'value',    source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'useful_in',          relColor: 'blue',   to: 'アウトドア帰り',   toType: 'scene',    source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'useful_in',          relColor: 'blue',   to: 'ペット・子育て',   toType: 'scene',    source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: 'ファミリー層',     toType: 'customer', source: 'fj' },
  { from: 'シートカバー',     fromType: 'product', rel: 'suitable_for',       relColor: 'purple', to: 'アウトドア愛好家', toType: 'customer', source: 'fj' },
  { from: 'ファミリー層',     fromType: 'customer',rel: 'frequently_combines', relColor: 'amber',  to: 'シートカバー + リモスタ', toType: 'bundle', source: 'fj' },
  { from: 'アウトドア愛好家', fromType: 'customer',rel: 'frequently_combines', relColor: 'amber',  to: 'リモスタ + シートカバー', toType: 'bundle', source: 'fj' },
];

export const bz4xRelationships: KnowledgeRelationship[] = [
  { from: 'ケーブルホルダー',   fromType: 'product', rel: 'provides',     relColor: 'teal',   to: '利便性',           toType: 'value',    source: 'bz4x' },
  { from: 'ケーブルホルダー',   fromType: 'product', rel: 'useful_in',    relColor: 'blue',   to: '自宅充電',         toType: 'scene',    source: 'bz4x' },
  { from: 'ケーブルホルダー',   fromType: 'product', rel: 'suitable_for', relColor: 'purple', to: 'EV通勤者',         toType: 'customer', source: 'bz4x' },
  { from: 'ケーブルホルダー',   fromType: 'product', rel: 'suitable_for', relColor: 'purple', to: 'EVアーリーアダプター', toType: 'customer', source: 'bz4x' },
  { from: 'レインミラー',       fromType: 'product', rel: 'provides',     relColor: 'teal',   to: '視認性向上',       toType: 'value',    source: 'bz4x' },
  { from: 'レインミラー',       fromType: 'product', rel: 'provides',     relColor: 'teal',   to: '安全性',           toType: 'value',    source: 'bz4x' },
  { from: 'レインミラー',       fromType: 'product', rel: 'useful_in',    relColor: 'blue',   to: '雨天・高速道路',   toType: 'scene',    source: 'bz4x' },
  { from: 'レインミラー',       fromType: 'product', rel: 'suitable_for', relColor: 'purple', to: '安全意識高ユーザー', toType: 'customer', source: 'bz4x' },
  { from: 'スマートキー',       fromType: 'product', rel: 'provides',     relColor: 'teal',   to: '家族の安全',       toType: 'value',    source: 'bz4x' },
  { from: 'スマートキー',       fromType: 'product', rel: 'useful_in',    relColor: 'blue',   to: '家族への車共有',   toType: 'scene',    source: 'bz4x' },
  { from: 'スマートキー',       fromType: 'product', rel: 'suitable_for', relColor: 'purple', to: 'ファミリー層',     toType: 'customer', source: 'bz4x' },
  { from: 'EV通勤者',           fromType: 'customer',rel: 'frequently_combines', relColor: 'amber', to: 'ケーブルホルダー + レインミラー', toType: 'bundle', source: 'bz4x' },
];

export const allRelationships: KnowledgeRelationship[] = [...fjRelationships, ...bz4xRelationships, ...insightRelationships];

// ── Processed Sources ──────────────────────────────────────────────────────
export const processedSources: ProcessedSource[] = [
  {
    id: 'source-fj',
    name: 'KINTO UPGRADE FACTORY — Land Cruiser "FJ"',
    url: 'https://factory.kinto-jp.com/products/FJ001_08/',
    processedAt: '2026-10-06T09:05:24Z',
    vehicle: 'Land Cruiser FJ',
    chunkCount: fjChunks.length,
    relationshipCount: fjRelationships.length,
    status: 'active',
  },
  {
    id: 'source-bz4x',
    name: 'KINTO UPGRADE FACTORY — bZ4X',
    url: 'https://factory.kinto-jp.com/cp/BZ001-BZT01/',
    processedAt: '2026-10-05T14:22:10Z',
    vehicle: 'bZ4X',
    chunkCount: bz4xChunks.length,
    relationshipCount: bz4xRelationships.length,
    status: 'active',
  },
  {
    id: 'source-insight',
    name: 'Regional Market & Customer Insight Guide (PDF)',
    url: DEMO_PDF_PATH,
    processedAt: '2026-10-07T00:00:00Z',
    vehicle: 'Cross-market Insight',
    chunkCount: insightChunks.length,
    relationshipCount: insightRelationships.length,
    status: 'active',
  },
];
