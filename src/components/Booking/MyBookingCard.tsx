
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  CheckCircle2,
  Clock3,
  Trash2,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Booking {
  _id: string;
  imageUrl: string;
  destinationName: string;
  departureDate: string;
  price: number;
  status?: string;
}

interface MyBookingCardProps {
  booking: Booking;
}

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const router = useRouter();

  const isConfirmed = booking.status === "Confirmed";

  const handelDelete = async () => {
    const res = await fetch(
      `http://localhost:8000/my-bookings/${booking._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();
    console.log(data);

    router.refresh();
  };

  return (
    <div className="group flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-5">

      {/* Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-lg sm:h-[155px] sm:w-[250px]">
        <Image
          src={booking.imageUrl}
          alt={""}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Booking Information */}
      <div className="min-w-0 flex-1">

        {/* Status */}
        <div className="mb-2">
          {isConfirmed ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              <CheckCircle2 size={14} />
              Confirmed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
              <Clock3 size={14} />
              {booking.status || "Pending"}
            </span>
          )}
        </div>

        {/* Destination */}
        <h2 className="truncate text-xl font-semibold text-gray-900 transition-colors group-hover:text-cyan-600 sm:text-2xl">
          {booking.destinationName}
        </h2>

        {/* Departure Date */}
        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={15} className="shrink-0" />
          Departure: {new Date(booking.departureDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        {/* Booking ID */}
        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={15} className="shrink-0" />
          Booking ID: {booking._id}
        </p>

        {/* Price */}
        <p className="mt-2 text-2xl font-bold text-cyan-600">
          ${booking.price}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex shrink-0 items-center gap-3 sm:self-end">

        <button
          onClick={handelDelete}
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-red-400 px-4 py-2.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={15} />
          Cancel
        </button>

        <Link
          href={`/destinations/${booking._id}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-cyan-700 hover:shadow-md"
        >
          <Eye size={15} />
          View
        </Link>

      </div>
    </div>
  );
};

export default MyBookingCard;
