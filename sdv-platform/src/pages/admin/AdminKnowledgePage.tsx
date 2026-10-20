import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import type { KnowledgeChunk } from '../../data/knowledgeStore';
import {
  allChunks,
  allRelationships,
  processedSources,
  chunkTypeConfig,
} from '../../data/knowledgeStore';
import { Search, ChevronRight, ArrowRight, Database, GitBranch, Layers, ExternalLink } from 'lucide-react';

// ─── ChunkCard ─────────────────────────────────────────────────────────────
const ChunkCard: React.FC<{ chunk: KnowledgeChunk; lang: 'ja' | 'en' }> = ({ chunk, lang }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = chunkTypeConfig[chunk.chunk_type] ?? { label: { ja: chunk.chunk_type, en: chunk.chunk_type }, color: 'text-gray-700', bg: 'bg-gray-100' };
  const meta = chunk.metadata;

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
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
            {expanded
              ? (lang === 'ja' ? '▲ 閉じる' : '▲ Close')
              : (lang === 'ja' ? '▼ メタデータ' : '▼ Metadata')}
          </button>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-gray-700 leading-relaxed">{chunk.content}</p>
      </div>
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-950 px-4 py-3">
          <div className="text-xs text-gray-400 mb-1.5 font-mono"># metadata</div>
          <div className="space-y-1">
            {Object.entries(meta).map(([k, v]) => (
              <div key={k} className="flex gap-2 font-mono text-xs">
                <span className="text-purple-400 flex-shrink-0 w-44 truncate">{k}:</span>
                <span className={
                  typeof v === 'number' ? 'text-amber-300' :
                  typeof v === 'boolean' ? 'text-green-400' :
                  Array.isArray(v) ? 'text-blue-300' :
                  typeof v === 'object' ? 'text-blue-300' : 'text-green-300'
                }>
                  {Array.isArray(v)
                    ? `[${(v as unknown[]).map(x => typeof x === 'object' ? JSON.stringify(x) : `"${x}"`).join(', ')}]`
                    : typeof v === 'object' && v !== null ? JSON.stringify(v)
                    : typeof v === 'string' ? `"${v}"` : String(v)}
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

// ─── relColor maps ─────────────────────────────────────────────────────────
const relColorMap: Record<string, string> = {
  teal:   'bg-teal-100 text-teal-700 border-teal-200',
  blue:   'bg-blue-100 text-blue-700 border-blue-200',
  purple: 'bg-purple-100 text-purple-700 border-purple-200',
  gold:   'bg-amber-100 text-amber-700 border-amber-200',
  amber:  'bg-orange-100 text-orange-700 border-orange-200',
};
const typeColorMap: Record<string, string> = {
  product:  'bg-navy-900 text-white',
  value:    'bg-teal-500 text-white',
  scene:    'bg-blue-500 text-white',
  customer: 'bg-purple-500 text-white',
  function: 'bg-amber-500 text-white',
  bundle:   'bg-orange-500 text-white',
  region:   'bg-cyan-600 text-white',
};
const typeLabelJa: Record<string, string> = {
  product: '商品', value: '顧客価値', scene: '利用シーン', customer: '顧客タイプ', function: '機能', bundle: 'バンドル', region: '地域',
};

// ─── Main ──────────────────────────────────────────────────────────────────
export const AdminKnowledgePage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);
  const lang = language as 'ja' | 'en';

  const [mainTab, setMainTab] = useState<'chunks' | 'relationships' | 'sources'>('chunks');
  const [search, setSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState<'all' | 'fj' | 'bz4x' | 'insight'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [relSource, setRelSource] = useState<'all' | 'fj' | 'bz4x' | 'insight'>('all');

  // ── chunk type counts ────────────────────────────────────────────────────
  const typeCounts = useMemo(() => {
    const m: Record<string, number> = {};
    allChunks.forEach(c => { m[c.chunk_type] = (m[c.chunk_type] ?? 0) + 1; });
    return m;
  }, []);

  // ── filtered chunks ──────────────────────────────────────────────────────
  const filteredChunks = useMemo(() => {
    return allChunks.filter(c => {
      const meta = c.metadata;
      if (vehicleFilter !== 'all') {
        const sid = String(meta['source_id'] ?? '');
        const v = String(meta['vehicle'] ?? '').toLowerCase();
        if (vehicleFilter === 'insight') return sid === 'source-insight';
        if (sid === 'source-insight') return false;
        if (vehicleFilter === 'fj' && !v.includes('fj')) return false;
        if (vehicleFilter === 'bz4x' && !v.includes('bz4x')) return false;
      }
      if (typeFilter !== 'all' && c.chunk_type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const inContent = c.content.toLowerCase().includes(q);
        const inId = c.chunk_id.toLowerCase().includes(q);
        const inMeta = JSON.stringify(meta).toLowerCase().includes(q);
        if (!inContent && !inId && !inMeta) return false;
      }
      return true;
    });
  }, [search, vehicleFilter, typeFilter]);

  // ── filtered relationships ────────────────────────────────────────────────
  const filteredRels = useMemo(() => {
    if (relSource === 'all') return allRelationships;
    return allRelationships.filter(r => r.source === relSource);
  }, [relSource]);

  const totalTokens = allChunks.reduce((s, c) => s + c.chunk_tokens, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{T('knowledgeExplorer')}</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">{T('knowledgeExplorer')}</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                {lang === 'ja'
                  ? 'AI Ready処理済みデータの蓄積庫 — パイプラインを通過したすべてのナレッジを管理'
                  : 'Accumulated AI-Ready knowledge store — all pipeline-processed data in one place'}
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/sources')}
              className="btn-teal text-sm flex items-center gap-1.5"
            >
              <ExternalLink size={14} />
              {lang === 'ja' ? '新規ソース追加' : 'Add Source'}
            </button>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="bg-white border-b border-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-wrap gap-6">
          {[
            { icon: <Database size={14} />, label: lang === 'ja' ? '総チャンク数' : 'Total Chunks', value: allChunks.length.toString(), color: 'text-navy-900' },
            { icon: <GitBranch size={14} />, label: lang === 'ja' ? 'リレーションシップ' : 'Relationships', value: allRelationships.length.toString(), color: 'text-teal-600' },
            { icon: <Layers size={14} />, label: lang === 'ja' ? '処理済みソース' : 'Processed Sources', value: processedSources.length.toString(), color: 'text-blue-600' },
            { icon: <span className="text-xs font-bold">T</span>, label: lang === 'ja' ? '総トークン数' : 'Total Tokens', value: totalTokens.toLocaleString(), color: 'text-purple-600' },
          ].map((kpi, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`${kpi.color} opacity-60`}>{kpi.icon}</span>
              <span className="text-xs text-gray-400">{kpi.label}</span>
              <span className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Main tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { id: 'chunks',        icon: '📦', label: lang === 'ja' ? 'チャンク一覧' : 'Chunk List' },
            { id: 'relationships', icon: '🔗', label: lang === 'ja' ? 'リレーションシップ' : 'Relationships' },
            { id: 'sources',       icon: '🗂️', label: lang === 'ja' ? 'ソース別サマリー' : 'By Source' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setMainTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                mainTab === tab.id ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Chunks tab ── */}
        {mainTab === 'chunks' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-48">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                    placeholder={lang === 'ja' ? 'コンテンツ・ID・メタデータで検索...' : 'Search content, ID, metadata...'}
                  />
                </div>
                {/* Vehicle filter */}
                <div className="flex gap-1">
                  {(['all', 'fj', 'bz4x', 'insight'] as const).map(v => (
                    <button key={v}
                      onClick={() => setVehicleFilter(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        vehicleFilter === v ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {v === 'all' ? (lang === 'ja' ? '全て' : 'All') : v === 'fj' ? 'FJ' : v === 'bz4x' ? 'bZ4X' : (lang === 'ja' ? '市場インサイト' : 'Insight')}
                    </button>
                  ))}
                </div>
                {/* Type filter */}
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-teal-400 bg-white"
                >
                  <option value="all">{lang === 'ja' ? '全タイプ' : 'All Types'}</option>
                  {Object.entries(chunkTypeConfig).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label[lang]} ({typeCounts[k] ?? 0})
                    </option>
                  ))}
                </select>
                <span className="text-xs text-gray-400 ml-auto">
                  {lang === 'ja' ? '表示中' : 'Showing'}{' '}
                  <span className="font-bold text-navy-900">{filteredChunks.length}</span>
                  {' / '}{allChunks.length} chunks
                </span>
              </div>
              {/* Type count chips */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-50">
                {Object.entries(typeCounts).map(([type, count]) => {
                  const cfg = chunkTypeConfig[type];
                  return (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(typeFilter === type ? 'all' : type)}
                      className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-lg border transition-colors ${
                        typeFilter === type ? 'ring-2 ring-teal-400' : ''
                      } ${cfg?.bg ?? 'bg-gray-100'} ${cfg?.color ?? 'text-gray-600'} border-transparent`}
                    >
                      {cfg?.label[lang] ?? type}
                      <span className="font-bold">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chunk list */}
            <div className="space-y-2">
              {filteredChunks.map(chunk => (
                <ChunkCard key={chunk.chunk_id} chunk={chunk} lang={lang} />
              ))}
              {filteredChunks.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  {lang === 'ja' ? '条件に一致するチャンクがありません' : 'No chunks match the current filters'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Relationships tab ── */}
        {mainTab === 'relationships' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-sm font-medium text-navy-900">
                  {lang === 'ja' ? 'ソース絞り込み：' : 'Filter by source:'}
                </span>
                {(['all', 'fj', 'bz4x', 'insight'] as const).map(s => (
                  <button key={s}
                    onClick={() => setRelSource(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      relSource === s ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s === 'all' ? (lang === 'ja' ? '全て' : 'All') : s === 'fj' ? 'Land Cruiser FJ' : s === 'bz4x' ? 'bZ4X' : (lang === 'ja' ? '市場インサイト' : 'Insight')}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400">
                  {filteredRels.length} {lang === 'ja' ? 'リレーションシップ' : 'relationships'}
                </span>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-50">
                {Object.entries(typeColorMap).map(([type, cls]) => (
                  <span key={type} className={`text-xs font-bold px-2 py-0.5 rounded ${cls}`}>
                    {typeLabelJa[type] ?? type}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredRels.map((rel, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-3 py-2.5 shadow-sm">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${typeColorMap[rel.fromType] ?? 'bg-gray-200 text-gray-700'}`}>
                    {typeLabelJa[rel.fromType] ?? rel.fromType}
                  </span>
                  <span className="font-semibold text-sm text-navy-900 flex-shrink-0 max-w-[110px] truncate" title={rel.from}>{rel.from}</span>
                  <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />
                  <span className={`text-xs px-2 py-0.5 rounded-lg border font-medium flex-shrink-0 ${relColorMap[rel.relColor] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                    {rel.rel.replace(/_/g, ' ')}
                  </span>
                  <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />
                  <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${typeColorMap[rel.toType] ?? 'bg-gray-200 text-gray-700'}`}>
                    {typeLabelJa[rel.toType] ?? rel.toType}
                  </span>
                  <span className="font-semibold text-sm text-navy-900 min-w-0 truncate" title={rel.to}>{rel.to}</span>
                  {rel.source && (
                    <span className="ml-auto text-xs text-gray-300 flex-shrink-0 font-mono">{rel.source}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Sources tab ── */}
        {mainTab === 'sources' && (
          <div className="space-y-4">
            {processedSources.map(src => {
              const srcChunks = allChunks.filter(c => {
                const sid = String(c.metadata['source_id'] ?? '');
                if (sid) return sid === src.id;
                const surl = String(c.metadata['source_url'] ?? '');
                const prefix = src.url.includes('/products/') ? src.url.split('/products/')[0] : src.url.split('/cp/')[0];
                return !!prefix && surl.includes(prefix);
              });
              const chunksByType: Record<string, number> = {};
              srcChunks.forEach(c => { chunksByType[c.chunk_type] = (chunksByType[c.chunk_type] ?? 0) + 1; });

              return (
                <div key={src.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
                        <h3 className="font-bold text-navy-900">{src.name}</h3>
                      </div>
                      <a href={src.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-teal-600 hover:underline font-mono">
                        {src.url}
                      </a>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      <div>{lang === 'ja' ? '処理日時' : 'Processed'}</div>
                      <div className="font-mono text-navy-900">
                        {new Date(src.processedAt).toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? 'チャンク' : 'Chunks'}</div>
                      <div className="text-xl font-bold text-navy-900">{src.chunkCount}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? 'リレーション' : 'Relations'}</div>
                      <div className="text-xl font-bold text-teal-600">{src.relationshipCount}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl px-3 py-2 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">{lang === 'ja' ? '車種' : 'Vehicle'}</div>
                      <div className="text-sm font-bold text-navy-900">{src.vehicle}</div>
                    </div>
                  </div>

                  {/* Chunk type breakdown */}
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                      {lang === 'ja' ? 'チャンクタイプ内訳' : 'Chunk Type Breakdown'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(chunksByType).map(([type, count]) => {
                        const cfg = chunkTypeConfig[type];
                        return (
                          <div key={type} className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-lg ${cfg?.bg ?? 'bg-gray-100'} ${cfg?.color ?? 'text-gray-600'}`}>
                            {cfg?.label[lang] ?? type}
                            <span className="font-bold">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => {
                        setMainTab('chunks');
                        setVehicleFilter(src.id === 'source-insight' ? 'insight' : src.vehicle.includes('FJ') ? 'fj' : 'bz4x');
                      }}
                      className="btn-secondary text-xs flex items-center gap-1"
                    >
                      {lang === 'ja' ? 'チャンクを見る' : 'View Chunks'}
                      <ChevronRight size={12} />
                    </button>
                    <button
                      onClick={() => navigate(src.id === 'source-insight' ? `/admin/pipeline/${src.id}?type=pdf` : `/admin/pipeline/${src.id}`)}
                      className="btn-secondary text-xs flex items-center gap-1"
                    >
                      {lang === 'ja' ? 'パイプライン再実行' : 'Re-run Pipeline'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
