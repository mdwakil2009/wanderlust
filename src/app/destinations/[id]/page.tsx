import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IDestination } from "@/lib/types/destinations";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

const highlights = [
  "Professional local guide",
  "Comfortable accommodation",
  "Daily breakfast included",
  "Small group experience",
  "All entrance fees covered",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDate(value: string) {
  // Dates are stored as "YYYY-MM-DD" (native date input), but older documents
  // used "YYYY.MM.DD" — handle both separators.
  const [year, month, day] = value.split(/[.\-]/);
  return `${month}/${day}/${year}`;
}

// Generate a consistent display rating from the destination ID.
function rating(id: string) {
  const sum = id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return (4 + (sum % 10) / 10).toFixed(1);
}

// Generate a consistent display review count from the destination ID.
function reviews(id: string) {
  const sum = id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return 120 + ((sum * 7) % 380);
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destination/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  // A 200 with an empty or malformed body must render the 404 page,
  // not crash the server component with a JSON parse error.
  const destination: IDestination | null = await res
    .json()
    .catch(() => null);

  if (!destination?._id) {
    notFound();
  }

  const price = Number(destination.price).toLocaleString("en-US");

  return (
    <main className="min-h-screen bg-white px-5 py-6 text-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Bar */}
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Destinations
          </Link>
          
          <div className="flex items-center gap-3">
            <EditDestinationDialog destination={destination} />

            <DeleteDestinationDialog id={id} />
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-neutral-100 sm:h-96 lg:h-[26rem]">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Destination Details */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Content */}
          <section className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin className="size-4" aria-hidden="true" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light tracking-tight sm:text-5xl">
              {destination.name}
            </h1>

            {/* Rating and Duration */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star
                  className="size-4 fill-emerald-500 text-emerald-500"
                  aria-hidden="true"
                />

                <span className="font-semibold">
                  {rating(destination._id)}
                </span>

                <span className="text-neutral-500">
                  ({reviews(destination._id)} reviews)
                </span>
              </span>

              <span className="flex items-center gap-1.5 text-neutral-500">
                <CalendarDays className="size-4" aria-hidden="true" />
                {destination.duration}
              </span>
            </div>

            {/* Overview */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Overview</h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
                {destination.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Highlights</h2>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-700"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </section>

          {/* Booking Sidebar */}
          <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <p className="text-sm text-neutral-500">Starting from</p>

            <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
              ${price}
            </p>

            <p className="mt-1 text-xs text-neutral-500">per person</p>

            {/* Departure Date */}
            <Input
              readOnly
              aria-label="Departure date"
              value={formatDate(destination.departureDate)}
              className="mt-5 h-11 bg-neutral-50 text-sm"
            />

            {/* Booking Button */}
            <Button className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]">
              Book Now
              <ArrowRight aria-hidden="true" />
            </Button>

            {/* Booking Perks */}
            <ul className="mt-5 space-y-3 border-t border-neutral-200 pt-5">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2 text-xs text-neutral-600"
                >
                  <Check
                    className="mt-px size-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;