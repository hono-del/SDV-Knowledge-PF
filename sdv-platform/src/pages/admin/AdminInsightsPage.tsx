import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { improvementInsights } from '../../data/analytics';
import { getProductById } from '../../data/products';
import { TrendingUp, CheckCircle, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export const AdminInsightsPage: React.FC = () => {
  const { language, setAiWeights, aiWeights } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [appliedInsights, setAppliedInsights] = useState<Set<string>>(new Set());
  const [insightStatuses, setInsightStatuses] = useState<Record<string, 'new' | 'reviewed' | 'applied'>>(
    Object.fromEntries(improvementInsights.map(i => [i.id, i.status]))
  );

  const handleReview = (id: string) => {
    setInsightStatuses(prev => ({ ...prev, [id]: 'reviewed' }));
  };

  const handleApplyToTest = (insight: typeof improvementInsights[0]) => {
    // Apply to AI Control weights
    if (insight.adjustmentType === 'marketWeight') {
      setAiWeights({ market: Math.min(30, aiWeights.market + Math.round(insight.adjustmentValue / 3)) });
    } else if (insight.adjustmentType === 'valueEmphasis') {
      setAiWeights({ lifestyle: Math.min(30, aiWeights.lifestyle + Math.round(insight.adjustmentValue / 5)) });
    }
    setAppliedInsights(prev => new Set([...prev, insight.id]));
    setInsightStatuses(prev => ({ ...prev, [insight.id]: 'applied' }));
  };

  const statusBadge = (id: string) => {
    const status = insightStatuses[id];
    if (status === 'applied') return <span className="tag bg-green-50 text-green-700 text-xs">Applied</span>;
    if (status === 'reviewed') return <span className="tag bg-blue-50 text-blue-700 text-xs">Reviewed</span>;
    return <span className="tag bg-gold-50 text-gold-700 text-xs">New</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{T('improvementInsights')}</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-navy-900">{T('improvementInsights')}</h1>
            <div className="flex items-center gap-2 bg-gold-50 border border-gold-200 rounded-xl px-3 py-1.5">
              <Sparkles size={14} className="text-gold-500" />
              <span className="text-xs font-medium text-gold-700">
                {language === 'ja' ? 'Analytics由来の改善候補' : 'Analytics-derived improvement candidates'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Important disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            {language === 'ja' 
              ? '⚠️「テストに反映」はAI Control設定の更新を示すコンセプトデモです。本番への反映ではありません。'
              : '⚠️ "Apply to Test" is a concept demo of updating AI Control settings. This does not reflect in production.'}
          </p>
        </div>

        {/* Insights */}
        <div className="space-y-6">
          {improvementInsights.map(insight => {
            const product = insight.targetProductId ? getProductById(insight.targetProductId) : null;
            const applied = appliedInsights.has(insight.id);
            
            return (
              <div
                key={insight.id}
                className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
                  applied ? 'border-green-200' : insightStatuses[insight.id] === 'reviewed' ? 'border-blue-200' : 'border-gold-200'
                }`}
              >
                {/* Insight header */}
                <div className="bg-gradient-to-r from-gold-50 to-white px-5 py-4 border-b border-gold-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={18} className="text-gold-500" />
                      <h3 className="font-bold text-navy-900">{insight.title[language]}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {product && (
                        <span className="text-sm">{product.imageEmoji}</span>
                      )}
                      {statusBadge(insight.id)}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* Content */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{insight.content[language]}</p>

                  {/* Suggested Action */}
                  <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight size={14} className="text-gold-500" />
                      <span className="text-xs font-bold text-gold-600 uppercase tracking-wide">{T('suggestedAction')}</span>
                    </div>
                    <p className="text-sm text-gold-800 font-medium">{insight.suggestedAction[language]}</p>
                  </div>

                  {/* Target info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {insight.targetProductId && product && (
                      <span className="tag-teal">{product.name[language]}</span>
                    )}
                    {insight.targetMarket && (
                      <span className="tag bg-navy-50 text-navy-700">{insight.targetMarket}</span>
                    )}
                    {insight.targetState && (
                      <span className="tag bg-blue-50 text-blue-700">{insight.targetState}</span>
                    )}
                    <span className="tag bg-gold-50 text-gold-700">
                      {insight.adjustmentType}: +{insight.adjustmentValue}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    {insightStatuses[insight.id] === 'new' && (
                      <button
                        onClick={() => handleReview(insight.id)}
                        className="btn-secondary flex items-center gap-2 text-sm"
                      >
                        {T('reviewChange')}
                      </button>
                    )}
                    {!applied ? (
                      <button
                        onClick={() => handleApplyToTest(insight)}
                        className="btn-teal flex items-center gap-2 text-sm"
                      >
                        <Sparkles size={14} />
                        {T('applyToTest')}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <CheckCircle size={16} />
                        {T('appliedToTest')}
                        <button
                          onClick={() => navigate('/admin/prompt-test')}
                          className="ml-1 text-teal-600 hover:text-teal-800 underline text-xs"
                        >
                          {language === 'ja' ? 'プロンプトテストで確認' : 'Verify in Prompt Test'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation back to full loop */}
        <div className="mt-8 bg-teal-50 border border-teal-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <CheckCircle size={16} className="text-white" />
            </div>
            <h3 className="font-bold text-teal-800">
              {language === 'ja' ? 'デモループ完了' : 'Demo Loop Complete'}
            </h3>
          </div>
          <p className="text-sm text-teal-700 mb-4">
            {language === 'ja' 
              ? 'Knowledge Import → Dealer Learn → Dealer Sell → Customer → Logs → Analytics → Improvement の一連のループを体験しました。'
              : 'You\'ve experienced the full loop: Knowledge Import → Dealer Learn → Dealer Sell → Customer → Logs → Analytics → Improvement.'}
          </p>
          <div className="bg-white border border-teal-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-navy-900">
              {language === 'ja'
                ? '今回は公開Demo Dataです。次はPrivate SDV Service Dataを接続し、実データで価値翻訳を検証したいです。'
                : 'This was based on public demo data. Next, connect Private SDV Service Data to validate value translation with real data.'}
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="mt-3 btn-navy flex items-center gap-2 text-sm bg-navy-900 text-white px-4 py-2 rounded-xl hover:bg-navy-800 transition-colors"
            >
              {language === 'ja' ? 'Adminに戻る → Private SDV Dataを接続' : 'Back to Admin → Connect Private SDV Data'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
