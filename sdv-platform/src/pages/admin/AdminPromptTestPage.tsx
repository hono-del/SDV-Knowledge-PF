import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { personas } from '../../data/personas';
import { runRecommendationEngine } from '../../engine/recommendationEngine';
import { getProductById } from '../../data/products';
import type { Market, Region, Language } from '../../types';
import { Play, ArrowRight, ChevronRight } from 'lucide-react';

export const AdminPromptTestPage: React.FC = () => {
  const { language, aiWeights, addLog } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);

  const [testPersona, setTestPersona] = useState('persona-a');
  const [testMarket, setTestMarket] = useState<Market>('japan');
  const [testRegion, setTestRegion] = useState<Region>('tokyo');
  const [testLanguage, setTestLanguage] = useState<Language>('ja');
  const [compareMode, setCompareMode] = useState(false);
  const [compareMarket, setCompareMarket] = useState<Market>('north-america');
  const [compareRegion, setCompareRegion] = useState<Region>('minnesota');
  const [results, setResults] = useState<any>(null);
  const [compareResults, setCompareResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'dealer' | 'customer'>('dealer');

  const japanRegions: Region[] = ['tokyo', 'hokkaido', 'nagano', 'okinawa'];
  const naRegions: Region[] = ['california', 'texas', 'washington', 'minnesota', 'colorado', 'new-york'];
  const regions = testMarket === 'japan' ? japanRegions : naRegions;
  const compareRegions = compareMarket === 'japan' ? japanRegions : naRegions;

  const runTest = async () => {
    setIsRunning(true);
    const persona = personas[testPersona];
    if (!persona) return;

    await new Promise(r => setTimeout(r, 800));
    
    const testProfile = { ...persona, market: testMarket, region: testRegion, language: testLanguage };
    const recs = runRecommendationEngine(testProfile, aiWeights);
    setResults(recs);

    if (compareMode) {
      const compareProfile = { ...persona, market: compareMarket, region: compareRegion, language: testLanguage };
      const cRecs = runRecommendationEngine(compareProfile, aiWeights);
      setCompareResults(cRecs);
    }

    addLog({
      actorType: 'admin',
      market: testMarket,
      region: testRegion,
      language,
      eventType: 'prompt_test',
      metadata: { persona: testPersona, compareMode, compareRegion },
    });

    setIsRunning(false);
  };

  const regionLabel = (r: Region) => {
    const labels: Record<string, string> = {
      tokyo: 'Tokyo', hokkaido: 'Hokkaido', nagano: 'Nagano', okinawa: 'Okinawa',
      california: 'California', texas: 'Texas', washington: 'Washington',
      minnesota: 'Minnesota', colorado: 'Colorado', 'new-york': 'New York',
    };
    return labels[r] || r;
  };

  const ResultCard = ({ recs, market, region, lang }: { recs: any[], market: Market, region: Region, lang: Language }) => (
    <div className="space-y-3">
      {recs.map((rec: any, i: number) => {
        const product = getProductById(rec.productId);
        if (!product) return null;
        return (
          <div key={rec.productId} className={`border rounded-xl p-4 ${i === 0 ? 'border-teal-300 bg-teal-50' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{product.imageEmoji}</span>
                <span className="font-semibold text-sm text-navy-900">{product.name[lang]}</span>
              </div>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-lg ${rec.fitScore >= 75 ? 'bg-green-100 text-green-700' : rec.fitScore >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                {rec.fitScore}/100
              </span>
            </div>
            {activeResultTab === 'dealer' ? (
              <p className="text-xs text-gray-600 leading-relaxed">{rec.whyRecommended[lang]}</p>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">{rec.customerWhyText[lang]}</p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{T('promptTest')}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">{T('promptTest')}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Settings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <h2 className="font-bold text-navy-900 mb-4">{language === 'ja' ? 'テスト設定' : 'Test Settings'}</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Persona</label>
                  <select
                    value={testPersona}
                    onChange={e => setTestPersona(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  >
                    {Object.entries(personas).map(([id, p]) => (
                      <option key={id} value={id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">{T('market')}</label>
                    <select
                      value={testMarket}
                      onChange={e => {
                        const m = e.target.value as Market;
                        setTestMarket(m);
                        setTestRegion(m === 'japan' ? 'tokyo' : 'california');
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    >
                      <option value="japan">{T('japan')}</option>
                      <option value="north-america">{T('northAmerica')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">{T('state')}</label>
                    <select
                      value={testRegion}
                      onChange={e => setTestRegion(e.target.value as Region)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    >
                      {regions.map(r => (
                        <option key={r} value={r}>{regionLabel(r)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">{T('language')}</label>
                  <div className="flex gap-2">
                    {(['ja', 'en'] as Language[]).map(l => (
                      <button
                        key={l}
                        onClick={() => setTestLanguage(l)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          testLanguage === l ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {l === 'ja' ? '日本語' : 'EN'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Compare mode */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-navy-900">{language === 'ja' ? '比較モード' : 'Compare Mode'}</h3>
                <button
                  onClick={() => setCompareMode(!compareMode)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${compareMode ? 'bg-teal-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${compareMode ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>

              {compareMode && (
                <div className="grid grid-cols-2 gap-2 animate-fade-in">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">{T('market')}</label>
                    <select
                      value={compareMarket}
                      onChange={e => {
                        const m = e.target.value as Market;
                        setCompareMarket(m);
                        setCompareRegion(m === 'japan' ? 'hokkaido' : 'minnesota');
                      }}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    >
                      <option value="japan">{T('japan')}</option>
                      <option value="north-america">{T('northAmerica')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">{T('state')}</label>
                    <select
                      value={compareRegion}
                      onChange={e => setCompareRegion(e.target.value as Region)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                    >
                      {compareRegions.map(r => (
                        <option key={r} value={r}>{regionLabel(r)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={runTest}
              disabled={isRunning}
              className="w-full btn-teal py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  {language === 'ja' ? '実行中...' : 'Running...'}
                </>
              ) : (
                <>
                  <Play size={16} />
                  {T('runTest')}
                </>
              )}
            </button>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-3">
            {results ? (
              <div className={`${compareMode && compareResults ? 'grid grid-cols-2 gap-4' : ''}`}>
                {/* Primary results */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-bold text-navy-900">{regionLabel(testRegion)}</span>
                      <span className="text-xs text-gray-500 ml-2">{testMarket === 'north-america' ? 'North America' : 'Japan'}</span>
                    </div>
                    <div className="flex gap-1">
                      {(['dealer', 'customer'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveResultTab(tab)}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${activeResultTab === tab ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {tab === 'dealer' ? (language === 'ja' ? 'ディーラー' : 'Dealer') : (language === 'ja' ? '顧客' : 'Customer')}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ResultCard recs={results} market={testMarket} region={testRegion} lang={testLanguage} />
                </div>

                {/* Compare results */}
                {compareMode && compareResults && (
                  <div>
                    <div className="mb-3">
                      <span className="font-bold text-navy-900">{regionLabel(compareRegion)}</span>
                      <span className="text-xs text-gray-500 ml-2">{compareMarket === 'north-america' ? 'North America' : 'Japan'}</span>
                      {testMarket !== compareMarket && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg">
                          {language === 'ja' ? '価値翻訳の差' : 'Value translation diff'}
                        </span>
                      )}
                    </div>
                    <ResultCard recs={compareResults} market={compareMarket} region={compareRegion} lang={testLanguage} />
                  </div>
                )}
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-16 text-center">
                <Play size={32} className="text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">
                  {language === 'ja' ? '設定を選択してテストを実行してください' : 'Select settings and run a test'}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {language === 'ja' ? '比較モードで日本 vs 北米の価値翻訳の差を確認できます' : 'Use Compare Mode to see the difference in value translation between Japan and North America'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
