import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">法的情報</h1>
          <p className="text-xl text-secondary">特定商取引法に基づく表記</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 space-y-8 animate-slide-up">
          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">販売業者</h2>
            <p className="text-secondary text-lg">中川俊介（個人）</p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">運営責任者</h2>
            <p className="text-secondary text-lg">中川俊介</p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">所在地</h2>
            <p className="text-secondary leading-relaxed">
              請求があった場合に遅滞なく開示いたします。<br />
              下記メールアドレスまでお問い合わせください。
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">連絡先</h2>
            <p className="text-secondary text-lg">
              <a href="mailto:tripper.jp.info@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                tripper.jp.info@gmail.com
              </a>
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">販売価格</h2>
            <p className="text-secondary text-lg">
              オーダーメイド旅行しおり: <span className="font-semibold text-foreground">2,980円（税込）</span>
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">支払方法</h2>
            <p className="text-secondary leading-relaxed">
              クレジットカード（Stripe経由）
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">支払時期</h2>
            <p className="text-secondary leading-relaxed">
              注文確定時に即時決済されます
            </p>
          </div>

          <div className="pb-6 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">商品引渡時期</h2>
            <p className="text-secondary leading-relaxed">
              決済完了後、3営業日以内にメールまたはDMにて納品いたします
            </p>
          </div>

          <div className="pb-8 border-b border-gray-200">
            <h2 className="font-bold text-xl mb-3 font-display">返品・キャンセルについて</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
              <p className="text-secondary leading-relaxed">
                デジタル商品のため、原則として返品・返金は不可とさせていただきます。<br />
                ただし、商品に不備があった場合は再納品にて対応いたします。
              </p>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="pt-2">
            <h2 className="font-bold text-2xl mb-6 font-display">プライバシーポリシー</h2>
            <div className="space-y-6 text-secondary leading-relaxed">
              <p>
                当サービスでは、お客様の個人情報を適切に管理し、以下の目的にのみ使用いたします。
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">個人情報の利用目的</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>商品・サービスの提供</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>決済処理（Stripeを通じた安全な決済）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>ご注文に関するご連絡</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>お問い合わせへの対応</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3">第三者への提供</h3>
                <p>
                  お客様の個人情報を第三者に提供することはありません。<br />
                  ただし、決済処理のため、Stripe Inc.に必要最低限の情報を提供いたします。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-secondary hover:text-foreground transition-colors text-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            トップページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
