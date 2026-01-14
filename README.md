# Tripper - オーダーメイド旅行しおり LP

オーダーメイドの旅行しおりを販売するランディングページ（MVP版）

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Stripe** (決済)
- **Supabase** (データベース)

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseテーブル作成

1. Supabaseのダッシュボードにログイン
2. SQL Editorを開く
3. `supabase_orders_table.sql` の内容を実行

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、以下の値を設定してください。

```bash
cp .env.example .env.local
```

#### 必要な環境変数

```bash
# Stripe (https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Webhook設定後に取得

# Supabase (https://app.supabase.com/project/YOUR_PROJECT/settings/api)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx
```

### 4. Stripe Webhookの設定

#### ローカル開発時

```bash
# Stripe CLIをインストール（初回のみ）
brew install stripe/stripe-cli/stripe

# Stripeにログイン
stripe login

# Webhookをローカルでリッスン
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

コンソールに表示される `whsec_xxxxx` を `.env.local` の `STRIPE_WEBHOOK_SECRET` に設定

#### 本番環境（Vercel）

1. Stripeダッシュボード → Developers → Webhooks
2. 「Add endpoint」をクリック
3. Endpoint URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. イベント: `payment_intent.succeeded` を選択
5. 作成後、Signing secretをコピーして環境変数に設定

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### 6. Stripeレシートメールの有効化（任意）

1. Stripeダッシュボード → Settings → Emails
2. 「Customer emails」を有効化
3. 「Successful payments」をONにする

## テスト方法

### テストカード番号

- 成功: `4242 4242 4242 4242`
- CVV: 任意の3桁
- 有効期限: 未来の日付
- 郵便番号: 任意

### テストフロー

1. トップページ → 「購入する」ボタンをクリック
2. 名前とメールアドレスを入力
3. テストカード情報を入力
4. 決済完了 → `/success` ページが表示される
5. Supabase → `orders` テーブルに注文が保存されているか確認

## ディレクトリ構成

```
trippermade/
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── create-payment-intent/   # PaymentIntent作成API
│   │       └── webhook/                 # Webhook受信API
│   ├── checkout/                        # チェックアウトページ
│   ├── success/                         # 決済成功ページ
│   ├── cancel/                          # 決済キャンセルページ
│   ├── legal/                           # 特商法ページ
│   ├── layout.tsx
│   ├── page.tsx                         # LP（トップページ）
│   └── globals.css
├── components/
│   └── CheckoutForm.tsx                 # Stripe決済フォーム
├── lib/
│   ├── stripe.ts                        # Stripeクライアント
│   └── supabase.ts                      # Supabaseクライアント
├── public/
│   └── hero.png                         # ヒーロー画像
├── .env.example                         # 環境変数テンプレート
├── SPEC.md                              # 仕様書
└── README.md
```

## デプロイ（Vercel）

### 1. Vercelプロジェクト作成

```bash
npm install -g vercel
vercel
```

### 2. 環境変数を設定

Vercel ダッシュボード → Settings → Environment Variables

全ての環境変数（`.env.local`と同じ）を設定

### 3. Webhook URLを更新

デプロイ後のURL（`https://your-domain.vercel.app`）を使って、Stripe WebhookのEndpoint URLを更新

### 4. デプロイ

```bash
vercel --prod
```

## 注意事項

- **本番環境では必ずStripeの本番キーを使用してください**
- Webhookシークレットはローカルと本番で異なります
- Supabase Service Role Keyは絶対にクライアント側に露出させないでください

## トラブルシューティング

### 決済が成功してもWebhookが動かない

- Stripe CLIが起動しているか確認
- `STRIPE_WEBHOOK_SECRET` が正しく設定されているか確認
- コンソールログを確認

### Supabaseに保存されない

- Service Role Keyが正しいか確認
- `orders` テーブルが作成されているか確認
- RLS (Row Level Security) の設定を確認

### 画像が表示されない

- `public/hero.png` が存在するか確認
- Next.jsを再起動

## お問い合わせ

tripper.jp.info@gmail.com
# tripperhpnew
