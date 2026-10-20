// Core types for SDV Knowledge Experience Platform

export type Language = "ja" | "en";
export type Market = "japan" | "north-america";

export type JapanRegion = "tokyo" | "hokkaido" | "nagano" | "okinawa";
export type NAState = "california" | "texas" | "washington" | "minnesota" | "colorado" | "new-york";
export type Region = JapanRegion | NAState;

export type LocalizedText = {
  ja: string;
  en: string;
};

export type Vehicle = "fj" | "bz4x";

export type ProductId =
  | "fj-remote-start"
  | "fj-air-lumbar"
  | "fj-seat-cover"
  | "bz-cable-holder"
  | "bz-rain-mirror"
  | "bz-smart-key";

export interface Product {
  id: ProductId;
  vehicle: Vehicle;
  name: LocalizedText;
  shortDesc: LocalizedText;
  description: LocalizedText;
  functions: string[];
  valueTags: string[];
  targetContexts: string[];
  primaryValues: LocalizedText[];
  personalizationSignals: string[];
  imageEmoji: string;
  availableInJapan: boolean;
  sourceUrl?: string;
}

export interface LearningContent {
  productId: ProductId;
  whatIsIt: LocalizedText;
  whyCustomersCare: {
    feature: LocalizedText;
    value: LocalizedText;
    experience: LocalizedText;
  }[];
  bestFitCustomers: {
    persona: LocalizedText;
    reason: LocalizedText;
    tags: string[];
  }[];
  customerStory: {
    persona: LocalizedText;
    before: LocalizedText;
    after: LocalizedText;
    label: "Demo / Hypothesis";
  };
  howToSell: {
    opener: LocalizedText;
    questions: LocalizedText[];
    suggestedTalk: LocalizedText;
    objectionHandling: {
      objection: LocalizedText;
      response: LocalizedText;
    }[];
  };
  successStory: {
    title: LocalizedText;
    content: LocalizedText;
    label: "Demo / Hypothesis";
  };
  quiz: {
    question: LocalizedText;
    options: LocalizedText[];
    correctIndex: number;
    explanation: LocalizedText;
  }[];
}

export interface CustomerProfile {
  id?: string;
  // Basic
  name?: string;
  age?: number;
  market: Market;
  region?: Region;
  language: Language;
  // Household
  hasSpouse?: boolean;
  childrenCount?: number;
  // Vehicle
  vehicle?: Vehicle;
  ownershipStatus?: "owns" | "lease" | "considering";
  yearsOwned?: number;
  sharedVehicle?: boolean;
  // Usage
  drivingFrequency?: "daily" | "5-days" | "weekends" | "occasional";
  weeklyDistanceKm?: number;
  weeklyDistanceMiles?: number;
  primaryUsage?: string[];
  frequentDestinations?: string[];
  highwayRatio?: number;
  urbanRatio?: number;
  mountainRatio?: number;
  // Features
  frequentlyUsedFeatures?: string[];
  rarelyUsedFeatures?: string[];
  // Lifestyle tags
  lifestyleTags?: string[];
  // Interests
  interests?: {
    safety?: number;
    comfort?: number;
    convenience?: number;
    outdoor?: number;
    cleanliness?: number;
    evUsability?: number;
    design?: number;
  };
  // EV specific
  homeCharging?: boolean;
  chargingSessionsPerWeek?: number;
  publicChargingFrequency?: "rarely" | "sometimes" | "often";
  cableUsageFrequency?: "low" | "medium" | "high";
  // Notes
  dealerNotes?: string;
}

export interface RecommendationResult {
  productId: ProductId;
  rank: number;
  fitScore: number;
  scoreBreakdown: {
    usageMatch: number;
    explicitNeed: number;
    lifestyleMatch: number;
    marketContext: number;
    vehicleFit: number;
    profileContext: number;
  };
  whyRecommended: LocalizedText;
  evidenceSignals: LocalizedText[];
  customerValue: LocalizedText;
  recommendedQuestion: LocalizedText;
  suggestedTalk: LocalizedText;
  possibleObjection: LocalizedText;
  suggestedResponse: LocalizedText;
  // Customer-facing (no internal logic)
  customerWhyText: LocalizedText;
  customerSituation: LocalizedText;
  customerBenefits: LocalizedText[];
  customerUsageScene: LocalizedText;
}

export interface EventLog {
  id: string;
  timestamp: string;
  actorType: "dealer" | "customer" | "admin";
  actorId?: string;
  market: Market;
  region?: string;
  language: Language;
  vehicle?: Vehicle;
  customerProfileId?: string;
  eventType:
    | "learning_view"
    | "quiz_answer"
    | "sales_assist_run"
    | "recommendation_view"
    | "customer_interest"
    | "customer_not_interested"
    | "demo_view"
    | "knowledge_import"
    | "prompt_test";
  productId?: ProductId;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeSource {
  id: string;
  name: LocalizedText;
  url: string;
  type: "website" | "document" | "api";
  brand: string;
  vehicle?: Vehicle;
  market: Market;
  language: Language;
  lastImported?: string;
  status: "connected" | "pending" | "error" | "not-connected";
  productCount?: number;
}

export interface AnalyticsData {
  learningCompletion: number;
  quizAccuracy: number;
  salesAssistUsage: number;
  recommendationViews: number;
  interestedRate: number;
  demoViewRate: number;
  recommendationByProduct: {
    productId: ProductId;
    name: LocalizedText;
    count: number;
    interestedRate: number;
  }[];
  interestByMarket: {
    market: string;
    interestedRate: number;
  }[];
  interestByState: {
    state: string;
    rate: number;
  }[];
  valueResonance: {
    value: string;
    score: number;
  }[];
  learningVsSales: {
    month: string;
    learning: number;
    sales: number;
  }[];
}

export interface ImprovementInsight {
  id: string;
  title: LocalizedText;
  content: LocalizedText;
  suggestedAction: LocalizedText;
  targetProductId?: ProductId;
  targetMarket?: Market;
  targetState?: string;
  adjustmentType: "marketWeight" | "valueEmphasis" | "personaWeight";
  adjustmentValue: number;
  status: "new" | "reviewed" | "applied";
}

export interface AppState {
  language: Language;
  market: Market;
  region: Region | null;
  currentProfile: CustomerProfile | null;
  currentSessionId: string | null;
  currentRecommendations: RecommendationResult[];
  aiControlWeights: {
    usage: number;
    explicitNeed: number;
    lifestyle: number;
    market: number;
    vehicle: number;
    price: number;
    featureUsage: number;
  };
  outputToggles: {
    whyRecommended: boolean;
    customerValue: boolean;
    question: boolean;
    suggestedTalk: boolean;
    objectionHandling: boolean;
    evidence: boolean;
  };
  outputPrompt: string;
  guardrailPrompt: string;
  tone: "professional" | "friendly" | "concise";
  logs: EventLog[];
}
