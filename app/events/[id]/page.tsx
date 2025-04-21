"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoBadge } from "@/components/ui/neo-badge";
import { Event } from "@/lib/types";
import { useEventStore } from "@/hooks/use-event-store";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useBookingStore } from "@/hooks/use-booking-store";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export const dynamicParams = true;
export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const { getEvent } = useEventStore();
  const { isAuthenticated, user } = useAuthStore();
  const { createBooking, getUserBookings } = useBookingStore();

  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    const eventData = getEvent(eventId);
    setEvent(eventData);

    // Check if user already booked this event
    if (isAuthenticated && user) {
      const userBookings = getUserBookings(user.id);
      const hasBooking = userBookings.some(
        (booking) => booking.eventId === eventId && booking.status === "confirmed"
      );
      setAlreadyBooked(hasBooking);
    }
  }, [eventId, getEvent, isAuthenticated, user, getUserBookings]);

  const handleBookEvent = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!event || !user) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const bookingId = createBooking(
        event.id,
        user.id,
        user.name,
        user.email
      );

      if (bookingId) {
        setSuccess("Event booked successfully!");
        setAlreadyBooked(true);
      } else {
        setError("Could not book the event. It might be sold out.");
      }
    } catch (err) {
      setError("An error occurred while booking the event.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Event not found</h3>
            <Link href="/events">
              <NeoButton variant="primary">
                <ArrowLeft size={18} className="mr-2" />
                Back to Events
              </NeoButton>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <Link href="/events" className="inline-block mb-6">
          <NeoButton variant="secondary">
            <ArrowLeft size={18} className="mr-2" />
            Back to Events
          </NeoButton>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-4 border-black mb-6 overflow-hidden">
              <img
                src={
                  event.image ||
                  "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt={event.title}
                className="w-full h-80 object-cover"
              />
            </div>

            <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>

            {event.category && (
              <div className="mb-4">
                <NeoBadge variant="primary">{event.category}</NeoBadge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-gray-700" />
                <span className="text-lg">{formatDateTime(event.date, event.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-gray-700" />
                <span className="text-lg">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-gray-700" />
                <span className="text-lg">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-700" />
                <span className="text-lg">
                  {event.remainingSlots} / {event.capacity} spots available
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-lg whitespace-pre-line">{event.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NeoCard className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Book Your Spot</h2>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Availability:</span>
                  <NeoBadge
                    variant={event.remainingSlots > 0 ? "primary" : "destructive"}
                  >
                    {event.remainingSlots > 0 ? "Available" : "Sold Out"}
                  </NeoBadge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-black">
                  <div
                    className="bg-yellow-400 h-full rounded-full border-r-2 border-black"
                    style={{
                      width: `${Math.min(
                        100,
                        ((event.capacity - event.remainingSlots) / event.capacity) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm mt-2">
                  {event.remainingSlots} out of {event.capacity} spots remaining
                </p>
              </div>

              {success && (
                <div className="p-3 bg-green-100 border-l-4 border-green-500 text-green-700 mb-4">
                  {success}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 mb-4">
                  {error}
                </div>
              )}

              <NeoButton
                fullWidth
                variant={alreadyBooked ? "secondary" : "primary"}
                disabled={
                  isLoading ||
                  event.remainingSlots === 0 ||
                  alreadyBooked
                }
                onClick={handleBookEvent}
              >
                {isLoading
                  ? "Processing..."
                  : alreadyBooked
                    ? "Already Booked"
                    : event.remainingSlots === 0
                      ? "Sold Out"
                      : "Book Now"}
              </NeoButton>

              {!isAuthenticated && (
                <p className="text-sm mt-4 text-gray-600 text-center">
                  You need to{" "}
                  <Link href="/login" className="text-blue-600 underline">
                    log in
                  </Link>{" "}
                  to book this event.
                </p>
              )}
            </NeoCard>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}