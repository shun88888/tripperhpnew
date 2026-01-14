import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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
          {/* Cancel Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            お支払いがキャンセルされました
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-12">
            決済処理は完了していません
          </p>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-12">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">何が起こったのか？</h3>
                <p className="text-secondary leading-relaxed">
                  お支払いがキャンセルまたは中断されました。決済は行われておりませんので、ご安心ください。<br />
                  再度ご購入される場合は、下記のボタンからお手続きください。
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <Link
              href="/checkout"
              className="block w-full bg-foreground text-white px-10 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              再度購入する →
            </Link>
            <Link
              href="/"
              className="block w-full border-2 border-gray-300 text-foreground px-10 py-4 rounded-xl font-bold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              トップページに戻る
            </Link>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
              <p className="font-semibold text-foreground mb-2">お困りの場合は</p>
              <p className="text-secondary text-sm">
                決済でお困りの場合や、ご不明な点がございましたら、<br />
                お気軽にお問い合わせください。<br />
                <a href="mailto:tripper.jp.info@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  tripper.jp.info@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
