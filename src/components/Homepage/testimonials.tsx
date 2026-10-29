"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { playfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
  imageAlt: string;
};

const DEFAULT_TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
    imageAlt: "Michael Chen testimonial portrait",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
    imageAlt: "Sarah Johnson testimonial portrait",
  },
  {
    quote:
      '"Exploring The Amalfi Coast With Wanderlust Was A Dream Come True. The Private Boat Tour And Hidden Gem Restaurants Made It Unbeatable."',
    name: "David Miller",
    location: "London, UK",
    image: "/images/person2.png",
    imageAlt: "David Miller testimonial portrait",
  },
  {
    quote:
      '"From Kyoto\'s Ancient Temples To The Modern Pulse Of Tokyo, The Local Guides Provided Incredible Depth And Unmatched Hospitality."',
    name: "Emma Watson",
    location: "Sydney, Australia",
    image: "/images/person1.png",
    imageAlt: "Emma Watson testimonial portrait",
  },
] as const;

export type TestimonialsProps = {
  heading?: string;
  subheading?: string;
  items?: readonly Testimonial[];
};

export function Testimonials({
  heading = "What Travelers Say",
  subheading = "Real experiences from our happy travelers",
  items = DEFAULT_TESTIMONIALS,
}: TestimonialsProps) {
  return (
    <section aria-labelledby="testimonials-heading" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="testimonials-heading"
                className={cn(
                  playfair.className,
                  "text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-tight text-foreground"
                )}
              >
                {heading}
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                {subheading}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CarouselPrevious
                variant="ghost"
                aria-label="Previous testimonial"
                className="static inset-auto my-0 size-11 rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand hover:bg-transparent"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
              </CarouselPrevious>

              <CarouselNext
                variant="ghost"
                aria-label="Next testimonial"
                className="static inset-auto my-0 size-11 rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand hover:bg-transparent"
              >
                <ArrowRight className="size-5" aria-hidden="true" />
              </CarouselNext>
            </div>
          </div>

          <CarouselContent className="-ml-5 mt-6">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.name}-${index}`}
                className="pl-5 md:basis-1/2"
              >
                <Card className="flex h-full flex-row gap-5 rounded-none border border-border bg-card p-5 shadow-none ring-0 sm:gap-6">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <CardContent className="p-0">
                      <p
                        className={cn(
                          playfair.className,
                          "text-[15px] font-medium leading-[1.4] text-foreground"
                        )}
                      >
                        {item.quote}
                      </p>
                    </CardContent>

                    <CardFooter className="mt-auto flex-col items-start border-none bg-transparent p-0 pt-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-px w-5 bg-brand"
                          aria-hidden="true"
                        />
                        <span className="text-[15px] font-medium text-brand">
                          {item.name}
                        </span>
                      </div>

                      <p className="mt-1 pl-7 text-xs text-muted-foreground">
                        {item.location}
                      </p>
                    </CardFooter>
                  </div>

                  <div className="relative shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={400}
                      height={480}
                      sizes="(min-width: 1024px) 160px, 128px"
                      className="h-40 w-32 shrink-0 object-cover sm:h-48 sm:w-40"
                    />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
