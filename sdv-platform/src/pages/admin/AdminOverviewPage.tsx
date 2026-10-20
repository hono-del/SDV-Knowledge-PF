import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { Database, Shield, CheckCircle, Circle, ExternalLink, X, ChevronRight } from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { path: '/admin/sources', label: T('knowledgeSources'), desc: language === 'ja' ? 'ソース管理・インポート' : 'Source management & import' },
    { path: '/admin/knowledge', label: T('knowledgeExplorer'), desc: language === 'ja' ? 'ナレッジの閲覧・検索' : 'Browse and search knowledge' },
    { path: '/admin/ai-control', label: T('aiControl'), desc: language === 'ja' ? 'Recommendation設定' : 'Recommendation settings' },
    { path: '/admin/prompt-test', label: T('promptTest'), desc: language === 'ja' ? 'プロンプトテスト・比較' : 'Prompt test & comparison' },
    { path: '/admin/logs', label: T('logs'), desc: language === 'ja' ? 'インタラクションログ' : 'Interaction logs' },
    { path: '/admin/analytics', label: T('analytics'), desc: language === 'ja' ? '分析ダッシュボード' : 'Analytics dashboard' },
    { path: '/admin/insights', label: T('improvementInsights'), desc: language === 'ja' ? 'AI改善候補' : 'AI improvement suggestions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="page-title">{T('adminOverview')}</h1>
          <p className="text-gray-500 mt-1">
            {language === 'ja' ? 'ナレッジ管理・AI制御・分析の中央コンソール' : 'Central console for knowledge management, AI control, and analytics'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Knowledge Sources status — KEY SALES MOMENT */}
        <div className="card mb-8 border-2 border-teal-100">
          <h2 className="font-bold text-navy-900 mb-4 text-lg">{T('currentKnowledgeSources')}</h2>
          
          <div className="space-y-3 mb-6">
            {/* Connected */}
            <div className="flex items-center justify-between bg-teal-50 border border-teal-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-teal-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-teal-900">{T('publicDataConnected')}</div>
                  <div className="text-xs text-teal-600">{T('connected')}</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/admin/sources')}
                className="text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1"
              >
                {language === 'ja' ? '詳細' : 'Details'}
                <ExternalLink size={12} />
              </button>
            </div>

            {/* Not connected — key sales moment */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Circle size={20} className="text-gray-400 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-700">{T('privateDataNotConnected')}</div>
                  <div className="text-xs text-gray-400">{T('notConnected')}</div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="btn-teal text-xs py-2 px-3"
              >
                {T('connectPrivateKnowledge')}
              </button>
            </div>
          </div>

          <div className="bg-navy-50 rounded-xl p-4">
            <p className="text-sm text-navy-700 font-medium">
              {language === 'ja' 
                ? '現在のデモは公開情報ベースです。実際のSDVサービスデータを接続することで、より精度の高い価値翻訳が実現できます。'
                : 'This demo is based on public information. Connecting actual SDV service data enables more precise value translation.'}
            </p>
          </div>
        </div>

        {/* Navigation grid */}
        <h2 className="section-title mb-4">
          {language === 'ja' ? 'コンソールメニュー' : 'Console Menu'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navItems.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="card-hover text-left group"
            >
              <div className="font-semibold text-navy-900 group-hover:text-teal-700 transition-colors text-sm mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">{item.desc}</div>
              <ChevronRight size={14} className="text-teal-400 mt-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Connect Private Knowledge Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-900">
                {language === 'ja' ? 'プライベートナレッジ接続' : 'Private Knowledge Connection'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <Database size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  {language === 'ja' 
                    ? 'このモックはプライベートデータには接続しません。'
                    : 'This mock does not connect to private data.'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold text-navy-900 mb-3">
                {language === 'ja' ? '次回PoCで接続可能なデータ:' : 'Data connectable in next PoC:'}
              </div>
              <ul className="space-y-2">
                {[
                  language === 'ja' ? 'SDVサービス仕様' : 'SDV service specifications',
                  language === 'ja' ? '車種・グレード別対応可否' : 'Vehicle/grade compatibility',
                  language === 'ja' ? 'マーケット別提供状況' : 'Market availability',
                  language === 'ja' ? 'サービス価値仮説データ' : 'Service value hypotheses',
                  language === 'ja' ? 'ディーラー向け販売資料' : 'Dealer sales materials',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-teal-800 font-medium">
                {language === 'ja' 
                  ? '実際のSDVサービス情報を渡していただければ、この仕組みで価値翻訳・Recommendation・Dealer教育を検証できます。'
                  : 'With actual SDV service information, this system can validate value translation, recommendations, and dealer education.'}
              </p>
            </div>

            <button onClick={() => setShowModal(false)} className="w-full btn-primary">
              {T('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
