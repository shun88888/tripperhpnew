import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseAdminInstance: SupabaseClient | null = null;

// Service Role Client (サーバーサイド専用)
export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdminInstance) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
    }
    supabaseAdminInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabaseAdminInstance;
}

export type Order = {
  id: string;
  created_at: string;
  stripe_payment_intent_id: string;
  status: string;
  amount: number;
  currency: string;
  customer_name: string;
  customer_email: string;
  product_type: string;
  raw_metadata: Record<string, any> | null;
  delivery_status: string;
};
