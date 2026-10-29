import Image from "next/image";
import { Headset, Map, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { playfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export type WhyChooseItem = {
  icon?: LucideIcon;
  imageSrc?: string;
  imageAlt?: string;
  title: string;
  body: string;
};

const DEFAULT_ITEMS: readonly WhyChooseItem[] = [
  {
    icon: ShieldCheck,
    imageSrc: "/images/ShieldCheck.png",
    imageAlt: "Shield check icon",
    title: "Safe & Secure",
    body: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    imageSrc: "/images/MapTrifold.png",
    imageAlt: "Map trifold icon",
    title: "Expert Guides",
    body: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    imageSrc: "/images/Headset.png",
    imageAlt: "Customer support headset icon",
    title: "24/7 Support",
    body: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
] as const;

export type WhyChooseProps = {
  heading?: string;
  subheading?: string;
  items?: readonly WhyChooseItem[];
};

export function WhyChoose({
  heading = "Why Choose Wanderlust",
  subheading = "Your trusted partner for exceptional travel experiences",
  items = DEFAULT_ITEMS,
}: WhyChooseProps) {
  return (
    <section className="bg-[#e6f5fa] py-16 dark:bg-muted/40 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <div className="pt-8">
          <div className="px-4 text-center sm:px-6">
            <h2
              className={cn(
                playfair.className,
                "text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-foreground"
              )}
            >
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-[15px]">
              {subheading}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="rounded-none border-none bg-card p-6 shadow-sm ring-0 transition-shadow hover:shadow-md sm:p-8"
                >
                  <CardHeader className="p-0">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      {Icon ? (
                        <Icon className="size-6 text-brand" aria-hidden="true" />
                      ) : item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt ?? item.title}
                          width={28}
                          height={28}
                          className="size-7 object-contain"
                        />
                      ) : null}
                    </div>
                    <CardTitle
                      className={cn(
                        playfair.className,
                        "mt-6 text-xl font-medium text-foreground"
                      )}
                    >
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CardDescription className="mt-4 text-[13px] leading-[1.55] text-muted-foreground">
                      {item.body}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
