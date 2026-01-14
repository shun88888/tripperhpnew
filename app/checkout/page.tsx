"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsFormValid(name.trim() !== "" && email.trim() !== "" && email.includes("@"));
  }, [name, email]);

  const handleCreatePaymentIntent = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "決済の準備に失敗しました");
      }

      setClientSecret(data.clientSecret);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-display font-bold text-foreground tracking-tight">
              Tripper
            </Link>
            <Link href="/" className="text-secondary hover:text-foreground transition-colors">
              ← 戻る
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-display font-bold mb-4">お支払い</h1>
          <p className="text-xl text-secondary">
            オーダーメイド旅行しおり
          </p>
          <div className="flex items-center justify-center mt-6">
            <span className="text-3xl font-bold mr-1">¥</span>
            <span className="text-5xl font-display font-bold">2,980</span>
            <span className="text-secondary ml-2">（税込）</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 animate-slide-up">
            {!clientSecret ? (
              // ステップ1: 名前とメール入力
              <div className="space-y-8">
                <div className="text-center pb-6 border-b border-gray-200">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-foreground text-white rounded-full font-bold mb-3">
                    1
                  </div>
                  <p className="text-lg font-semibold">お客様情報の入力</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-3 text-foreground">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-foreground focus:border-transparent transition text-lg"
                      placeholder="山田太郎"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-3 text-foreground">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-foreground focus:border-transparent transition text-lg"
                      placeholder="example@example.com"
                      required
                    />
                    <p className="text-sm text-secondary mt-2">
                      領収書とご連絡はこちらのアドレスに送信されます
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-lg">
                    <p className="font-semibold">エラー</p>
                    <p>{error}</p>
                  </div>
                )}

                <button
                  onClick={handleCreatePaymentIntent}
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-foreground text-white px-8 py-5 rounded-xl text-lg font-bold hover:bg-gray-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      準備中...
                    </span>
                  ) : (
                    "お支払いへ進む →"
                  )}
                </button>

                <div className="text-center pt-6 border-t border-gray-200">
                  <Link
                    href="/"
                    className="text-secondary hover:text-foreground transition-colors inline-flex items-center"
                  >
                    ← トップページに戻る
                  </Link>
                </div>
              </div>
            ) : (
              // ステップ2: 決済フォーム
              <div>
                <div className="text-center pb-6 border-b border-gray-200 mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-foreground text-white rounded-full font-bold mb-3">
                    2
                  </div>
                  <p className="text-lg font-semibold">お支払い情報の入力</p>
                </div>

                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-4 text-foreground">ご入力いただいた情報</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-secondary">お名前</p>
                      <p className="font-medium text-lg">{name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-secondary">メールアドレス</p>
                      <p className="font-medium text-lg">{email}</p>
                    </div>
                  </div>
                </div>

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#1a1a1a",
                        borderRadius: "12px",
                      },
                    },
                  }}
                >
                  <CheckoutForm />
                </Elements>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
