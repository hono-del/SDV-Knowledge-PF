import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language, Market, Region, CustomerProfile, RecommendationResult, EventLog } from '../types';

interface AppStore {
  // Global settings
  language: Language;
  market: Market;
  region: Region | null;
  setLanguage: (lang: Language) => void;
  setMarket: (market: Market) => void;
  setRegion: (region: Region | null) => void;
  
  // Current session
  currentProfile: CustomerProfile | null;
  currentSessionId: string | null;
  currentRecommendations: RecommendationResult[];
  setProfile: (profile: CustomerProfile | null) => void;
  setRecommendations: (recs: RecommendationResult[], sessionId: string) => void;
  
  // AI Control weights
  aiWeights: {
    usage: number;
    explicitNeed: number;
    lifestyle: number;
    market: number;
    vehicle: number;
    price: number;
    featureUsage: number;
  };
  setAiWeights: (weights: Partial<AppStore['aiWeights']>) => void;
  
  // Output toggles
  outputToggles: {
    whyRecommended: boolean;
    customerValue: boolean;
    question: boolean;
    suggestedTalk: boolean;
    objectionHandling: boolean;
    evidence: boolean;
  };
  setOutputToggles: (toggles: Partial<AppStore['outputToggles']>) => void;

  outputPrompt: string;
  setOutputPrompt: (prompt: string) => void;
  guardrailPrompt: string;
  setGuardrailPrompt: (prompt: string) => void;
  
  // Tone
  tone: 'professional' | 'friendly' | 'concise';
  setTone: (tone: AppStore['tone']) => void;
  
  // Logs
  logs: EventLog[];
  addLog: (log: Omit<EventLog, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  
  // Reset
  resetDemo: () => void;
}

const defaultWeights = {
  usage: 30,
  explicitNeed: 25,
  lifestyle: 15,
  market: 15,
  vehicle: 10,
  price: 0,
  featureUsage: 5,
};

const defaultToggles = {
  whyRecommended: true,
  customerValue: true,
  question: true,
  suggestedTalk: true,
  objectionHandling: true,
  evidence: true,
};

export const defaultOutputPrompt = `推薦結果の出力には、次の項目を含めてください。

- なぜ推薦するか: 顧客の利用状況・明示ニーズ・地域文脈との対応を説明する
- 顧客価値: 利用シーンと感情ベネフィットまで落とす
- 推奨質問: ディーラーが次に確認すべき問い
- 提案トーク: そのまま話せる短いトーク
- オブジェクション対応: 想定される反対と返し
- エビデンス: Knowledge Base上の根拠シグナル

商品仕様の言い換えで終わらず、誰に・いつ・なぜ価値になるかを書くこと。`;

export const defaultGuardrailPrompt = `以下を厳守すること。

- サポートされていない商品機能を作出しない
- 北米での商品提供を事実として表現しない
- 安全系商品は必ず注意事項の導線を表示する
- 年齢のみを推薦理由にしない
- 商品情報は Knowledge Base を根拠にする
- 仮説事例は必ず Demo / Hypothesis とラベル表示する
- 安全・効果は断定せず、支援・期待価値として表現する`;

const seedLogs: EventLog[] = [
  { id: 'seed-1', timestamp: '2026-09-28T09:12:00Z', actorType: 'dealer', market: 'japan', region: 'tokyo', language: 'ja', vehicle: 'fj', eventType: 'learning_view', productId: 'fj-remote-start', metadata: { section: 'howToSell' } },
  { id: 'seed-2', timestamp: '2026-09-28T09:24:00Z', actorType: 'dealer', market: 'japan', region: 'tokyo', language: 'ja', vehicle: 'fj', eventType: 'quiz_answer', productId: 'fj-remote-start', metadata: { correct: true } },
  { id: 'seed-3', timestamp: '2026-09-28T10:05:00Z', actorType: 'dealer', market: 'japan', region: 'tokyo', language: 'ja', vehicle: 'fj', customerProfileId: 'persona-a', eventType: 'sales_assist_run', metadata: { topProduct: 'fj-seat-cover' } },
  { id: 'seed-4', timestamp: '2026-09-28T10:08:00Z', actorType: 'customer', market: 'japan', region: 'tokyo', language: 'ja', vehicle: 'fj', customerProfileId: 'persona-a', eventType: 'recommendation_view', productId: 'fj-seat-cover' },
  { id: 'seed-5', timestamp: '2026-09-28T10:10:00Z', actorType: 'customer', market: 'japan', region: 'tokyo', language: 'ja', vehicle: 'fj', customerProfileId: 'persona-a', eventType: 'customer_interest', productId: 'fj-seat-cover', metadata: { value: 'cleanliness' } },
  { id: 'seed-6', timestamp: '2026-09-29T11:30:00Z', actorType: 'dealer', market: 'north-america', region: 'washington', language: 'en', vehicle: 'bz4x', customerProfileId: 'persona-b', eventType: 'sales_assist_run', metadata: { topProduct: 'bz-cable-holder' } },
  { id: 'seed-7', timestamp: '2026-09-29T11:33:00Z', actorType: 'customer', market: 'north-america', region: 'washington', language: 'en', vehicle: 'bz4x', customerProfileId: 'persona-b', eventType: 'recommendation_view', productId: 'bz-rain-mirror' },
  { id: 'seed-8', timestamp: '2026-09-29T11:35:00Z', actorType: 'customer', market: 'north-america', region: 'washington', language: 'en', vehicle: 'bz4x', customerProfileId: 'persona-b', eventType: 'customer_interest', productId: 'bz-rain-mirror', metadata: { value: 'visibility' } },
  { id: 'seed-9', timestamp: '2026-09-30T14:00:00Z', actorType: 'admin', market: 'japan', language: 'ja', eventType: 'knowledge_import', metadata: { sourceId: 'source-fj', steps: 8 } },
  { id: 'seed-10', timestamp: '2026-09-30T14:30:00Z', actorType: 'dealer', market: 'north-america', region: 'minnesota', language: 'en', vehicle: 'bz4x', customerProfileId: 'persona-c', eventType: 'sales_assist_run', metadata: { topProduct: 'bz-smart-key' } },
  { id: 'seed-11', timestamp: '2026-09-30T14:33:00Z', actorType: 'customer', market: 'north-america', region: 'minnesota', language: 'en', vehicle: 'bz4x', customerProfileId: 'persona-c', eventType: 'customer_interest', productId: 'bz-smart-key', metadata: { reason: 'shared_vehicle' } },
  { id: 'seed-12', timestamp: '2026-10-01T09:00:00Z', actorType: 'admin', market: 'japan', language: 'ja', eventType: 'prompt_test', metadata: { market_a: 'japan', market_b: 'north-america', state: 'minnesota' } },
];

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      language: 'ja',
      market: 'japan',
      region: null,
      setLanguage: (language) => set({ language }),
      setMarket: (market) => set({ market, region: null }),
      setRegion: (region) => set({ region }),
      
      currentProfile: null,
      currentSessionId: null,
      currentRecommendations: [],
      setProfile: (profile) => set({ currentProfile: profile }),
      setRecommendations: (recs, sessionId) => set({ currentRecommendations: recs, currentSessionId: sessionId }),
      
      aiWeights: defaultWeights,
      setAiWeights: (weights) => set((s) => ({ aiWeights: { ...s.aiWeights, ...weights } })),
      
      outputToggles: defaultToggles,
      setOutputToggles: (toggles) => set((s) => ({ outputToggles: { ...s.outputToggles, ...toggles } })),

      outputPrompt: defaultOutputPrompt,
      setOutputPrompt: (outputPrompt) => set({ outputPrompt }),
      guardrailPrompt: defaultGuardrailPrompt,
      setGuardrailPrompt: (guardrailPrompt) => set({ guardrailPrompt }),
      
      tone: 'professional',
      setTone: (tone) => set({ tone }),
      
      logs: seedLogs,
      addLog: (logData) => {
        const log: EventLog = {
          ...logData,
          id: `log-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: new Date().toISOString(),
        };
        set((s) => ({ logs: [log, ...s.logs] }));
      },
      clearLogs: () => set({ logs: seedLogs }),
      
      resetDemo: () => set({
        language: 'ja',
        market: 'japan',
        region: null,
        currentProfile: null,
        currentSessionId: null,
        currentRecommendations: [],
        aiWeights: defaultWeights,
        outputToggles: defaultToggles,
        outputPrompt: defaultOutputPrompt,
        guardrailPrompt: defaultGuardrailPrompt,
        tone: 'professional',
        logs: seedLogs,
      }),
    }),
    {
      name: 'sdv-platform-state',
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppStore>;
        return {
          ...current,
          ...p,
          outputPrompt: p.outputPrompt ?? current.outputPrompt,
          guardrailPrompt: p.guardrailPrompt ?? current.guardrailPrompt,
        };
      },
    }
  )
);

export function useT() {
  const language = useAppStore(s => s.language);
  return language;
}
