import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-3xl font-display font-bold text-foreground tracking-tight">
              Tripper
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-16 text-center animate-fade-in">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ご注文ありがとうございます！
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-12">
            お支払いが完了しました
          </p>

          {/* Next Steps */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-12 text-left">
            <h2 className="text-2xl font-bold mb-8 text-center font-display">次のステップ</h2>
            <ol className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">確認メールをご確認ください</p>
                  <p className="text-secondary leading-relaxed">
                    Stripeより領収書メールが送信されています。受信トレイまたは迷惑メールフォルダをご確認ください。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">担当者よりご連絡いたします</p>
                  <p className="text-secondary leading-relaxed">
                    24時間以内にメールまたはDMにて旅行の詳細をヒアリングさせていただきます。お楽しみにお待ちください。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl flex items-center justify-center text-lg font-bold mr-4 shadow-md">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg mb-2">しおりをお届けします</p>
                  <p className="text-secondary leading-relaxed">
                    3営業日以内にデジタルしおりをメールまたはDMでお届けします。あなただけの旅のプランをお楽しみに。
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Contact & CTA */}
          <div className="border-t border-gray-200 pt-8 space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <p className="font-semibold text-foreground mb-2">お問い合わせ</p>
              <p className="text-secondary">
                ご不明な点がございましたら、お気軽にお問い合わせください。<br />
                <a href="mailto:tripper.jp.info@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  tripper.jp.info@gmail.com
                </a>
              </p>
            </div>

            <Link
              href="/"
              className="inline-block bg-foreground text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
