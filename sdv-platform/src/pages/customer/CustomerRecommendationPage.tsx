import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { getProductById } from '../../data/products';
import { Heart, X, Play, Info, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

export const CustomerRecommendationPage: React.FC = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const productIndex = parseInt(searchParams.get('productIndex') || '0');
  
  const { language, market, currentProfile, currentRecommendations, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [reaction, setReaction] = useState<'interested' | 'notForMe' | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  const rec = currentRecommendations[productIndex];
  const product = rec ? getProductById(rec.productId) : null;
  const isNA = market === 'north-america';

  useEffect(() => {
    if (rec && product) {
      addLog({
        actorType: 'customer',
        market: currentProfile?.market || market,
        region: currentProfile?.region,
        language,
        vehicle: product.vehicle,
        customerProfileId: currentProfile?.id,
        eventType: 'recommendation_view',
        productId: rec.productId,
        metadata: { rank: rec.rank, sessionId },
      });
    }
  }, []);

  const handleReaction = (type: 'interested' | 'notForMe') => {
    setReaction(type);
    addLog({
      actorType: 'customer',
      market: currentProfile?.market || market,
      region: currentProfile?.region,
      language,
      vehicle: product?.vehicle,
      customerProfileId: currentProfile?.id,
      eventType: type === 'interested' ? 'customer_interest' : 'customer_not_interested',
      productId: rec?.productId,
      metadata: { sessionId, productIndex },
    });
  };

  if (!rec || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            {language === 'ja' ? 'レコメンドデータが見つかりません' : 'Recommendation data not found'}
          </p>
          <button onClick={() => navigate('/dealer/sales')} className="btn-primary">
            {language === 'ja' ? 'ディーラーポータルへ' : 'Go to Dealer Portal'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/40">
      {/* Customer-facing header - simpler, warmer */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="text-navy-900 font-semibold">
            {language === 'ja' ? 'パーソナライズされたご提案' : 'Your Personalized Recommendation'}
          </div>
          {isNA && (
            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
              {language === 'ja' ? 'コンセプトデモ' : 'Concept Demo'}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Main recommendation card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          {/* Product hero */}
          <div className="bg-gradient-to-br from-navy-900 to-teal-800 p-8 text-white text-center">
            <div className="text-6xl mb-3">{product.imageEmoji}</div>
            <div className="text-xs font-medium text-teal-300 uppercase tracking-wide mb-1">
              {T('recommendedForYou')}
            </div>
            <h1 className="text-2xl font-bold">{product.name[language]}</h1>
            <p className="text-teal-200 text-sm mt-2">{product.shortDesc[language]}</p>
          </div>

          <div className="p-6 space-y-5">
            {/* Why for you */}
            <div className="bg-teal-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={12} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-teal-800">
                  {language === 'ja' ? 'あなたにおすすめする理由' : 'Why this is recommended for you'}
                </span>
              </div>
              <p className="text-sm text-teal-700 leading-relaxed">{rec.customerWhyText[language]}</p>
            </div>

            {/* Your situation */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{T('yourSituation')}</div>
              <p className="text-sm text-gray-700">{rec.customerSituation[language]}</p>
            </div>

            {/* Benefits */}
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">{T('benefits')}</div>
              <div className="space-y-2">
                {rec.customerBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-teal-600 font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{b[language]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage scene */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{T('usageScene')}</div>
              <p className="text-sm text-gray-600 italic">"{rec.customerUsageScene[language]}"</p>
            </div>

            {/* Safety notice for smart key */}
            {rec.productId === 'bz-smart-key' && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-700">
                  {language === 'ja' 
                    ? '本機能は運転を完全に代替するものではなく、リスク低減を支援する機能です。機能の限界について、詳細は販売店スタッフにご確認ください。'
                    : 'This feature does not fully replace safe driving practices. It supports risk reduction. For details on feature limitations, please ask dealer staff.'}
                </p>
              </div>
            )}

            {/* NA disclaimer */}
            {isNA && (
              <div className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl p-3">
                {T('naDisclaimer')}
              </div>
            )}

            {/* Actions */}
            {!reaction ? (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDemo(true)}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-2xl text-sm font-medium transition-all hover:bg-gray-50"
                  >
                    <Play size={16} />
                    {T('watchDemo')}
                  </button>
                  <button
                    onClick={() => {
                      addLog({
                        actorType: 'customer',
                        market: currentProfile?.market || market,
                        language,
                        vehicle: product.vehicle,
                        customerProfileId: currentProfile?.id,
                        eventType: 'demo_view',
                        productId: rec.productId,
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 text-gray-600 py-3 rounded-2xl text-sm font-medium transition-all hover:bg-gray-50"
                  >
                    <Info size={16} />
                    {T('learnMore')}
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReaction('notForMe')}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-500 py-3 rounded-2xl text-sm font-medium transition-all"
                  >
                    <X size={16} />
                    {T('notForMe')}
                  </button>
                  <button
                    onClick={() => handleReaction('interested')}
                    className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-2xl text-sm font-bold transition-all shadow-sm"
                  >
                    <Heart size={16} />
                    {T('interested')}
                  </button>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl p-4 text-center ${reaction === 'interested' ? 'bg-teal-50 border border-teal-200' : 'bg-gray-50 border border-gray-200'}`}>
                {reaction === 'interested' ? (
                  <>
                    <div className="text-2xl mb-2">💚</div>
                    <p className="text-sm font-medium text-teal-800">{T('thankYouInterested')}</p>
                    <button
                      onClick={() => navigate('/admin/logs')}
                      className="mt-3 text-xs text-teal-600 hover:text-teal-800 flex items-center justify-center gap-1 mx-auto"
                    >
                      {language === 'ja' ? 'ログで確認する' : 'View in Logs'}
                      <ArrowRight size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-2xl mb-2">🙏</div>
                    <p className="text-sm font-medium text-gray-700">{T('thankYouNotInterested')}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Other recommendations */}
        {currentRecommendations.length > 1 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              {language === 'ja' ? 'その他のご提案' : 'Other Recommendations'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {currentRecommendations
                .filter((_, i) => i !== productIndex)
                .map((otherRec, i) => {
                  const otherProduct = getProductById(otherRec.productId);
                  const otherIndex = currentRecommendations.indexOf(otherRec);
                  if (!otherProduct) return null;
                  return (
                    <button
                      key={otherRec.productId}
                      onClick={() => navigate(`/customer/recommendation/${sessionId}?productIndex=${otherIndex}`)}
                      className="bg-white border border-gray-100 rounded-2xl p-4 text-left hover:border-teal-200 hover:shadow-sm transition-all"
                    >
                      <div className="text-2xl mb-2">{otherProduct.imageEmoji}</div>
                      <div className="font-medium text-sm text-navy-900">{otherProduct.name[language]}</div>
                      <div className="text-xs text-gray-500 mt-1">{otherRec.customerWhyText[language].slice(0, 50)}...</div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Demo modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-4xl mb-3">{product.imageEmoji}</div>
              <h2 className="text-lg font-bold text-navy-900 mb-2">{product.name[language]}</h2>
              <div className="bg-gray-100 rounded-xl h-32 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play size={24} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">
                    {language === 'ja' ? 'デモ動画（コンセプトデモ）' : 'Demo Video (Concept Demo)'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{product.description[language]}</p>
              <button onClick={() => setShowDemo(false)} className="btn-primary w-full">
                {T('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
