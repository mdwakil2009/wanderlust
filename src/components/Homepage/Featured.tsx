
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  RefreshCw,
  SearchX,
  Star,
  TriangleAlert,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { playfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { IDestination } from "@/lib/types/destinations";

// API URL from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API || "http://localhost:8000";

const FEATURED_DESTINATIONS_URL = `${API_BASE_URL.replace(/\/+$/, "")}/featured-destination`;

const CARD_IMAGE_SIZES =
  "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw";

const CARD_ITEM_CLASS = "pl-5 basis-full md:basis-1/2 lg:basis-1/3";

type LoadState = "loading" | "error" | "success";

export type FeaturedProps = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

function isFeaturedDestination(value: unknown): value is IDestination {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Partial<IDestination>;

  return (
    typeof item._id === "string" &&
    typeof item.name === "string" &&
    typeof item.country === "string" &&
    typeof item.category === "string" &&
    (typeof item.price === "string" || typeof item.price === "number") &&
    typeof item.duration === "string" &&
    typeof item.departureDate === "string" &&
    typeof item.imageUrl === "string" &&
    typeof item.description === "string" &&
    (item.rating === undefined || typeof item.rating === "number")
  );
}

function parseFeaturedDestinations(payload: unknown): IDestination[] {
  if (!Array.isArray(payload)) return [];

  return payload.filter(isFeaturedDestination);
}

const Featured = ({
  heading = "Featured Destinations",
  subheading = "Handpicked travel experiences for the adventure seekers",
  ctaLabel = "All Destinations",
  ctaHref = "/destinations",
}: FeaturedProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [state, setState] = React.useState<LoadState>("loading");
  const [destinations, setDestinations] = React.useState<IDestination[]>([]);
  const [reloadKey, setReloadKey] = React.useState(0);

  const handleApi = React.useCallback((carouselApi: CarouselApi) => {
    setApi(carouselApi);
    setCount(carouselApi?.scrollSnapList().length ?? 0);
    setCurrent(carouselApi?.selectedScrollSnap() ?? 0);
  }, []);

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  // Fetch featured destinations
  React.useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const loadDestinations = async () => {
      try {
        console.log("Featured API URL:", FEATURED_DESTINATIONS_URL);

        const response = await fetch(FEATURED_DESTINATIONS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Featured destinations request failed with status ${response.status}`,
          );
        }

        const payload: unknown = await response.json();

        if (cancelled) return;

        const featuredDestinations = parseFeaturedDestinations(payload);

        setDestinations(featuredDestinations);
        setState("success");
      } catch (error) {
        if (cancelled || controller.signal.aborted) return;

        console.error("Failed to load featured destinations:", error);

        setDestinations([]);
        setState("error");
      }
    };

    void loadDestinations();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [reloadKey]);

  // Reinitialize carousel when slides change
  React.useEffect(() => {
    api?.reInit();
  }, [api, state, destinations]);

  // Retry API request
  const handleRetry = React.useCallback(() => {
    setState("loading");
    setReloadKey((key) => key + 1);
  }, []);

  const hasDestinations = state === "success" && destinations.length > 0;

  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={handleApi}
          className="w-full"
        >
          {/* Heading row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="featured-heading"
                className={cn(
                  playfair.className,
                  "text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-foreground",
                )}
              >
                {heading}
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                {subheading}
              </p>
            </div>

            <Link
              href={ctaHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group/shrink-0 gap-2 self-start rounded-lg border-border px-5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:border-brand hover:bg-transparent hover:text-brand sm:self-auto",
              )}
            >
              {ctaLabel}
              <ArrowRight
                className="size-4 transition-transform group-hover/shrink-0:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Accessible status */}
          <p className="sr-only" role="status">
            {state === "loading" && "Loading featured destinations."}
            {state === "error" && "Featured destinations failed to load."}
            {state === "success" &&
              `${destinations.length} featured destinations loaded.`}
          </p>

          {/* Destination cards */}
          <CarouselContent className="-ml-5 mt-8">
            {/* Loading state */}
            {state === "loading" &&
              Array.from({ length: 3 }, (_, index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className={CARD_ITEM_CLASS}
                  aria-hidden="true"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <div className="aspect-[16/10] animate-pulse bg-muted" />

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                      <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-11/12 animate-pulse rounded bg-muted" />
                      <div className="mt-auto h-10 w-28 animate-pulse rounded-lg bg-muted" />
                    </div>
                  </div>
                </CarouselItem>
              ))}

            {/* Error state */}
            {state === "error" && (
              <CarouselItem className="pl-5 basis-full">
                <div className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <TriangleAlert className="size-6" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-semibold text-foreground">
                      We couldn&apos;t load featured destinations
                    </p>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Something went wrong while contacting the server. Please
                      try again.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={handleRetry}
                    className="gap-2"
                  >
                    <RefreshCw className="size-4" aria-hidden="true" />
                    Try again
                  </Button>
                </div>
              </CarouselItem>
            )}

            {/* Empty state */}
            {state === "success" && destinations.length === 0 && (
              <CarouselItem className="pl-5 basis-full">
                <div className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                  <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <SearchX className="size-6" aria-hidden="true" />
                  </span>

                  <div>
                    <p className="font-semibold text-foreground">
                      No featured destinations yet
                    </p>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                      There are no destinations to show right now. Please check
                      back later.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            )}

            {/* Destination cards */}
            {hasDestinations &&
              destinations.map((destination) => (
                <CarouselItem
                  key={destination._id}
                  className={CARD_ITEM_CLASS}
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
                    {/* Image with optional rating badge */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      {destination.imageUrl ? (
                        <Image
                          src={destination.imageUrl}
                          alt={destination.name.trim()}
                          fill
                          sizes={CARD_IMAGE_SIZES}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image available
                        </span>
                      )}

                      {destination.rating != null && (
                        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur dark:bg-black/70 dark:text-white">
                          <Star
                            className="size-3.5 fill-amber-400 text-amber-400"
                            aria-hidden="true"
                          />
                          {destination.rating}
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <MapPin
                          className="size-3.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {destination.country.trim()}
                      </p>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h3
                          className={cn(
                            playfair.className,
                            "min-w-0 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-brand",
                          )}
                        >
                          {destination.name.trim()}
                        </h3>

                        <p className="shrink-0 text-right">
                          <span className="text-lg font-bold text-foreground">
                            ${Number(destination.price).toLocaleString("en-US")}
                          </span>

                          <span className="block text-[10px] text-muted-foreground">
                            /Person
                          </span>
                        </p>
                      </div>

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays
                          className="size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {destination.duration}
                      </p>

                      <p className="mb-4 mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {destination.description}
                      </p>

                      <Link
                        href={`/destinations/${destination._id}`}
                        className="mt-auto inline-flex h-10 w-fit items-center justify-center gap-1.5 self-start rounded-lg border border-brand/60 px-5 text-xs font-semibold uppercase tracking-wide text-brand transition-colors duration-300 hover:bg-brand hover:text-white"
                      >
                        Explore

                        <ArrowUpRight
                          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              ))}
          </CarouselContent>

          {/* Slide counter + navigation */}
          {hasDestinations && (
            <div className="mt-8 flex items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                <span className="font-semibold text-foreground">
                  {current + 1}
                </span>
                {" / "}
                {count || destinations.length}
              </p>

              <div className="flex items-center gap-3">
                <CarouselPrevious
                  variant="ghost"
                  aria-label="Previous destination"
                  className="static inset-auto my-0 size-11 rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand hover:bg-transparent"
                >
                  <ArrowRight
                    className="size-5 rotate-180"
                    aria-hidden="true"
                  />
                </CarouselPrevious>

                <CarouselNext
                  variant="ghost"
                  aria-label="Next destination"
                  className="static inset-auto my-0 size-11 rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand hover:bg-transparent"
                >
                  <ArrowRight className="size-5" aria-hidden="true" />
                </CarouselNext>
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Featured;
