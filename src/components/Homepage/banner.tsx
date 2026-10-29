import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { playfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const SEARCH_FIELDS = [
  {
    name: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
    defaultValue: "Address, City Or Zip",
  },
  {
    name: "duration",
    label: "Date/Duration",
    placeholder: "Anytime/3 Days",
    defaultValue: "Anytime/3 Days",
  },
  {
    name: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    defaultValue: "$0-$3000",
  },
  {
    name: "people",
    label: "People",
    placeholder: "5-10",
    defaultValue: "5-10",
  },
] as const;

const SEARCH_FIELD_CLASSES = [
  "",
  "border-t border-gray-400/50 sm:border-t-0 sm:border-l",
  "border-t border-gray-400/50 lg:border-t-0 lg:border-l",
  "border-t border-gray-400/50 sm:border-l lg:border-t-0",
] as const;

export type BannerProps = {
  /** Two heading lines; the line break is hidden on small screens. */
  heading?: readonly [string, string];
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
};

export function Banner({
  heading = ["Discover Your", "Next Adventure"],
  subtitle = "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
  primaryCta = { label: "Explore Now", href: "/destinations" },
  secondaryCta = { label: "View Destination", href: "/destinations" },
  imageSrc = "/images/Banner.png",
  imageAlt = "Aerial view of a turquoise coastal bay surrounded by lush green hills and homes",
}: BannerProps) {
  return (
    <section className="relative flex min-h-[600px] flex-col overflow-hidden lg:min-h-[calc(100dvh-3.5rem)]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      {/* Centered hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-14 pb-20 text-center">
        <h1
          className={cn(
            playfair.className,
            " mx-5 italic max-w-4xl text-[clamp(2.75rem,7.5vw,5.5rem)] font-medium leading-[0.95] tracking-tight text-white"
          )}
        >
          {heading[0]}
          <br className="  hidden sm:block" />
          {heading[1]}
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/90">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryCta.href}
            className={cn(
              buttonVariants({ variant: "brand", size: "hero" }),
              "group gap-2.5 rounded"
            )}
          >
            <span>{primaryCta.label}</span>
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href={secondaryCta.href}
            className={cn(
              buttonVariants({ variant: "glass", size: "hero" }),
              "rounded"
            )}
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Search bar pinned to the bottom of the banner */}
      <form
        role="search"
        action="/destinations"
        method="GET"
        className="relative z-10 w-full border-t border-white/30 bg-white/70 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {SEARCH_FIELDS.map((field, i) => (
            <label
              key={field.name}
              className={cn(
                "block cursor-pointer px-4 py-2.5 text-left transition-colors focus-within:bg-white/40",
                SEARCH_FIELD_CLASSES[i]
              )}
            >
              <span className="block text-[13px] font-bold leading-tight text-gray-900">
                {field.label}
              </span>
              <input
                type="text"
                name={field.name}
                defaultValue={field.defaultValue}
                aria-label={field.label}
                className="mt-0.5 w-full bg-transparent text-[11px] leading-tight text-gray-700 placeholder:text-gray-500 focus:outline-none"
              />
            </label>
          ))}
          <div className="sm:col-span-2 lg:col-span-1">
            <Button
              type="submit"
              variant="brand"
              className="h-full min-h-12 w-full rounded-none px-8 text-base font-medium"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
