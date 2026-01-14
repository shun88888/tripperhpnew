import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Feature() {
  return (
    <div className="w-full py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-8 md:gap-12 flex-col">
            <div className="flex gap-4 md:gap-6 flex-col">
              <div className="flex gap-4 md:gap-6 lg:gap-8 flex-col">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  あなただけの旅行しおりを
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  オーダーメイドで
                </h2>
              </div>
            </div>
            <p className="text-secondary leading-relaxed text-sm md:text-base -mt-2">
              旅の条件をヒアリングして、タイムライン中心に組み立てた"あなた専用"のしおりをお届けします。
            </p>
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-row gap-4 md:gap-6 items-start">
                <Check className="w-5 h-5 mt-1 md:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-base md:text-lg font-bold">人が責任を持って作成</p>
                  <p className="text-secondary leading-relaxed text-sm md:text-base">
                    ヒアリング内容をもとに、テンプレではなく毎回あなたの条件に合わせて設計します。
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 md:gap-6 items-start">
                <Check className="w-5 h-5 mt-1 md:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-base md:text-lg font-bold">デジタル納品（PDF）</p>
                  <p className="text-secondary leading-relaxed text-sm md:text-base">
                    スマホで見やすいPDFでお届け。旅行前にさっと確認できます。（約10ページ前後）
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 md:gap-6 items-start">
                <Check className="w-5 h-5 mt-1 md:mt-2 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-base md:text-lg font-bold">納期：目安5〜7営業日</p>
                  <p className="text-secondary leading-relaxed text-sm md:text-base">
                    ヒアリング回答が揃った時点から作成開始し、目安5〜7営業日で納品します。
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-center flex-wrap">
              <Button asChild size="lg" className="text-sm md:text-base px-6 md:px-8 shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/checkout">今すぐ購入</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-sm md:text-base px-6 md:px-8 shadow-lg hover:shadow-xl transition-shadow">
                <Link href="#pricing">料金を見る</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
