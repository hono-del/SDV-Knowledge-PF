import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, defaultOutputPrompt, defaultGuardrailPrompt } from '../../store/appStore';
import { t } from '../../utils/i18n';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

export const AdminAIControlPage: React.FC = () => {
  const {
    language, aiWeights, setAiWeights, tone, setTone,
    outputPrompt, setOutputPrompt, guardrailPrompt, setGuardrailPrompt,
  } = useAppStore();
  const navigate = useNavigate();
  const T = (k: Parameters<typeof t>[0]) => t(k, language);
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTab, setActiveTab] = useState<'dealer' | 'customer' | 'learning'>('dealer');

  const WeightSlider = ({ label, weightKey, max = 30 }: { label: string; weightKey: keyof typeof aiWeights; max?: number }) => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700 w-32 flex-shrink-0">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={aiWeights[weightKey]}
        onChange={e => setAiWeights({ [weightKey]: parseInt(e.target.value) })}
        className="flex-1 accent-teal-500"
      />
      <span className="text-sm font-bold text-teal-600 w-6 text-right">{aiWeights[weightKey]}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <button onClick={() => navigate('/admin')} className="hover:text-teal-600">{T('adminConsole')}</button>
            <ChevronRight size={14} />
            <span className="text-navy-900">{T('aiControl')}</span>
          </div>
          <h1 className="text-2xl font-bold text-navy-900">{T('aiControl')}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['dealer', 'customer', 'learning'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {tab === 'dealer' ? (language === 'ja' ? 'ディーラーアシスト' : 'Dealer Assist')
               : tab === 'customer' ? (language === 'ja' ? 'カスタマーレコメンド' : 'Customer Recommendation')
               : (language === 'ja' ? 'ディーラー学習' : 'Dealer Learning')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommendation Priority */}
          <div className="card">
            <h2 className="font-bold text-navy-900 mb-4">
              {language === 'ja' ? 'レコメンド優先度' : 'Recommendation Priority'}
            </h2>
            <div className="space-y-4">
              <WeightSlider label={language === 'ja' ? '利用状況マッチ' : 'Usage Match'} weightKey="usage" max={30} />
              <WeightSlider label={language === 'ja' ? '明示的ニーズ' : 'Explicit Need'} weightKey="explicitNeed" max={25} />
              <WeightSlider label={language === 'ja' ? 'ライフスタイル' : 'Lifestyle'} weightKey="lifestyle" max={15} />
              <WeightSlider label={language === 'ja' ? 'マーケット文脈' : 'Market Context'} weightKey="market" max={15} />
              <WeightSlider label={language === 'ja' ? '車種適合' : 'Vehicle Fit'} weightKey="vehicle" max={10} />
              <WeightSlider label={language === 'ja' ? '機能利用状況' : 'Feature Usage'} weightKey="featureUsage" max={5} />
            </div>
          </div>

          {/* Output prompt */}
          <div className="card">
            <h2 className="font-bold text-navy-900 mb-1">
              {language === 'ja' ? '出力項目' : 'Output Items'}
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              {language === 'ja'
                ? 'レコメンド生成時に、何をどう出力するかをプロンプトで指定します。'
                : 'Specify what the recommendation should output, as a generation prompt.'}
            </p>
            <textarea
              rows={12}
              value={outputPrompt ?? defaultOutputPrompt}
              onChange={e => setOutputPrompt(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono leading-relaxed focus:outline-none focus:border-teal-400 bg-gray-50 resize-y"
              placeholder={language === 'ja' ? '出力してほしい項目を記述...' : 'Describe the output items...'}
            />

            {/* Tone */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                {language === 'ja' ? 'トーン' : 'Tone'}
              </h3>
              <div className="flex gap-2">
                {(['professional', 'friendly', 'concise'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      tone === t ? 'bg-navy-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t === 'professional' ? (language === 'ja' ? 'プロフェッショナル' : 'Professional')
                     : t === 'friendly' ? (language === 'ja' ? 'フレンドリー' : 'Friendly')
                     : (language === 'ja' ? '簡潔' : 'Concise')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guardrails */}
          <div className="card lg:col-span-2">
            <h2 className="font-bold text-navy-900 mb-1">
              {language === 'ja' ? 'ガードレール' : 'Guardrails'}
            </h2>
            <p className="text-xs text-gray-400 mb-3">
              {language === 'ja'
                ? '生成時に守らせる制約をプロンプトで指定します。チャンク単位のメタデータとは別に、出力全体に適用されます。'
                : 'Specify generation constraints as a prompt. Applied to the full output, separately from per-chunk metadata.'}
            </p>
            <textarea
              rows={10}
              value={guardrailPrompt ?? defaultGuardrailPrompt}
              onChange={e => setGuardrailPrompt(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-mono leading-relaxed focus:outline-none focus:border-teal-400 bg-gray-50 resize-y"
              placeholder={language === 'ja' ? '守らせたいルールを記述...' : 'Describe the rules to enforce...'}
            />
          </div>
        </div>

        {/* Advanced Prompt */}
        <div className="card mt-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="font-bold text-navy-900">
              {language === 'ja' ? 'アドバンスドプロンプト' : 'Advanced Prompt'}
            </h2>
            {showAdvanced ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>
          {showAdvanced && (
            <div className="mt-4 animate-fade-in">
              <textarea
                rows={8}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-teal-400 bg-gray-50 resize-none"
                defaultValue={`You are a vehicle product recommendation assistant.
Generate recommendations based on:
1. Customer profile and usage patterns
2. Market context and regional relevance
3. Explicit needs expressed in dealer notes

Rules:
- Never recommend based solely on age
- Always ground product facts in Knowledge Base
- Safety products must include caution notices
- Label all hypothetical examples as "Demo / Hypothesis"`}
              />
            </div>
          )}
        </div>

        {/* Test link */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate('/admin/prompt-test')}
            className="btn-teal flex items-center gap-2"
          >
            {language === 'ja' ? 'プロンプトテストで確認' : 'Test in Prompt Test'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
