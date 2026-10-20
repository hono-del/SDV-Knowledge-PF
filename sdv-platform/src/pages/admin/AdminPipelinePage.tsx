import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { CheckCircle, Clock, ArrowRight, ChevronRight, Tag, Users, Zap, MapPin, AlertCircle, Star } from 'lucide-react';
import {
  fjChunks as storefjChunks,
  fjRelationships as storefjRelationships,
  chunkTypeConfig as storeChunkTypeConfig,
  insightChunks,
  insightRelationships,
  RAW_PDF_TEXT,
  pdfPipelineSteps,
  insightRegionCards,
  insightSegmentCards,
  isDemoPdfFilename,
  DEMO_PDF_FILENAME,
} from '../../data/knowledgeStore';

const pipelineSteps = [
  { id: 'source_connected', label: { ja: 'ソース接続', en: 'Source Connected' }, detail: { ja: 'KINTO FACTORY Web接続確立', en: 'Connected to KINTO FACTORY Web' } },
  { id: 'content_extraction', label: { ja: 'コンテンツ抽出', en: 'Content Extraction' }, detail: { ja: 'HTML・テキスト・メタデータを取得', en: 'Extracting HTML, text, metadata' } },
  { id: 'content_cleaning', label: { ja: 'ノイズ除去・クリーニング', en: 'Noise Removal & Cleaning' }, detail: { ja: 'ナビ・フッター・広告を除去', en: 'Removing nav, footer, ads' } },
  { id: 'semantic_chunking', label: { ja: 'セマンティックチャンキング', en: 'Semantic Chunking' }, detail: { ja: '意味単位で分割（商品・機能・シーン別）', en: 'Splitting by meaning units (product / feature / scene)' } },
  { id: 'metadata_enrichment', label: { ja: 'メタデータ付与', en: 'Metadata Enrichment' }, detail: { ja: '車種・市場・顧客価値タグを自動付与', en: 'Auto-tagging vehicle / market / customer value' } },
  { id: 'relationship_mapping', label: { ja: 'リレーションシップマッピング', en: 'Relationship Mapping' }, detail: { ja: '商品↔機能↔顧客↔シーンの関係を構造化', en: 'Structuring product ↔ feature ↔ customer ↔ scene' } },
  { id: 'validation', label: { ja: 'バリデーション', en: 'Validation' }, detail: { ja: '必須フィールド・矛盾チェック', en: 'Required fields & consistency check' } },
  { id: 'ai_ready', label: { ja: 'AI Ready 登録完了', en: 'AI Ready — Registered' }, detail: { ja: 'ナレッジベースへ書き込み完了', en: 'Written to knowledge base' } },
];

// ── FJ Remote Start: rich knowledge units ─────────────────────────────────
const fjKnowledgeUnits = [
  {
    productId: 'FJ001_08',
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_08/',
    vehicle: { ja: 'ランドクルーザー "FJ" (2026〜)', en: 'Land Cruiser "FJ" (2026〜)' },
    grade: { ja: '全グレード対応', en: 'All grades' },
    name: { ja: 'リモートスタート（ベーシックタイプ）', en: 'Remote Start (Basic Type)' },
    category: { ja: 'コンフォート・利便性', en: 'Comfort & Convenience' },
    warranty: { ja: '3年 または 6万km', en: '3 years or 60,000 km' },
    functions: [
      { id: 'remote_engine', label: { ja: 'リモートエンジン始動', en: 'Remote Engine Start' }, detail: { ja: 'リモコン操作で離れた場所からエンジン始動', en: 'Start engine remotely via key fob' } },
      { id: 'pre_ac', label: { ja: 'エアコン事前制御', en: 'Pre-conditioning A/C' }, detail: { ja: '乗り込む前に車内温度を自動調整', en: 'Adjust cabin temperature before entering' } },
      { id: 'defrost', label: { ja: 'デフロスター・デフォッガー制御', en: 'Defrost / Defogger' }, detail: { ja: 'フロントガラス・リアガラス・ミラーの霜取り', en: 'Clears frost from windshield, rear glass, mirrors' } },
      { id: 'smart_unlock', label: { ja: 'スマートエントリー連動ドア解錠', en: 'Smart Entry Door Unlock' }, detail: { ja: 'リモスタ作動中にドアを解錠可能', en: 'Unlock doors while remote start is active' } },
      { id: 'warmup_timer', label: { ja: '暖機時間 3段階設定', en: '3-Stage Warm-up Timer' }, detail: { ja: '10分 / 20分 / 30分 から選択', en: 'Choose 10 / 20 / 30 min warm-up' } },
      { id: 'answer_back', label: { ja: 'アンサーバック機能', en: 'Answer-back Confirmation' }, detail: { ja: '音・LED点灯でリモート始動を確認', en: 'Confirm remote start with beep & LED' } },
      { id: 'battery_alert', label: { ja: 'リモコン電池残量警告', en: 'Remote Battery Alert' }, detail: { ja: '電池切れ前に音・LEDで事前通知', en: 'Alerts before remote battery dies' } },
    ],
    customerValue: [
      { scene: { ja: '冬の朝・寒冷地', en: 'Winter morning / Cold region' }, value: { ja: '乗り込む前に霜取り＆暖機完了。エンジン全開で即発進', en: 'Frost cleared & engine warmed up before you enter' }, emotion: { ja: '快適・時短・安心', en: 'Comfortable, time-saving, reassured' }, icon: '❄️' },
      { scene: { ja: '夏の炎天下・駐車場', en: 'Summer heat / Parking lot' }, value: { ja: '灼熱の車内を乗り込み前に冷却。子供・ペットも安心', en: 'Cabin cooled before entry — safe for kids & pets' }, emotion: { ja: '安全・快適・気遣い', en: 'Safe, comfortable, caring' }, icon: '☀️' },
      { scene: { ja: '毎朝の通勤・送迎', en: 'Daily commute / School run' }, value: { ja: '出発10分前にスタート。乗り込んだら即快適な空間', en: 'Start 10 min before. Comfortable cabin on entry' }, emotion: { ja: '便利・ストレスフリー', en: 'Convenient, stress-free' }, icon: '🚘' },
      { scene: { ja: 'アウトドア・山間地', en: 'Outdoor / Mountain area' }, value: { ja: '林道・雪道でも快適スタート。防寒対策完了で出発', en: 'Comfortable start on snowy/forest roads' }, emotion: { ja: 'タフ・頼もしい', en: 'Tough, reliable' }, icon: '🏔️' },
    ],
    targetCustomer: [
      { tag: { ja: '寒冷地ユーザー', en: 'Cold-region Users' }, reason: { ja: '霜取り・暖機がコア需要', en: 'Defrost & warm-up directly solve their pain' }, strength: 5 },
      { tag: { ja: 'ファミリー層', en: 'Family Users' }, reason: { ja: '子供の送迎で毎朝使用。快適性・安全性が重要', en: 'Daily school run — comfort & safety matter' }, strength: 4 },
      { tag: { ja: 'アウトドア愛好家', en: 'Outdoor Enthusiasts' }, reason: { ja: '雪山・キャンプで過酷環境スタートをサポート', en: 'Supports starts in harsh outdoor conditions' }, strength: 4 },
      { tag: { ja: '共働き通勤者', en: 'Dual-income Commuters' }, reason: { ja: '時短・利便性ニーズが高く導入ハードル低い', en: 'High time-saving demand, easy adoption' }, strength: 3 },
    ],
    constraints: [
      { ja: 'T-Connect リモートスタート（アプリ）と併用不可', en: 'Cannot be used with T-Connect Remote Start (app)' },
      { ja: '植込み型ペースメーカー使用者は要注意（22cm以内に近づけない）', en: 'Pacemaker users must keep 22 cm away from transmitter' },
      { ja: '一般公道上や密閉空間でのエンジン作動は禁止', en: 'Do not operate engine on public roads or enclosed spaces' },
    ],
    install: { leadTime: { ja: '最短1ヶ月', en: 'Min. 1 month' }, workTime: { ja: '半日〜1日', en: 'Half-day to 1 day' } },
    market: ['japan'],
  },
  {
    productId: 'FJ001_02',
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_02/',
    vehicle: { ja: 'ランドクルーザー "FJ" (2026〜)', en: 'Land Cruiser "FJ" (2026〜)' },
    grade: { ja: '全グレード対応', en: 'All grades' },
    name: { ja: 'エアーランバーサポート', en: 'Air Lumbar Support' },
    category: { ja: 'コンフォート・健康', en: 'Comfort & Health' },
    warranty: { ja: '3年 または 6万km', en: '3 years or 60,000 km' },
    functions: [
      { id: 'air_lumbar', label: { ja: 'エアークッション腰部サポート', en: 'Air Cushion Lumbar Support' }, detail: { ja: '背中とシートの隙間をエアーで充填し腰部を保持', en: 'Air fills gap between back and seat to support lumbar' } },
      { id: 'pressure_distribution', label: { ja: '体圧分散', en: 'Pressure Distribution' }, detail: { ja: '長時間座位による圧力集中を分散', en: 'Distributes concentrated pressure from prolonged sitting' } },
      { id: 'adjustable', label: { ja: 'エア量調整', en: 'Adjustable Air Volume' }, detail: { ja: '個人の体型・好みに合わせてエア量を調節', en: 'Adjust air volume to individual body shape' } },
    ],
    customerValue: [
      { scene: { ja: '長距離ドライブ', en: 'Long-distance Drive' }, value: { ja: '3時間超のドライブでも腰痛・疲労を軽減', en: 'Reduces back pain & fatigue on 3h+ drives' }, emotion: { ja: '疲れにくい・健康的', en: 'Less fatigue, healthier' }, icon: '🛣️' },
      { scene: { ja: 'アウトドア帰り', en: 'After Outdoor Activity' }, value: { ja: 'キャンプ・登山後の疲れた身体に優しいサポート', en: 'Gentle support for tired body after camping/hiking' }, emotion: { ja: 'リカバリー・快適', en: 'Recovery, comfort' }, icon: '⛺' },
    ],
    targetCustomer: [
      { tag: { ja: '長距離ドライブユーザー', en: 'Long-distance Drivers' }, reason: { ja: '腰痛対策として直結ニーズ', en: 'Direct need for back pain prevention' }, strength: 5 },
      { tag: { ja: '40〜60代ユーザー', en: '40s–60s Users' }, reason: { ja: '腰部健康への関心が高い年代', en: 'Age group with high lumbar health awareness' }, strength: 4 },
    ],
    constraints: [],
    install: { leadTime: { ja: '最短1ヶ月', en: 'Min. 1 month' }, workTime: { ja: '半日', en: 'Half-day' } },
    market: ['japan'],
  },
  {
    productId: 'FJ001_05',
    sourceUrl: 'https://factory.kinto-jp.com/products/FJ001_05/',
    vehicle: { ja: 'ランドクルーザー "FJ" (2026〜)', en: 'Land Cruiser "FJ" (2026〜)' },
    grade: { ja: '全グレード対応', en: 'All grades' },
    name: { ja: 'シートカバー（撥水）', en: 'Water-repellent Seat Cover' },
    category: { ja: 'プロテクション・スタイル', en: 'Protection & Style' },
    warranty: { ja: '1年', en: '1 year' },
    functions: [
      { id: 'water_repellent', label: { ja: '撥水加工', en: 'Water-repellent Coating' }, detail: { ja: '水・泥・汗をはじき、拭き取りやすい表面', en: 'Repels water, mud, sweat — easy wipe clean' } },
      { id: 'isofix', label: { ja: 'ISOFIX対応', en: 'ISOFIX Compatible' }, detail: { ja: 'チャイルドシート固定穴を塞がない設計', en: 'Designed not to obstruct ISOFIX child seat anchors' } },
      { id: 'full_coverage', label: { ja: '全席カバー', en: 'Full Seat Coverage' }, detail: { ja: '前後全席のシートをカバー', en: 'Covers all front and rear seats' } },
    ],
    customerValue: [
      { scene: { ja: 'アウトドア後・泥汚れ', en: 'Post-outdoor / Mud dirt' }, value: { ja: 'キャンプ・登山帰りの泥汚れも拭き取り一発', en: 'Wipe off mud from camping/hiking in seconds' }, emotion: { ja: 'メンテナンスフリー・爽快', en: 'Low-maintenance, clean' }, icon: '🏕️' },
      { scene: { ja: '子育て・チャイルドシート', en: 'Childcare / Child seat' }, value: { ja: '食べこぼし・飲み物をはじき、シートを清潔に保つ', en: 'Repels spills from kids, keeps seat hygienic' }, emotion: { ja: '清潔・安心', en: 'Hygienic, reassured' }, icon: '👨‍👩‍👧' },
      { scene: { ja: 'ペット同乗', en: 'With pets' }, value: { ja: '犬・猫の毛・爪からシートを守る', en: 'Protects seat from pet hair and claws' }, emotion: { ja: '安心・きれい', en: 'Safe, clean' }, icon: '🐕' },
    ],
    targetCustomer: [
      { tag: { ja: 'アウトドア愛好家', en: 'Outdoor Enthusiasts' }, reason: { ja: '泥・水への抵抗力がコア価値', en: 'Water & mud resistance is core value' }, strength: 5 },
      { tag: { ja: 'ファミリー層', en: 'Family Users' }, reason: { ja: '子育てでの汚れ・チャイルドシート必須', en: 'Child-rearing spills & ISOFIX compatibility' }, strength: 5 },
      { tag: { ja: 'ペットオーナー', en: 'Pet Owners' }, reason: { ja: 'ペット乗車時の汚れ保護に直結', en: 'Directly protects against pet-related damage' }, strength: 4 },
    ],
    constraints: [],
    install: { leadTime: { ja: '最短2週間', en: 'Min. 2 weeks' }, workTime: { ja: '数時間', en: 'A few hours' } },
    market: ['japan'],
  },
];


// ── チャンクデータ・リレーションシップは knowledgeStore から利用 ──────────────
const fjChunks = storefjChunks;
const fjRelationships = storefjRelationships;
const chunkTypeConfig = storeChunkTypeConfig;



// ─── ChunkCard ────────────────────────────────────────────────────────────
const ChunkCard: React.FC<{ chunk: typeof fjChunks[0]; lang: 'ja' | 'en' }> = ({ chunk, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = chunkTypeConfig[chunk.chunk_type] ?? { label: { ja: chunk.chunk_type, en: chunk.chunk_type }, color: 'text-gray-700', bg: 'bg-gray-100' };
  const meta = chunk.metadata as Record<string, unknown>;

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.color}`}>
          {cfg.label[lang]}
        </span>
        <span className="font-mono text-xs text-gray-400 flex-1 truncate">{chunk.chunk_id}</span>
        <div className="flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
          <span>{chunk.chunk_tokens} tokens</span>
          <span>{chunk.embedding_dims}d</span>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-teal-600 hover:text-teal-800 font-medium"
          >
            {expanded ? (lang === 'ja' ? '▲ 閉じる' : '▲ Close') : (lang === 'ja' ? '▼ メタデータ' : '▼ Metadata')}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700 leading-relaxed">{chunk.content}</p>
      </div>

      {/* Metadata (expandable) */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-950 px-4 py-3">
          <div className="text-xs text-gray-400 mb-1.5 font-mono"># metadata</div>
          <div className="space-y-1">
            {Object.entries(meta).map(([k, v]) => (
              <div key={k} className="flex gap-2 font-mono text-xs">
                <span className="text-purple-400 flex-shrink-0 w-44 truncate">{k}:</span>
                <span className={`${
                  typeof v === 'number' ? 'text-amber-300' :
                  typeof v === 'boolean' ? 'text-green-400' :
                  Array.isArray(v) ? 'text-blue-300' :
                  typeof v === 'object' ? 'text-blue-300' :
                  'text-green-300'
                }`}>
                  {Array.isArray(v)
                    ? `[${(v as unknown[]).map(x => typeof x === 'object' ? JSON.stringify(x) : `"${x}"`).join(', ')}]`
                    : typeof v === 'object' && v !== null
                      ? JSON.stringify(v)
                      : typeof v === 'string'
                        ? `"${v}"`
                        : String(v)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800 text-xs font-mono">
            <span className="text-purple-400">embedding_dims:</span>{' '}
            <span className="text-amber-300">{chunk.embedding_dims}</span>
            <span className="text-gray-600 ml-3">// float32 vector, ready for retrieval</span>
          </div>
        </div>
      )}
    </div>
  );
};

const RAW_FJ = `【抽出元 URL】https://factory.kinto-jp.com/products/FJ001_08/

==== 商品ページ テキスト抽出 ====

ランドクルーザー"FJ"(2026～) 商品一覧
# リモートスタート(ベーシックタイプ)
※部品代・取付費・保証 含む  保証：3年または6万km

## おすすめポイント
コンパクトなボディに充実した基本機能を搭載したリモートスタートです。
離れた場所からリモコン操作でエンジンを始動。
エンジンのリモートでの作動のほかにも、乗車前のエアコン制御により
夏でも冬でも乗り込み時は快適な室温にすることができます。
その他にも、冬の霜取りなども乗車前に解消させられたり、
暖機を3段階の時間でセットしておくことも可能です。

## 主なリモートスタート機能
・リモートエンジン作動
・アンサーバック機能(音・LEDの光)
・電池残量警告表示(音・LEDの光)
・エアコン制御機能
・リモートスタート作動中のスマートエントリー機能(ドアの解錠)
・デフロスター・デフォッガー・ミラーヒーター制御機能
・暖機時間3段階切替機能(10,20,30分)
サイズ：L62mm×W36mm×H18mm(除く突起部分)
リモコンアンテナ部：156mm(伸長時)

## 対象年式・グレード
グレード：全グレード

## 期間目処
お申し込み → 最短1カ月程度部品手配・施工場所調整等
入庫 → 半日〜1日施工 → 車両返却

## 注意事項
※T-Connectのリモートスタート（アプリ）も設定があります。
（リモートスタート装着車は、リモートスタート（アプリ）はご利用になれません。）
※植込み型心臓ペースメーカー等の機器をご使用の方は、
  車両に搭載された発信機から約22cm以内に近づけないようにしてください。
※一般公道上や閉め切った場所でのご使用はおやめください。

==== 他商品テキスト抽出 ====

# エアーランバーサポート
背中とシートの隙間をエアーで埋め、腰部をサポート。
体圧を分散して長時間の快適性を向上。
アウトドア帰りの疲れた身体にも。

# シートカバー（撥水）
撥水加工で水・泥・汗に強く、拭き取りやすい。
ISOFIX対応。ペットや子供乗車にも対応。
全席カバー対応。`;

// ─── helper color maps ────────────────────────────────────────────────────
const relColorMap: Record<string, string> = {
  teal: 'bg-teal-100 text-teal-700 border-teal-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gold: 'bg-amber-100 text-amber-700 border-amber-200',
  amber: 'bg-orange-100 text-orange-700 border-orange-200',
};
const typeColorMap: Record<string, string> = {
  product: 'bg-navy-900 text-white',
  value: 'bg-teal-500 text-white',
  scene: 'bg-blue-500 text-white',
  customer: 'bg-purple-500 text-white',
  function: 'bg-amber-500 text-white',
  bundle: 'bg-orange-500 text-white',
  region: 'bg-cyan-600 text-white',
};
const typeLabelMap: Record<string, { ja: string; en: string }> = {
  product: { ja: '商品', en: 'Product' },
  value: { ja: '顧客価値', en: 'Value' },
  scene: { ja: '利用シーン', en: 'Scene' },
  customer: { ja: '顧客タイプ', en: 'Customer' },
  function: { ja: '機能', en: 'Function' },
  bundle: { ja: 'バンドル', en: 'Bundle' },
  region: { ja: '地域', en: 'Region' },
};

// ─── StrengthDots ─────────────────────────────────────────────────────────
const StrengthDots: React.FC<{ strength: number }> = ({ strength }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <div key={i} className={`w-2 h-2 rounded-full ${i <= strength ? 'bg-teal-500' : 'bg-gray-200'}`} />
    ))}
  </div>
);

// ─── KnowledgeUnitCard ────────────────────────────────────────────────────
const KnowledgeUnitCard: React.FC<{ unit: typeof fjKnowledgeUnits[0]; lang: 'ja' | 'en'; idx: number }> = ({ unit, lang, idx }) => {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="bg-navy-900 text-white text-xs font-mono px-2 py-0.5 rounded-lg">{unit.productId}</span>
          <div>
            <div className="font-bold text-navy-900">{unit.name[lang]}</div>
            <div className="text-xs text-gray-400">{unit.vehicle[lang]} · {unit.grade[lang]}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-teal-50 text-teal-600 border border-teal-100 px-2 py-0.5 rounded-lg">{unit.category[lang]}</span>
          <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-gray-50">
          {/* Source */}
          <div className="pt-3">
            <a href={unit.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="text-xs text-teal-600 hover:underline break-all">
              🔗 {unit.sourceUrl}
            </a>
          </div>

          {/* Functions */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
              <Zap size={12} /> {lang === 'ja' ? '機能一覧' : 'Functions'}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {unit.functions.map(f => (
                <div key={f.id} className="flex items-start gap-2.5 bg-amber-50 rounded-xl px-3 py-2">
                  <span className="text-amber-500 mt-0.5">⚡</span>
                  <div>
                    <div className="text-sm font-semibold text-navy-900">{f.label[lang]}</div>
                    <div className="text-xs text-gray-500">{f.detail[lang]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Value × Scene */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
              <Star size={12} /> {lang === 'ja' ? '顧客価値 × 利用シーン' : 'Customer Value × Usage Scene'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left text-xs font-bold text-gray-400 px-3 py-2 rounded-tl-lg w-28">
                      {lang === 'ja' ? 'シーン' : 'Scene'}
                    </th>
                    <th className="text-left text-xs font-bold text-gray-400 px-3 py-2">
                      {lang === 'ja' ? '提供価値' : 'Value Provided'}
                    </th>
                    <th className="text-left text-xs font-bold text-gray-400 px-3 py-2 rounded-tr-lg w-36">
                      {lang === 'ja' ? '感情・ベネフィット' : 'Emotion / Benefit'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {unit.customerValue.map((cv, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="px-3 py-2 align-top">
                        <span className="text-base mr-1">{cv.icon}</span>
                        <span className="text-xs font-medium text-navy-900">{cv.scene[lang]}</span>
                      </td>
                      <td className="px-3 py-2 align-top text-xs text-gray-700">{cv.value[lang]}</td>
                      <td className="px-3 py-2 align-top">
                        <div className="flex flex-wrap gap-1">
                          {cv.emotion[lang].split('・').map((e, ei) => (
                            <span key={ei} className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-lg border border-teal-100">{e}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Target Customer */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
              <Users size={12} /> {lang === 'ja' ? 'ターゲット顧客' : 'Target Customer'}
            </div>
            <div className="space-y-2">
              {unit.targetCustomer.map((tc, i) => (
                <div key={i} className="flex items-center gap-3 bg-purple-50 rounded-xl px-3 py-2">
                  <span className="bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0">{tc.tag[lang]}</span>
                  <span className="text-xs text-gray-600 flex-1">{tc.reason[lang]}</span>
                  <StrengthDots strength={tc.strength} />
                </div>
              ))}
            </div>
          </div>

          {/* Install + Market */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? '手配期間' : 'Lead Time'}</div>
              <div className="text-sm font-bold text-navy-900">{unit.install.leadTime[lang]}</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? '施工時間' : 'Work Time'}</div>
              <div className="text-sm font-bold text-navy-900">{unit.install.workTime[lang]}</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
              <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? '保証' : 'Warranty'}</div>
              <div className="text-sm font-bold text-navy-900">{unit.warranty[lang]}</div>
            </div>
          </div>

          {/* Constraints */}
          {unit.constraints.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                <AlertCircle size={12} /> {lang === 'ja' ? '注意事項' : 'Constraints'}
              </div>
              <div className="space-y-1">
                {unit.constraints.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1.5">
                    <span className="flex-shrink-0">⚠️</span>
                    {c[lang]}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <Tag size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              entityType: <span className="text-navy-900 font-mono">upgrade_product</span>
              &nbsp;·&nbsp; market: <span className="text-navy-900 font-mono">{unit.market.join(', ')}</span>
              &nbsp;·&nbsp; sourceType: <span className="text-navy-900 font-mono">public_web</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────
export const AdminPipelinePage: React.FC = () => {
  const { sourceId } = useParams();
  const [searchParams] = useSearchParams();
  const customUrl = searchParams.get('url');
  const fileParam = searchParams.get('file');
  const typeParam = searchParams.get('type');
  const { language, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);
  const lang = language as 'ja' | 'en';

  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [activeTab, setActiveTab] = useState<'raw' | 'structured' | 'relationships'>('raw');
  const [structuredSubTab, setStructuredSubTab] = useState<'chunks' | 'cards'>('chunks');
  const [relFilter, setRelFilter] = useState<string>('all');

  const isPdfDemo = sourceId === 'source-insight' || (typeParam === 'pdf' && (!fileParam || isDemoPdfFilename(fileParam)));
  const isKnownSource = isPdfDemo || sourceId === 'source-fj' || sourceId === 'source-bz4x' ||
    !!(customUrl && (customUrl.includes('FJ001') || customUrl.includes('factory.kinto')));

  const steps = isPdfDemo ? pdfPipelineSteps : pipelineSteps;
  const activeChunks = isPdfDemo ? insightChunks : fjChunks;
  const activeRels = isPdfDemo ? insightRelationships : fjRelationships;
  const rawText = isPdfDemo ? RAW_PDF_TEXT : RAW_FJ;

  const runPipeline = async () => {
    if (!isKnownSource) return;
    setIsRunning(true);
    setCurrentStep(-1);
    setIsDone(false);
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 550 + Math.random() * 500));
      setCurrentStep(i);
    }
    setIsRunning(false);
    setIsDone(true);
    addLog({ actorType: 'admin', market: 'japan', language, eventType: 'knowledge_import', metadata: { sourceId, steps: 8 } });
  };

  useEffect(() => {
    if (isKnownSource) runPipeline();
  }, [sourceId]);

  const relTypes = isPdfDemo
    ? ['all', 'prioritizes', 'fits_product', 'values', 'message_is', 'informs']
    : ['all', 'provides', 'useful_in', 'suitable_for', 'has_function', 'frequently_combines'];
  const filteredRels = relFilter === 'all' ? activeRels : activeRels.filter(r => r.rel === relFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
            <ChevronRight size={14} />
            <button onClick={() => navigate('/admin/sources')} className="hover:text-teal-600">{T('knowledgeSources')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{T('aiReadyPipeline')}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">{T('aiReadyPipeline')}</h1>
          {(isPdfDemo || fileParam) && (
            <p className="text-sm text-teal-600 mt-0.5 font-mono">
              📄 {fileParam || DEMO_PDF_FILENAME}
            </p>
          )}
          {customUrl && !isPdfDemo && <p className="text-sm text-teal-600 mt-0.5 font-mono">{customUrl}</p>}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {!isKnownSource ? (
          <div className="card text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <h2 className="text-lg font-bold text-navy-900 mb-2">
              {typeParam === 'pdf'
                ? (lang === 'ja' ? 'このPDFのライブ解析はデモ対象外です' : 'Live PDF parsing is not enabled in this mock')
                : 'Live crawling is not enabled in this mock'}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {typeParam === 'pdf'
                ? (lang === 'ja'
                  ? `「${fileParam}」はデモ対象外です。Regional Market & Customer Insight Guide を指定してください。`
                  : `"${fileParam}" is not the demo PDF. Use Regional Market & Customer Insight Guide.`)
                : (lang === 'ja'
                  ? `「${customUrl}」はデモ対象外URLです。`
                  : `"${customUrl}" is not a known demo URL.`)}
            </p>
            <button onClick={() => navigate('/admin/sources')} className="btn-secondary">
              {lang === 'ja' ? 'ソース一覧に戻る' : 'Back to Sources'}
            </button>
          </div>
        ) : (
          <>
            {/* ── Pipeline Steps ── */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-navy-900">
                    {isDone
                      ? (lang === 'ja' ? '✅ AI Ready Pipeline — 完了' : '✅ AI Ready Pipeline — Complete')
                      : isRunning
                        ? (lang === 'ja' ? '⏳ 処理中...' : '⏳ Processing...')
                        : T('aiReadyPipeline')}
                  </h2>
                  {isDone && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isPdfDemo
                        ? (lang === 'ja'
                          ? `${activeChunks.length} チャンク · ${insightRegionCards.length} 地域 · ${insightSegmentCards.length} セグメント · ${activeRels.length} リレーションシップを構造化`
                          : `${activeChunks.length} chunks · ${insightRegionCards.length} regions · ${insightSegmentCards.length} segments · ${activeRels.length} relationships structured`)
                        : (lang === 'ja'
                          ? `${fjKnowledgeUnits.length} 商品 · ${fjKnowledgeUnits.reduce((s, u) => s + u.functions.length, 0)} 機能 · ${fjRelationships.length} リレーションシップを構造化`
                          : `${fjKnowledgeUnits.length} products · ${fjKnowledgeUnits.reduce((s, u) => s + u.functions.length, 0)} functions · ${fjRelationships.length} relationships structured`)}
                    </p>
                  )}
                </div>
                {isDone && (
                  <button onClick={runPipeline} className="btn-secondary text-sm">
                    {lang === 'ja' ? '再実行' : 'Re-run'}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {steps.map((step, i) => {
                  const done = i <= currentStep;
                  const active = i === currentStep + 1 && isRunning;
                  return (
                    <div key={step.id} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      done ? 'bg-teal-50' : active ? 'bg-blue-50' : 'bg-gray-50'
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        done ? 'bg-teal-500 text-white' : active ? 'bg-blue-400 text-white animate-pulse' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {done ? <CheckCircle size={14} /> : active ? <Clock size={14} /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-semibold ${done ? 'text-teal-800' : active ? 'text-blue-700' : 'text-gray-400'}`}>
                          {step.label[lang]}
                        </div>
                        <div className={`text-xs ${done ? 'text-teal-600' : active ? 'text-blue-500' : 'text-gray-300'}`}>
                          {step.detail[lang]}
                        </div>
                      </div>
                      {active && (
                        <div className="flex gap-1">
                          {[0, 1, 2].map(d => (
                            <div key={d} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Result Tabs ── */}
            {isDone && (
              <div className="card animate-fade-in">
                {/* Tab bar */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {(['raw', 'structured', 'relationships'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeTab === tab ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'raw'
                        ? (isPdfDemo
                          ? (lang === 'ja' ? '📄 Raw PDF Content' : '📄 Raw PDF Content')
                          : '📄 Raw Web Content')
                        : tab === 'structured'
                          ? (lang === 'ja' ? '🧠 AI Ready — 構造化データ' : '🧠 AI Ready — Structured')
                          : (lang === 'ja' ? '🔗 Knowledge Relationships' : '🔗 Knowledge Relationships')}
                    </button>
                  ))}
                </div>

                {/* ── Raw ── */}
                {activeTab === 'raw' && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">RAW</span>
                      <span className="text-xs text-gray-400">
                        {isPdfDemo
                          ? (lang === 'ja'
                            ? '構造化前の生テキスト — 地域名は読み取れるが、価値翻訳・商品接続は不明'
                            : 'Raw extracted text — region names visible, but value translation / product links unknown')
                          : (lang === 'ja'
                            ? '構造化前の生テキスト — 商品名は読み取れるが、価値・対象・シーンは不明'
                            : 'Raw extracted text — product names visible, but value / target / scene unknown')}
                      </span>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                      <pre className="text-xs text-green-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {rawText}
                      </pre>
                    </div>
                    <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                      {isPdfDemo
                        ? (lang === 'ja'
                          ? '⚠️ このPDFをそのままRAGに入れても、「北海道の通勤者に何をどう伝えるか」「どの商品と接続するか」は答えられません。'
                          : '⚠️ Dumping this PDF into RAG cannot answer "what to tell a Hokkaido commuter" or "which product it connects to."')
                        : (lang === 'ja'
                          ? '⚠️ このRaw Contentをそのままベクトル化してRAGに入れても、「誰に・なぜ・どんな場面で」は答えられません。'
                          : '⚠️ Inserting this raw content directly into RAG cannot answer "Who / Why / In what scene."')}
                    </div>
                  </div>
                )}

                {/* ── Structured ── */}
                {activeTab === 'structured' && (
                  <div>
                    {/* ── Sub-tab switcher ── */}
                    <div className="flex items-center gap-1 mb-5 bg-gray-100 rounded-xl p-1 w-fit">
                      <button
                        onClick={() => setStructuredSubTab('chunks')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          structuredSubTab === 'chunks'
                            ? 'bg-white text-navy-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {lang === 'ja' ? '📦 チャンキング済みデータ' : '📦 Chunked Data'}
                      </button>
                      <button
                        onClick={() => setStructuredSubTab('cards')}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          structuredSubTab === 'cards'
                            ? 'bg-white text-navy-900 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {lang === 'ja' ? '🗂️ ナレッジカード' : '🗂️ Knowledge Cards'}
                      </button>
                    </div>

                    {/* ── Chunks View ── */}
                    {structuredSubTab === 'chunks' && (
                      <div>
                        {/* Stats bar */}
                        <div className="flex flex-wrap gap-4 mb-4 px-1">
                          {Object.entries(storeChunkTypeConfig).map(([type, cfg]) => {
                            const count = activeChunks.filter(c => c.chunk_type === type).length;
                            if (count === 0) return null;
                            return (
                              <div key={type} className="flex items-center gap-1.5 text-xs">
                                <span className={`w-2 h-2 rounded-full ${cfg.bg} inline-block`} />
                                <span className="text-gray-500">{cfg.label[lang]}</span>
                                <span className="font-bold text-navy-900">{count}</span>
                              </div>
                            );
                          })}
                          <div className="ml-auto text-xs text-gray-400">
                            {lang === 'ja' ? '合計' : 'Total'} <span className="font-bold text-navy-900">{activeChunks.length} chunks</span>
                            <span className="ml-2">
                              /{' '}{activeChunks.reduce((s, c) => s + c.chunk_tokens, 0)} tokens
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {activeChunks.map(chunk => (
                            <ChunkCard key={chunk.chunk_id} chunk={chunk} lang={lang} />
                          ))}
                        </div>

                        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700">
                          {lang === 'ja'
                            ? '▼ メタデータをクリックすると実際のフィールド構造を確認できます。value_tags / scene_tags / target_customer_tags / fit_score などが付与されており、後工程のレコメンドエンジンがこれを参照します。'
                            : '▼ Click metadata to see actual field structure. Fields like value_tags / scene_tags / target_customer_tags / fit_score are attached and referenced by the downstream recommendation engine.'}
                        </div>
                      </div>
                    )}

                    {/* ── Cards View ── */}
                    {structuredSubTab === 'cards' && (
                      <div>
                        {isPdfDemo ? (
                          <>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded">AI READY</span>
                              <span className="text-xs text-gray-400">
                                {lang === 'ja'
                                  ? '地域文脈 × 顧客セグメント — 価値テーマまで構造化済み'
                                  : 'Regional context × customer segments — value themes structured'}
                              </span>
                            </div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                              {lang === 'ja' ? '地域文脈' : 'Regional Context'}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                              {insightRegionCards.map(r => (
                                <div key={r.id} className="bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-navy-900 text-sm">{r.name[lang]}</span>
                                    <span className="text-[11px] text-cyan-700 bg-white px-2 py-0.5 rounded-lg">{r.climate}</span>
                                  </div>
                                  <div className="text-xs text-gray-600 mb-1">{r.friction[lang]}</div>
                                  <div className="text-xs font-semibold text-teal-700">{r.priority}</div>
                                </div>
                              ))}
                            </div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                              {lang === 'ja' ? '顧客セグメント' : 'Customer Segments'}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {insightSegmentCards.map(s => (
                                <div key={s.id} className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
                                  <div className="font-bold text-navy-900 text-sm mb-1">{s.name}</div>
                                  <div className="text-xs text-gray-600 mb-1">{s.usage[lang]}</div>
                                  <div className="text-xs font-semibold text-purple-700">{s.value}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                              {lang === 'ja'
                                ? '✅ PDFの仮説インサイトを、商品ナレッジ（リモスタ・シートカバー等）と接続できる形に構造化。単なる文書検索ではない。'
                                : '✅ Hypothesis insights from the PDF are structured so they can connect to product knowledge — not plain document search.'}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded">AI READY</span>
                              <span className="text-xs text-gray-400">
                                {lang === 'ja'
                                  ? `${fjKnowledgeUnits.length} Knowledge Units — 機能・顧客価値・利用シーン・ターゲット顧客まで構造化済み`
                                  : `${fjKnowledgeUnits.length} Knowledge Units — Functions, Customer Value, Scenes, Target Customers structured`}
                              </span>
                            </div>
                            <div className="space-y-3">
                              {fjKnowledgeUnits.map((unit, idx) => (
                                <KnowledgeUnitCard key={unit.productId} unit={unit} lang={lang} idx={idx} />
                              ))}
                            </div>
                            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-xs text-teal-700">
                              {lang === 'ja'
                                ? '✅ CMCの強み：「何を1つの意味単位として持つべきか」「機能・顧客価値・シーン・ターゲットをどう関係づけるか」を設計するノウハウ × AI Ready化'
                                : "✅ CMC's strength: Know-how to design 'what belongs in one meaning unit' and 'how to relate functions, value, scenes, and targets' × AI-Ready conversion"}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Relationships ── */}
                {activeTab === 'relationships' && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="bg-navy-900 text-white text-xs font-bold px-2 py-0.5 rounded">GRAPH</span>
                      <span className="text-xs text-gray-400">
                        {lang === 'ja' ? `${activeRels.length} リレーションシップ` : `${activeRels.length} relationships`}
                      </span>
                      <div className="ml-auto flex flex-wrap gap-1.5">
                        {relTypes.map(rt => (
                          <button
                            key={rt}
                            onClick={() => setRelFilter(rt)}
                            className={`text-xs px-2 py-0.5 rounded-lg border transition-colors ${
                              relFilter === rt ? 'bg-navy-900 text-white border-navy-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                          >
                            {rt === 'all' ? (lang === 'ja' ? '全て' : 'All') : rt.replace(/_/g, ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(typeColorMap).map(([type, cls]) => (
                        <div key={type} className="flex items-center gap-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${cls}`}>
                            {typeLabelMap[type]?.[lang] ?? type}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {filteredRels.map((rel, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${typeColorMap[rel.fromType] ?? 'bg-gray-200 text-gray-700'}`}>
                            {typeLabelMap[rel.fromType]?.[lang]}
                          </span>
                          <span className="font-semibold text-sm text-navy-900 flex-shrink-0 min-w-0 max-w-[120px] truncate" title={rel.from}>
                            {rel.from}
                          </span>
                          <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />
                          <span className={`text-xs px-2 py-0.5 rounded-lg border font-medium flex-shrink-0 ${relColorMap[rel.relColor] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                            {rel.rel.replace(/_/g, ' ')}
                          </span>
                          <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />
                          <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${typeColorMap[rel.toType] ?? 'bg-gray-200 text-gray-700'}`}>
                            {typeLabelMap[rel.toType]?.[lang]}
                          </span>
                          <span className="font-semibold text-sm text-navy-900 min-w-0 truncate" title={rel.to}>
                            {rel.to}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-navy-50 border border-navy-100 rounded-xl px-4 py-3 text-xs text-navy-700" style={{ backgroundColor: '#f0f4f8' }}>
                      {isPdfDemo
                        ? (lang === 'ja'
                          ? '🔗 PDFの地域・顧客仮説が、既存の商品ナレッジ（リモスタ・レインミラー等）とつながります。「PDFをベクトル化しただけ」では、北海道の通勤者に何を勧めるかは決まりません。'
                          : '🔗 Regional/customer hypotheses from the PDF connect to existing product knowledge. Vectorizing the PDF alone cannot decide what to recommend to a Hokkaido commuter.')
                        : (lang === 'ja'
                          ? '🔗 このリレーショングラフにより、「アウトドア好きな顧客」→「シートカバー＋リモスタのバンドル提案」のような多段推論が可能になります。「ただRAGに入れた」だけでは実現できません。'
                          : '🔗 This relationship graph enables multi-hop reasoning like "outdoor customer" → "seat cover + remote start bundle." Impossible with plain RAG alone.')}
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-gray-100 flex gap-3">
                  <button onClick={() => navigate('/admin/knowledge')} className="btn-teal flex items-center gap-2 text-sm">
                    <MapPin size={14} />
                    {lang === 'ja' ? 'ナレッジエクスプローラーで確認' : 'View in Knowledge Explorer'}
                    <ChevronRight size={14} />
                  </button>
                  <button onClick={() => navigate('/admin/sources')} className="btn-secondary text-sm">
                    {lang === 'ja' ? 'ソース一覧に戻る' : 'Back to Sources'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
