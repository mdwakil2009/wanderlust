
"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IDestination } from "@/lib/types/destinations";
import { authClient } from "@/lib/auth-client";
import type { FormEvent } from "react";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

interface BookingCardProps {
  destination: IDestination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
  const price = Number(destination.price).toLocaleString("en-US");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handelBooking = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate") as string;

    const data = {
      username: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const bookingdata = await res.json();

    console.log(bookingdata);
  };

  return (
    <div>
      <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
        <p className="text-sm text-neutral-500">Starting from</p>

        <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
          ${price}
        </p>

        <p className="mt-1 text-xs text-neutral-500">per person</p>

        {/* Departure Date */}
        <form onSubmit={handelBooking}>
          <Input
            type="date"
            name="departureDate"
            aria-label="Departure date"
            defaultValue={destination.departureDate}
            className="mt-5 h-11 bg-neutral-50 text-sm"
          />

          {/* Booking Button */}
          <Button
            type="submit"
            className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]"
          >
            Book Now
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>

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
  );
};

export default BookingCard;
