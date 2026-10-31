
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import MyBookingCard from '@/components/Booking/MyBookingCard';

interface Booking {
  _id: string;
  imageUrl: string;
  destinationName: string;
  departureDate: string;
  price: number;
  status?: string;
  destinationId?: string;
  email: string;
}

const MyBookingPage = async (): Promise<React.JSX.Element> => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_API}/my-bookings/${user?.email}`
  );

  const bookings: Booking[] = await res.json();

  return (
    <div className="px-5 py-10">
      <div className="mb-7">
        <h1 className="text-4xl font-serif">My Bookings</h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage and view your upcoming travel plans
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <MyBookingCard
            key={booking._id}
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;
