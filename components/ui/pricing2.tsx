"use client";

import { ArrowRight, CircleCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PricingFeature {
  text: string;
  isNote?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
}

const Pricing2 = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",
  plans = [
    {
      id: "plus",
      name: "Plus",
      description: "For personal use",
      monthlyPrice: "$19",
      yearlyPrice: "$15",
      features: [
        { text: "Up to 5 team members" },
        { text: "Basic components library" },
        { text: "Community support" },
        { text: "1GB storage space" },
      ],
      button: {
        text: "Purchase",
        url: "https://www.shadcnblocks.com",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals",
      monthlyPrice: "$49",
      yearlyPrice: "$35",
      features: [
        { text: "Unlimited team members" },
        { text: "Advanced components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
        url: "https://www.shadcnblocks.com",
      },
    },
  ],
}: Pricing2Props) => {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 md:gap-6 text-center">
          <h2 className="text-pretty text-3xl sm:text-4xl md:text-5xl font-bold lg:text-6xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-xl">{description}</p>
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center w-full">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className="flex h-full w-full max-w-md md:w-80 flex-col justify-between text-left bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle>
                    <p className="text-lg sm:text-xl">{plan.name}</p>
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <span className="text-3xl sm:text-4xl font-bold">
                    {plan.monthlyPrice}
                  </span>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <Separator className="mb-4 sm:mb-6" />
                  {index > 0 && (
                    <p className="mb-2 sm:mb-3 font-semibold text-sm sm:text-base">
                      {plans[0].name}の全て、さらに:
                    </p>
                  )}
                  <ul className="space-y-3 sm:space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {feature.isNote ? (
                          <span className="size-4 flex-shrink-0 text-center text-sm font-medium">※</span>
                        ) : (
                          <CircleCheck className="size-4 flex-shrink-0" />
                        )}
                        <span className="text-sm sm:text-base">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto p-4 sm:p-6">
                  <Button asChild className="w-full text-sm sm:text-base">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                      <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };
