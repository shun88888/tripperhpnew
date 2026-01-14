import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // バリデーション
    if (!name || !email) {
      return NextResponse.json(
        { error: "名前とメールアドレスは必須です" },
        { status: 400 }
      );
    }

    // PaymentIntent作成
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2980, // 2,980円
      currency: "jpy",
      receipt_email: email,
      metadata: {
        customer_name: name,
        customer_email: email,
        product_type: "digital_shiori",
        price_jpy: "2980",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("PaymentIntent作成エラー:", error);
    return NextResponse.json(
      { error: error.message || "決済の準備に失敗しました" },
      { status: 500 }
    );
  }
}
