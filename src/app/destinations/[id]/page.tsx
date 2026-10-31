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

import type { IDestination } from "@/lib/types/destinations";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";
import BookingCard from "@/components/Booking/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import getTokenFromServer from "@/lib/getTokenFromServer";

const highlights = [
  "Professional local guide",
  "Comfortable accommodation",
  "Daily breakfast included",
  "Small group experience",
  "All entrance fees covered",
];

// Generate a consistent display rating from the destination ID.
function rating(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return (4 + (sum % 10) / 10).toFixed(1);
}

// Generate a consistent display review count from the destination ID.
function reviews(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return 120 + ((sum * 7) % 380);
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = await getTokenFromServer();

  const res = await fetch(`${process.env.NEXT_API}/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    notFound();
  }

  // A 200 with an empty or malformed body must render the 404 page,
  // not crash the server component with a JSON parse error.
  const destination: IDestination | null = await res.json().catch(() => null);

  if (!destination?._id) {
    notFound();
  }

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

                <span className="font-semibold">{rating(destination._id)}</span>

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
          <BookingCard destination={destination}></BookingCard>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
