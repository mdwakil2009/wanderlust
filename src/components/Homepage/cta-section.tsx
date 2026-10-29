import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CtaSectionProps = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

export function CtaSection({
  heading = "Ready To Start Your Journey?",
  subheading = "Join thousands of travelers who have discovered the world with us",
  ctaLabel = "BOOK YOUR TRIP TODAY",
  ctaHref = "/destinations",
  imageSrc = "/images/CTA.png",
  imageAlt = "Aerial view of a tropical island with an airplane flying overhead",
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[380px] w-full items-center justify-center overflow-hidden sm:min-h-[440px] lg:min-h-[480px]",
        className,
      )}
    >
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Vignette & Gradient Overlays for contrast */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20"
        aria-hidden="true"
      />

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[54px]">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-normal text-white/90 sm:text-base md:text-lg">
          {subheading}
        </p>

        <div className="mt-8 sm:mt-10">
          <Link
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "hero" }),
              "group gap-3 rounded-none border-white bg-white text-black tracking-[0.14em] shadow-md transition-all hover:border-white hover:bg-white/90 hover:text-black hover:shadow-xl active:scale-[0.99]",
            )}
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
