# Tripper - オーダーメイド旅行しおり LP 仕様書（MVP）

作成日: 2026-01-09
最終更新: 2026-01-09
ステータス: **確定**

---

## 1. 概要

「オーダーメイドの旅行しおり（デジタル納品）」を購入できるLPを構築する。

| 項目 | 内容 |
|------|------|
| サービス名 | **Tripper** |
| 技術スタック | Next.js + TypeScript |
| ホスティング | Vercel |
| 決済 | Stripe（Payment Element / 単発決済） |
| データベース | Supabase（構築済み） |
| メール | Stripeレシートメール（標準機能） |

---

## 2. 今日のゴール（Done定義）

- [ ] LP（template.pngを再現）が公開URLで閲覧できる
- [ ] 2,980円の商品を**テスト決済完了**できる（Stripe test mode）
- [ ] 購入時に**名前 + メール**を取得できる
- [ ] 決済成功後に **`/success`** 画面が表示される
- [ ] Webhookで**Supabaseに注文が保存**される

### 今日やらないこと
- 自動メール送信（Stripeレシートで代用）
- LINE公式アカウント連携
- 3タイプの商品展開
- 管理画面

---

## 3. 商品情報

| 項目 | 内容 |
|------|------|
| 商品名 | オーダーメイド旅行しおり |
| 価格 | **2,980円（税込）** |
| 形式 | デジタル納品（後日DMまたはメール） |
| プラン | MVP時点では1プランのみ（将来3タイプ展開予定） |

---

## 4. 画面構成

### 4.1 `/` - LP（トップページ）

**デザイン**: template.pngを忠実に再現

**セクション構成**:
1. **Header** - ロゴ（Tripper）+ ナビゲーション
2. **Hero** - メインビジュアル + キャッチコピー + CTAボタン
3. **Value Proposition** - サービスの価値訴求
4. **Features** - 特徴・メリット（3カラム程度）
5. **Pricing** - 料金表示（2,980円）+ 購入ボタン
6. **Flow** - 注文の流れ（3ステップ）
7. **FAQ** - よくある質問（3〜5項目）
8. **Footer** - 特商法リンク + コピーライト

**CTA（購入ボタン）**:
- 遷移先: `/checkout`
- ボタンテキスト: 「購入する」「今すぐ注文」など

---

### 4.2 `/checkout` - 決済ページ

**目的**: 顧客情報入力 → Stripe決済

**フォーム項目**:
| フィールド | 必須 | 備考 |
|-----------|------|------|
| 名前 | ○ | フルネーム |
| メールアドレス | ○ | 領収書送信先 |
| Stripe Payment Element | ○ | カード情報等 |

**処理フロー**:
1. フォーム入力
2. 「支払う」ボタンクリック
3. API `/api/stripe/create-payment-intent` を呼び出し
4. PaymentIntent作成 → clientSecret取得
5. `stripe.confirmPayment()` 実行
6. 成功 → `/success` にリダイレクト
7. 失敗 → エラー表示

---

### 4.3 `/success` - 決済完了ページ

**表示内容**:
- 「ご注文ありがとうございます」
- 「確認メールをお送りしました」（Stripeレシート）
- 「担当者より後日ご連絡いたします」
- トップページへ戻るリンク

---

### 4.4 `/cancel` - キャンセルページ

**表示内容**:
- 「お支払いがキャンセルされました」
- トップページへ戻るリンク
- 再度購入するリンク

---

### 4.5 `/legal` - 特定商取引法に基づく表記

**記載内容**:

```
販売業者: 中川俊介（個人）
運営責任者: 中川俊介
所在地: 請求があった場合に遅滞なく開示します
連絡先: tripper.jp.info@gmail.com
販売価格: 2,980円（税込）
支払方法: クレジットカード（Stripe経由）
支払時期: 注文確定時に即時決済
商品引渡時期: 決済完了後、3営業日以内にメールまたはDMにて納品
返品・キャンセル: デジタル商品のため、原則として返品不可
          ただし、商品に不備があった場合は再納品にて対応
```

---

## 5. API設計

### 5.1 `POST /api/stripe/create-payment-intent`

**Request Body**:
```typescript
{
  name: string;       // 顧客名
  email: string;      // メールアドレス
}
```

**Response**:
```typescript
{
  clientSecret: string;  // PaymentIntent client_secret
}
```

**処理内容**:
1. Stripe PaymentIntent作成
   - amount: 2980
   - currency: "jpy"
   - receipt_email: リクエストのemail
   - metadata: { customer_name, customer_email, product_type: "digital_shiori", price_jpy: "2980" }
2. clientSecretを返却

---

### 5.2 `POST /api/stripe/webhook`

**対象イベント**:
- `payment_intent.succeeded`

**処理内容**:
1. Stripe署名検証
2. PaymentIntentからデータ抽出
3. Supabase `orders` テーブルに保存
4. ログ出力

---

## 6. データベース設計（Supabase）

### 6.1 `orders` テーブル

```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'succeeded',
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'jpy',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  product_type TEXT NOT NULL DEFAULT 'digital_shiori',
  raw_metadata JSONB,
  delivery_status TEXT DEFAULT 'pending'
);

-- RLS有効化
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Service Role のみ INSERT/SELECT 可能
CREATE POLICY "Service role can insert orders" ON orders
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can select orders" ON orders
  FOR SELECT TO service_role USING (true);
```

---

## 7. 環境変数

### Vercel / ローカル `.env.local`

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
```

---

## 8. デザイン仕様

### 参照: `template.png`

**特徴**:
- 旅行サイト風のクリーンなデザイン
- 大きなヒーロー画像（山脈・自然の風景）
- 白背景 + 黒テキストのコントラスト
- カード型のコンテンツレイアウト
- シンプルなナビゲーション

**カラーパレット（template.pngから抽出）**:
| 用途 | カラー |
|------|--------|
| 背景 | #FFFFFF |
| テキスト（メイン） | #1A1A1A |
| テキスト（サブ） | #666666 |
| アクセント/CTA | #1A1A1A（黒）または画像に合わせた色 |
| ボーダー | #E5E5E5 |

**フォント**:
- 見出し: Sans-serif（太字）
- 本文: Sans-serif（通常）

---

## 9. 実装優先順位

| 順番 | タスク | 重要度 |
|------|--------|--------|
| 1 | Next.jsプロジェクト初期化 | 必須 |
| 2 | LP（`/`）作成 - template.png再現 | 必須 |
| 3 | Stripe連携 - PaymentIntent API | 必須 |
| 4 | チェックアウトページ（`/checkout`） | 必須 |
| 5 | Success/Cancelページ | 必須 |
| 6 | Webhook API + Supabase保存 | 必須 |
| 7 | 特商法ページ（`/legal`） | 必須 |
| 8 | Vercelデプロイ | 必須 |
| 9 | Stripeレシートメール有効化 | 任意（管理画面で設定） |

---

## 10. テスト項目

- [ ] LP: 各セクションが正しく表示される
- [ ] LP: CTAボタンで `/checkout` に遷移する
- [ ] Checkout: フォーム入力 → 決済完了 → `/success` 表示
- [ ] Checkout: Stripeテストカード `4242 4242 4242 4242` で成功
- [ ] Webhook: 決済成功後、Supabase `orders` にレコードが作成される
- [ ] Legal: 特商法ページが表示される

---

## 11. 特記事項

- **納品方法**: 決済完了後、手動でDMまたはメールにて納品（自動化は将来対応）
- **問い合わせ**: tripper.jp.info@gmail.com
- **将来の拡張**: 3タイプ展開、LINE公式連携、自動納品システム

---

## 12. 承認

この仕様書の内容で実装を開始してよいですか？
