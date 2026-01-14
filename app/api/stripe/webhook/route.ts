import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    console.error("Webhook: 署名がありません");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Webhook: STRIPE_WEBHOOK_SECRETが設定されていません");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Stripe署名検証
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("Webhook署名検証エラー:", err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  console.log("Webhook受信:", event.type);

  // payment_intent.succeeded イベント処理
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    try {
      // Supabaseに注文保存
      const { data, error } = await supabaseAdmin.from("orders").insert({
        stripe_payment_intent_id: paymentIntent.id,
        status: "succeeded",
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        customer_name: paymentIntent.metadata.customer_name || "",
        customer_email: paymentIntent.metadata.customer_email || paymentIntent.receipt_email || "",
        product_type: paymentIntent.metadata.product_type || "digital_shiori",
        raw_metadata: paymentIntent.metadata,
        delivery_status: "pending",
      });

      if (error) {
        console.error("Supabase保存エラー:", error);
        return NextResponse.json(
          { error: "Database error" },
          { status: 500 }
        );
      }

      console.log("注文保存成功:", paymentIntent.id);
      console.log("顧客:", paymentIntent.metadata.customer_name, paymentIntent.metadata.customer_email);
    } catch (err: any) {
      console.error("注文保存時のエラー:", err);
      return NextResponse.json(
        { error: "Failed to save order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
