-- Tripper - Orders テーブル作成
-- Supabase SQL Editorで実行してください

CREATE TABLE IF NOT EXISTS orders (
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

-- インデックス作成
CREATE INDEX idx_orders_stripe_payment_intent_id ON orders(stripe_payment_intent_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- コメント
COMMENT ON TABLE orders IS 'Tripper注文データ';
COMMENT ON COLUMN orders.stripe_payment_intent_id IS 'Stripe PaymentIntent ID';
COMMENT ON COLUMN orders.delivery_status IS 'pending: 未納品, sent: 納品済み';
