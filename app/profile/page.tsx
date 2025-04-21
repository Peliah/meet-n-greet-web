"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoBadge } from "@/components/ui/neo-badge";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useBookingStore } from "@/hooks/use-booking-store";
import { useEventStore } from "@/hooks/use-event-store";
import { Booking, Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { getUserBookings, cancelBooking } = useBookingStore();
  const { getEvent } = useEventStore();

  const [bookings, setBookings] = useState<
    Array<Booking & { event: Event | undefined }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      const userBookings = getUserBookings(user.id);

      // Enrich bookings with event data
      const enrichedBookings = userBookings.map((booking) => ({
        ...booking,
        event: getEvent(booking.eventId),
      }));

      setBookings(enrichedBookings);
    }
  }, [isAuthenticated, user, getUserBookings, getEvent, router]);

  const handleCancelBooking = (bookingId: string) => {
    setIsLoading(true);
    const success = cancelBooking(bookingId);

    if (success) {
      // Update the bookings list
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    }

    setIsLoading(false);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            MY <span className="text-yellow-400">BOOKINGS</span>
          </h1>
          <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
          <p className="mt-4 text-lg text-gray-700">
            View and manage your event bookings.
          </p>
        </div>

        {bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Ticket className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No bookings yet</h3>
            <p className="text-gray-600 mb-6">
              You haven&apos;t booked any events yet. Explore our events and book your spot!
            </p>
            <Link href="/events">
              <NeoButton variant="primary">Browse Events</NeoButton>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NeoCard
                  variant={booking.status === "confirmed" ? "white" : "secondary"}
                  className={`overflow-hidden ${booking.status === "cancelled" ? "opacity-75" : ""
                    }`}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {booking.event && (
                      <div className="md:w-1/4">
                        <div className="border-4 border-black overflow-hidden h-full">
                          <img
                            src={
                              booking.event.image ||
                              "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            }
                            alt={booking.event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className="md:w-3/4 flex flex-col">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                          <h3 className="text-xl font-extrabold">
                            {booking.event?.title || "Event not found"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Booking ID: {booking.id}
                          </p>
                        </div>
                        <NeoBadge
                          variant={
                            booking.status === "confirmed"
                              ? "primary"
                              : "destructive"
                          }
                          className="mt-2 md:mt-0"
                        >
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : "Cancelled"}
                        </NeoBadge>
                      </div>

                      {booking.event ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar
                              size={18}
                              className="text-gray-700"
                            />
                            <span>{formatDate(booking.event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-gray-700" />
                            <span>{booking.event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-gray-700" />
                            <span className="truncate">
                              {booking.event.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Ticket size={18} className="text-gray-700" />
                            <span>
                              Booked on{" "}
                              {formatDate(booking.bookingDate)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mb-6 text-red-500">
                          <AlertCircle size={18} />
                          <span>Event information not available</span>
                        </div>
                      )}

                      <div className="mt-auto">
                        {booking.status === "confirmed" && (
                          <div className="flex gap-4">
                            <Link
                              href={`/events/${booking.eventId}`}
                              className="block"
                            >
                              <NeoButton variant="secondary">
                                View Event
                              </NeoButton>
                            </Link>
                            <NeoButton
                              variant="destructive"
                              onClick={() =>
                                handleCancelBooking(booking.id)
                              }
                              disabled={isLoading}
                            >
                              {isLoading ? "Processing..." : "Cancel Booking"}
                            </NeoButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </NeoCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}