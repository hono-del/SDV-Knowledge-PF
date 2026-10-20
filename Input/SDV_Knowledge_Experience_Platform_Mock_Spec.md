# SDV Knowledge & Experience Platform
## Customer Proposal Mock System Specification

- Version: 1.0
- Purpose: メーカー本社 SDV事業部向け提案デモ
- Development: Cursor / React + TypeScript
- UI language: 日本語 / English 切替
- Market: Japan / North America (PoCではNorth America = U.S.の州単位)
- Design: ニュートラルなコーポレートデザイン
- Data policy: 公開情報 + 仮説データのみ。非公開SDV情報は使用しない。

---

# 1. モックの目的

本モックは、メーカーが保有する商品・SDVサービス情報を単に検索・表示するのではなく、以下の一連の価値を体験可能にする。

1. Web等に存在する商品・サービス情報を取り込む
2. 情報をAI Ready化し、Knowledge Baseとして構造化する
3. Dealer Staffが商品を「理解し、売る気になる」教育体験を提供する
4. 顧客情報・車両・地域・利用状況から、Dealer向けSales Assistを生成する
5. 同じKnowledge Baseから、Userに直接見せるパーソナライズRecommendationを生成する
6. 利用ログ・顧客反応を蓄積・分析する
7. Recommendation Logic / Prompt / Knowledgeを継続改善する

## 提案上の最終ゴール

> 「今回は公開情報でここまでできるなら、実際のSDVサービス情報を渡して検証してみたい」

---

# 2. コアメッセージ

> メーカーが持つ商品・SDV情報をAI Ready化し、地域・顧客・利用状況に応じて最適な価値に翻訳し、DealerとUserの双方へ届け、その反応から継続改善する。

重要な考え方：

- Language と Market は別概念
  - Language = 表示言語
  - Market = Recommendation / Value Translationの前提
- 単なる「日本語→英語翻訳」ではなく「地域・顧客文脈に合わせた価値翻訳」
- Dealer教育とDealer Sales Assistは同じKnowledge Baseから生成
- User RecommendationはDealer画面とは別UI
- ログを取得してRecommendation Logicへ還元する
- UI自体より「Knowledge + Value Translation Logic + Improvement Loop」を主役にする

---

# 3. システム全体構成

```text
Public Website / Product Data / Regional Context
                ↓
        Knowledge Sources
                ↓
        AI Ready Pipeline
  Extraction / Chunking / Metadata
      Semantic Relationships
                ↓
        Knowledge Base
                ↓
      AI / Prompt Control
     ┌──────────┴──────────┐
     ↓                     ↓
Dealer Portal       Customer Experience
Learn / Sell        Personalized Recommendation
     └──────────┬──────────┘
                ↓
       Interaction Logs
                ↓
          Analytics
                ↓
     Improvement Insights
                ↓
Prompt / Logic / Knowledge update
```

---

# 4. 利用者と3つのUI

## 4.1 Dealer Portal

利用者：販売店スタッフ

目的：
- Learn: 商品を理解し、売る理由を理解する
- Sell: 顧客ごとに最適な商品・価値・トークを見つける

## 4.2 Customer Experience

利用者：User / 商談相手

目的：
- 自分の利用状況に合うUpgradeを視覚的に理解する
- 「なぜ自分におすすめなのか」を理解する
- 興味・反応を入力できる

Dealer用の内部情報（Fit Scoreの詳細ロジック、推奨質問、Dealer Coaching等）は表示しない。

## 4.3 Admin Console

利用者：メーカー本社 / 運営者

目的：
- Knowledge Source登録
- Web情報のAI Ready化
- Knowledge確認
- Prompt / Recommendation Rule管理
- 出力テスト
- 利用ログ・成果分析
- 改善施策への反映

---

# 5. デモ対象車種・詳細化商品

公開ラインアップの件数は更新される可能性があるため、アプリ側では件数をハードコードしない。
一覧はJSONで管理し、商品追加・削除が可能な構造とする。

詳細モック化は各車種3商品、合計6商品とする。

## 5.1 Land Cruiser “FJ” — 詳細化3商品

### FJ-01 Remote Start / リモートスタート

選定理由：
- Japan / North Americaの地域差を最も見せやすい
- 夏の暑さ、冬の寒さ、霜、通勤時間など複数Contextを利用できる
- 「機能→生活価値」の翻訳が直感的
- Dealerの提案トークを作りやすい

公開情報ベースの主要価値：
- 遠隔でエンジン始動
- 乗車前の空調制御
- 冬季の霜取り支援
- 暖機時間設定

主なPersonalization Signals：
- 地域 / 州
- 季節 / 気候
- 利用時間帯
- 通勤有無
- Family
- 週あたり走行距離

### FJ-02 Air Lumbar / エアーランバー

選定理由：
- 「年齢」だけではなく、長距離利用・運転時間・利用頻度を使ったパーソナライズができる
- Long-distance / Commuterとの親和性が高い
- 機能説明から「疲れにくい移動体験」へ価値翻訳できる

公開情報ベースの主要価値：
- 背中とシートの隙間をサポート
- 姿勢を支援
- 体圧を分散
- 長時間運転時の快適性向上

主なPersonalization Signals：
- 日/週走行距離
- Long-distance
- Commuter
- よく行く場所
- 連続運転時間
- Comfortへの関心

注意：
- 年齢は補助Signalsとしてのみ使用し、年齢だけを理由に推薦しない。

### FJ-03 Seat Cover / シートカバー

選定理由：
- Family / Outdoor / Pet / CampingなどLifestyle情報を使いやすい
- 利用用途と推薦がつながることを視覚的に示しやすい
- 「車をどう使っているか」に基づくRecommendationの好例

公開情報ベースの主要価値：
- 撥水
- 水・泥・汗への耐性
- 汚れを拭き取りやすい
- ISOFIX対応

主なPersonalization Signals：
- Family
- 子ども同乗
- Outdoor / Camping
- 海 / 山 / スポーツ
- 汚れやすい荷物・服装
- 週末利用

## 5.2 bZ4X — 詳細化3商品

### BZ-01 Charging Cable Holder / 充電ケーブルホルダー

選定理由：
- EVならではの利用データを使ったRecommendationを示せる
- 「購入時属性」ではなく「日常の利用状況」によるPersonalizationができる
- 充電頻度や自宅充電有無をRecommendation Signalにできる

主要価値：
- 長い充電ケーブルを整理
- 収納性向上
- 持ち運びしやすい

主なPersonalization Signals：
- 自宅充電有無
- 充電回数/週
- 充電ケーブル利用頻度
- Commuter
- 走行距離
- EV利用頻度

### BZ-02 Rain Clearing Blue Mirror / レインクリアリングブルーミラー

選定理由：
- 地域・州の天候差を価値翻訳に利用できる
- Washington等の雨天地域とCalifornia等で優先度を変えられる
- 「同じ商品でも地域によってRecommendation Rankingが変わる」を見せやすい

主要価値：
- ミラー表面の親水処理
- 雨天時の後方視認性をサポート
- 太陽光による親水性の回復・持続

主なPersonalization Signals：
- Market / State
- 雨天頻度
- 夜間運転
- 通勤頻度
- Safetyへの関心

### BZ-03 Plus Support Smart Key / プラスサポート用スマートキー

選定理由：
- Safetyニーズという明確な顧客関心を使える
- 車両を家族で共有するContextと相性が良い
- Dealer教育で「機能の正しい理解」が重要な商品として見せられる

主要価値：
- 専用キーでプラスサポートを始動
- 急アクセル時の加速抑制を支援
- 警報・ディスプレイで注意喚起

主なPersonalization Signals：
- Safetyへの関心
- 複数ドライバーでの車両共有
- 駐車 / 市街地利用
- 運転への不安・要望（明示入力のみ）
- Dealerとの会話内容

注意：
- 年齢のみを根拠に推薦しない。
- 「事故を防止する」等の断定表現を避け、「運転を支援」「リスク低減を支援」とする。
- 安全機能については必ず注意事項・機能限界への導線を表示する。

---

# 6. Demo Customer Profiles

3名の仮説Personaを初期データとして持つ。
全員、ワンクリックで読み込める「Load Demo Profile」を用意する。

## Persona A: 健太 / Family × Outdoor

```yaml
id: persona-a
name_ja: 佐藤 健太
name_en: Kenta Sato
age: 41
market: Japan
region: Tokyo
vehicle: Land Cruiser FJ
ownership_status: Owns vehicle
family:
  spouse: true
  children: 2
lifestyle:
  - Family
  - Outdoor
  - Weekend Trip
primary_usage:
  - Commuting
  - Family Trips
  - Camping
frequent_destinations:
  - Suburban shopping
  - Campgrounds
  - Mountain areas
weekly_distance_km: 320
driving_frequency: Daily
frequently_used_features:
  - Air conditioning
  - Navigation
  - Cargo space
interests:
  - Convenience
  - Comfort
  - Easy cleaning
pain_points:
  - 車内の汚れ
  - 夏冬の乗車直後の車内温度
```

Expected Recommendation:
1. Seat Cover
2. Remote Start
3. Air Lumbar

## Persona B: Emily / EV Daily User × Rainy Region

```yaml
id: persona-b
name_ja: エミリー・ジョンソン
name_en: Emily Johnson
age: 35
market: North America
country: US
state: Washington
vehicle: bZ4X
ownership_status: Owns vehicle
family:
  spouse: true
  children: 1
lifestyle:
  - Commuter
  - Family
primary_usage:
  - Daily commuting
  - School pickup
  - Weekend shopping
frequent_destinations:
  - Downtown Seattle
  - Suburban shopping
weekly_distance_miles: 260
driving_frequency: Daily
charging:
  home_charging: true
  charging_sessions_per_week: 5
  cable_use_frequency: High
frequently_used_features:
  - Navigation
  - Climate control
  - Charging
interests:
  - Convenience
  - Visibility
  - EV usability
pain_points:
  - 充電ケーブルを毎回まとめるのが面倒
  - 雨の日の視界
```

Expected Recommendation:
1. Charging Cable Holder
2. Rain Clearing Blue Mirror
3. Plus Support Smart Key

## Persona C: Robert / Shared Vehicle × Safety & Long Distance

```yaml
id: persona-c
name_ja: ロバート・ミラー
name_en: Robert Miller
age: 66
market: North America
country: US
state: Minnesota
vehicle: bZ4X
ownership_status: Owns vehicle
family:
  spouse: true
  children: 0
vehicle_shared_with:
  - Spouse
lifestyle:
  - Long-distance
  - Family Visit
primary_usage:
  - Daily errands
  - Highway trips
  - Visiting family
frequent_destinations:
  - Local shopping
  - Interstate highways
  - Family homes
weekly_distance_miles: 210
driving_frequency: 5_days_per_week
charging:
  home_charging: true
  charging_sessions_per_week: 3
frequently_used_features:
  - Navigation
  - Driver assistance
  - Climate control
interests:
  - Safety
  - Comfort
  - Simplicity
explicit_needs:
  - 家族で車を共有している
  - 運転支援機能を分かりやすく使いたい
```

Expected Recommendation:
1. Plus Support Smart Key
2. Charging Cable Holder
3. Rain Clearing Blue Mirror

Note:
Age must not be displayed as the recommendation reason for Plus Support.
Explain using explicit safety needs, shared vehicle usage, and user-selected preferences.

---

# 7. Market Context

MarketとLanguageは独立して保持する。

```ts
type Language = "ja" | "en";
type Market = "japan" | "north-america";
```

## 7.1 Japan Context

### Tokyo
- Urban / suburban
- Congestion
- Moderate climate
- Family / commuting use
- Short-to-medium daily trips

### Hokkaido
- Cold / snow
- Frost
- Winter climate
- Longer regional travel
- Remote Start value weight: high

### Nagano
- Mountain / outdoor
- Snow / cold
- Leisure driving
- Outdoor product weight: high

### Okinawa
- Hot / humid
- Strong summer climate
- Remote Start / pre-conditioning value weight: high

## 7.2 North America Context

PoCではU.S.に限定し州単位で切り替える。

### California
- Warm / mixed climate
- High EV relevance
- Urban + suburban
- Charging convenience weight: high

### Texas
- Hot climate
- Long travel distances
- Suburban driving
- Remote Start / Comfort weight: high

### Washington
- Frequent rain
- Urban / suburban
- Rain visibility weight: high

### Minnesota
- Very cold winters
- Snow / frost
- Climate-related convenience weight: very high

### Colorado
- Mountain / outdoor
- Snow
- Long-distance leisure
- Outdoor / comfort weight: high

### New York
- Urban + suburban
- Rain / snow
- Congestion
- Visibility / convenience weight: medium-high

Important:
- North Americaの商品提供可否を事実として表現しない。
- UIに以下の注記を表示する。

日本語:
「北米向け表示は価値翻訳ロジックのコンセプトデモです。実際の商品提供状況を示すものではありません。」

English:
"North America views are concept demonstrations of localized value translation and do not represent actual product availability."

---

# 8. Customer Profile Input

Dealer Sales Assistで入力できる項目。

## Basic
- Age
- Household / Family
- Customer Type: Family / Outdoor / Commuter / Long-distance 等

## Vehicle / Ownership
- Vehicle
- Grade (mock optional)
- Ownership Status
- Years Owned
- Shared Vehicle / Drivers

## Usage
- Driving Frequency
- Daily / Weekly Distance
- Primary Usage
- Frequently Visited Places
- Typical Driving Time
- Highway / Urban / Mountain ratio

## Feature Usage
- Frequently Used Features
- Rarely Used Features
- Feature Interest

## EV-specific
bZ4X選択時のみ表示:
- Home Charging
- Charging Sessions / Week
- Public Charging Frequency
- Cable Usage Frequency

## Needs / Interests
- Safety
- Comfort
- Convenience
- Outdoor
- Cleanliness
- EV usability
- Design

## Dealer Conversation Notes
自由入力テキスト。

例：
- 「冬の朝の車内が寒いのが困る」
- 「週末に子どもとキャンプに行く」
- 「充電ケーブルの収納が面倒」

---

# 9. Recommendation Logic

本モックでは外部LLMを必須としない。
デモ安定性を優先し、Local Rule Engine + Deterministic Mock Generationを基本とする。

## 9.1 Fit Score

100点満点。

```text
Fit Score =
  Usage Match       0-30
+ Explicit Need     0-25
+ Lifestyle Match   0-15
+ Market Context    0-15
+ Vehicle Fit       0-10
+ Profile Context   0-5
```

Age alone must never create a recommendation.

## 9.2 Example Rules

### FJ Remote Start
- +20 if commuting = true
- +15 if Hokkaido or Minnesota
- +12 if Texas or Okinawa
- +10 if daily driving
- +10 if climate_control frequently used
- +15 if note contains cold / hot / frost / 暑い / 寒い / 霜

### FJ Air Lumbar
- +25 if weekly distance high
- +20 if long-distance
- +15 if highway use high
- +15 if comfort interest
- +10 if frequent trips

### FJ Seat Cover
- +20 if outdoor
- +20 if camping
- +15 if children
- +15 if frequent mountain / beach / sports
- +15 if easy-cleaning interest

### bZ4X Charging Cable Holder
- +25 if home_charging
- +20 if charging_sessions >= 4/week
- +20 if cable_use_frequency = high
- +15 if convenience interest

### bZ4X Rain Clearing Blue Mirror
- +25 if Washington
- +15 if New York
- +10 if rain/snow region
- +20 if visibility interest
- +10 if daily commuting

### bZ4X Plus Support Smart Key
- +25 if explicit safety interest
- +20 if vehicle shared with another driver
- +15 if explicit need for driving support
- +10 if urban / parking use frequent
- 0 solely from age

---

# 10. Recommendation Output

Dealer UIとUser UIでOutput Structureを変える。

## 10.1 Dealer Sales Assist Output

各Recommendation Card:
- Rank
- Product Name
- Fit Score
- Why Recommended
- Evidence / Signals
- Customer Value
- Recommended Question
- Suggested Talk
- Possible Objection
- Suggested Response
- Show Customer CTA
- Learn This Product CTA

## 10.2 Customer Recommendation Output

Userに直接見せるため、Dealer内部情報を除外する。

表示項目：
- Recommended for You
- Product
- 「あなたにおすすめする理由」
- Your Situation
- Benefits
- Usage Scene
- Watch Demo
- Learn More
- I'm Interested
- Not for Me

Fit Scoreの詳細ロジックやDealer Talkは表示しない。

---

# 11. Dealer Learning

Dealer Homeから独立入口を設ける。

## Product Learning Page

### 1. What is it?
商品概要

### 2. Why Customers Care
Feature → Value → Experience

### 3. Best-fit Customers
Persona cards

### 4. Customer Story
Before / After

### 5. How to Sell
- Conversation opener
- Recommended questions
- Suggested talk
- Objection handling

### 6. Success Story
Mock success example
必ず「Demo / Hypothesis」とラベル表示

### 7. Quiz
3問程度
- 機能理解
- Best-fit Customer
- Appropriate Sales Talk

### 8. Motivation
「この商品をどの顧客に提案できそうですか？」
チェックボックスで選択可能。

---

# 12. Admin Console

Admin navigation:
1. Overview
2. Knowledge Sources
3. AI Ready Pipeline
4. Knowledge Explorer
5. AI Control
6. Prompt Test
7. Logs
8. Analytics
9. Improvement Insights

---

# 13. Knowledge Sources

## UI

Card / Table:
- Source Name
- URL
- Type
- Brand
- Vehicle
- Market
- Language
- Last Imported
- Status
- Product Count

CTA:
- Add Knowledge Source
- Import
- Re-import
- View Parsed Data

初期Source:
- Land Cruiser FJ public product page
- bZ4X public product page

## Add Source Modal

Fields:
- Source Type: Website
- URL
- Brand
- Vehicle
- Market
- Language
- Crawl Scope
  - Current page
  - Product links under vehicle page
- Exclude paths
- Import button

---

# 14. AI Ready Pipeline

URL Import実行時に以下のStepをアニメーション表示。

```text
1. Source Connected
2. Content Extraction
3. Content Cleaning
4. Semantic Chunking
5. Metadata Enrichment
6. Relationship Mapping
7. Validation
8. AI Ready
```

実際のLive Crawlには依存しない。
既知URLに対してLocal Mock Dataを読み込む deterministic simulation とする。

Unknown URL:
- Demo unavailable message
- URL remains visible
- 「Live crawling is not enabled in this mock」表示

## AI Ready Detail

Raw ContentとStructured Dataを左右比較。

Structured example:

```json
{
  "entityType": "upgrade_product",
  "productId": "FJ_REMOTE_START",
  "vehicle": "Land Cruiser FJ",
  "productName": {
    "ja": "リモートスタート",
    "en": "Remote Start"
  },
  "functions": [
    "remote_engine_start",
    "pre_conditioning",
    "defrost_support"
  ],
  "valueTags": [
    "comfort",
    "convenience",
    "cold_weather",
    "hot_weather"
  ],
  "targetContexts": [
    "commuting",
    "family",
    "daily_use"
  ],
  "market": ["japan"],
  "sourceType": "public_web"
}
```

## Relationship View

```text
Remote Start
 ├─ provides → Comfort
 ├─ useful_in → Cold Weather
 ├─ useful_in → Hot Weather
 ├─ suitable_for → Commuter
 └─ suitable_for → Family
```

Neo4j等の実接続は不要。

---

# 15. AI / Prompt Control

ユーザーに巨大なPromptだけを見せず、Business Rule UIを主にする。

Tabs:
- Dealer Assist
- Customer Recommendation
- Dealer Learning

## Business Controls

### Recommendation Priority
Slider:
- Usage
- Explicit Need
- Lifestyle
- Market
- Vehicle
- Price
- Feature Usage

### Output Controls
Checkbox:
- Why recommended
- Customer value
- Recommended question
- Suggested talk
- Objection handling
- Evidence

### Tone
- Professional
- Friendly
- Concise

### Guardrails
- Do not invent unsupported product capabilities
- Do not state North America availability as fact
- Safety products require caution notice
- Use age only as supplemental context, never sole reason
- Ground product facts in Knowledge Base
- Clearly label hypothetical success stories / market assumptions

### Advanced Prompt
Collapsible textarea.

---

# 16. Prompt Test

Split View.

Left:
- Persona
- Vehicle
- Market
- State / Prefecture
- Language
- Rule weights
- User note

Right:
- Generated Dealer Assist
- Generated Customer Recommendation

Actions:
- Run Test
- Compare Japan vs North America
- Compare State
- Compare Language
- Save as Test Case

Best demo:
Same customer context
→ Market = Japan
→ Market = North America / Texas or Minnesota
→ output rationale and talk changes.

---

# 17. Logs

Each interaction must create mock logs.

```ts
type EventLog = {
  id: string;
  timestamp: string;
  actorType: "dealer" | "customer" | "admin";
  actorId?: string;
  market: "japan" | "north-america";
  region?: string;
  language: "ja" | "en";
  vehicle?: string;
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
  productId?: string;
  metadata?: Record<string, unknown>;
};
```

---

# 18. Analytics

Dashboard KPIs:

## Dealer Enablement
- Learning Completion
- Quiz Accuracy
- Products Learned
- Sales Assist Usage
- Recommendation-to-Customer Show Rate

## Customer Reaction
- Recommendation Views
- Interested Rate
- Not Interested Rate
- Demo View Rate
- Top Resonating Value

## Product
- Recommendation Count
- Interest Rate
- Dealer Learning Completion
- Market Difference

## Knowledge
- Source Coverage
- Knowledge Gaps
- Low-confidence Entries
- Last Update

Charts:
- Recommendation Performance by Product
- Interest Rate by Market
- Interest Rate by State
- Value Resonance
- Learning vs Sales Usage

Mock analytics data only.

---

# 19. Improvement Insights

Analyticsから改善候補を生成したように見せる。

Example:

```text
Insight
WashingtonのbZ4Xユーザーでは
「Visibility」を訴求したRain Clearing Blue Mirrorの反応率が高い。

Suggested Action
Customer RecommendationのMarket Weightを +10%

[Review Change] [Apply to Test]
```

Another:

```text
Insight
Family × OutdoorのFJユーザーでは
Seat Coverの「Easy Cleaning」訴求が「Design」訴求より反応率が高い。

Suggested Action
Family / Outdoor profileではEasy CleaningをPrimary Valueにする。
```

「Apply to Test」でAI ControlのWeightへ反映。
本番反映ではないことを明示。

---

# 20. Screen List / Route Design

```text
/
  Platform Home

/dealer
  Dealer Home

/dealer/products
  Vehicle & Product List

/dealer/learn/:productId
  Dealer Learning

/dealer/sales
  Customer Profile

/dealer/sales/results
  Sales Assist Recommendation

/customer/recommendation/:sessionId
  Customer-facing Recommendation

/admin
  Admin Overview

/admin/sources
  Knowledge Sources

/admin/pipeline/:sourceId
  AI Ready Pipeline

/admin/knowledge
  Knowledge Explorer

/admin/ai-control
  AI / Prompt Control

/admin/prompt-test
  Prompt Test

/admin/logs
  Logs

/admin/analytics
  Analytics

/admin/insights
  Improvement Insights
```

---

# 21. Home UX

Neutral product name:
**Knowledge Experience Platform**

Sub copy:
日本語：
「知識を、学び・提案・体験へ。」

English:
"Turn knowledge into learning, selling, and experiences."

3 cards:
- Dealer Portal
- Customer Experience
- Admin Console

Global header:
- Language toggle: 日本語 / EN
- Market toggle: Japan / North America
- If North America → State selector

Neutral branding only。
Toyota / KINTO logoは使用しない。
Product names may appear as demo source data。

---

# 22. Visual Design

## Tone
- Enterprise SaaS
- Calm
- Minimal
- Technical but approachable

## Color
- Navy: primary navigation / headings
- Teal: AI Ready / Knowledge / positive action
- Gray: background / secondary
- Gold: improvement / key insight only
- White: card surfaces

Avoid:
- Toyota red as primary brand color
- KINTO visual imitation
- excessive gradients
- flashy AI/neon design

## Layout
- Desktop-first
- 1440px reference
- Responsive down to 1024px
- Cards with 12-16px radius
- generous whitespace
- icons: lucide-react

---

# 23. Localization

All visible UI strings must come from locale dictionaries.

```text
src/locales/ja.ts
src/locales/en.ts
```

No hardcoded Japanese string inside individual page components if avoidable.

```ts
type LocalizedText = {
  ja: string;
  en: string;
};
```

Market switch must not automatically change language.

---

# 24. Suggested Project Structure

```text
src/
  app/
  components/
    layout/
    dealer/
    customer/
    admin/
    common/
  data/
    products.ts
    personas.ts
    markets.ts
    learning.ts
    recommendations.ts
    analytics.ts
  engine/
    recommendationEngine.ts
    valueTranslation.ts
    mockAiGenerator.ts
    importSimulator.ts
  locales/
    ja.ts
    en.ts
  pages/
    dealer/
    customer/
    admin/
  types/
    index.ts
  utils/
```

---

# 25. Technology

Preferred:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react
- Recharts for analytics

Optional:
- Zustand for lightweight app state

Do not require:
- external database
- real authentication
- live LLM API
- live web crawler
- backend server

Use localStorage for:
- language
- market/state
- selected persona
- prompt/control weights
- generated mock logs

---

# 26. Demo Reliability Requirements

- Demo must work without internet after dependencies are installed
- No API key required
- No external AI call required
- Recommendation results deterministic
- Reset Demo button
- Load Demo Persona buttons
- Seed Analytics button
- All key flows must be clickable
- Do not use dead buttons in main demo path
- Add subtle loading animations (500–1200ms) to simulate AI processing
- Provide visible “Demo / Hypothesis” labels where necessary

---

# 27. Recommended Demo Story

## Scene 1 — Admin: Knowledge creation
1. Admin Console
2. Knowledge Sources
3. FJ public URL selected
4. Import
5. AI Ready Pipeline
6. Raw → Structured → Relationship

Message:
「まず公開情報を、AIが使えるKnowledgeにします」

## Scene 2 — Dealer Learn
1. Dealer Portal
2. Land Cruiser FJ
3. Remote Start
4. Customer Story
5. How to Sell
6. Quiz

Message:
「Dealerには仕様暗記ではなく、誰にどう売るかまで学んでもらいます」

## Scene 3 — Dealer Sell
1. Load Persona A
2. Generate
3. Seat Cover / Remote Start recommendations
4. Why Recommended
5. Suggested Talk

Message:
「顧客の属性だけでなく、使い方まで使って推薦します」

## Scene 4 — Region difference
1. Prompt Test or Sales Assist
2. Same context
3. Japan
4. North America / Texas or Minnesota
5. Compare output

Message:
「Language翻訳ではなくMarketごとの価値翻訳です」

## Scene 5 — User Recommendation
1. Dealer clicks Show Customer
2. Customer Experience opens
3. Personalized benefit only
4. User clicks Interested

Message:
「最終的にはUserに直接届けられる形に変換します」

## Scene 6 — Improvement
1. Analytics
2. Show Interested event
3. Improvement Insight
4. Apply to Test
5. Return to Knowledge Source card

Final Message:
「今回はPublic Demo Dataです。次はPrivate SDV Service Dataを接続し、実データで価値翻訳を検証したいです」

---

# 28. Admin Home — Private SDV Data Hook

Admin Overviewに必ず以下を表示。

```text
Current Knowledge Sources

✓ Public Upgrade Product Data
  Status: Connected

○ Private SDV Service Data
  Status: Not connected

[Connect Private Knowledge]
```

Buttonを押すとModal:

```text
Private Knowledge Connection

This mock does not connect private data.

Next PoC:
- SDV service specifications
- Market availability
- target vehicles / grades
- service value hypotheses
- dealer sales materials
```

これは今回の営業ゴールに直結する重要UI。

---

# 29. Source Data Disclaimer

Footer / About:

日本語：
「本モックは公開情報および仮説データを用いたコンセプトデモです。商品提供地域、Recommendation、Customer Story、成功事例等の一部は検証用の仮説であり、実際の商品提供・効果を保証するものではありません。」

English:
"This mock is a concept demonstration using public information and hypothetical data. Some market availability, recommendations, customer stories, and success examples are hypotheses for validation and do not represent guaranteed product availability or outcomes."

---

# 30. Acceptance Criteria

## Global
- [ ] 日本語 / English切替
- [ ] Japan / North America切替
- [ ] North America State切替
- [ ] LanguageとMarketが独立

## Dealer
- [ ] Vehicle / Product list
- [ ] 6商品の詳細
- [ ] Dealer Learning
- [ ] Customer Story
- [ ] How to Sell
- [ ] Success Story
- [ ] Quiz
- [ ] Customer Profile rich inputs
- [ ] Demo Persona load
- [ ] Recommendation ranking
- [ ] Show Customer

## Customer
- [ ] Dealer UIと分離
- [ ] Personalized reasons
- [ ] User-friendly benefits
- [ ] Interested / Not for Me
- [ ] Log generated

## Admin
- [ ] Knowledge Sources
- [ ] URL Import simulation
- [ ] AI Ready Pipeline
- [ ] Structured Data
- [ ] Relationship view
- [ ] AI Control
- [ ] Prompt Test
- [ ] Logs
- [ ] Analytics
- [ ] Improvement Insights
- [ ] Private SDV Data not-connected card

## Demo
- [ ] Reset Demo
- [ ] deterministic outputs
- [ ] no API key
- [ ] main demo path has no dead ends

---

# 31. Product Source Reference for Mock Data

Use public information only.

Land Cruiser FJ:
- Vehicle list: https://factory.kinto-jp.com/products/vehicle/FJ001/
- Remote Start: https://factory.kinto-jp.com/products/FJ001_08/
- Air Lumbar: https://factory.kinto-jp.com/products/FJ001_04/
- Seat Cover: https://factory.kinto-jp.com/products/FJ001_03/

bZ4X:
- Vehicle list: https://factory.kinto-jp.com/products/vehicle/BZ001/
- Public campaign / accessory information: https://factory.kinto-jp.com/cp/BZ001-BZT01/
- Toyota bZ4X accessory public information: https://toyota.jp/bz4x/accessory/

Rules:
- Do not invent hard product specifications.
- Product facts must be traceable to the public source data included in this mock.
- Hypothetical market/localization logic must be tagged as hypothesis.
