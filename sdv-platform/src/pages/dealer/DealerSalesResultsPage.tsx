import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { getProductById } from '../../data/products';
import { Star, ChevronDown, ChevronUp, BookOpen, Users, ArrowLeft, AlertTriangle } from 'lucide-react';

export const DealerSalesResultsPage: React.FC = () => {
  const { language, market, currentProfile, currentRecommendations, currentSessionId, outputToggles, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set([0]));

  if (!currentProfile || currentRecommendations.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">
          {language === 'ja' ? 'プロファイルが設定されていません' : 'No profile set'}
        </p>
        <button onClick={() => navigate('/dealer/sales')} className="btn-primary">
          {language === 'ja' ? 'プロファイルに戻る' : 'Back to Profile'}
        </button>
      </div>
    );
  }

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleShowCustomer = (recIndex: number) => {
    const rec = currentRecommendations[recIndex];
    addLog({
      actorType: 'dealer',
      market: currentProfile.market,
      region: currentProfile.region,
      language,
      vehicle: currentProfile.vehicle,
      customerProfileId: currentProfile.id,
      eventType: 'recommendation_view',
      productId: rec.productId,
      metadata: { rank: rec.rank, fitScore: rec.fitScore },
    });
    navigate(`/customer/recommendation/${currentSessionId}?productIndex=${recIndex}`);
  };

  const scoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  const rankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    return '🥉';
  };

  const isNA = market === 'north-america';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/dealer/sales')}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-teal-600 mb-2"
          >
            <ArrowLeft size={14} />
            {language === 'ja' ? 'プロファイルに戻る' : 'Back to Profile'}
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy-900">{T('salesAssistResults')}</h1>
              {currentProfile.name && (
                <p className="text-gray-500 text-sm mt-0.5">
                  {currentProfile.name} · {currentProfile.vehicle === 'fj' ? 'Land Cruiser FJ' : 'bZ4X'}
                </p>
              )}
            </div>
            {isNA && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 max-w-xs">
                <p className="text-xs text-amber-700">{T('naDisclaimer')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {currentRecommendations.map((rec, idx) => {
          const product = getProductById(rec.productId);
          if (!product) return null;
          const isExpanded = expandedCards.has(idx);
          
          return (
            <div key={rec.productId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Card header */}
              <div
                className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleCard(idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rankEmoji(rec.rank)}</span>
                    <span className="text-3xl">{product.imageEmoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-medium">#{rec.rank}</span>
                        <h3 className="font-bold text-navy-900">{product.name[language]}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{product.shortDesc[language]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-xl text-sm font-bold ${scoreColor(rec.fitScore)}`}>
                      {rec.fitScore}
                      <span className="text-xs font-normal ml-0.5">/100</span>
                    </div>
                    {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </div>
                </div>
                
                {/* Score bar */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${rec.fitScore >= 75 ? 'bg-green-400' : rec.fitScore >= 50 ? 'bg-yellow-400' : 'bg-gray-300'}`}
                      style={{ width: `${rec.fitScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-5 space-y-4 animate-fade-in">
                  {/* Score breakdown */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{T('fitScore')} breakdown</div>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(rec.scoreBreakdown).map(([k, v]) => (
                        <div key={k} className="text-center">
                          <div className="text-sm font-bold text-navy-900">{v}</div>
                          <div className="text-xs text-gray-400">{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {outputToggles.whyRecommended && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('whyRecommended')}</div>
                      <p className="text-sm text-gray-700 bg-teal-50 rounded-xl p-3">{rec.whyRecommended[language]}</p>
                    </div>
                  )}

                  {outputToggles.evidence && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('evidenceSignals')}</div>
                      <div className="flex flex-wrap gap-2">
                        {rec.evidenceSignals.map((s, i) => (
                          <span key={i} className="tag-teal">{s[language]}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {outputToggles.customerValue && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('customerValue')}</div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{rec.customerValue[language]}</p>
                      {rec.productId === 'bz-smart-key' && (
                        <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-2">
                          <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-amber-700">
                            {language === 'ja' 
                              ? '本機能は運転を代替するものではなく、リスク低減を支援する機能です。必ず安全確認の上でご使用ください。'
                              : 'This feature does not replace safe driving. It supports risk reduction. Always perform safety checks.'}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {outputToggles.question && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('recommendedQuestion')}</div>
                      <p className="text-sm font-medium text-navy-900 bg-navy-50 rounded-xl p-3">
                        "{rec.recommendedQuestion[language]}"
                      </p>
                    </div>
                  )}

                  {outputToggles.suggestedTalk && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('suggestedTalkLabel')}</div>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-blue-50 rounded-xl p-3">
                        {rec.suggestedTalk[language]}
                      </p>
                    </div>
                  )}

                  {outputToggles.objectionHandling && (
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{T('possibleObjection')}</div>
                      <div className="bg-red-50 rounded-xl p-3 text-sm">
                        <p className="font-medium text-red-700 mb-1">"{rec.possibleObjection[language]}"</p>
                        <p className="text-gray-700">→ {rec.suggestedResponse[language]}</p>
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => navigate(`/dealer/learn/${rec.productId}`)}
                      className="btn-secondary flex items-center gap-2 text-sm"
                    >
                      <BookOpen size={14} />
                      {T('learnThisProduct')}
                    </button>
                    <button
                      onClick={() => handleShowCustomer(idx)}
                      className="btn-teal flex items-center gap-2 text-sm"
                    >
                      <Users size={14} />
                      {T('showCustomer')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isNA && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            {T('naDisclaimer')}
          </div>
        )}
      </div>
    </div>
  );
};
