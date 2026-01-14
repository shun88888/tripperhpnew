"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Feature } from "@/components/ui/feature";
import { Pricing2 } from "@/components/ui/pricing2";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check } from "lucide-react";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const sections = [
  { id: "features", label: "Features", subtitle: "特徴", showOnMobile: true },
  { id: "pricing", label: "Pricing", subtitle: "料金", showOnMobile: false },
  { id: "howitworks", label: "How it works", subtitle: "ご注文の流れ", showOnMobile: false },
  { id: "faq", label: "FAQ", subtitle: "よくある質問", showOnMobile: false },
  { id: "order", label: "今すぐ購入", subtitle: "", showOnMobile: true },
];

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return activeSection;
}

export default function Home() {
  const sectionIds = sections.map((s) => s.id);
  const activeSection = useActiveSection(sectionIds);

  const handleSectionClick = (id: string) => {
    if (id === "order") {
      window.location.href = "/checkout";
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with extended background */}
      <section className="relative">
        {/* Extended background image */}
        <div className="absolute top-0 left-0 right-0 h-[calc(100vh+400px)] -z-10">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="旅行の風景"
            fill
            className="object-cover brightness-90"
            priority
            unoptimized
          />
        </div>

        {/* Hero content */}
        <div className="relative h-[calc(100vh-30px)] flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
              TRIPPER
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-4 font-light tracking-wide">
              あなただけの旅行しおりを
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide">
              オーダーメイドで
            </p>
          </div>

          {/* Section Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/20 animate-fade-in overflow-hidden md:overflow-x-auto">
            {/* sticky版: className="sticky top-0 z-40 bg-black/40 backdrop-blur-sm border-t border-white/20 animate-fade-in md:-mt-20" */}
            <div className="flex items-stretch h-16 md:h-20 min-w-0 md:min-w-max">
            {sections.map((section, index) => (
              <button
                type="button"
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`transition-all duration-200 px-4 sm:px-6 md:px-8 border-0 h-full ${
                  section.showOnMobile ? "flex flex-1 md:flex-1" : "hidden md:flex md:flex-1"
                } ${
                  index < sections.length - 1 ? "md:border-r md:border-white/20" : ""
                } ${
                  section.showOnMobile && sections.filter(s => s.showOnMobile).indexOf(section) < sections.filter(s => s.showOnMobile).length - 1 ? "border-r border-white/20" : ""
                } ${
                  activeSection === section.id
                    ? "bg-white text-black items-center justify-center"
                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/15 flex-col justify-center items-start"
                }`}
              >
                {activeSection === section.id ? (
                  <span className="text-sm md:text-lg font-bold whitespace-nowrap">{section.label}</span>
                ) : (
                  <>
                    <span className="text-xs md:text-sm font-bold mb-0.5 whitespace-nowrap">{section.label}</span>
                    <span className="text-xs md:text-sm font-light opacity-80 whitespace-nowrap">{section.subtitle}</span>
                  </>
                )}
              </button>
            ))}
            </div>
          </div>
        </div>

      </section>

      {/* Features Section - Using Feature Component */}
      <section id="features" className="animate-fade-in">
        <HeroHighlight containerClassName="h-auto py-0">
          <div className="w-full">
            <Feature />
          </div>
        </HeroHighlight>
      </section>

      {/* Pricing Section - Using Pricing2 Component */}
      <section id="pricing" className="animate-fade-in">
        <HeroHighlight containerClassName="h-auto py-0">
          <div className="w-full">
            <Pricing2
              heading="料金プラン"
              description="シンプルでわかりやすい料金設定"
              plans={[
                {
                  id: "basic",
                  name: "ベーシック",
                  description: "1泊2日まで / 2人旅行まで",
                  monthlyPrice: "¥2,980",
                  yearlyPrice: "¥2,980",
                  features: [
                    { text: "旅行しおり作成（PDF）" },
                    { text: "ヒアリング：Instagram DM / メール" },
                    { text: "ボリューム：約10ページ前後" },
                    { text: "納期：目安5〜7営業日" },
                    { text: "修正：1回（納品後7日以内）" },
                  ],
                  button: {
                    text: "今すぐ購入",
                    url: "/checkout",
                  },
                },
                {
                  id: "custom",
                  name: "カスタム",
                  description: "グループ旅行・特殊条件など",
                  monthlyPrice: "要相談",
                  yearlyPrice: "要相談",
                  features: [
                    { text: "ベーシック外の内容はこちら" },
                    { text: "まずは相談 → 可否をご案内" },
                    { text: "急ぎ対応：要相談" },
                    { text: "内容によりお受けできない場合あり", isNote: true },
                  ],
                  button: {
                    text: "相談する",
                    url: "mailto:tripper.jp.info@gmail.com",
                  },
                },
              ]}
            />
          </div>
        </HeroHighlight>
      </section>

      {/* How it works Section */}
      <section id="howitworks" className="animate-fade-in">
        <HeroHighlight containerClassName="h-auto py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">ご注文の流れ</h2>
            </div>

            <Stepper
              defaultValue={1}
              indicators={{
                completed: <Check className="size-5" />,
              }}
              className="max-w-4xl mx-auto"
            >
              <StepperNav>
                <StepperItem step={1} className="relative flex-1 items-start">
                  <StepperTrigger className="flex flex-col gap-2.5">
                    <StepperIndicator className="size-12 text-xl">1</StepperIndicator>
                    <StepperTitle className="text-xl font-bold">ご注文</StepperTitle>
                    <StepperDescription className="text-base">
                      ベーシックはそのまま購入できます（Stripe決済）
                    </StepperDescription>
                  </StepperTrigger>
                  <StepperSeparator className="absolute top-6 inset-x-0 left-[calc(50%+1.5rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                </StepperItem>

                <StepperItem step={2} className="relative flex-1 items-start">
                  <StepperTrigger className="flex flex-col gap-2.5">
                    <StepperIndicator className="size-12 text-xl">2</StepperIndicator>
                    <StepperTitle className="text-xl font-bold">ヒアリング</StepperTitle>
                    <StepperDescription className="text-base">
                      24時間以内にDM/メールでご連絡。ヒアリング回答期限は5日以内です
                    </StepperDescription>
                  </StepperTrigger>
                  <StepperSeparator className="absolute top-6 inset-x-0 left-[calc(50%+1.5rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-3rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                </StepperItem>

                <StepperItem step={3} className="relative flex-1 items-start">
                  <StepperTrigger className="flex flex-col gap-2.5">
                    <StepperIndicator className="size-12 text-xl">3</StepperIndicator>
                    <StepperTitle className="text-xl font-bold">作成＆納品</StepperTitle>
                    <StepperDescription className="text-base">
                      作成開始から目安5〜7営業日でPDFをお届けします
                    </StepperDescription>
                  </StepperTrigger>
                </StepperItem>
              </StepperNav>
            </Stepper>
            <p className="text-center text-secondary text-sm mt-6">※お急ぎ対応は要相談です</p>
          </div>
        </HeroHighlight>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="animate-fade-in">
        <HeroHighlight containerClassName="h-auto py-12 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-20">よくある質問</h2>
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. どのような形式で納品されますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. PDF（データ）で納品します。DMまたはメールでお送りします。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. 対応エリアはどこですか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. 日本国内のみ（日本語対応）です。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. しおりの内容はどんな感じですか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. 旅行のタイムライン（旅程）を中心に、条件に合わせて構成したしおりを作成します。（約10ページ前後）
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. 予約や手配もお願いできますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. 予約・手配はお客様にてお願いします（当方では代行していません）。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. 納期はいつからカウントされますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. ヒアリング回答が揃った時点から作成を開始し、そこから目安5〜7営業日で納品します。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. ヒアリングはどうやって行いますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. Instagram DM / メールからお選びいただけます。ご注文後、24時間以内にご案内します。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. 修正はできますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. はい、1回まで可能です。納品後7日以内に、まとめてご指摘ください。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. お急ぎ対応はできますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. 要相談となります。日程・内容により、対応可否と追加料金をご案内します。
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-card hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Q. キャンセル・返金はできますか？</h3>
                <p className="text-secondary leading-relaxed">
                  A. デジタル商品の性質上、決済完了後のキャンセル・返金は原則お受けできません。また、ヒアリング案内後5日以内に必要情報のご返信がない場合、制作進行ができないため受付を終了する場合があり、その場合も返金対象外となります。
                </p>
              </div>
            </div>
          </div>
        </HeroHighlight>
      </section>

      {/* CTA Section */}
      <section className="animate-fade-in">
        <HeroHighlight containerClassName="h-auto py-12 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              あなただけの旅を
              <br />
              今すぐ始めませんか？
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-secondary mb-8 md:mb-10">
              オーダーメイドの旅行しおりで、旅の計画をもっとラクに、もっと楽しく。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/checkout"
                className="inline-block bg-foreground text-white px-8 sm:px-10 md:px-12 py-4 md:py-5 rounded-xl text-base md:text-lg font-bold hover:bg-gray-800 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1"
              >
                今すぐ購入
              </Link>
              <Link
                href="mailto:tripper.jp.info@gmail.com"
                className="text-secondary hover:text-foreground transition-colors text-sm md:text-base"
              >
                要相談の方はこちら →
              </Link>
            </div>
          </div>
        </HeroHighlight>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Tripper</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                あなただけの旅行しおりをオーダーメイドで作成します
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-base md:text-lg">お問い合わせ</h4>
              <p className="text-gray-400 text-sm md:text-base break-all">
                Email: tripper.jp.info@gmail.com
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 md:mb-4 text-base md:text-lg">法的情報</h4>
              <Link href="/legal" className="text-gray-400 hover:text-white block mb-2 transition-colors text-sm md:text-base">
                特定商取引法に基づく表記
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2026 Tripper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
