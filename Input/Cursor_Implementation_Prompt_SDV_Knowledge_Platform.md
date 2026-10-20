# Cursor Implementation Prompt — SDV Knowledge & Experience Platform

You are a senior product engineer and UX engineer.

Build a polished, clickable, deterministic business proposal mock application based on the specification file:

`SDV_Knowledge_Experience_Platform_Mock_Spec.md`

Read that specification completely before coding.

## Goal

Create a customer-demo-ready web mock showing this full loop:

Public product information
→ AI Ready Knowledge
→ Dealer Learning
→ Dealer Sales Assist
→ Customer Personalized Recommendation
→ Interaction Logs
→ Analytics
→ Improvement
→ Knowledge / Recommendation Logic

The application is for a manufacturer HQ SDV business team.
The business goal of the demo is to make the customer say:

「実際のSDVサービス情報を渡して、この仕組みで検証してみたい」

Do not reduce the project to a simple product catalog or chatbot.

---

## Tech Stack

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react
- Recharts

You may use Zustand if useful.

Do NOT require:
- external API keys
- external LLM APIs
- backend/database
- authentication
- live web crawling

The mock must be stable and demoable offline after npm install.
Use local JSON/TypeScript mock data and deterministic functions.

---

## Design

Create a neutral enterprise SaaS design.

Primary visual system:
- dark navy
- teal
- gray
- white
- gold only for insights / improvement loop

Do not imitate Toyota/KINTO branding.
Do not use Toyota logos.
Product and vehicle names may be used as public demo data.

Design requirements:
- 1440px desktop-first
- responsive to 1024px
- generous whitespace
- simple cards
- subtle shadows
- 12–16px radius
- no flashy gradients
- use lucide-react icons
- technical but approachable

---

## Global Controls

Persistent header:
- Language: 日本語 / EN
- Market: Japan / North America
- If North America: State selector
- Reset Demo

Important:
Language and Market are independent states.
Changing Language only changes text language.
Changing Market changes the value-translation / recommendation context.

---

## Required Main Navigation

Create 3 top-level product areas:
1. Dealer Portal
2. Customer Experience
3. Admin Console

Home page should explain them with three cards.

Product name:
`Knowledge Experience Platform`

Japanese sub-copy:
`知識を、学び・提案・体験へ。`

English:
`Turn knowledge into learning, selling, and experiences.`

---

## Dealer Portal

### Dealer Home
Two primary actions:
- LEARN
- SELL

Vehicle cards:
- Land Cruiser “FJ”
- bZ4X

### Detailed Products
Implement detailed experiences for exactly these six initial products.

Land Cruiser FJ:
1. Remote Start / リモートスタート
2. Air Lumbar / エアーランバー
3. Seat Cover / シートカバー

bZ4X:
1. Charging Cable Holder / 充電ケーブルホルダー
2. Rain Clearing Blue Mirror / レインクリアリングブルーミラー
3. Plus Support Smart Key / プラスサポート用スマートキー

Other products can appear as simple catalog cards if mock data exists, but the six above must have full details.

---

## Dealer Learning Page

For each of the six products implement:
1. What is it?
2. Why Customers Care
3. Feature → Value → Experience visualization
4. Best-fit Customers
5. Customer Story — Before / After
6. How to Sell
   - opener
   - questions
   - suggested talk
   - objection handling
7. Success Story
   - clearly label as `Demo / Hypothesis`
8. 3-question Quiz
9. small progress indicator

Make this feel like sales enablement, not an LMS-only screen.

---

## Customer Profile

Create a rich customer profile editor.

Fields:
- Age
- Family / household
- Family / Outdoor / Commuter / Long-distance tags
- Vehicle
- Ownership status
- Years owned
- Shared vehicle / drivers
- Driving frequency
- Daily/weekly distance
- Primary usage
- Frequently visited places
- Highway / urban / mountain usage
- Frequently used functions
- Interest areas

When bZ4X:
- home charging
- charging sessions/week
- public charging frequency
- cable usage frequency

Interests:
- Safety
- Comfort
- Convenience
- Outdoor
- Cleanliness
- EV usability
- Design

Dealer Notes:
Free text.

Add `Load Demo Profile` buttons for:
- Kenta Sato
- Emily Johnson
- Robert Miller

Use the exact persona definitions from the spec.

---

## Recommendation Engine

Implement deterministic local scoring based on the specification.
Fit score = 0–100.

Use:
- Usage Match
- Explicit Need
- Lifestyle Match
- Market Context
- Vehicle Fit
- Profile Context

Never recommend Plus Support solely because of age.

The engine must output:
- rank
- fit score
- reasons
- value
- recommended question
- suggested talk
- objection
- response

Changing market/state/profile must visibly change scores and text.

---

## Dealer Sales Assist Results

Show top 3 products.
Each card must include:
- Rank
- Product
- Fit Score
- Why Recommended
- Evidence Signals
- Customer Value
- Recommended Question
- Suggested Talk
- Possible Objection
- Suggested Response
- Learn This Product
- Show Customer

`Show Customer` opens the customer-facing view for the selected product.

---

## Customer Experience

This UI must look visually different from Dealer tools:
simpler, warmer, less technical, no internal logic.

Header:
`Recommended for You`
or Japanese equivalent.

Show:
- Product
- Why recommended for you
- Your Situation
- 3 Benefits
- Usage Scene
- Learn More
- Watch Demo
- I'm Interested
- Not for Me

Do not show:
- Fit Score internals
- Dealer talk
- prompt
- raw signals

When user clicks Interested / Not for Me:
- create an event log
- show a short confirmation state

---

## Market Localization Demo

Implement:

Japan:
- Tokyo
- Hokkaido
- Nagano
- Okinawa

North America / U.S.:
- California
- Texas
- Washington
- Minnesota
- Colorado
- New York

Market switch must affect recommendation logic.

Examples:
- Washington boosts Rain Clearing Blue Mirror
- Minnesota boosts cold-weather convenience
- Texas boosts heat / long-distance comfort
- Hokkaido boosts Remote Start
- Nagano boosts outdoor-oriented value
- Okinawa boosts hot-weather convenience

Always show this disclaimer when North America is selected:

JA:
`北米向け表示は価値翻訳ロジックのコンセプトデモです。実際の商品提供状況を示すものではありません。`

EN:
`North America views are concept demonstrations of localized value translation and do not represent actual product availability.`

---

## Admin Console

Build these pages:
1. Overview
2. Knowledge Sources
3. AI Ready Pipeline
4. Knowledge Explorer
5. AI Control
6. Prompt Test
7. Logs
8. Analytics
9. Improvement Insights

### Admin Overview
Show:

Connected:
`Public Upgrade Product Data`

Not connected:
`Private SDV Service Data`

CTA:
`Connect Private Knowledge`

Clicking it opens a modal explaining that the current mock does not connect private data, and a future PoC could ingest:
- SDV service specifications
- vehicle/grade compatibility
- market availability
- value hypotheses
- dealer materials

Make this a key sales moment.

---

## Knowledge Sources

Create table/cards with:
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

Add Source modal:
- Website
- URL
- Brand
- Vehicle
- Market
- Language
- Crawl Scope

Seed sources:
- FJ public product source
- bZ4X public product source

---

## AI Ready Pipeline

This is one of the most important screens.

Simulate:
1. Source Connected
2. Content Extraction
3. Content Cleaning
4. Semantic Chunking
5. Metadata Enrichment
6. Relationship Mapping
7. Validation
8. AI Ready

Use subtle 500–1200 ms progress animations.

Do NOT attempt a real crawler.
For known demo URLs, map them to local source data.

Unknown URLs should show:
`Live crawling is not enabled in this mock.`

After completion show:

Left:
Raw Website Content

Right:
Structured AI Ready Data

Include a relationship view such as:

Remote Start
→ provides → Comfort
→ useful_in → Cold Weather
→ suitable_for → Commuter
→ suitable_for → Family

---

## Knowledge Explorer

Allow filtering by:
- Vehicle
- Product
- Value Tag
- Customer Context
- Market

Show:
- entity details
- metadata
- source
- value tags
- relationships

---

## AI Control

Do not make the main UX a giant prompt textarea.

Create Business Controls first:

Recommendation Priority sliders:
- Usage
- Explicit Need
- Lifestyle
- Market
- Vehicle
- Price
- Feature Usage

Output toggles:
- Why Recommended
- Customer Value
- Question
- Suggested Talk
- Objection Handling
- Evidence

Tone:
- Professional
- Friendly
- Concise

Guardrails:
- Do not invent unsupported product capabilities
- Do not claim North America product availability
- Safety products show caution notice
- Age cannot be sole recommendation reason
- Ground product facts in Knowledge Base
- Label hypotheses clearly

Add `Advanced Prompt` as a collapsed section.
Store slider/toggle state in localStorage.

---

## Prompt Test

Split screen.

Left:
- Persona
- Vehicle
- Market
- Region/state
- Language
- Recommendation weights
- User note

Right tabs:
- Dealer Assist
- Customer Recommendation

Buttons:
- Run Test
- Compare Market
- Compare State
- Save Test Case

Create a visual comparison mode:
Japan vs North America
or Washington vs California.
Highlight changed sentences.

---

## Logs

Create mock event log table with:
- timestamp
- actor
- market
- region
- language
- vehicle
- event
- product
- metadata

Main flow actions must append events.
Use localStorage.

---

## Analytics

Use Recharts.

Dashboard cards:
- Learning Completion
- Quiz Accuracy
- Sales Assist Usage
- Recommendation Views
- Interested Rate
- Demo View Rate

Charts:
- Recommendation Performance by Product
- Interest Rate by Market
- Interest Rate by State
- Value Resonance
- Learning vs Sales Usage

Provide seeded data so dashboard looks meaningful before interaction.

---

## Improvement Insights

Create insight cards.

Example 1:
`WashingtonのbZ4Xユーザーでは、Visibilityを訴求したRain Clearing Blue Mirrorの反応率が高い。`

Suggested Action:
`WashingtonでMarket Weight +10%`

Example 2:
`Family × OutdoorのFJユーザーでは、Seat CoverのEasy Cleaning訴求がDesign訴求より高反応。`

CTA:
- Review Change
- Apply to Test

`Apply to Test` updates AI Control values, not production.
Use gold as the visual accent on this page.

---

## Localization

All visible UI labels must support Japanese and English.

Create locale dictionaries:
- `src/locales/ja.ts`
- `src/locales/en.ts`

Avoid hardcoded page-level UI strings where practical.

Use:
```ts
type LocalizedText = { ja: string; en: string };
```

Market does not automatically change language.

---

## Data

Create typed local data for:
- products
- personas
- markets
- learning content
- recommendations
- analytics
- success stories
- source imports

Use the detailed mock content and rules in the spec.
Do not fabricate exact technical specifications beyond the supplied public mock facts.
Hypothetical stories and localization must display `Demo / Hypothesis`.

---

## Reliability

Required:
- no dead buttons on core flow
- no network dependency
- no API keys
- deterministic recommendations
- Reset Demo
- seeded analytics
- clear loading states
- all routes functional
- TypeScript no obvious errors
- npm run build succeeds

---

## Suggested Build Order

1. app shell + routing + design tokens
2. locale + market state
3. data models + mock data
4. Home
5. Dealer Learning
6. Customer Profile
7. Recommendation Engine
8. Dealer Sales Assist
9. Customer Recommendation
10. Admin Sources
11. AI Ready Pipeline
12. AI Control + Prompt Test
13. Logs
14. Analytics
15. Improvement Insights
16. polish + reset demo + seed data
17. build/test

Do not stop after creating static pages.
Complete the end-to-end clickable demo.

---

## Final Quality Check

Before finishing:
- run the app
- test every core route
- test JA/EN
- test Japan/North America
- test state changes
- test all 3 personas
- test Show Customer
- test Interested event → Logs
- test Knowledge Import simulation
- test Prompt Test
- test Apply to Test
- run `npm run build`
- fix errors

Then provide a short README with:
- setup
- run command
- demo path
- data files to edit
