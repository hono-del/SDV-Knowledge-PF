# SDV Knowledge Experience Platform — Mock System

メーカー本社 SDV事業部向け提案デモシステム。公開情報をAI Ready化し、Dealer学習・提案・顧客体験・ログ分析・改善インサイトの一連のループを体験できるモックアプリです。

---

## セットアップ

```bash
cd sdv-platform
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開いてください。

---

## デモ推奨フロー

### Scene 1 — Admin: ナレッジ作成
1. http://localhost:5173/admin → 管理概要
2. 「ナレッジソース」をクリック
3. 「インポート実行」→ AI Readyパイプライン（8ステップのアニメーション）
4. Raw Content / Structured Data / Relationship を確認

**メッセージ:** 「まず公開情報を、AIが使えるKnowledgeにします」

### Scene 2 — Dealer Learn
1. http://localhost:5173/dealer → ディーラーホーム
2. Land Cruiser FJ → リモートスタート → 「学ぶ」
3. セクションを順番に: この商品は？→ なぜ刺さるか → 売り方 → クイズ

**メッセージ:** 「Dealerには仕様暗記ではなく、誰にどう売るかまで学んでもらいます」

### Scene 3 — Dealer Sell
1. http://localhost:5173/dealer/sales → 顧客プロファイル
2. 「デモプロファイルを読み込む」→ 佐藤 健太（🏕️）
3. 「レコメンドを生成」（1.2秒後に結果表示）
4. シートカバー95/100、リモートスタート、エアーランバーの順で表示
5. 「なぜ推薦するか」「提案トーク」を確認

**メッセージ:** 「顧客の属性だけでなく、使い方まで使って推薦します」

### Scene 4 — 地域差デモ
1. http://localhost:5173/admin/prompt-test
2. Persona B（Emily Johnson）を選択
3. 左側: Washington / North America
4. 「比較モード」ON → Minnesota / North America
5. 「テスト実行」→ 結果の差を確認

**メッセージ:** 「Language翻訳ではなくMarketごとの価値翻訳です」

### Scene 5 — User Recommendation
1. Dealer Sales Results で「顧客に見せる」をクリック
2. 顧客向けUIが開く（Dealer内部情報なし）
3. 「気になる！」をクリック

**メッセージ:** 「最終的にはUserに直接届けられる形に変換します」

### Scene 6 — 改善ループ
1. http://localhost:5173/admin/analytics → KPI確認
2. 「改善インサイトを見る」
3. Washington × Rain Clearing Blue Mirror のインサイトを確認
4. 「テストに反映」→ AI Control Weightが更新
5. Admin Overview → 「プライベートナレッジを接続」

**Final Message:** 「今回は公開Demo Dataです。次はPrivate SDV Service Dataを接続し、実データで価値翻訳を検証したいです」

---

## 主要ページ一覧

| ページ | URL |
|--------|-----|
| ホーム | / |
| ディーラーホーム | /dealer |
| 商品学習（例） | /dealer/learn/fj-remote-start |
| セールスアシスト | /dealer/sales |
| レコメンド結果 | /dealer/sales/results |
| 顧客体験 | /customer/recommendation/:sessionId |
| Admin概要 | /admin |
| ナレッジソース | /admin/sources |
| AI Readyパイプライン | /admin/pipeline/:sourceId |
| ナレッジエクスプローラー | /admin/knowledge |
| AI制御 | /admin/ai-control |
| プロンプトテスト | /admin/prompt-test |
| ログ | /admin/logs |
| アナリティクス | /admin/analytics |
| 改善インサイト | /admin/insights |

---

## グローバルコントロール

**ヘッダー（全ページ共通）:**
- 言語切替: 日本語 / EN（独立）
- マーケット切替: 日本 / 北米（独立）
- 地域・州セレクター
- デモリセットボタン

**重要:** Language と Market は独立した状態。マーケット切替のみがRecommendationロジックに影響します。

---

## デモペルソナ

| ペルソナ | 車種 | 地域 | 特徴 |
|----------|------|------|------|
| 🏕️ 佐藤 健太 | Land Cruiser FJ | Tokyo, Japan | Family × Outdoor、週320km |
| ⚡ Emily Johnson | bZ4X | Washington, US | EV Commuter、毎日充電 |
| 🛡️ Robert Miller | bZ4X | Minnesota, US | 安全重視、配偶者と共有 |

---

## データファイル（編集可能）

| ファイル | 内容 |
|----------|------|
| `src/data/products.ts` | 商品マスター（6商品） |
| `src/data/personas.ts` | デモペルソナ（3名） |
| `src/data/learning.ts` | ディーラー学習コンテンツ |
| `src/data/analytics.ts` | アナリティクスデータ・改善インサイト |
| `src/engine/recommendationEngine.ts` | Fit Scoreロジック |
| `src/locales/ja.ts` & `en.ts` | 多言語辞書 |

---

## 技術スタック

- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Zustand（グローバル状態管理）
- Recharts（アナリティクスグラフ）
- lucide-react（アイコン）
- localStorage（ログ・設定の永続化）

---

## 注意事項

- 外部APIキー・ネットワーク接続不要
- Recommendationはローカルルールエンジンによる決定論的計算
- Customer Story・成功事例等は「Demo / Hypothesis」ラベル付き
- 北米向け表示は「価値翻訳コンセプトデモ」であり実際の商品提供状況を示さない

---

*本モックは公開情報および仮説データを用いたコンセプトデモです。*
