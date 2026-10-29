
import Link from "next/link";
import React from "react";

type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string | number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
};

const AllDestinationsPage = async () => {
  let destinations: Destination[] = [];

  const res = await fetch("http://localhost:8000/destinations");
  const data = await res.json();
  console.log(data);

  destinations = data;

  return (
    <main className="min-h-screen  bg-white px-5 py-10 text-neutral-900 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <header className="mb-6">
          <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
            Explore All Destinations
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {/* Destination Count */}
        <p className="mb-6 text-xs text-neutral-500">
          Showing {destinations.length} destinations
        </p>

    
{/* Destination Cards */}
{destinations.length > 0 ? (
  <section className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
    {destinations.map((destination) => (
      <article
        key={destination._id}
        className="group min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-neutral-100 sm:h-44 lg:h-48">
          {destination.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={destination.imageUrl}
              alt={destination.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No image available
            </div>
          )}

          {/* Rating */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm">
            <span className="text-amber-400" aria-hidden="true">
              ★
            </span>
            {destination.rating ?? "4.5"}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5">
          {/* Country */}
          <p className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <span className="text-sky-600" aria-hidden="true">
              ◎
            </span>
            {destination.country}
          </p>

          {/* Name and Price */}
          <div className="mt-2 flex items-start justify-between gap-3">
            <h2 className="min-w-0 text-base font-semibold leading-6 text-neutral-900 transition-colors group-hover:text-sky-700">
              {destination.name}
            </h2>

            <p className="shrink-0 text-right text-base font-bold text-sky-700">
              ${Number(destination.price).toLocaleString("en-US")}
              <span className="block mt-0.5 text-[10px] font-normal text-neutral-500">
                /Person
              </span>
            </p>
          </div>

          {/* Duration */}
          <div className="mt-4 flex items-center gap-2 border-t border-neutral-100 pt-4">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600"
              aria-hidden="true"
            >
              ▦
            </span>
            <span className="text-xs text-neutral-600">
              {destination.duration}
            </span>
          </div>

          {/* Booking Link */}
          <Link
            href={`/destinations/${destination._id}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-sky-600 px-4 py-2.5 text-xs font-semibold text-sky-700 transition-all duration-300 hover:bg-sky-600 hover:text-white"
          >
            Book Now
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </article>
    ))}
  </section>
) : (
  <div className="py-16 text-center">
    <h2 className="text-lg font-medium">No destinations found</h2>
    <p className="mt-2 text-sm text-neutral-500">
      Please check your backend server and try again.
    </p>
  </div>
)}
```
      </div>
    </main>
  );
};

export default AllDestinationsPage;
